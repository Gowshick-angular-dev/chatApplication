const DBpool = require('./db_config');
const router = require('express').Router();
const authentication = require('./auth')


  router.get('/user', (req, res) => {    
    DBpool.query('SELECT * FROM user', (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.json({ message: err });
          return;
        } else {
            res.json(results);
        }
      
        console.log('Query results:', results);
      });
  });

  router.get('/messages', authentication , (req, res) => {    
    DBpool.query('SELECT * FROM messages', (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.json({ message: err });
          return;
        } else {
            res.json(results);
        }
      
        console.log('Query results:', results);
      });
  });

  router.post('/save_user' , (req, res) => {
    console.log("wrhiwuriweurhioewrh", req.body);
    DBpool.query(`INSERT INTO user (user_name,password,status) values('${req.body?.user_name}','${req.body?.password}','1')`, (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.send({ message: err });
          return;
        } else {
          res.send(results);
        }
      
        console.log('Query results:', results);
      });
  });
  

module.exports = router;