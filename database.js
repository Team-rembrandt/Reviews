var pgp = require('pg-promise');
var db = pgp('postgres://loganqiu:''@host:5432/reviews')

db.one('SELECT * FROM reviews')
  .then((data) => {
    console.log('data', data.value)
  })
  .catch((err) => {
    console.log('err', err)
  })