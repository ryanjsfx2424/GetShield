const { swcIdMapping, severityMapping } = require('./constants')

const resultParser = (result) => {
  // Validations
  if (!result) return ''
  if (result && typeof result !== 'string') return ''

  // perform parsing
  // 1). Search for any of the Severity below:
  // Severity: Low
  // Severity: Medium
  // Severity: High

  console.log('phase 1')
  console.log(result)

  let parsed = ''

  if (result.indexOf('Severity: Low') != -1) {
    parsed += severityMapping['low']
  }
  if (result.indexOf('Severity: Medium') != -1) {
    parsed += severityMapping['medium']
  }
  if (result.indexOf('Severity: High') != -1) {
    parsed += severityMapping['high']
  }

  console.log('phase 1')
  console.log(parsed)

  if (result.indexOf('Severity: High') == -1) {
    parsed += severityMapping['none']
  }

  return parsed
}

module.exports = resultParser
