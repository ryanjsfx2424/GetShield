const puppeteer = require("puppeteer");
const dappeteer = require("@chainsafe/dappeteer");

const sites = [
  "https://opensea.io/",
  "https://looksrare.org/",
  "https://rarible.com/",
  "https://mint.theroyals.art/",
];

const log = console.log;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function mainEntry() {
  // const [metamask, page] = await dappeteer.bootstrap(puppeteer, {metamaskVersion: 'v10.15.0'})

  const browser = await dappeteer.launch(puppeteer, {
    metamaskVersion: "v10.15.0",
  });
  const metamask = await dappeteer.setupMetamask(browser, {
    seed: "state indicate cargo vast melody drill print ring beef wasp mushroom switch",
  });
  const page = await browser.newPage();

  // const metamask = await  dappeteer.getMetamask(browser)
  // metamask.

  // await metamask.addNetwork({networkName: 'Smart Chain', rpc: 'https://bsc-dataseed.binance.org/', chainId: '56', symbol: 'BNB'})
  // await  metamask.switchNetwork('mainnet')
  // await metamask.addToken('0xEAbE5a3E83DCaD21FF76a84315B9d31Fa75C4D08')

  // await metamask.addNetwork({networkName: 'Avalanche Network', rpc: 'https://api.avax.network/ext/bc/C/rpc', chainId: 43114, symbol: 'AVAX',  explorer : "https://snowtrace.io/"})
  // await  metamask.switchNetwork('Avalanche Network')

  // const  page = await  browser.newPage()
  // await page.goto(sites[0])
  await page.goto(
    "https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/4703946328875985852015545410726127905180471847231400476373954568380773040129"
  );

  // await page.waitForXPath('//a[contains(@class, " TopCollections--item")]')
  // const collectionSelector = await page.$x('//a[contains(@class, "TopCollections--item")]')
  // // await sleep(3000)
  // log(collectionSelector, 'collectionSelector')
  // await collectionSelector[2].click()

  // await page.waitForXPath('//a[contains(@class, "Asset--anchor")]')
  // let itemSelector = await page.$x('//a[contains(@class, "Asset--anchor")]')
  // log(itemSelector, 'itemSelector')

  // await page.waitForTimeout(2000)
  // await page.$eval('#main > div > div > div.sc-1xf18x6-0.sc-z0wxa3-0.hnKAL.hWJuuu > div > div.sc-1po1rbf-6.bUKivE > div.sc-1xf18x6-0.cPWSa-d.AssetSearchView--main > div.AssetSearchView--results.collection--results.AssetSearchView--results--phoenix > div.sc-1xf18x6-0.haVRLx.AssetsSearchView--assets > div.fresnel-container.fresnel-greaterThanOrEqual-sm > div > div > div:nth-child(1) > div > article > a', el=>el.click())

  // await page.waitForSelector('#main > div > div > div > div.fresnel-container.fresnel-lessThan-lg > div > div:nth-child(4) > div > section > div.TradeStation--main > div.sc-1xf18x6-0.eKefTS > div > div.sc-1xf18x6-0.sc-9jbsog-0.kmifVp.iyyTkb > button')
  // await page.$eval('#main > div > div > div > div.fresnel-container.fresnel-lessThan-lg > div > div:nth-child(4) > div > section > div.TradeStation--main > div.sc-1xf18x6-0.eKefTS > div > div.sc-1xf18x6-0.sc-9jbsog-0.kmifVp.iyyTkb > button', el=>el.click())

  // await page.waitForSelector('#__next > div > aside.sc-1xf18x6-0.sc-1un5qtt-4.haVRLx.hglVXv > div.sc-1xf18x6-0.sc-1un5qtt-0.haVRLx.grAjeD > div > div.sc-1xf18x6-0.dSeDBG > ul > li:nth-child(1) > button')
  // await page.$eval('#__next > div > aside.sc-1xf18x6-0.sc-1un5qtt-4.haVRLx.hglVXv > div.sc-1xf18x6-0.sc-1un5qtt-0.haVRLx.grAjeD > div > div.sc-1xf18x6-0.dSeDBG > ul > li:nth-child(1) > button', el=>el.click())

  // FOR SINGLE

  // Click Buy Now button
  await page.waitForSelector(
    "#main > div > div > div > div.fresnel-container.fresnel-lessThan-lg > div > div:nth-child(4) > div > section > div.TradeStation--main > div.sc-1xf18x6-0.eKefTS > div > div.sc-1xf18x6-0.sc-9jbsog-0.kmifVp.iyyTkb > button"
  );
  await page.$eval(
    "#main > div > div > div > div.fresnel-container.fresnel-lessThan-lg > div > div:nth-child(4) > div > section > div.TradeStation--main > div.sc-1xf18x6-0.eKefTS > div > div.sc-1xf18x6-0.sc-9jbsog-0.kmifVp.iyyTkb > button",
    (el) => el.click()
  );

  // connect to metamask
  await page.waitForSelector(
    "#__next > div > aside.sc-1xf18x6-0.sc-1un5qtt-4.haVRLx.hglVXv > div.sc-1xf18x6-0.sc-1un5qtt-0.haVRLx.grAjeD > div > div.sc-1xf18x6-0.dSeDBG > ul > li:nth-child(1) > button"
  );
  await page.$eval(
    "#__next > div > aside.sc-1xf18x6-0.sc-1un5qtt-4.haVRLx.hglVXv > div.sc-1xf18x6-0.sc-1un5qtt-0.haVRLx.grAjeD > div > div.sc-1xf18x6-0.dSeDBG > ul > li:nth-child(1) > button",
    (el) => el.click()
  );

  await metamask.approve();
  await page.bringToFront();

  // click back arrow
  await page.waitForSelector(
    "#__next > div > aside.sc-1xf18x6-0.sc-1un5qtt-4.haVRLx.hglVXv > div.sc-1xf18x6-0.sc-1twd32i-0.sc-jjxyhg-0.sc-1un5qtt-1.sc-u9i5k0-0.haVRLx.kKpYwv.gakOkv.leRSoS.jyplQN > span.sc-1xf18x6-0.sc-1w94ul3-0.sc-1un5qtt-2.bSLeTJ.kJaKrw.eOoBVd > div > button"
  );
  // await page.$eval('#__next > div > aside.sc-1xf18x6-0.sc-1un5qtt-4.haVRLx.hglVXv', el=>el.click())
  // await page.$eval('#__next > div > aside.sc-1xf18x6-0.sc-1un5qtt-4.haVRLx.hglVXv > div.sc-1xf18x6-0.sc-1twd32i-0.sc-jjxyhg-0.sc-1un5qtt-1.sc-u9i5k0-0.haVRLx.kKpYwv.gakOkv.leRSoS.jyplQN > span.sc-1xf18x6-0.sc-1w94ul3-0.sc-1un5qtt-2.bSLeTJ.kJaKrw.eOoBVd > button', el=>el.click())

  // Click Buy Now button - again
  await page.waitForSelector(
    "#main > div > div > div > div.fresnel-container.fresnel-lessThan-lg > div > div:nth-child(4) > div > section > div.TradeStation--main > div.sc-1xf18x6-0.eKefTS > div.sc-1xf18x6-0.sc-9jbsog-0.kmifVp.iyyTkb > button"
  );
  await page.$eval(
    "#main > div > div > div > div.fresnel-container.fresnel-lessThan-lg > div > div:nth-child(4) > div > section > div.TradeStation--main > div.sc-1xf18x6-0.eKefTS > div.sc-1xf18x6-0.sc-9jbsog-0.kmifVp.iyyTkb > button",
    (el) => el.click()
  );

  // check review box
  await page.waitForSelector("#review-confirmation");
  await page.$eval("#review-confirmation", (el) => el.click());

  // click checkout button
  await page.waitForSelector(
    "body > div:nth-child(23) > div > div > div > footer > div.sc-1xf18x6-0.sc-1twd32i-0.igBwEt.kKpYwv > div > button"
  );
  await page.$eval(
    "body > div:nth-child(23) > div > div > div > footer > div.sc-1xf18x6-0.sc-1twd32i-0.igBwEt.kKpYwv > div > button",
    (el) => el.click()
  );
  await page.waitForTimeout(4000);

  // log('title===>', await pages[2].title())
  const newPagePromise = new Promise((x) =>
    browser.once("targetcreated", (target) => x(target.page()))
  );
  const popup = await newPagePromise;
  // log('pop==>',  await newPage.title())

  // copy the function name
  const funcElement = await popup.waitForSelector(
    "#app-content > div > div.main-container-wrapper > div > div.confirm-page-container-content.confirm-page-container-content--with-top-border > div.confirm-page-container-summary > div.confirm-page-container-summary__action-row > div > span.confirm-page-container-summary__action__name"
  );
  await sleep(10000);
  const funcName = await funcElement.evaluate((el) => el.textContent);
  log("funcName==>", funcName);

  // close metamask popup
  await popup.close();

  // close the browser
  await browser.close();

  // await page.waitForTimeout(4000)

  // FOR SINGLE ENDS

  // wait for metamask dialog
  // await metamask.approve({allAccounts: false})

  // await page.bringToFront()
  // // await page.waitForTimeout(2000)
  // await page.waitForSelector('body > div:nth-child(36) > div > div > div > footer > button.sc-1xf18x6-0.sc-glfma3-0.jPlHEK.eqgvEc')
  // await page.$eval('body > div:nth-child(36) > div > div > div > footer > button.sc-1xf18x6-0.sc-glfma3-0.jPlHEK.eqgvEc', el=>el.click())

  // log(collectionSelector[0])
}

async function detectFunctionOnOpensea(address) {
  let browser;
  try {
    // Basic setup
    browser = await dappeteer.launch(puppeteer, {
      metamaskVersion: "v10.15.0",
      headless: false,
    });
    const metamask = await dappeteer.setupMetamask(browser, {
      seed: "state indicate cargo vast melody drill print ring beef wasp mushroom switch",
    });
    const page = await browser.newPage();

    // Force get a new page
    // works for pop and page creation
    async function forceGetNewPageWhenLoaded() {
      return new Promise((x) =>
        browser.on("targetcreated", async (target) => {
          if (target.type() === "page") {
            const newPage = await target?.page();
            console.log("target page", newPage);
            const newPagePromise = new Promise(() =>
              newPage?.once("domcontentloaded", () => x(newPage))
            );
            const isPageLoaded = await newPage?.evaluate(
              () => document.readyState
            );

            return isPageLoaded?.match("complete|interactive")
              ? x(newPage)
              : newPagePromise;
          }
        })
      );
    }

    // Goto opensea with the adddress
    //TODO:: replace the address with the one being passed
    await page.goto(address, {
      waitUntil: "networkidle2",
    });

    // Click Buy Now button
    await page.waitForSelector(
      "#main > div > div > div > div.fresnel-container.fresnel-lessThan-lg > div > div:nth-child(4) > div > section > div.TradeStation--main > div.sc-1xf18x6-0.eKefTS > div > div.sc-1xf18x6-0.sc-9jbsog-0.kmifVp.iyyTkb > button",
      { timeout: 8000 }
    );
    await page.$eval(
      "#main > div > div > div > div.fresnel-container.fresnel-lessThan-lg > div > div:nth-child(4) > div > section > div.TradeStation--main > div.sc-1xf18x6-0.eKefTS > div > div.sc-1xf18x6-0.sc-9jbsog-0.kmifVp.iyyTkb > button",
      (el) => el.click()
    );

    // connect to metamask
    await page.waitForSelector(
      "#__next > div > aside.sc-1xf18x6-0.sc-1un5qtt-4.haVRLx.hglVXv > div.sc-1xf18x6-0.sc-1un5qtt-0.haVRLx.grAjeD > div > div.sc-1xf18x6-0.dSeDBG > ul > li:nth-child(1) > button"
    );
    await page.$eval(
      "#__next > div > aside.sc-1xf18x6-0.sc-1un5qtt-4.haVRLx.hglVXv > div.sc-1xf18x6-0.sc-1un5qtt-0.haVRLx.grAjeD > div > div.sc-1xf18x6-0.dSeDBG > ul > li:nth-child(1) > button",
      (el) => el.click()
    );

    await metamask.approve();
    await page.bringToFront();

    // click back arrow
    await page.waitForSelector(
      "#__next > div > aside.sc-1xf18x6-0.sc-1un5qtt-4.haVRLx.hglVXv > div.sc-1xf18x6-0.sc-1twd32i-0.sc-jjxyhg-0.sc-1un5qtt-1.sc-u9i5k0-0.haVRLx.kKpYwv.gakOkv.leRSoS.jyplQN > span.sc-1xf18x6-0.sc-1w94ul3-0.sc-1un5qtt-2.bSLeTJ.kJaKrw.eOoBVd > div > button"
    );

    // Click Buy Now button - again
    await page.waitForSelector(
      "#main > div > div > div > div.fresnel-container.fresnel-lessThan-lg > div > div:nth-child(4) > div > section > div.TradeStation--main > div.sc-1xf18x6-0.eKefTS > div.sc-1xf18x6-0.sc-9jbsog-0.kmifVp.iyyTkb > button"
    );
    await page.$eval(
      "#main > div > div > div > div.fresnel-container.fresnel-lessThan-lg > div > div:nth-child(4) > div > section > div.TradeStation--main > div.sc-1xf18x6-0.eKefTS > div.sc-1xf18x6-0.sc-9jbsog-0.kmifVp.iyyTkb > button",
      (el) => el.click()
    );

    // check review box
    await page.waitForSelector("#review-confirmation");
    await page.$eval("#review-confirmation", (el) => el.click());

    const approvalButton = await page.$(
      "div > div.sc-1xf18x6-0.sc-1twd32i-0.kBKnaM.kKpYwv > div > button"
    );

    if (approvalButton) {
      page.click(approvalButton);
    } else {
      // click checkout button
      await page.waitForSelector(
        "footer > div.sc-1xf18x6-0.sc-1twd32i-0.igBwEt.kKpYwv > div > button"
      );
      await page.$eval(
        "footer > div.sc-1xf18x6-0.sc-1twd32i-0.igBwEt.kKpYwv > div > button",
        (el) => el.click()
      );
    }

    ("div > div.sc-1xf18x6-0.sc-1twd32i-0.kBKnaM.kKpYwv > div > button");

    // await page.waitForTimeout(4000);
    // await sleep(4000);

    // Handle last metamask popup
    const newPagePromise = forceGetNewPageWhenLoaded();
    let popup = await newPagePromise;

    // copy the function name
    const funcElement = await popup.waitForSelector(
      "div > span.confirm-page-container-summary__action__name"
    );
    await sleep(15000);
    const functionName = await funcElement.evaluate((el) => el.textContent);
    log("functionName==>", functionName);

    // close metamask popup
    await popup.close();

    // close the browser
    await browser.close();

    // return the function name found
    return {
      address,
      result: "Function Name found!",
      functionName,
    };
  } catch (err) {
    // close the browser
    await browser?.close();

    // return response
    return {
      address,
      result: "something went wrong, nothing found!",
    };
  }
}

async function detectFunction(addresses) {
  try {
    final = [];
    return new Promise(async (resolve, reject) => {
      if (addresses && !Array.isArray(addresses)) resolve();
      let counter = addresses.length;
      for (const address of addresses) {
        counter--;
        if (address.length) {
          // perfy.start('logger')

          const result = await detectFunctionOnOpensea(address);
          // const timer =  perfy.end('logger')
          // timeLogger('Individual', `Time took to analyze this contract: ${address}`,timer.startTime, timer.endTime, `${timer.time}s`)

          final.push(result);

          if (counter === 0) resolve(final);
        }
      }
    });
  } catch (err) {}
}

module.exports = { detectFunction };
