const { ethers } = require("hardhat");

async function main() {
  const Youtube = await ethers.getContractFactory("Youtube");
  const youtube = await Youtube.deploy();
  await youtube.deployed();
  console.log("Contract address:", youtube.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
