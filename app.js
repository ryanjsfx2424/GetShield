const path = require("path");
const fs = require("fs");
const { parse } = require("csv-parse");
const csvWriter = require("csv-writer");
const { EVM } = require("evm");
const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider("https://api.mycryptoapi.com/eth")
);

const log = console.log;

(async function app() {
  try {
    const filePath = process.argv[2];
    if (!filePath) throw new Error("No file path was supplied!");

    const addresses = [];

    //1). Get addresses from CSV file
    fs.createReadStream(filePath)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        if (row[0] && row[0].startsWith("0x") && row[0].length <= 42) {
          addresses.push(row[0]);
        }
      })
      .on("error", function (err) {
        log(err);
      })
      .on("end", function () {
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

            data.push({
              address,
              byteCode,
              decompiledCode: `${decompiledCode}`,
            });

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
      });
  } catch (error) {
    console.log(error.message);
  }
})();
