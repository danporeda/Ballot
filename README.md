# Ballot

Smart Contract with scripts for casting a ballot, voting, and declaring the winner

### Usage
1. Clone the repository. install NPM or yarn in the directory. 
2. create a .env file in the root directory. include: PRIVATE_KEY=<your private key>, ALCHEMY_API_KEY=<your alchemy API key>.
3. The deployer of the contract becomes the chairperson of the Ballot, and only they may grant voting rights to another address. This person should run the Deployment.ts script, following the instructions noted in the code (run file from terminal with arguments of proposal names: yarn ts-node --files ./scripts/Deployment.ts <proposal[0]> <proposal[1]> <proposal[2]>). Successful execution will result in console output with the deployed contract's address. copy this address and paste into other scripts as the value for: const CONTRACT_ADDRESS.
follow instructions in other scripts for granting voting rights, delegation, voting, checking voting weight, view proposals and current vote count, and to determine the winning proposal.
