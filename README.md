# Week 2 Project

1. Form groups of 3 to 5 students
2. Develop and run scripts for “Ballot.sol” within your group to give voting rights, casting votes, delegating votes and querying results
3. Write a report with each function execution and the transaction hash, if successful, or the revert reason, if failed
4. Submit your code in a github repository in the form

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

1. Give voting rights to a voting address:
Tx hash and success code:
https://sepolia.etherscan.io/tx/0x1da7eb833bf112497fccf1fd4f032655b11b3b5a37a0a68fe4322d2cbbbc24cf
2. Delegating votes to voting address:
Tx hash and success code:
https://sepolia.etherscan.io/tx/0x5660ad00aa00f2ed930e934631b0a7076d36bf68bbf9a96a249772b1854fbe1b
3. Casting votes by the chairperson:
Ran via script
<img width="1552" alt="Screenshot 2023-05-08 at 12 35 12 AM" src="https://user-images.githubusercontent.com/16234736/236690461-16c357db-c5b1-4b8e-89c5-668241e7a854.png">
Vote casted by voter account:
Tx hash and success code:
https://sepolia.etherscan.io/tx/0x08fbe03daef0a8dea1427e3524c883c88500388eaba6df5e8c63b4aecf8ade1d 


4. Querying result
![Screenshot 2023-05-08 at 12 28 01 AM](https://user-images.githubusercontent.com/16234736/236690532-5e11c07b-c4e9-4a51-935b-c1deebce47c4.png)
