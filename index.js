/*
========================================================
                  RATINGS & REVIEWS
========================================================
*/
const express = require('express');
const path = require('path');
const axios = require('axios');
const compression = require('compression');
const db = require('./database.js');

const app = express();
const port = process.env.PORT || 3000; //??


app.get('/reviews', (req, res) => {
  let options = {
    headers: {
      'Authorization': `${auth.TOKEN}`
    }
  }

  if (req.headers.reqtype === 'general') {
    options.url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${req.headers.id}&count=${req.headers.count}&sort=${req.headers.sort}`;
  } else {
    options.url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?product_id=${req.headers.id}`;
  }
  axios(options)
    .then( (response) => {
      res.send(response.data);
    })
    .catch( (err) => {
      res.send(err);
    })
})

app.put('/review-helpful', (req, res) => {
  let options = {
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${req.headers['review-id']}/helpful`,
    headers: {
      'Authorization': `${auth.TOKEN}`
    }
  }

  axios(options)
    .then( response => {
      res.send(response.data);
    })
    .catch( err => {
      res.send(err);
    })

})

app.get('/meta', (req, res) => {
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta?product_id=${req.headers.id}`,
    headers: {
      'Authorization': `${auth.TOKEN}`
    }
  }

  axios(options)
    .then( response => {
      res.send(response.data)
    })
    .catch( err => {
      res.send(err);
    })
})

app.post('/create-review', (req, res) => {
  let data = {
    "product_id": req.body.product_id,
    "rating": parseInt(req.body.rating),
    "summary": req.body.summary,
    "body": req.body.body,
    "recommend": req.body.recommend,
    "name": req.body.name,
    "email": req.body.email,
    "photos": req.body.photos,
    "characteristics": req.body.characteristics
  };
  console.log(data);

  var config = {
    method: 'post',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews',
    headers: {
      'Authorization': `${auth.TOKEN}`,
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios(config)
  .then( (response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch( (err) => {
    res.send(err);

  })
})

// ===================================================

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
