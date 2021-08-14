const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const axios = require('axios');
const auth = require('../config.js');
var compression = require('compression')

app.use(express.json());
app.use(compression());
app.use(express.static(path.join(__dirname, '..', '/client/dist')));

/*
========================================================
                  OVERVIEW
========================================================
*/

app.get('/productInfo', (req, res) => {
  axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.headers.id}`,
    headers: {
      'Authorization': `${auth.TOKEN}`
    }
  })
    .then(response => {
      res.send(response.data)
    })
    .catch(error => {
      console.log('PRODUCT INFO SERVER SIDE: ', error);
    })
})

app.get('/styles', (req, res) => {
  axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.headers.id}/styles`,
    headers: {
      'Authorization': `${auth.TOKEN}`
    }
  })
    .then(response => {
      res.send(response.data.results)
    })
})

app.post('/updateCart', (req, res) => {
  let sku = parseInt(req.body.sku)
  let quantity = parseInt(req.body.quantity)
  for (var i = 0; i < quantity; i++) {
    axios({
      method: 'post',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart',
      headers: {
        'Authorization': `${auth.TOKEN}`
      },
      data: {
        sku_id: sku
      }
    })
      .then(response => {
        res.send('item added')
      })
      .catch(err => {
        res.send(response.data)
      })
  }
})

/*
========================================================
                  QUESTIONS & ANSWERS
========================================================
*/

app.post('/addAnswer', (req, res) => {
  axios.post(
    `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.headers.id}/answers`,
    {
      body: req.body.body,
      name: req.body.name,
      email: req.body.email,
      photos: req.body.photos
    },
    {
      headers: {
        Authorization: `${auth.TOKEN}`
      }
    }
  )
  .then(result => {
    res.status(200).send('Success server side!')
  })
  .catch(error => {
    console.log('POST ANSWER SERVER SIDE: ', error);
  })
})

app.post('/addQuestion', (req, res) => {
  let productId = Number(req.body.product_id);
  axios.post(
    `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/`,
    {
      body: req.body.body,
      name: req.body.name,
      email: req.body.email,
      product_id: productId
    },
    {
      headers: {
        Authorization: `${auth.TOKEN}`
      }
    }
  )
  .then(result => {
    res.status(200).send('Success server side!')
  })
  .catch(error => {
    console.log('SERVER SIDE ERROR', error);
  })
})

app.put('/answerReport', (req, res) => {
  axios.put(
    `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${req.headers.id}/report`, null, {
      headers: {
        Authorization: `${auth.TOKEN}`
      }
    }
  )
  .then(result => {
    res.status(204).send('Success!')
  })
  .catch(error => {
    console.log('SERVER ERROR', error);
  })
})

app.put('/answerHelpfulness', (req, res) => {
  axios.put(
    `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${req.headers.id}/helpful`, null, {
      headers: {
        Authorization: `${auth.TOKEN}`
      }
    }
  )
  .then( result => {
    res.status(204).send('Success!')
  })
})

app.get('/productAnswers', (req, res) => {
  axios.get(
    `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.headers.id}/answers`,
    {
    params: {
      page: 1,
      count: 50
    },
    headers: {
      Authorization: `${auth.TOKEN}`
    }
  })
  .then( result => {
    res.send(result.data)
  })
  .catch(error => {
    console.log('SERVER SIDE ERROR', error);
  })
})

app.put('/questionHelpfulness', (req, res) => {
  axios.put(
    `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.headers.id}/helpful`, null,{
    headers: {
      Authorization: `${auth.TOKEN}`
    }
  })
  .then(result => {
    res.status(204).send('Success!')
  })
})

app.get('/productQuestions', (req, res) => {
  axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/?product_id=${req.headers.id}`,
    params: {
      // page: 1,
      count: 50
    },
    headers: {
      Authorization: `${auth.TOKEN}`
    }
  })
  .then(response => {
    res.send(response.data);
  })
  .catch(err => {
    res.send(err);
  })
})

/*
========================================================
                  RATINGS & REVIEWS
========================================================
*/

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
