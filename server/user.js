const DBpool = require('./db_config');
const app = express();
const router = require('express').Router();
const authentication = require('./auth')
const multer = require('multer')


app.use('/', router);

  router.get('/user', (req, res) => {    
    console.log('sdfufifgfyerwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww')
    DBpool.query('SELECT * FROM user', (err, results) => {
        if (err) {
          console.log('Error executing query:', err);
          res.send({ message: err });
          // res.json({ message: err });
          return;
        } else {
            console.log('Error executing query:', err);
            res.send(results);
            // res.json(results);
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

  // const upload = multer({
  //   dest: 'uploads/',
  //   limits: {
  //     fileSize: 5242880
  //   },
  //   fileFilter(req, file, cb) {
  //     if (!file.originalname.match(/\.(jpg|jpeg|pdf|xlsx|png)$/)) {
  //       return cb(new Error('Please upload a Image'))
  //     }
  //     cb(undefined, true)
  //   }
  // })

  
  

module.exports = router;