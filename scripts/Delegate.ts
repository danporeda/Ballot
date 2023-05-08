import { ethers } from "hardhat";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from 'dotenv'
dotenv.config();

// run file from terminal with argument delegatee: yarn ts-node --files ./scripts/GiveRightToVote.ts <delegatee address>
// Delegator must run the script as the signer by filling their private key { "PRIVATE_KEY" } in the .env file.

const CONTRACT_ADDRESS = "0x58ebbf51dc43a0398d154c36c4de7c88fe36fe28";

async function main() {
    const delegatee = process.argv[2];
    console.log("Connecting to provider...");
    const provider = new ethers.providers.AlchemyProvider("maticmum", process.env.ALCHEMY_API_KEY);
    const pkey = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(`${pkey}`);
    const signer = wallet.connect(provider);
    console.log(`Connected to ${provider.network.name}`);

    const ballotFactory = new Ballot__factory(signer);
    const ballotContract = ballotFactory.attach(CONTRACT_ADDRESS);
    console.log(`Contract factory created, attached to ballot at address ${ballotContract.address}`);

    await ballotContract.delegate(delegatee);
    if ((await ballotContract.voters(signer.address)).delegate == delegatee) {
        console.log("delegation successful");
    }
    else {
        console.log("delegation unsuccessful")
    }

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})