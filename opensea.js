const path = require("path");
const axios = require("axios");
const csvWriter = require("csv-writer");
const { EVM } = require("evm");
const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider("https://api.mycryptoapi.com/eth")
);

const OPENSEA_BASE_URL = "https://api.opensea.io/api/v1";

const log = console.log;

const getAddresses = (collections) => {
  if (!collections && !Array.isArray(collections)) return null;

  const addresses = [];

  collections.forEach((collection) => {
    if (collection.primary_asset_contracts.length > 0) {
      collection.primary_asset_contracts.forEach((asset) => {
        addresses.push(asset.address);
      });
    }
  });

  return addresses;
};

(async function app() {
  try {
    //1). Get Collections from Opensea
    const res = await axios.get(
      OPENSEA_BASE_URL + "/collections?offset=0&limit=300"
    );
    const { collections } = res.data;

    //2). Get a list of addresses
    const addresses = getAddresses(collections);

    if (addresses && addresses.length > 0) {
      //3). Get bycodes for each address

      const data = [];
      let counter = addresses.length;
      addresses.forEach(async (address) => {
        counter--;

        const byteCode = await web3.eth.getCode(address);
      
        // 4). Decompile the bytecode
        const evm = new EVM(byteCode);

        const decompiledCode = evm.decompile();

        data.push({ address, byteCode, decompiledCode: `${decompiledCode}` });

        if (counter === 0) {
          const writer = csvWriter.createObjectCsvWriter({
            path: path.resolve(__dirname, "SmartContract Data.csv"),
            header: [
              { id: "address", title: "Address" },
              { id: "byteCode", title: "Byte Code" },
              { id: "decompiledCode", title: "Decompiled Code" },
            ],
          });

          // 5). Write to CSV
          await writer.writeRecords(data);
        }
      });
      log("Done ✅✅✅");
    }
  } catch (error) {
    console.log(error.message);
  }
})();
