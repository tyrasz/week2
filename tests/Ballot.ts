import { expect } from "chai";
import { ethers } from "hardhat";
import { Ballot } from "../typechain-types";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

describe("Ballot", function () {
  let ballotContract: Ballot;

  beforeEach(async function () {
    const ballotFactory = await ethers.getContractFactory("Ballot");
    ballotContract = await ballotFactory.deploy(
      convertStringArrayToBytes32(PROPOSALS)
    );
    await ballotContract.deployed();
  });

  describe("when the contract is deployed", function () {
    it("has the provided proposals", async () => {
      for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await ballotContract.proposals(index);
        expect(ethers.utils.parseBytes32String(proposal.name)).to.equal(
          PROPOSALS[index]
        );
      }
    });

    it("has zero votes for all proposals", async () => {
      for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await ballotContract.proposals(index);
        expect(proposal.voteCount).to.equal(0);
      }
    });

    it("sets the deployer address as chairperson", async () => {
      const chairperson = await ballotContract.chairperson();
      const accounts = await ethers.getSigners();
      expect(chairperson).to.equal(accounts[0].address);
    });

    it("sets the voting weight for the chairperson to 1", async () => {
      const accounts = await ethers.getSigners();
      const voter = await ballotContract.voters(accounts[0].address);
      expect(voter.weight).to.equal(1);
    });

    it("gives voting rights to another account", async () => {
      const accounts = await ethers.getSigners();
      const chairperson = await ballotContract.voters(accounts[0].address);
      const voteTx = await ballotContract.giveRightToVote(accounts[1].address);
      console.log(voteTx);
      const voter = await ballotContract.voters(accounts[1].address);
      expect(voter.weight).to.equal(1);
    });

    it("delegates voting rights to another account", async () => {
      const accounts = await ethers.getSigners();
      const chairperson = await ballotContract.voters(accounts[0].address);
      const voteTx = await ballotContract.giveRightToVote(accounts[2].address);
      const delegateVoteTx = await ballotContract.delegate(accounts[2].address);
      console.log(delegateVoteTx);
      const delegate = await ballotContract.voters(accounts[2].address);
      expect(delegate.weight).to.equal(2);
    });

    it("chairperson can vote", async () => {
      const chairperson = await ballotContract.chairperson();
      const accounts = await ethers.getSigners();
      const votedTx = await ballotContract.vote(0);
      const winner = await ballotContract.winnerName();
      expect("Proposal 1").to.equal(ethers.utils.parseBytes32String(winner));
      //expect(winner).to.equal(ethers.utils.parseBytes32String(PROPOSALS[0]));
    });
  });
});
