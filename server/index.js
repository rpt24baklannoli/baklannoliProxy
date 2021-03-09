const newrelic = require('newrelic');
const compression = require('compression');
const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios').default;

// const shoppingIP = '18.222.223.190:3004';
// const sellerIP = '3.21.248.149:3005';
// const reviewsIP = '54.151.123.24:3002';
// const imagesIP = '13.52.213.118:3006';

app.use(compression());
app.use('/items/:itemId', express.static('client'));

// #############################
// Request for service bundles
// #############################

// Shopping Service Amazon EC2 Instance
// http://18.222.223.190:3004/items/1
app.get('/shopping/', (req, res) => {
  // axios.get('https://fetsy-shopping.s3-us-west-1.amazonaws.com/bundle.js')
  let itemID = req.params.itemId;
  // axios.get(`http://localhost:3004/bundle.js`)
  axios.get(`http://http://13.52.16.25/:3004/bundle.js`)
    .then(function (response) {
      res.status(200).send(response.data);
    })
    .catch(function (error) {
      res.status(404).send(`Bundle retrieval error: ${error}`);
    });
});

// Shopping Service
app.get('/shopping/items/:itemId', (req, res) => {
  let itemID = req.params.itemId;
  // axios.get(`http://localhost:3004/shopping/items/${itemID}`)
  axios.get(`http://13.52.16.25:3004/shopping/items/${itemID}`)
  .then(function (response) {
      res.status(200).send(response.data);
    })
    .catch(function (error) {
      console.log(error.response.status);
      res.status(404).send(`Item data retrieval error: ${error.response.status}`)
    });
});

// // Seller Service Amazon EC2 Instance
// // http://3.21.248.149:3005/items/2/
// app.get('/seller', (req, res) => {
//   console.log('hitting seller endpoint');
//   // axios.get(`http://${sellerIP}/items/1/bundle.js`)
//   axios.get('http://localhost:3005')
//     .then(function (response) {
//       res.send(response.data);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// });

/*
// Reviews Service Amazon EC2 Instance
// http://54.151.123.24:3002/items/1/
app.get('/reviews', (req, res) => {
  console.log('hitting seller endpoint');
  axios.get(`http://${reviewsIP}/items/1/bundle.js`)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Item Images Service Amazon EC2 Instance
// http://13.52.213.118:3006/items/1/
app.get('/images', (req, res) => {
  console.log('hitting images endpoint');
  axios.get(`http://${imagesIP}/items/1/bundle.js`)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// ##################################################
// Rerouting requests from services to their correct ports if necessary
// ##################################################

// Shopping Service Amazon EC2 Instance
// http://18.222.223.190:3004/items/1
// Shopping Service
app.get('/shopping/items/:itemId', (req, res) => {
  let itemID = req.params.itemId;
  axios.get(`http://${shoppingIP}/shopping/items/${itemID}`)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Seller Service Amazon EC2 Instance
// http://3.21.248.149:3005/items/2/
// Seller Service
app.get('/items/:item_id/seller', (req, res) => {
  console.log('getting to seller endpoint');
  let itemID = req.params.item_id;
  axios.get(`http://${sellerIP}/items/${itemID}/seller`)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get('/shopping/items', (req, res) => {
  axios.get(`http://${shoppingIP}/shopping/items`)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get('/item/images', (req, res) => {
  axios.get(`http://${imagesIP}/item/images`)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Item Images Service Amazon EC2 Instance
// http://13.52.213.118:3006/items/1/
// Images Service
app.get('/item/:item_id/images', (req, res) => {
  let itemID = req.params.item_id;
  axios.get(`http://${imagesIP}/item/${itemID}/images`)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});
*/

app.listen(port, () => {
  console.log(`fetsyProxyServer listening at http://localhost:${port}`);
});
