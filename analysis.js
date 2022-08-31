const { spawn, exec } = require('child_process')

const log = console.log

const addresses = [
  '0x96E423291765C60e0Fbc2cFB2BC538Fb6CCdAdd9',
  '0x3ac26f27595EffeB5e426BD093081EC30eBdD545',
  '0x7A83dB2d2737C240C77C7C5D8be8c2aD68f6FF23',
  '0x1d77340D3819007BbfD7fdD37C22BD3b5c311350',
  '0xC8CE829C5D26c2F94E5bf64F90DbDf576b24213B',
  '0xc7e9dDd5358e08417b1C88ed6f1a73149BEeaa32',
  '0x6E1f0aEf52b7b4b341ad27e00e394bd1C7F8B888',
  '0x22b8E9c359f7764bBaeA3B41fC794CBA04d4Ff32',
  '0x2e647Fd86c7EA77141d756f5442eB8b2947D5903',
  '0xA965db45248E737aEEf91243eB0bFf9F30F91B74',
  '0xf9938B7213eF1ffD15Aea74370d420FA41957cdf',
  '0xa96f7d29dc792359B1Ce24C7c54230882deE1Be2',
  '0xd4A02ad632a73480E53F5182EFD144FbEcC3D943',
  '0xEA1B4943F31777807Cdcd55b68D2Ba070E4A2d34',
  '0xBC61561102d43Af2450c4F37a372d36878ce151F',
  '0xe120100349a0b1BF826D2407E519D75C2Fe8f859',
  '0x4d498b18aBCF83A15D3364D7419A4eF382982c7d',
  '0x108ef05A9FDf103D1Da778aC9373308D0FE59B32',
  '0x6e852Ba3CBC51D6fdf83AF554E1D2e633bE3f3c1',
  '0xc1Df020c9D294EF98093607d98cFe14B9494BbeA',
  '0xA820487E57656771b21AB533cB99e8d347Aa20EF',
  '0x329219bE8810602a59b76dF9Ed7d52Dc3AFc3e8B',
  '0x510467f65a600926Af2ed565419aD98CF1F706ED',
  '0x4d200a0A7066Af311baBA7A647B1CCe54AE2f9A5',
  '0x5389c89F8a136dC7896F18B93C00F716A3E7E3A0',
  '0x40a066c5eCe5B2cE2d0F15ad96c459C94C1a0416',
  '0x664a025E46043207b9609095CE643a8442FeA8a3',
  '0x3688C31568B011B541701311a0D31D41fffd8bdf',
  '0x04b2582c70a1537202033e7F3265D38f4680109e',
  '0xa1Bb86b79627a985Dfa1Ea9B0f655859d3Dc109B',
  '0xF01FE1A15673A5209C94121C45E2121FE2903416',
  '0x8412AB39FC267f37249A4380f00cA19C8219b124',
  '0x671FA333efCdc8dCE84f6381c39796e4AF4feD75',
  '0xC4520E8eFbd538b20063033959599b32B8a31d67',
  '0x612f1BDbe93523b7f5036EfA87493B76341726E3',
  '0xcEaE314D493855918AB12705D944D3aF81beEB3D',
  '0xC8A074De1C6bF01a75cD29892c91B6C354200f75',
  '0x8c720e5d2ee8AfBeE106cE48C9454150798B4234',
  '0x89392Ecd850BDe121F5d75aE0157A99808e0C288',
  '0x7e54d7dC4A941901A58Bab838FcF10537Fef6F0C',
  '0xA34f75BD76b044b18C16DbF5481b05fdf75277AF',
  '0x1F512db6A4b92D0bF29b33826734D630Ed3D531C',
  '0x0E6277c95F97b4C71b6864ce94Ab617d6784c4bc',
  '0xd05dc25d8dad48fb9cF242D812D8Fb4A653aDB95',
  '0x9279d4d65Dca0744365C4424c4023DC21897A80a',
  '0xa645ab04933aE56cfD93d905BD40Aa1150e0E4Fd',
  '0x6CFD5Cb1d9145513D767bAA3eADBEDa0e1A5E605',
  '0xAA90725a3fC3432B3dbf2d6d050b2265F2c5c5d2',
  '0xE61f6b6B20B54261002668cF6B81DE9A6AC0Cb3A',
  '0x4d200a0A7066Af311baBA7A647B1CCe54AE2f9A5',
  '0x8bBF2d91E3c601DF2C71c4EE98e87351922F8AA7',
  '0x7b3c3A05FCbf18dB060EF29250769CEe961D75aC',
  '0x455729Af8890A334b4F6cd6bb72c778922e42aD7',
  '0x137e531680b5D1F5645Cd73a450323f1645d5034',
  '0xdDa2044b39FDB4dB77Ac085866179C548e5d0f15',
  '0x5E521B660fe8Ac575F1d7201F2237724EE531F1D',
  '0xce6B1AFf0fE66da643D7A9A64d4747293628D667',
  '0x5b39AfA22A9dEBd9247bF84B68A79b8736c2Ba4E',
  '0x3fAb284a3cD0A6d88d18D0fdA4bc1a76cdacd68A',
  '0xbC272B58E7cD0a6002c95aFD1F208898D756C580',
  '0xa630823Bd70AB8E8e2d6E62089d3837dB1887Bf6',
  '0xC5ce9C06a0CAF0E4cbd90572b6550FeAFd69b740',
  '0xC304349d7Cc07407B7844d54218D29D1A449b854',
  '0xEFBfc3f373c9cc5c0375403177d71Bcc387D3597',
  '0x2E4eB4585cB949E53212e796cEF13d562C24374B',
  '0x1fBf025AD94ddE79f88732F79966A9A435F2772f',
  '0xcEA86636608BaCB632DfD1606A0dC1728b625387',
  '0x70bf9Df6967Dc96156e76Cc43b928A7eF02E159a',
  '0x403F614Ea176BDd865Ab0377831f487987179cEa',
  '0x97D25094830592B0f9FA32F427779a722Ed04b34',
  '0x59434a7b9aEEbE94045D3715aa020F6a1d7875aD',
  '0x4AeC37ae465E1D78649aFF117baB737c5fb4F214',
  '0x4a73D9fe078fA67601047F88C3e6C270602E5709',
  '0xBD53a4Db4003C59070aBbFa4E6C31aFBF0B26843',
  '0x5DAC036595568Ff792f5064451b6B37e801ecaB9',
  '0x8D4EB49f0eD7EE6d6E00fc76eA3E9C3898bf219D',
  '0x0cfA149c0a843e1f8d9bC5C6e6bebf901845CeBE',
  '0x75658ed3DbA1E12644d2CD9272BA9ee888f4c417',
  '0xF0344800bd3Ffa687e4D780357961B28995a5F46',
  '0x13c547Ff0888A0A876E6F1304eaeFE9E6E06FC4B',
]

const results = []

function handleAnalyzedResult(address, result) {
  results.push({
    address,
    result,
  })

  if (results.length === addresses.length) {
    log(results)
  }
}

// WORKING
addresses.forEach((address) => {
  exec(
    `myth analyze -a ${address} -t 3 --execution-timeout 5 `,
    (err, stdout, stderr) => {
      if (err) {
        console.error(err)
        return
      }

      handleAnalyzedResult(address, stdout)
    }
  )
})

const ls = {}

// addresses.forEach((address) => {
//   ls[address] = spawn('myth', [
//     'analyze',
//     '-a',
//     address,
//     '--execution-timeout',
//     '5',
//     '-t',
//     '3',
//   ])

//   ls[address].stdout.on('data', (data) => {
//     // console.log(`stdout: ${data}`)
//     handleAnalyzedResult(address, data)
//   })

//   ls[address].stderr.on('data', (data) => {
//     // console.log(`stderr: ${data}`)
//   })

//   ls[address].on('error', (error) => {
//     // console.log(`error: ${error.message}`)
//   })

//   ls[address].on('close', (code) => {
//     // log('Analyzed results:')
//     // log(results)
//     console.log(`child process exited with code ${code}`)
//   })
// })

// const ls = spawn('myth', [
//   'analyze',
//   '-a',
//   '0xC4520E8eFbd538b20063033959599b32B8a31d67',
//   '--execution-timeout',
//   '3000',
//   '-t',
//   '3',
// ])

// ls.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`)
// })

// ls.stderr.on('data', (data) => {
//   console.log(`stderr: ${data}`)
// })

// ls.on('error', (error) => {
//   console.log(`error: ${error.message}`)
// })

// ls.on('close', (code) => {
//   console.log(`child process exited with code ${code}`)
// })
