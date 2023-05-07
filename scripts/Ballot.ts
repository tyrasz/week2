import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
// import "@nomicfoundation/hardhat-verify";

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
  const mooveOutDelegateTx = await ballotContract.delegate(mooveOutAddress, {
    gasLimit: 500000, // or some other value
  });
  console.log(`Delegated`);

  const skyyAddress = "0xd60e2f289ff4e54eac21e30c2bdd78c47aa466e7";
  const skyyGiveVoteTx = await ballotContract.giveRightToVote(skyyAddress);

  const loungAddress = "0x9620daf4fE148e8dCB58745f35BE24AE30503535";
  const loungGiveVoteTx = await ballotContract.giveRightToVote(loungAddress);

  console.log(`Voting rights all given`);

  //delegating votes
  // const mooveOutDelegateTx = await ballotContract.delegate(mooveOutAddress);
  const skyyDelegateTx = await ballotContract.delegate(skyyAddress, {
    gasLimit: 500000, // or some other value
  });
  const loungDelegateTx = await ballotContract.delegate(loungAddress, {
    gasLimit: 500000, // or some other value
  });

  console.log(`Votes delegated`);

  // chairperson votes
  const chairpersonVoteTx = await ballotContract.vote(0, {
    gasLimit: 500000, // or some other value
  });
  console.log(`Voted`);

  // querying results
  const winningProposal = await ballotContract.winningProposal();
  console.log(`The winning proposal is ${winningProposal}`);

  //verify the contract
  async function verifyContract(
    hre: HardhatRuntimeEnvironment,
    contractAddress: string,
    proposals: string[]
  ) {
    const proposalBytes = proposals.map(ethers.utils.formatBytes32String);
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: [proposalBytes],
    });
  }
  const verifyTx = await verifyContract(hre, ballotContract.address, PROPOSALS);
  console.log(verifyTx);
}

//catch errors and exit
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
