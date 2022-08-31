const childProcess = require('child_process')
const perfy = require('perfy')

const resultParser = require('../../utils/resultParser')
const timeLogger = require('../../utils/timeLogger')

/**
 *
 * @param {string} address
 * @returns command and args to run the myth script. (Python syntax)
 * Specify the maximum number of transaction to explore with -t <number>. You can also set a timeout with --execution-timeout <seconds>.
 */
function getParamBasedOnAddress(address) {
  return [
    'myth',
    ['analyze', '-a', address, '-t', '3', '--execution-timeout', '5'],
    {},
  ]
}

/**
 *
 * @param {string} id
 * @param {string} status
 * This function updates the status of the analysis step
 */
function updateStepStatus(id, status) {
  console.log(id, status)
}

/**
 *
 * @param {string} command
 * @param {object} args
 * @param {object} options
 * @param {string} address
 * @returns {Promise<string>}
 * This function runs the myth script and returns the result
 */
async function runScript(command, args, options) {
  return new Promise((resolve, reject) => {
    const child = childProcess.spawn(command, args, options)
    let result = ''
    child.stdout.on('data', function (data) {
      result += data.toString()
    })
    child.on('close', () => resolve(result))
  })
}

let final = []

/**
 *
 * @param {array[string]} addresses
 * @returns {Promise}
 * This function analyzes the addresses and returns the result
 */
async function analyzeAddress(addresses) {
  final = []
  return new Promise(async (resolve, reject) => {
    if (addresses && !Array.isArray(addresses)) resolve()
    let counter = addresses.length
    for (const address of addresses) {
      counter--
      if (address.length) {
        const [command, args, options] = getParamBasedOnAddress(address)
        if (command) {
          perfy.start('logger')      
          updateStepStatus(address, 'active')
          
          let data = await runScript(command, args, options, address)
          
          const timer =  perfy.end('logger')
          updateStepStatus(address, 'completed')

          timeLogger('Individual', `Time took to analyze this contract: ${address}`,timer.startTime, timer.endTime, `${timer.time}s`)
          // To parse the result called with:
          // resultParser(data)
          // Example: final.push({ contract_address: address, result: resultParser(data) })
          if (data.length === 0) data = 'No vulnerabilities detected'
          final.push({ contract_address: address, result: data })

          if (counter === 0) resolve(final)
        }
      }
    }
  })
}

module.exports = {
  analyzeAddress,
}
