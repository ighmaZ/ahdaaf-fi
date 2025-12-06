// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title AhdaafPoolV1 - Mudarabah Investment Pool
 * @dev A Shariah-compliant contract implementing Mudarabah financing model.
 * Users deposit stablecoins into goal vaults, which are pooled together.
 * Profits are distributed based on Profit Sharing Ratio (PSR), losses are proportional to capital.
 */
contract AhdaafPoolV1 is Ownable {
    IERC20 public immutable stablecoin; // The stablecoin token (e.g., USDT, USDC)
    
    // Fixed Profit Sharing Ratio (PSR) - Used ONLY for PROFIT distribution
    // 70% to investors (Rab-ul-Mal), 30% to platform (Mudarib)
    uint256 private constant USER_PSR = 70; // 70% of allocated profit goes to the user
    uint256 private constant PLATFORM_PSR = 30; // 30% of allocated profit goes to the platform
    
    // Total Principal invested in the pool (in stablecoin units)
    uint256 public totalPrincipal;

    // Mapping: user address => goalId => Principal Balance
    // Goal vaults allow users to track multiple savings goals
    mapping(address => mapping(uint256 => uint256)) public goalVaults;
    
    // Mapping: user address => total Principal Balance across all goals
    mapping(address => uint256) public userPrincipalBalances; 
    
    // Tracks the net profit of the pool (after expenses)
    // Positive for gain, negative for loss. Set manually by the owner for the MVP.
    // Assumes expenses are already deducted when reporting.
    int256 public netPoolProfit;

    // Events for external tracking
    event FundsDeposited(address indexed investor, uint256 goalId, uint256 amount);
    event PerformanceReported(int256 netProfit);
    event ProfitDistributed(
        address indexed investor, 
        uint256 goalId,
        uint256 previousBalance,
        uint256 newBalance, 
        int256 profitOrLoss
    );

    constructor(address _stablecoin) Ownable(msg.sender) {
        require(_stablecoin != address(0), "Invalid stablecoin address");
        stablecoin = IERC20(_stablecoin);
    }

    // =======================================================================
    // CORE FUNCTIONS
    // =======================================================================

    /**
     * @dev User deposits stablecoins into a goal vault (piggy bank).
     * @param goalId The unique identifier for the user's savings goal
     * @param amount The amount of stablecoins to deposit
     */
    function deposit(uint256 goalId, uint256 amount) external {
        require(amount > 0, "Deposit amount must be greater than zero");
        require(totalPrincipal + amount >= totalPrincipal, "Overflow protection");
        
        // Transfer stablecoins from user to this contract
        require(
            stablecoin.transferFrom(msg.sender, address(this), amount),
            "Token transfer failed"
        );
        
        goalVaults[msg.sender][goalId] += amount;
        userPrincipalBalances[msg.sender] += amount;
        totalPrincipal += amount;

        emit FundsDeposited(msg.sender, goalId, amount);
    }

    /**
     * @dev Owner reports the net profit of the investment pool.
     * Assumes expenses are already deducted (simplified for demo).
     * @param _netProfit The net profit (positive) or loss (negative) after expenses
     */
    function reportPoolPerformance(int256 _netProfit) external onlyOwner {
        netPoolProfit = _netProfit;
        emit PerformanceReported(_netProfit);
    }

    /**
     * @dev Admin distributes profits/losses to a user's goal vault.
     * Profit: User gets 70% of their allocated share of net profit (added to goal vault)
     * Loss: User bears 100% of their proportional share of loss (deducted from goal vault)
     * The distributed amount will show up as an increase/decrease in the user's goal vault balance.
     * @param user The address of the user to distribute to
     * @param goalId The goal vault ID to distribute to
     */
    function distributeProfit(address user, uint256 goalId) external onlyOwner {
        uint256 userPrincipal = goalVaults[user][goalId];
        require(userPrincipal > 0, "No balance in this goal vault");
        require(totalPrincipal > 0, "Pool is empty");
        
        // Calculate the user's capital share relative to the total pool (using 10000 for precision)
        uint256 userCapitalShare = (userPrincipal * 10000) / totalPrincipal;
        require(userCapitalShare > 0, "Share too small");

        int256 profitOrLoss = 0;
        uint256 distributionAmount = 0;

        if (netPoolProfit > 0) {
            // ============================================================
            // PROFIT SCENARIO - Apply Mudarabah PSR
            // ============================================================
            uint256 netProfit = uint256(netPoolProfit);
            
            // 1. Calculate user's allocated share of net profit (pre-PSR)
            uint256 userAllocatedProfit = (netProfit * userCapitalShare) / 10000;
            
            // 2. Apply Profit Sharing Ratio: 70% to user, 30% to platform
            uint256 userFinalProfit = (userAllocatedProfit * USER_PSR) / 100;
            
            // Add profit to goal vault balance
            goalVaults[user][goalId] += userFinalProfit;
            userPrincipalBalances[user] += userFinalProfit;
            totalPrincipal += userFinalProfit;
            
            distributionAmount = userFinalProfit;
            profitOrLoss = int256(userFinalProfit);
            
        } else if (netPoolProfit < 0) {
            // ============================================================
            // LOSS SCENARIO - Proportional to capital (PSR does NOT apply)
            // ============================================================
            uint256 totalLoss = uint256(-netPoolProfit);
            
            // Calculate user's proportional share of the loss
            uint256 userLoss = (totalLoss * userCapitalShare) / 10000;
            
            // Ensure loss doesn't exceed principal
            if (userLoss > userPrincipal) {
                userLoss = userPrincipal;
            }
            
            // Deduct loss from goal vault balance
            goalVaults[user][goalId] -= userLoss;
            userPrincipalBalances[user] -= userLoss;
            totalPrincipal -= userLoss;
            
            distributionAmount = userLoss;
            profitOrLoss = -int256(userLoss);
        }
        // If netPoolProfit == 0, no distribution

        emit ProfitDistributed(user, goalId, userPrincipal, goalVaults[user][goalId], profitOrLoss);
    }

    // =======================================================================
    // VIEW FUNCTIONS (for demo and frontend)
    // =======================================================================

    /**
     * @dev Gets the user's principal balance for a specific goal vault
     */
    function getGoalBalance(address user, uint256 goalId) external view returns (uint256) {
        return goalVaults[user][goalId];
    }

    /**
     * @dev Gets the user's total principal balance across all goals
     */
    function getPrincipalBalance(address user) external view returns (uint256) {
        return userPrincipalBalances[user];
    }

    /**
     * @dev Gets pool statistics for display
     */
    function getPoolStats() external view returns (
        uint256 _totalPrincipal,
        int256 _netProfit,
        uint256 _poolBalance
    ) {
        return (
            totalPrincipal,
            netPoolProfit,
            stablecoin.balanceOf(address(this))
        );
    }
}