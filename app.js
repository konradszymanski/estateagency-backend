"use strict";
const express = require("express");
const path = require("path")
const app = express();
const PORT = 3001;


const cors = require("cors")  //Allows 'Cross Origin Resource Sharing (requests from other domains)'
app.use(cors())

let houses = []
houses.push({ 
  id: 1, price: 27500, 
  area: "Handsworth", 
  type: "Flat", 
  image: `https://media.rightmove.co.uk/dir/crop/10:9-16:9/108k/107051/78903606/107051_RS0730_IMG_11_0000_max_476x317.jpeg` })

houses.push({ 
  id: 2, 
  price: 1450000, 
  area: "Harbourne", 
  type: "House", 
  image: `https://media.rightmove.co.uk/dir/crop/10:9-16:9/93k/92029/104484854/92029_581009_IMG_00_0000_max_476x317.jpeg` })

houses.push({ 
  id: 3, 
  price: 165000, 
  area: "Edgbaston", 
  type: "Maisonette", 
  image: `https://media.rightmove.co.uk/dir/crop/10:9-16:9/73k/72455/97846952/72455_107VC_IMG_00_0000_max_476x317.jpg` })

houses.push({ 
    id: 4, price: 67500, 
    area: "Handsworth", 
    type: "Maisonette", 
    image: `https://lid.zoocdn.com/u/1024/768/1c4272472803ce4f74f88329429f2cbc45ced5d6.jpg:p` })
  
houses.push({ 
    id: 5, 
    price: 2450000, 
    area: "Harbourne", 
    type: "House", 
    image: `https://lid.zoocdn.com/u/1024/768/2a76caf94af839747ab44e3df46445dafc3dab2d.jpg:p` })
  
houses.push({ 
    id: 6, 
    price: 265000, 
    area: "Edgbaston", 
    type: "House", 
    image: `https://lid.zoocdn.com/u/1024/768/51253f1f97463cfedeaf931686ab73fa10cfd6f5.jpg:p` })
//var bodyParser = require('body-parser')

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '')));

app.use(express.json());  //'modern way' - (replaces 'bodyParser')
//sendSMS(req.body.msg, req.body.tel)

app.get("/houses", (req, res) => {
  res.type('application/json')
  res.send(JSON.stringify(houses));
});

//${req.body.msg} 
app.post("/sms", (req, res) => {
  let agentMessage = `The customer ${req.body.name}, booked viewing at ${req.body.time},  ${req.body.date}. The cusotmer email is: ${req.body.email}, and contact number is: ${req.body.tel}. Customer notes: ${req.body.msg}`

  let customerMsg = `Hello ${req.body.name}. The booking is requested on ${req.body.time} ${req.body.date}, the cusotmer email is: ${req.body.email}, and contact number ${req.body.tel}. Customer notes: ${req.body.msg}`

  

  sendSMS(agentMessage, 447459826419)

  sendSMS(customerMsg, req.body.tel)


  res.type('application/json')
  res.send(JSON.stringify("OK"));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

function sendSMS(msg, phoneNumber) {
  // Prerequisite: install the request package e.g. npm install request
  console.log(msg)

  const request = require('request');
  const apiKey = 'sgU1EBOeN88gQEiZr10vFTuVugiJww';
  const sendApiMessage = function (endpoint, messageArgs, callback) {
    return request.post(
      'https://www.firetext.co.uk/api/' + endpoint,
      { form: messageArgs },
      callback
    );
  };

  var endpoint = 'sendsms';
  var urlArgs = {
    'apiKey': apiKey,
    'to': phoneNumber,
    'from': 'Firetext',
    'message': msg
  };

  sendApiMessage(endpoint, urlArgs, function (error, response, body) {
    if (error) {
      return console.log(error);
    }
    console.log(body);
  });
}