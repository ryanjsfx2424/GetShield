const axios = require("axios");
const perfy = require("perfy");
const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider("https://api.mycryptoapi.com/eth")
);
const ETHERSCAN_BASE_URL = 'https://api.etherscan.io/api';

const timeLogger = require("../../utils/timeLogger");

async function transactionCount(addresses) {
  try {
    final = [];
    return new Promise(async (resolve, reject) => {
      if (addresses && !Array.isArray(addresses)) resolve();
      let counter = addresses.length;
      for (const address of addresses) {
        counter--;
        if (address.length) {
          // perfy.start('logger')
          // const count = await web3.eth.getTransactionCount(address);
          const countData = await getTransactionCountFromEtherScan(address);
         
         console.log(countData);
          const balance =  await web3.eth.getBalance(address)
          // const timer =  perfy.end('logger')
          // timeLogger('Individual', `Time took to analyze this contract: ${address}`,timer.startTime, timer.endTime, `${timer.time}s`)
          // balanceToEther is the integer value
          const balanceToEther =  (parseFloat(web3.utils.fromWei(balance, 'ether') )/100).toFixed(5)*100 

          final.push({ contract_address: address, count: web3.utils.toBN( countData.data.result).toString(), balance: Intl.NumberFormat().format(balanceToEther) });

          if (counter === 0) resolve(final);
        }
      }
    });
  } catch (err) {}
}

async function getTransactionCountFromEtherScan(address){
 return axios.get(`${ETHERSCAN_BASE_URL}?module=proxy&action=eth_getTransactionCount&address=${address}&tag=latest&apikey=X1GHTD69R8V4RRWR5U52WZ65Y8S81AGP1S`)
}

module.exports = {
  transactionCount,
}; 
