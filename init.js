var url = require('url');
var request = require('request');
var compression = require('compression');
var express = require('express');
var httpProxy = require('http-proxy');
var path = require('path');
var http = require('http');
var https = require('https');
var bodyParser = require('body-parser');
var ping = require('ping');
let ejs = require('ejs');
var app = express();
var fs = require('fs');
var curl =  require('curl');
var config = require('./explorerConfig');
initWeb();

function initWeb() {
  app.set('view engine', 'ejs');
  app.use(express.static(__dirname + '/public'));
  app.get('/', function(req, res) {
    request({
            url: `${config.walletUrl}:${config.walletPort}/blocks/height`,
            method: "GET",
            json: true
        },
        function(error, response, body) {
            if (!error) {
              var lastHeight = body;
              curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight}`, function(err, response, data){
              //Heighest Block
              var lastGenerator = data.generator;
              var delegReward = data.blockRewards.perDelegatorReward;
              var sign = data.signature;
              var generators = data.blockRewards.generators.length;
              var deleg = data.blockRewards.delegators.length;
              var generatorReward = parseFloat(data.blockRewards.perGeneratorReward).toFixed(3);
              var genBalance = data.generatingBalance;
              var trans = data.transactions.length;
              var left1 = sign.substring(0, 30);
              var time = timeConverter(data.timestamp);
              sign = " [" + left1 + "...]";
              var html = buildHtml(time, trans, lastGenerator, genBalance, lastHeight, sign);
              //transactions html builder
              var transaction;
              for(var i = 0; i < data.transactions.length; i++) {
                var transTime = data.transactions[i].timestamp;
                var transAmount = parseFloat(data.transactions[i].amount).toFixed(2);
                var transReference = data.transactions[i].reference;
                transReference = transReference.substring(0, 30);
                var transSignature = data.transactions[i].signature;
                transSignature = transSignature.substring(0, 30);
                var transConfirmation = data.transactions[i].confirmations;
                transTime = timeConverter(transTime);
                var sender =  data.transactions[i].sender;
                var reci = data.transactions[i].recipient;
                transaction = buildHtmlTransaction(transTime, transAmount, transSignature, reci, sender, transConfirmation);
              }
              if(data.transactions.length == 0) {
                transaction = '<tr> <td> No Transaction on Block #' + lastHeight + '</td><td></td><td></td><td></td><td></td><td></td></tr>';
              }
              //Second Heigheist
              curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-1}`, function(err, response, data){
                //Heighest Block
                var lastGenerator2 = data.generator;
                var lastHeight2 = data.height;
                var delegReward2 = data.blockRewards.perDelegatorReward;
                var sign2 = data.signature;
                var generators2 = data.blockRewards.generators.length;
                var deleg2 = data.blockRewards.delegators.length;
                var generatorReward2 = data.blockRewards.perGeneratorReward;
                var genBalance2 = data.generatingBalance;
                var trans2 = data.transactions.length;
                var left2 = sign2.substring(0, 30);
                var time2 = timeConverter(data.timestamp);
                sign2 = " [" + left2 + "...]";
                var html2 = buildHtml(time2, trans2, lastGenerator2, genBalance2, lastHeight2, sign2);
              //3. Heigheist
                curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-2}`, function(err, response, data){
                  //Heighest Block
                  var lastGenerator3 = data.generator;
                  var lastHeight3 = data.height;
                  var delegReward3 = data.blockRewards.perDelegatorReward;
                  var sign3 = data.signature;
                  var generators3 = data.blockRewards.generators.length;
                  var deleg3 = data.blockRewards.delegators.length;
                  var generatorReward3 = data.blockRewards.perGeneratorReward;
                  var genBalance3 = data.generatingBalance;
                  var trans3 = data.transactions.length;
                  var left3 = sign3.substring(0, 30);
                  var time3 = timeConverter(data.timestamp);
                  sign3 = " [" + left3 + "...]";
                  var html3 = buildHtml(time3, trans3, lastGenerator3, genBalance3, lastHeight3, sign3);
              //4. Heigheist
                curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-3}`, function(err, response, data){
                  //Heighest Block
                  var lastGenerator4 = data.generator;
                  var lastHeight4 = data.height;
                  var delegReward4 = data.blockRewards.perDelegatorReward;
                  var sign4 = data.signature;
                  var generators4 = data.blockRewards.generators.length;
                  var deleg4 = data.blockRewards.delegators.length;
                  var generatorReward4 = data.blockRewards.perGeneratorReward;
                  var genBalance4 = data.generatingBalance;
                  var trans4 = data.transactions.length;
                  var left4 = sign4.substring(0, 30);
                  var time4 = timeConverter(data.timestamp);
                  sign4 = " [" + left4 + "...]";
                  var html4 = buildHtml(time4, trans4, lastGenerator4, genBalance4, lastHeight4, sign4);
              //5. Heigheist
                  curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-4}`, function(err, response, data){
                    var lastGenerator5 = data.generator;
                    var lastHeight5 = data.height;
                    var delegReward5 = data.blockRewards.perDelegatorReward;
                    var sign5 = data.signature;
                    var generators5 = data.blockRewards.generators.length;
                    var deleg5 = data.blockRewards.delegators.length;
                    var generatorReward5 = data.blockRewards.perGeneratorReward;
                    var genBalance5 = data.generatingBalance;
                    var trans5 = data.transactions.length;
                    var left5 = sign5.substring(0, 30);
                    var time5 = timeConverter(data.timestamp);
                    sign5 = " [" + left5 + "...]";
                    var html5 = buildHtml(time5, trans5, lastGenerator5, genBalance5, lastHeight5, sign5);
                    //6.Heigheist
                      curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-5}`, function(err, response, data){
                        var lastGenerator6 = data.generator;
                        var lastHeight6 = data.height;
                        var delegReward6 = data.blockRewards.perDelegatorReward;
                        var sign6 = data.signature;
                        var generators6 = data.blockRewards.generators.length;
                        var deleg6 = data.blockRewards.delegators.length;
                        var generatorReward6 = data.blockRewards.perGeneratorReward;
                        var genBalance6 = data.generatingBalance;
                        var trans6 = data.transactions.length;
                        var left6 = sign6.substring(0, 30);
                        var time6 = timeConverter(data.timestamp);
                        sign6 = " [" + left6 + "...]";
                        var html6 = buildHtml(time6, trans6, lastGenerator6, genBalance6, lastHeight6, sign6);
                    //7.Heigheist
                      curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-6}`, function(err, response, data){
                        var lastGenerator7 = data.generator;
                        var lastHeight7 = data.height;
                        var delegReward7 = data.blockRewards.perDelegatorReward;
                        var sign7 = data.signature;
                        var generators7 = data.blockRewards.generators.length;
                        var deleg7 = data.blockRewards.delegators.length;
                        var generatorReward7 = data.blockRewards.perGeneratorReward;
                        var genBalance7 = data.generatingBalance;
                        var trans7 = data.transactions.length;
                        var left7 = sign7.substring(0, 30);
                        var time7 = timeConverter(data.timestamp);
                        sign7 = " [" + left7 + "...]";
                        var html7 = buildHtml(time7, trans7, lastGenerator7, genBalance7, lastHeight7, sign7);
                    //7.Heigheist
                          curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-7}`, function(err, response, data){
                            var lastGenerator8 = data.generator;
                            var lastHeight8 = data.height;
                            var delegReward8 = data.blockRewards.perDelegatorReward;
                            var sign8 = data.signature;
                            var generators8 = data.blockRewards.generators.length;
                            var deleg8 = data.blockRewards.delegators.length;
                            var generatorReward8 = data.blockRewards.perGeneratorReward;
                            var genBalance8 = data.generatingBalance;
                            var trans8 = data.transactions.length;
                            var left8 = sign8.substring(0, 30);
                            var time8 = timeConverter(data.timestamp);
                            sign8 = " [" + left8 + "...]";
                            var html8 = buildHtml(time8, trans8, lastGenerator8, genBalance8, lastHeight8, sign8);
                            curl.getJSON(`${config.walletUrl}:${config.walletPort}/supernodes`, function(err, response, data){
                            var gathers = data[0].delegations;
                    //8. Heigheist
                    //9. Heigheist
                    //10. Heigheist
              //var geners = data.blockRewards.generators;
                res.render('index', {
                  block: lastHeight,
                  gathers : gathers,
                  calc: lastGenerator,
                  delegR: config.gatherReward,
                  gen: generatorReward,
                  perGen: generatorReward,
                  block2: lastHeight2,
                  calc2: lastGenerator2,
                  deleg2: delegReward2,
                  gen2: generatorReward2,
                  perGen2: generatorReward2,
                  gens:generators,
                  gens2:generators2,
                  block3: lastHeight3,
                  calc3: lastGenerator3,
                  deleg3: delegReward3,
                  gen3: generatorReward3,
                  perGen3: generatorReward3,
                  gens3:generators3,
                  block4: lastHeight4,
                  calc4: lastGenerator4,
                  deleg4: delegReward4,
                  gen4: generatorReward4,
                  perGen4: generatorReward4,
                  gens4:generators4,
                  block5: lastHeight5,
                  calc5: lastGenerator5,
                  deleg5: delegReward5,
                  gen5: generatorReward5,
                  perGen5: generatorReward5,
                  gens5:generators5,
                  block6: lastHeight6,
                  calc6: lastGenerator6,
                  deleg6: delegReward6,
                  gen6: generatorReward6,
                  perGen6: generatorReward6,
                  gens6:generators6,
                  block7: lastHeight7,
                  calc7: lastGenerator7,
                  deleg7: delegReward7,
                  gen7: generatorReward7,
                  perGen7: generatorReward7,
                  gens7:generators7,
                  block8: lastHeight8,
                  calc8: lastGenerator8,
                  deleg8: delegReward8,
                  gen8: generatorReward8,
                  perGen8: generatorReward8,
                  gens8:generators8,
                  html1: html,
                  html2: html2,
                  html3: html3,
                  html4: html4,
                  html5: html5,
                  html6: html6,
                  html7: html7,
                  html8: html8,
                  deleg: deleg,
                  deleg2: deleg2,
                  deleg3: deleg3,
                  deleg4: deleg4,
                  deleg5: deleg5,
                  deleg6: deleg6,
                  deleg7: deleg7,
                  deleg8: deleg8,
                  transaction: transaction,
                    });
                });
                });
                });
                });
              });
              });
              });
              });
                  });
                }
              }
            )
          }
        );

function buildHtml(time, tran, calc, gen, block, sign) {
var html =  `
  <tr>
    <td>
    <span class="info-box-text"><a id='sign' href='block?height=${block}'>#${block}</a> </span>
    </td><td>
    <span class="info-box-text">${time} </span></td><td>
    <span class="info-box-text">${tran} </span></td><td>
    <span class="info-box-number"> <a href="/account?id=${calc}" id='sign'> ${calc} </a> </span></td><td>
    ${gen}</td>

  </tr>
  `
  return html;
}
function buildHtmlTransaction(time, tran, sign, calc, gen, block) {
var html =  `
  <tr>
    <td>
    <span class="info-box-text">${time}</span>
    </td>
    <td>
    <span class="info-box-text">${tran}</span>
    </td>
    <td>
      <span class="info-box-number"> <a href="/transaction?id=${sign}" id='sign'> ${sign}.. </a> </span>
    </td>
    <td>
      <span class="info-box-number"> <a href="/account?id=${calc}" id='sign'> ${calc} </a> </span>
    </td>
    <td>
      <span class="info-box-number"> <a href="/account?id=${gen}" id='sign'> ${gen} </a> </span>
    </td>
    <td>
    <span class="info-box-text">${block}</span>
    </td>

  </tr>
  `
  return html;
}

  app.get('/findTransaction', function(req, res) {
    var signature = req.query.sign;
    if(!signature || signature == null || typeof signature === 'undefined') {
      res.render('blockError', {
      })
    } else {
    curl.getJSON(`${config.walletUrl}:${config.walletPort}/transactions/signature/${signature}`, function(err, response, data){
      var signature = data.signature;
      var fee = data.fee;
      var reci = data.recipient;
      var type = data.type;
      var confirmation = data.confirmations;
      var time = data.timestamp;
      var amount = data.amount;
      time = timeConverter(time);

    res.render('transaction', {
      signature: signature,
      fee: fee,
      reci: reci,
      confirmation: confirmation,
      time: time,
      amount: amount,
    });
  });
  }
  });
/*
  app.get('/peers', function(req, res) {
    curl.getJSON(`${config.walletUrl}:${config.walletPort}/peers/`, function(err, response, data){
    for(var i = 0; i < data.length; i++) {
    var html = html + buildHtmlPeer(data[i]);
    }
      res.render('peers', {
        htmlPeer: html
        });
      });
  });
*/
  app.get('/block', function(req, res) {
    var height = req.query.height;
    var isNumber = onlyDigits(height);
    if(!height || !isNumber || height == null || typeof height === 'undefined' || req.query.height === undefined) {
      res.render('blockError', {
      });
    } else {
    curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${height}`, function(err, response, data){
      var blockSign = data.signature;
      var blockDelegator =  data.delegator;
      var blockFee = data.fee;
      var blockGenerator = data.generator;
      var blockGenReward = data.blockRewards.perGeneratorReward;
      var blockGatReward = data.blockRewards.perDelegatorReward;
      var blockDelegNumber = data.blockRewards.delegators;
      var blockGenNumber = data.blockRewards.generators;
      var time = data.timestamp;
      time =  timeConverter(time);
      res.render('block', {
        height: height,
        blockSign: blockSign,
        blockFee: blockFee,
        blockGenerator: blockGenerator,
        blockGenReward: blockGenReward,
        blockGatReward: blockGatReward,
        blockDelegNumber: blockDelegNumber,
        blockDelegator: blockDelegator,
        blockGenNumber: blockGenNumber,
        time: time,
        });
      });
    }
  });

  function buildHtmlPeer(data) {
  var status = isAlive(data);
  var html =  `
    <tr>
      <td>
      <span class="info-box-text">  <img src="pic/logo.png"  alt=""> connected </span>
      </td>
      <td>
      <span class="info-box-text">  ${data} </span>
      </td>

    </tr>
    `
    return html;
  }
  function buildHtmlAccount(data) {
  var html =  `
    <tr>
      <td>
      <span class="info-box-text">  <img src="pic/logo.png"  alt=""> connected </span>
      </td>
      <td>
      <span class="info-box-text">  ${data} </span>
      </td>

    </tr>
    `
    return html;
  }
  function buildHtmlAccountTrans(timestamp, amount, reference, signature, conf, fullsign ) {
  var html =  `
    <tr>
      <td>
      <span class="info-box-text">  ${reference} </span>
      </td>
      <td>
      <span class="info-box-text">  ${timestamp} </span>
      </td>
      <td>
      <span class="info-box-text">  ${amount} </span>
      </td>
      <td>
      <span class="info-box-text">  <a href='/findTransaction?sign=${fullsign}'>${signature}</a> </span>
      </td>
      <td>
      <span class="info-box-text">  ${conf} </span>
      </td>
    </tr>
    `
    return html;
  }
  app.get('/account', function(req, res) {
    request({
            url: `${config.walletUrl}:${config.walletPort}/names/${req.query.id}`,
            method: "GET",
            json: true
        },
        function(error, response, body) {
            var nameAddress = body.owner;
            curl.getJSON(`${config.walletUrl}:${config.walletPort}/addresses/validate/${nameAddress}`, function(err, response, data){
            //Check if Account is validated
            var validate = body;
            var account = String(req.query.id);
            var addressSplitter = body.owner;
            //Check if searched by name or address
            if(account.length < 30) {
              account = body.owner;
            } else {
              account = req.query.id;
              addressSplitter = req.query.id;
            }
            var str = String(account);
            var index = str.indexOf(' '); // 4
            if(index !== -1 || !account || !validate || account == null || typeof account === 'undefined') {
              res.render('error', {
              });
            } else {
              //TODO
              //Change later to Public Key
            var publicKey = req.query.id;
                curl.getJSON(`${config.walletUrl}:${config.walletPort}/transactions/address/${account}`, function(err, response, data){
                  var html;
                  var transNumber = data.length;
                  for(var i = data.length - 1; i > 0; i--) {
                    var time = timeConverter(data[i].timestamp);
                    var amount = typeof data[i].amount === 'undefined' ? amount = '0.00' : amount = parseFloat(data[i].amount).toFixed(2);
                    var reference = data[i].reference === '' ? '-' : '[' + data[i].reference.substring(0, 30) + '..]';
                    var action = 'Genesis';
                    var reci = data[i].reference === '' ? '-' : '[' + data[i].reference.substring(0, 30) + '..]';
                    switch(data[i].type) {
                      case 20:
                      action = 'AirDrop';
                      break;
                      case 19:
                      action = 'Become Supernode';
                      break;
                      case 1:
                      action = 'Genesis';
                      break;
                      case 3:
                      action = 'Registration';
                      break;
                      default:
                      break;
}
                    var signature = data[i].signature.substring(0, 60) + '..';
                    var fullSignature = data[i].signature;
                    var conf = data[i].confirmations;
                    if(amount)
                  html = html + buildHtmlAccountTrans(time, amount, action, signature, conf, fullSignature);
                  }
                curl.getJSON(`${config.walletUrl}:${config.walletPort}/addresses/balance/${account}`, function(err, response, data){
                  var currBalance = response.body;
                curl.getJSON(`${config.walletUrl}:${config.walletPort}/addresses/assetbalance/2/${account}`, function(err, response, data){
                  var vested = parseInt(response.body).toFixed(2);
                  var logo;
                  var logo3;
                  var logo4;
                  var logo5;
                  var logo6;
                curl.getJSON(`${config.walletUrl}:${config.walletPort}/addresses/generatingbalance/${account}`, function(err, response, data){
                  var genBalance = response.body;

                    curl.getJSON(`${config.walletUrl}:${config.walletPort}/names/address/${account}`, function(err, response, data){
                      var name = '-';
                      if(data.length > 0) {
                        name = data[0];
                      }
                      if(vested >= 50000) {
                        logo = 'pic/toys.png'
                      } else {
                        logo = 'pic/toys2.png'
                      }
                      if(name != '-') {
                        logo2 = 'pic/pencil.png'
                      } else {
                        logo2 = 'pic/pencil2.png'
                      }
                      if(transNumber == 0) {
                          logo3 = 'pic/trans1Grey.png'
                      } else {
                          logo3 = 'pic/trans1.png'
                      }
                      if(transNumber >= 10) {
                        logo4 = 'pic/trans2.png'
                      } else{
                        logo4 = 'pic/trans2Grey.png'
                      }
                       if(transNumber >= 20) {
                        logo5 = 'pic/trans3.png'
                       } else {
                        logo5 =  'pic/trans3Grey.png'
                       }
                       if(transNumber >= 30) {
                         logo6 = 'pic/trans4.png'
                       } else {
                        logo6 =  'pic/trans4Grey.png'
                       }
                    res.render('accounts', {
                      address: publicKey,
                      name: name,
                      html: html,
                      genBalance: genBalance,
                      currBalance: currBalance,
                      vested: vested,
                      addressSplitter: addressSplitter,
                      logo: logo,
                      logo2: logo2,
                      logo3: logo3,
                      logo4: logo4,
                      logo5: logo5,
                      logo6: logo6,
                    });
                  });
                  });
                  });
                  });
                  });
                }
  });
    });
        });

  app.get('/blocks', function(req, res) {
    request({
            url: `${config.walletUrl}:${config.walletPort}/blocks/height`,
            method: "GET",
            json: true
        },
        function(error, response, body) {
            if (!error) {
              //Reduce the lastHeight with searched parameter
              var height = req.query.height;
              if(height == null || typeof height === 'undefined') {
                height = 0;
              }
              var RightStaticHeight = body;
              var lastHeight = body;
              if(lastHeight - height < 22) {
                lastHeight = 22;
              } else {
                        lastHeight = lastHeight - height;
              }
              var later = height - 20;
              if(later >= height) {
                later = height;
              } else if(later <= 0) {
                later = 0;
              }
              var previous = later + 40;
              if(previous >= body) {
                previous = body;
              }
              curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight}`, function(err, response, data){
              //Heighest Block
              var lastGenerator = data.generator;
              var delegReward = data.blockRewards.perDelegatorReward;
              var sign = data.signature;
              var generators = data.blockRewards.generators.length;
              var deleg = data.blockRewards.delegators.length;
              var generatorReward = data.blockRewards.perGeneratorReward;
              var genBalance = data.generatingBalance;
              var trans = data.transactions.length;
              var left1 = sign.substring(0, 30);
              var time = timeConverter(data.timestamp);
              sign = " [" + left1 + "...]";
              var html = buildHtml(time, trans, lastGenerator, genBalance, lastHeight, sign);
              //Second Heigheist
              curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-1}`, function(err, response, data){
                //Heighest Block
                var lastGenerator2 = data.generator;
                var lastHeight2 = data.height;
                var delegReward2 = data.blockRewards.perDelegatorReward;
                var sign2 = data.signature;
                var generators2 = data.blockRewards.generators.length;
                var deleg2 = data.blockRewards.delegators.length;
                var generatorReward2 = data.blockRewards.perGeneratorReward;
                var genBalance2 = data.generatingBalance;
                var trans2 = data.transactions.length;
                var left2 = sign2.substring(0, 30);
                var time2 = timeConverter(data.timestamp);
                sign2 = " [" + left2 + "...]";
                var html2 = buildHtml(time2, trans2, lastGenerator2, genBalance2, lastHeight2, sign2);
              //3. Heigheist
                curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-2}`, function(err, response, data){
                  //Heighest Block
                  var lastGenerator3 = data.generator;
                  var lastHeight3 = data.height;
                  var delegReward3 = data.blockRewards.perDelegatorReward;
                  var sign3 = data.signature;
                  var generators3 = data.blockRewards.generators.length;
                  var deleg3 = data.blockRewards.delegators.length;
                  var generatorReward3 = data.blockRewards.perGeneratorReward;
                  var genBalance3 = data.generatingBalance;
                  var trans3 = data.transactions.length;
                  var left3 = sign3.substring(0, 30);
                  var time3 = timeConverter(data.timestamp);
                  sign3 = " [" + left3 + "...]";
                  var html3 = buildHtml(time3, trans3, lastGenerator3, genBalance3, lastHeight3, sign3);
              //4. Heigheist
                curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-3}`, function(err, response, data){
                  //Heighest Block
                  var lastGenerator4 = data.generator;
                  var lastHeight4 = data.height;
                  var delegReward4 = data.blockRewards.perDelegatorReward;
                  var sign4 = data.signature;
                  var generators4 = data.blockRewards.generators.length;
                  var deleg4 = data.blockRewards.delegators.length;
                  var generatorReward4 = data.blockRewards.perGeneratorReward;
                  var genBalance4 = data.generatingBalance;
                  var trans4 = data.transactions.length;
                  var left4 = sign4.substring(0, 30);
                  var time4 = timeConverter(data.timestamp);
                  sign4 = " [" + left4 + "...]";
                  var html4 = buildHtml(time4, trans4, lastGenerator4, genBalance4, lastHeight4, sign4);
              //5. Heigheist
                  curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-4}`, function(err, response, data){
                    var lastGenerator5 = data.generator;
                    var lastHeight5 = data.height;
                    var delegReward5 = data.blockRewards.perDelegatorReward;
                    var sign5 = data.signature;
                    var generators5 = data.blockRewards.generators.length;
                    var deleg5 = data.blockRewards.delegators.length;
                    var generatorReward5 = data.blockRewards.perGeneratorReward;
                    var genBalance5 = data.generatingBalance;
                    var trans5 = data.transactions.length;
                    var left5 = sign5.substring(0, 30);
                    var time5 = timeConverter(data.timestamp);
                    sign5 = " [" + left5 + "...]";
                    var html5 = buildHtml(time5, trans5, lastGenerator5, genBalance5, lastHeight5, sign5);
                    //6.Heigheist
                      curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-5}`, function(err, response, data){
                        var lastGenerator6 = data.generator;
                        var lastHeight6 = data.height;
                        var delegReward6 = data.blockRewards.perDelegatorReward;
                        var sign6 = data.signature;
                        var generators6 = data.blockRewards.generators.length;
                        var deleg6 = data.blockRewards.delegators.length;
                        var generatorReward6 = data.blockRewards.perGeneratorReward;
                        var genBalance6 = data.generatingBalance;
                        var trans6 = data.transactions.length;
                        var left6 = sign6.substring(0, 30);
                        var time6 = timeConverter(data.timestamp);
                        sign6 = " [" + left6 + "...]";
                        var html6 = buildHtml(time6, trans6, lastGenerator6, genBalance6, lastHeight6, sign6);
                    //7.Heigheist
                      curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-6}`, function(err, response, data){
                        var lastGenerator7 = data.generator;
                        var lastHeight7 = data.height;
                        var delegReward7 = data.blockRewards.perDelegatorReward;
                        var sign7 = data.signature;
                        var generators7 = data.blockRewards.generators.length;
                        var deleg7 = data.blockRewards.delegators.length;
                        var generatorReward7 = data.blockRewards.perGeneratorReward;
                        var genBalance7 = data.generatingBalance;
                        var trans7 = data.transactions.length;
                        var left7 = sign7.substring(0, 30);
                        var time7 = timeConverter(data.timestamp);
                        sign7 = " [" + left7 + "...]";
                        var html7 = buildHtml(time7, trans7, lastGenerator7, genBalance7, lastHeight7, sign7);
                    //7.Heigheist
                          curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-7}`, function(err, response, data){
                            var lastGenerator8 = data.generator;
                            var lastHeight8 = data.height;
                            var delegReward8 = data.blockRewards.perDelegatorReward;
                            var sign8 = data.signature;
                            var generators8 = data.blockRewards.generators.length;
                            var deleg8 = data.blockRewards.delegators.length;
                            var generatorReward8 = data.blockRewards.perGeneratorReward;
                            var genBalance8 = data.generatingBalance;
                            var trans8 = data.transactions.length;
                            var left8 = sign8.substring(0, 30);
                            var time8 = timeConverter(data.timestamp);
                            sign8 = " [" + left8 + "...]";
                            var html8 = buildHtml(time8, trans8, lastGenerator8, genBalance8, lastHeight8, sign8);
                            curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-8}`, function(err, response, data){
                              var lastGenerator9 = data.generator;
                              var lastHeight9 = data.height;
                              var delegReward9 = data.blockRewards.perDelegatorReward;
                              var sign9 = data.signature;
                              var generators9 = data.blockRewards.generators.length;
                              var deleg9 = data.blockRewards.delegators.length;
                              var generatorReward9 = data.blockRewards.perGeneratorReward;
                              var genBalance9 = data.generatingBalance;
                              var trans9 = data.transactions.length;
                              var left9 = sign8.substring(0, 30);
                              var time9 = timeConverter(data.timestamp);
                              sign9 = " [" + left9 + "...]";
                              var html9 = buildHtml(time9, trans9, lastGenerator9, genBalance9, lastHeight9, sign9);
                              curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-9}`, function(err, response, data){
                                var lastGenerator10 = data.generator;
                                var lastHeight10 = data.height;
                                var delegReward10 = data.blockRewards.perDelegatorReward;
                                var sign10 = data.signature;
                                var generators10 = data.blockRewards.generators.length;
                                var deleg10 = data.blockRewards.delegators.length;
                                var generatorReward10 = data.blockRewards.perGeneratorReward;
                                var genBalance10 = data.generatingBalance;
                                var trans10 = data.transactions.length;
                                var left10 = sign8.substring(0, 30);
                                var time10 = timeConverter(data.timestamp);
                                sign10 = " [" + left10 + "...]";
                                var html10 = buildHtml(time10, trans10, lastGenerator10, genBalance10, lastHeight10, sign10);
                                curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-10}`, function(err, response, data){
                                  var lastGenerator11 = data.generator;
                                  var lastHeight11 = data.height;
                                  var delegReward11 = data.blockRewards.perDelegatorReward;
                                  var sign11 = data.signature;
                                  var generators11 = data.blockRewards.generators.length;
                                  var deleg11 = data.blockRewards.delegators.length;
                                  var generatorReward11 = data.blockRewards.perGeneratorReward;
                                  var genBalance11 = data.generatingBalance;
                                  var trans11 = data.transactions.length;
                                  var left11 = sign8.substring(0, 30);
                                  var time11 = timeConverter(data.timestamp);
                                  sign11 = " [" + left11 + "...]";
                                  var html11 = buildHtml(time11, trans11, lastGenerator11, genBalance11, lastHeight11, sign11);
                                  curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-11}`, function(err, response, data){
                                    var lastGenerator12 = data.generator;
                                    var lastHeight12 = data.height;
                                    var delegReward12 = data.blockRewards.perDelegatorReward;
                                    var sign12 = data.signature;
                                    var generators12 = data.blockRewards.generators.length;
                                    var deleg12 = data.blockRewards.delegators.length;
                                    var generatorReward12 = data.blockRewards.perGeneratorReward;
                                    var genBalance12 = data.generatingBalance;
                                    var trans12 = data.transactions.length;
                                    var left12 = sign8.substring(0, 30);
                                    var time12 = timeConverter(data.timestamp);
                                    sign12 = " [" + left12 + "...]";
                                    var html12 = buildHtml(time12, trans12, lastGenerator12, genBalance12, lastHeight12, sign12);
                                    curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-12}`, function(err, response, data){
                                      var lastGenerator13 = data.generator;
                                      var lastHeight13 = data.height;
                                      var delegReward13 = data.blockRewards.perDelegatorReward;
                                      var sign13 = data.signature;
                                      var generators13 = data.blockRewards.generators.length;
                                      var deleg13 = data.blockRewards.delegators.length;
                                      var generatorReward13 = data.blockRewards.perGeneratorReward;
                                      var genBalance13 = data.generatingBalance;
                                      var trans13 = data.transactions.length;
                                      var left13 = sign8.substring(0, 30);
                                      var time13 = timeConverter(data.timestamp);
                                      sign13 = " [" + left13 + "...]";
                                      var html13 = buildHtml(time13, trans13, lastGenerator13, genBalance13, lastHeight13, sign13);
                                      curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-13}`, function(err, response, data){
                                        var lastGenerator14 = data.generator;
                                        var lastHeight14 = data.height;
                                        var delegReward14 = data.blockRewards.perDelegatorReward;
                                        var sign14 = data.signature;
                                        var generators14 = data.blockRewards.generators.length;
                                        var deleg14 = data.blockRewards.delegators.length;
                                        var generatorReward14 = data.blockRewards.perGeneratorReward;
                                        var genBalance14 = data.generatingBalance;
                                        var trans14 = data.transactions.length;
                                        var left14 = sign8.substring(0, 30);
                                        var time14 = timeConverter(data.timestamp);
                                        sign14 = " [" + left14 + "...]";
                                        var html14 = buildHtml(time14, trans14, lastGenerator14, genBalance14, lastHeight14, sign14);
                                        curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-14}`, function(err, response, data){
                                          var lastGenerator15 = data.generator;
                                          var lastHeight15 = data.height;
                                          var delegReward15 = data.blockRewards.perDelegatorReward;
                                          var sign15 = data.signature;
                                          var generators15 = data.blockRewards.generators.length;
                                          var deleg15 = data.blockRewards.delegators.length;
                                          var generatorReward15 = data.blockRewards.perGeneratorReward;
                                          var genBalance15 = data.generatingBalance;
                                          var trans15 = data.transactions.length;
                                          var left15 = sign8.substring(0, 30);
                                          var time15 = timeConverter(data.timestamp);
                                          sign15 = " [" + left15 + "...]";
                                          var html15 = buildHtml(time15, trans15, lastGenerator15, genBalance15, lastHeight15, sign15);
                                          curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-15}`, function(err, response, data){
                                            var lastGenerator16 = data.generator;
                                            var lastHeight16 = data.height;
                                            var delegReward16 = data.blockRewards.perDelegatorReward;
                                            var sign16 = data.signature;
                                            var generators16 = data.blockRewards.generators.length;
                                            var deleg16 = data.blockRewards.delegators.length;
                                            var generatorReward16 = data.blockRewards.perGeneratorReward;
                                            var genBalance16 = data.generatingBalance;
                                            var trans16 = data.transactions.length;
                                            var left16 = sign8.substring(0, 30);
                                            var time16 = timeConverter(data.timestamp);
                                            sign16 = " [" + left16 + "...]";
                                            var html16 = buildHtml(time16, trans16, lastGenerator16, genBalance16, lastHeight16, sign16);
                                            curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-16}`, function(err, response, data){
                                              var lastGenerator17 = data.generator;
                                              var lastHeight17 = data.height;
                                              var delegReward17 = data.blockRewards.perDelegatorReward;
                                              var sign17 = data.signature;
                                              var generators17 = data.blockRewards.generators.length;
                                              var deleg17 = data.blockRewards.delegators.length;
                                              var generatorReward17 = data.blockRewards.perGeneratorReward;
                                              var genBalance17 = data.generatingBalance;
                                              var trans17 = data.transactions.length;
                                              var left17 = sign8.substring(0, 30);
                                              var time17 = timeConverter(data.timestamp);
                                              sign17 = " [" + left17 + "...]";
                                              var html17 = buildHtml(time17, trans17, lastGenerator17, genBalance17, lastHeight17, sign17);
                                              curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-17}`, function(err, response, data){
                                                var lastGenerator18 = data.generator;
                                                var lastHeight18 = data.height;
                                                var delegReward18 = data.blockRewards.perDelegatorReward;
                                                var sign18 = data.signature;
                                                var generators18 = data.blockRewards.generators.length;
                                                var deleg18 = data.blockRewards.delegators.length;
                                                var generatorReward18 = data.blockRewards.perGeneratorReward;
                                                var genBalance18 = data.generatingBalance;
                                                var trans18 = data.transactions.length;
                                                var left18 = sign8.substring(0, 30);
                                                var time18 = timeConverter(data.timestamp);
                                                sign18 = " [" + left18 + "...]";
                                                var html18 = buildHtml(time18, trans18, lastGenerator18, genBalance18, lastHeight18, sign18);
                                                curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-18}`, function(err, response, data){
                                                  var lastGenerator19 = data.generator;
                                                  var lastHeight19 = data.height;
                                                  var delegReward19 = data.blockRewards.perDelegatorReward;
                                                  var sign19 = data.signature;
                                                  var generators19 = data.blockRewards.generators.length;
                                                  var deleg19 = data.blockRewards.delegators.length;
                                                  var generatorReward19 = data.blockRewards.perGeneratorReward;
                                                  var genBalance19 = data.generatingBalance;
                                                  var trans19 = data.transactions.length;
                                                  var left19 = sign8.substring(0, 30);
                                                  var time19 = timeConverter(data.timestamp);
                                                  sign19 = " [" + left19 + "...]";
                                                  var html19 = buildHtml(time19, trans19, lastGenerator19, genBalance19, lastHeight19, sign19);
                                                  curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-19}`, function(err, response, data){
                                                    var lastGenerator20 = data.generator;
                                                    var lastHeight20 = data.height;
                                                    var delegReward20 = data.blockRewards.perDelegatorReward;
                                                    var sign20 = data.signature;
                                                    var generators20 = data.blockRewards.generators.length;
                                                    var deleg20 = data.blockRewards.delegators.length;
                                                    var generatorReward20 = data.blockRewards.perGeneratorReward;
                                                    var genBalance20 = data.generatingBalance;
                                                    var trans20 = data.transactions.length;
                                                    var left20 = sign8.substring(0, 30);
                                                    var time20 = timeConverter(data.timestamp);
                                                    sign20 = " [" + left20 + "...]";
                                                    var html20 = buildHtml(time20, trans20, lastGenerator20, genBalance20, lastHeight20, sign20);
                                                    curl.getJSON(`${config.walletUrl}:${config.walletPort}/blocks/byheight/${lastHeight-20}`, function(err, response, data){
                                                      var lastGenerator21 = data.generator;
                                                      var lastHeight21 = data.height;
                                                      var delegReward21 = data.blockRewards.perDelegatorReward;
                                                      var sign21 = data.signature;
                                                      var generators21 = data.blockRewards.generators.length;
                                                      var deleg21 = data.blockRewards.delegators.length;
                                                      var generatorReward21 = data.blockRewards.perGeneratorReward;
                                                      var genBalance21 = data.generatingBalance;
                                                      var trans21 = data.transactions.length;
                                                      var left21 = sign8.substring(0, 30);
                                                      var time21 = timeConverter(data.timestamp);
                                                      sign21 = " [" + left21 + "...]";
                                                      var html21 = buildHtml(time21, trans21, lastGenerator21, genBalance21, lastHeight21, sign21);
                    //8. Heigheist
                    //9. Heigheist
                    //10. Heigheist
              //var geners = data.blockRewards.generators;
                res.render('blocks', {
                  html1: html,
                  html2: html2,
                  html3: html3,
                  html4: html4,
                  html5: html5,
                  html6: html6,
                  html7: html7,
                  html8: html8,
                  html9: html9,
                  html10: html10,
                  html11: html11,
                  html12: html12,
                  html13: html13,
                  html14: html14,
                  html15: html15,
                  html16: html16,
                  html17: html17,
                  html18: html18,
                  html19: html19,
                  html20: html20,
                  html21: html21,
                  later: later,
                  previous: previous,
                  RightStaticHeight: RightStaticHeight,
                });
                });
                });
                });
                });
                });
                });
                });
                });
                });
                });
                });
                });
                });
                });
                });
                });
                });
                });
                });
                });
                });
                }
              }
    );

  });

  if(config.sslEnable) {
  var options = {
  key: fs.readFileSync(config.key),
  cert: fs.readFileSync(config.cert)
  };
  https.createServer(options, app).listen(443);
  console.log('http server running on port ' + 443);
} else {
  app.listen(config.httpPort, function() {
      console.log('http server running on port ' + config.httpPort);
  });
}
}
function onlyDigits(s) {
for (let i = s.length - 1; i >= 0; i--) {
  const d = s.charCodeAt(i);
  if (d < 48 || d > 57) return false
}
return true
}
  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
function isAlive(ip) {
  var hosts = [ip];
  var status = false;
  hosts.forEach(function(host){
    ping.sys.probe(host, function(isAlive){
        var msg = isAlive ? status = host + " " + "alive" : status = host + " " + "not reachable";
        //console.log("Status: " + msg);
        if(config.peersLog == true) {
            writeFile(new Date() + " " + msg + "\r\n");
        }
    });
});
return status;
}
function writeFile (text) {
  fs.appendFile('log.txt', text, function (err) {
  if (err) {
    // append failed
  } else {
    // done
  }
})
}
