const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const async = require('express-async-error');
const url = require('url');
const https = require('https');
const express = require('express');
const app = express();

const api_key = "c86p26aad3idr2eootm0";

///////////////////////


function formatDate(d)
{
    date = new Date(d)
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();
    if(dd<10){dd='0'+dd}
    if(mm<10){mm='0'+mm};
    d = yyyy+'-'+mm+'-'+dd;
    return d.toString();
}


async function autoComplete(query) {
    var url = "https://finnhub.io/api/v1/search?q="+query+"&token="+api_key;
    let headers = {'Content-Type': 'application/json'};
    let suggestions = await fetch(url, {method: 'GET', headers: headers});
    let results = await suggestions.json();
    return results;
}

async function companyTab(ticker) {
    // CompaanyTag data

    //date for summary
    var toHourly = ((Date.now()/1000).toFixed()).toString();
    console.log(toHourly);
    var fromHourly = (((Date.now()-24*60*60*1000)/1000).toFixed()).toString();

    //date for news
    var toNews = formatDate(Date.now());
    var fromNews = formatDate((Date.now()- 7 * 24 * 60 * 60 * 1000));

    console.log(toNews);
    console.log(fromNews);

    //date for charts
    var toYearly = (Date.now()/1000).toString();
    var fromYearly = new Date();
    fromYearly.setMonth(fromYearly.getMonth() - 24);
    fromYearly.setHours(0, 0, 0, 0);
    fromYearly = (Date.parse(fromYearly)/1000).toString();

    console.log(fromYearly,toYearly,toHourly,fromHourly);



    let url_companyInfo = "https://finnhub.io/api/v1/stock/profile2?symbol="+ticker+"&token="+api_key;
    var url_stockSummary = "https://finnhub.io/api/v1/quote?symbol="+ticker+"&token="+api_key;
    var url_companyPeers = "https://finnhub.io/api/v1/stock/peers?symbol="+ticker+"&token="+api_key;
    var url_historicalData = "https://finnhub.io/api/v1/stock/candle?symbol="+ticker+"&resolution=D&from="+fromHourly+"&to="+toHourly+"&token="+api_key;
    var url_newsData = "https://finnhub.io/api/v1/company-news?symbol="+ticker+"&from="+fromNews+"&to="+toNews+"&token="+api_key;
    var url_charts = "https://finnhub.io/api/v1/stock/candle?symbol="+ticker+"&resolution=D&from="+fromHourly+"&to="+toHourly+"&token="+api_key;

    console.log(url_newsData);

    let headers = {'Content-Type': 'application/json'};
    let requestCompany = await fetch(url_companyInfo, {method: 'GET', headers: headers});
    let requestStock = await fetch(url_stockSummary, {method: 'GET', headers: headers});
    let requestPeers = await fetch(url_companyPeers, {method: 'GET', headers: headers});
    let requestHistorical = await fetch(url_historicalData, {method: 'GET', headers: headers});
    let requestNews = await fetch(url_newsData, {method: 'GET', headers: headers});


    let responseCompany = await requestCompany.json();
    let responseStock = await requestStock.json();
    let responsePeers = await requestPeers.json();
    let responseHistorical = await requestHistorical.json();
    //console.log(requestPeers,responsePeers);
    console.log("***********************");
    console.log(requestNews);
    let responseNews = await requestNews.json();

    return [responseCompany,responseStock,responsePeers,responseHistorical, responseNews];
    //return [0];
}

///////////////////////

app.get('/search/home/:query', async function (req, res) {
    console.log(`\nMeta Data Call: ${req.params.query.toUpperCase()}`);

    let suggestionResult = await autoComplete(req.params.query);
    let message = `${req.params.keyword} Search-utilities finished at ${Date()}\nLength of response: ${suggestionResult.length}`;
    console.log(message);
    return res.send(suggestionResult);
})


app.get('/search/:ticker', async function (req, res) {
    console.log(`\nMeta Data Call: ${req.params.ticker.toUpperCase()}`);

    let companyData = await companyTab(req.params.ticker);
    console.log(`${req.params.ticker.toUpperCase()} Meta Data finished at ${Date()}\n`);
    return res.send(companyData);

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`NodeJS Stock Server listening on port ${PORT}...`);
});
