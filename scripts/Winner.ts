import { ethers } from "hardhat";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from 'dotenv'
dotenv.config();

const CONTRACT_ADDRESS = "0x58ebbf51dc43a0398d154c36c4de7c88fe36fe28";

async function main() {
  console.log("Connecting to provider...");
  const provider = new ethers.providers.AlchemyProvider("maticmum", process.env.ALCHEMY_API_KEY);
  const pkey = process.env.PRIVATE_KEY;
  const wallet = new ethers.Wallet(`${pkey}`);
  const signer = wallet.connect(provider);
  console.log(`Connected to ${provider.network.name}`);

  const ballotFactory = new Ballot__factory(signer);
  const ballotContract = ballotFactory.attach(CONTRACT_ADDRESS);

  console.log(`The winning Proposal is: ${ethers.utils.parseBytes32String(await ballotContract.winnerName())}!`);
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
})