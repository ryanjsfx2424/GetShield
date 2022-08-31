const Web3 = require("web3");
const perfy = require('perfy')
// import { Validator } from '@nibbstack/erc721-validator'
const { ERC721Validator } = require("@nibbstack/erc721-validator");
const timeLogger = require("../../utils/timeLogger");

const URL = "https://eth-mainnet.g.alchemy.com/v2/demo";

const log = console.log;
const web3 = new Web3(URL);

// const web3 = new Web3(new Web3.providers.HttpProvider())

const validator = new ERC721Validator(web3);

async function ERC721Validate(addresses) {
  try {
    final = [];
    return new Promise(async (resolve, reject) => {
      if (addresses && !Array.isArray(addresses)) resolve();
      let counter = addresses.length;
      for (const address of addresses) {
        counter--;
        if (address.length) {
          perfy.start('logger') 

          const result = await validator.basic(1, address);
         
          const timer =  perfy.end('logger')
          timeLogger('Individual', `Time took to analyze this contract: ${address}`,timer.startTime, timer.endTime, `${timer.time}s`)
        
          final.push({ contract_address: address, ...result });

          if (counter === 0) resolve(final);
        }
      }
    });
  } catch (err) {}
}

module.exports = {
  ERC721Validate,
};
