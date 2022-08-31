import React, { useEffect, useState, useRef } from "react";
import Web3 from "web3";
import axios from "axios";
import http from "http";
import https from "https";
import { ERC721Validator } from "@nibbstack/erc721-validator";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--secondary);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  padding-top: 480px;
  width: 400px;
  @media (min-width: 156px) {
    width: 400px;
  }
  transition: width 0.1s;
  transition: height 0.1s;
`;


function App() {
  const [contractAddress, setContractAddress] = useState(``);  
  const [loading,    setLoading   ] = useState(`loadingInvisible`);
  const [loadingTwo, setLoadingTwo] = useState(`searchingInvisibleSmall`);
  const [searched, setSearched] = useState(`searchingInvisible`);
  const [ercCompliant, setErcCompliant] = useState(`No`);
  const [contractBalance, setContractBalance] = useState(``);
  const [txCnt, setTxCnt] = useState(``);

  const ETHERSCAN_API_KEY = "2WHTII3VF5U1J3GV63UQF5TK9SZX7A8FUI";
  const INFURA_API_KEY = "8d8c24c43df74caeab400362f82b4805";
  const INFURA_API_URL = `https://mainnet.infura.io/v3/${INFURA_API_KEY}`;
  const ETHERSCAN_BASE_URL = "https://api.etherscan.io/api";

  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  });

  const fetchData = async(url) =>
  {
    return await axios.get(url).then(res => res.data.data);
  }

  const validateContract = async(address) =>
  {
    console.log("106 vc address: ", address);
    const web3 = new Web3(INFURA_API_URL);
    const validator = new ERC721Validator(web3);

    let result = await validator.basic(1, address);
    // if (result.result) {
    if (false) {
      setErcCompliant(`\u2705 \t`)
    } else {
      setErcCompliant(`\u26d4 \t`)  
    }
  }

  async function getTransactionCountFromEtherScan2(address){
    console.log("120 gtcfe2");
    return axios.get(`${ETHERSCAN_BASE_URL}?module=proxy&action=eth_getTransactionCount&address=${address}&tag=latest&apikey=X1GHTD69R8V4RRWR5U52WZ65Y8S81AGP1S`)
   }

  const getTransactionCountFromEtherscan = async(address) =>
  {
    console.log("121 gtcfe address: ", address);
    const result2 = await getTransactionCountFromEtherScan2(address);
    console.log("123 result2: ", result2);
  }

  async function postMythril(address) {
    console.log("132 gm address: ", address);

    const httpAgent = new http.Agent({rejectUnauthorized: false});
    const httpsAgent = new https.Agent({rejectUnauthorized: false});

    const config = {
      method: "post",
      url: "/api/v1/analysis",
      headers: {"Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "Access-Control-Allow-Origin": "*"},
      httpsAgent: httpsAgent,
      httpAgent: httpAgent,
      withCredentials: false,
      body: {"address": ["0x3ac26f27595EffeB5e426BD093081EC30eBdD545"]},
    }
    // return axios.post("http://35.85.50.164:3000/api/v1/analysis",
    //   { headers: {"Content-Type": "application/json",
    //               "Access-Control-Allow-Origin": "*"},
    //     body: {"address": [address]},
    //     httpsAgent
    //             }
    // )
    // console.log("config for axios: ", config);
    // return axios(config);

    // let xhr = new XMLHttpRequest();
    // xhr.open("POST", "http://35.85.50.164:3000/api/v1/analysis");
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.onload = () => console.log("161 xhr: ", xhr.responseText);
    // xhr.send(JSON.stringify({body: {"address": [address]}}));

    console.log("165 trying fetch w/ middle-ware proxy mod");
    let data = {address: "0x3ac26f27595EffeB5e426BD093081EC30eBdD545"};
    fetch("/api/v1/analysis", {
      method: "POST",
      headers: {"Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"},
      httpAgent: httpAgent,
      httpsAgent: httpsAgent,
      body: JSON.stringify(data)
    }).then(res => {
      console.log("172 fetch response: ", res);
    })

  }

  const doMythril = async(address) =>
  {
    console.log("133 dm address: ", address);
    const result3 = await postMythril(address);
    console.log("135 result3: ", result3)
  }

  const searchContract = () => {
    console.log("contractAddress: ", contractAddress);

    // 1. ERC721 contract?
    validateContract(contractAddress);

    // 2. transaction count (not currently working)
    getTransactionCountFromEtherscan(contractAddress);

    // 3. account balance
    const web3 = new Web3(INFURA_API_URL);
    let flag = false;
    web3.eth.getBalance(contractAddress, function(error, balance) {
      if (error) {
        console.log(error);
        flag = True;
      } else {
        balance = web3.utils.fromWei(balance, "ether");
        console.log(balance);
        setContractBalance(balance + " eth");
      }
    }).then(
      balance => console.log("106")
    );
    if (flag) {
      return
    }

    // 4. mythril (consensys) - lots 'o stuff
    doMythril(contractAddress);

    setLoadingTwo(`searchingSmall`);
    setLoading(`loading`);
    setSearched(`searching`);
    console.log("set Loading to loading");
    setTimeout(function () {
      setLoading(`loadingInvisible`);
      setLoadingTwo(`searchingInvisibleSmall`);
      console.log("set Loading to empty");
    }, 5000);
  }

  return (
    <s.Screen>
      <s.Container

        flex={1}
        ai={"center"}
        style={{ padding: 0, backgroundColor: "var(--primary)" }}
        image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg.png" : null}
      >
        <s.Con
          className="ContainerGridBox">
          
          {/* First box */}
          <s.smallCon
            className="mainBox">
            <s.logoCon>
              <StyledLogo alt={"logo"} src={"/config/images/shieldLogoWhiteNoText.png"} />
              <s.TextDescription
                    style={{
                      textAlign: "center",
                      color: "var(--accent-text)",
                    }}
                  >
                    {`Scan any contract for malicious activity`}
                </s.TextDescription>
                <s.SpacerSmall></s.SpacerSmall>
                <div className="searchContainer">
                    <input className="inputBox" type= 'search' placeholder="Search Contracts / Addresses" onChange={(e) => {
                      setContractAddress(e.target.value);
                    }} />
                    <button className="searchButton" type="submit" onClick={(e) => {
                      searchContract();
                  }}><i className="fa fa-search"></i></button>
                </div>
                <s.SpacerSmall></s.SpacerSmall>

                <div>
                  <s.TextDescription
                      style={{
                        textAlign: "center",
                      }} className={searched}
                  >
                      {ercCompliant + `Does it follow the ERC-721 standard?`}
                  </s.TextDescription>

                  <s.SpacerXSmall></s.SpacerXSmall>

                  <s.TextDescriptionSM
                      style={{
                        textAlign: "center",
                      }} className={searched}
                  >
                      {`Contract Balance: ` + contractBalance}
                  </s.TextDescriptionSM>
                  <s.TextDescriptionSM
                      style={{
                        textAlign: "center",
                      }} className={searched}
                  >
                      {`Transaction Count: ` + txCnt}
                  </s.TextDescriptionSM>
                
                  <s.SpacerSmall></s.SpacerSmall>

                  <div className={loading}></div>

                  <s.SpacerSmall></s.SpacerSmall>
                  <s.SpacerSmall></s.SpacerSmall>
                  <s.TextDescriptionSmall
                          style={{
                            textAlign: "center",
                          }} className={loadingTwo}
                        >
                          {`Please wait 10-15 seconds for the full analysis to complete`}
                  </s.TextDescriptionSmall>

                  
                </div>
                
            </s.logoCon>
            
          </s.smallCon>
          {/* End */}
        </s.Con>
        <s.SpacerMedium/>
      </s.Container >

      <footer>

        <div className="botnav">
          <p className="botleft">Shield © 2022. Made by the team behind <a className="myLink" href="https://ancientwarriors.xyz">Ancient Warriors NFT</a></p>
          <p className="botright"><a className="myLink" href="https://getshield.xyz">API</a> | <a className="myLink" href="https://getshield.xyz/documentation">Documentation</a> | <a className="myLink" href="https://calendly.com/emanft/30min">Contact Us</a></p>
        </div>

      </footer>


    </s.Screen >


  );
}

export default App;
