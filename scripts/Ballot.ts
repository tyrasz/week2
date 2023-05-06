import { ethers } from "hardhat";

async function main() {
  const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];
  console.log("Deploying Ballot contract");
  console.log("Proposals: ");
  PROPOSALS.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });
  const ballotFactory = await ethers.getContractFactory("Ballot");
  const ballotContract = await ballotFactory.deploy(
    PROPOSALS.map(ethers.utils.formatBytes32String)
  );
  const deployTx = await ballotContract.deployTransaction.wait();
  console.log(deployTx);
  console.log(
    `The ballot contract was deployed at ${ballotContract.address} at block ${deployTx.blockNumber}`
  );
  const chairperson = await ballotContract.chairperson();
  console.log(`The chairperson is ${chairperson}`);

  //give voting rights
  const mooveOutAddress = "0xB418426ba654d400DC259cE1e50EF299846f34Af";
  const mooveOutTx = await ballotContract.giveRightToVote(mooveOutAddress);

  //chairperson votes
  const chairpersonVoteTx = await ballotContract.vote(0);

  //delegating votes
  const mooveOutDelegateTx = await ballotContract.delegate(mooveOutAddress);

  //querying results
  const winningProposal = await ballotContract.winningProposal();
}

//catch errors and exit
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
