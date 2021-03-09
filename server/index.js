const newrelic = require('newrelic');
const compression = require('compression');
const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios').default;

const shoppingIP = '13.52.16.25:3004';
const sellerIP = '18.221.203.49:3005';
const reviewsIP = '54.176.185.40:3002';
const imagesIP = '3.101.55.156:3006';

app.use(compression());
app.use('/items/:itemId', express.static('client'));

// #############################
// Request for service bundles
// #############################

// Shopping Service Amazon EC2 Instance
app.get('/shopping/', (req, res) => {
  let itemID = req.params.itemId;
  // axios.get(`http://localhost:3004/bundle.js`)
  axios.get(`http://${shoppingIP}/items/${itemID}/bundle.js`)
    .then(function (response) {
      res.status(200).send(response.data);
    })
    .catch(function (error) {
      res.status(404).send(`Bundle retrieval error: ${error}`);
    });
});

// Seller Service Amazon EC2 Instance
app.get('/seller', (req, res) => {
  let itemID = req.params.itemId;
  console.log('hitting seller endpoint');
  axios.get(`http://${sellerIP}/items/${itemID}/bundle.js`)
  // axios.get('http://localhost:3005')
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Reviews Service Amazon EC2 Instance
app.get('/reviews', (req, res) => {
  let itemID = req.params.itemId;
  console.log('hitting seller endpoint');
  axios.get(`http://${reviewsIP}/items/${itemID}/bundle.js`)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Item Images Service Amazon EC2 Instance
app.get('/images', (req, res) => {
  let itemID = req.params.itemId;
  console.log('hitting images endpoint');
  axios.get(`http://${imagesIP}/items/${itemID}/bundle.js`)
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

// Shopping Service
app.get('/shopping/items/:itemId', (req, res) => {
  let itemID = req.params.itemId;
  // axios.get(`http://localhost:3004/shopping/items/${itemID}`)
  axios.get(`http://${shoppingIP}/shopping/items/${itemID}`)
  .then(function (response) {
      res.status(200).send(response.data);
    })
    .catch(function (error) {
      console.log(error.response.status);
      res.status(404).send(`Item data retrieval error: ${error.response.status}`)
    });
});

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
  axios.get(`http://${imagesIP}/items/${itemID}/images`)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Images Service
app.get('/item/:item_id/images', (req, res) => {
  let itemID = req.params.item_id;
  axios.get(`http://${imagesIP}/items/${itemID}/images`)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`fetsyProxyServer listening at ${port}`);
});
