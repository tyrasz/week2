import { ethers } from "hardhat";

async function main() {
  //TODO get contract address of Ballot contract
  const ballotContract = "";

  // assumes chairperson has given right to vote
  // voter votes for proposal
  const voteTx = await ballotContract.vote(0);

  console.log(voteTx);
}

//catch errors and exit
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
