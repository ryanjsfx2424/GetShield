## To get the script up and running

 - Make sure you have Node Js installed
 - In your terminal; type `npm install`
 - Have a CSV with column A populated with smart contract addresses
 - And node app.js FILE_PATH
 - example node app.js /User/Desktop/filetoload.csv

 ### After you push directory to Github, you must pull on the Server side.

- `ssh -i "contractAnalysisKP.pem" ec2-user@ec2-35-85-50-164.us-west-2.compute.amazonaws.com`
- `cd /home/ec2-user/ContractAnalysis/  `
- `git pull`
- `npm install`
- `pm2 reload all`

### Boom!! you're ready to test 
from `http://35.85.50.164:3000/api/v1/analysis`