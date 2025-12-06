const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment to", hre.network.name);
  console.log("=====================================\n");

  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "BNB\n");

  // Deploy MockERC20 first
  console.log("1️⃣ Deploying MockERC20...");
  const MockERC20 = await hre.ethers.getContractFactory("MockERC20");
  const mockERC20 = await MockERC20.deploy();
  await mockERC20.waitForDeployment();
  const mockERC20Address = await mockERC20.getAddress();
  console.log("✅ MockERC20 deployed to:", mockERC20Address);

  // Wait for a few block confirmations
  console.log("⏳ Waiting for block confirmations...");
  await mockERC20.deploymentTransaction().wait(5);

  // Deploy AhdaafPoolV1 with MockERC20 address
  console.log("\n2️⃣ Deploying AhdaafPoolV1...");
  const AhdaafPoolV1 = await hre.ethers.getContractFactory("AhdaafPoolV1");
  const ahdaafPool = await AhdaafPoolV1.deploy(mockERC20Address);
  await ahdaafPool.waitForDeployment();
  const ahdaafPoolAddress = await ahdaafPool.getAddress();
  console.log("✅ AhdaafPoolV1 deployed to:", ahdaafPoolAddress);

  // Wait for confirmations
  console.log("⏳ Waiting for block confirmations...");
  await ahdaafPool.deploymentTransaction().wait(5);

  console.log("\n" + "=".repeat(50));
  console.log("🎉 Deployment Complete!");
  console.log("=".repeat(50));
  console.log("\n📋 Contract Addresses:");
  console.log("MockERC20:", mockERC20Address);
  console.log("AhdaafPoolV1:", ahdaafPoolAddress);
  console.log("\n📝 Save these addresses for verification:");
  console.log(`\nMockERC20:`);
  console.log(
    `npx hardhat verify --network ${hre.network.name} ${mockERC20Address}`
  );
  console.log(`\nAhdaafPoolV1:`);
  console.log(
    `npx hardhat verify --network ${hre.network.name} ${ahdaafPoolAddress} ${mockERC20Address}`
  );
  console.log("\n" + "=".repeat(50));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
