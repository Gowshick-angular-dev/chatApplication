const express = require('express');
const router = require('express').Router();
const DBpool = require('./db_config');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const path = require("path");
const fs = require("fs");
const multer = require('multer')
const jwt = require("./jwt");
var serveStatic = require('serve-static');
const url = require('url');
const querystring = require('querystring');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.send({
            "message" : "A token is required for authentication",
            "status": 403
        });
    }
    console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv", token);

    jwt.accessTokenDecode(function (e) {
        if (e.status) {
            req.user = e.data?.id;
            console.log('weeeeeeeeeweeeeeeeeeeeeeeeeeeeeeeeeee', e.data)
            return next();
        } else {
            return res.send({
                "message" : e.message,
                "status": e.code
            });
        }
    }, token);

};

app.set('view engine', 'ejs');

const socketIO = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:4000",
  }
});
let users = [];

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'));

const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 5242880
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload a Image'))
    }
    cb(undefined, true)
  }
})

socketIO.on('connection', (socket) => {
  console.log(`A user just connected!`);
  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  });

  socket.on('newUser', (data) => {
    users.push(data);
    socketIO.emit('newUserResponse', users);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    users = users.filter((user) => user.socketID !== socket.id);
    socketIO.emit('newUserResponse', users);
    socket.disconnect();
  });
});


router.get('/get',(req,res)=> {
  res.json({messgae:"hello"})
})
router.get('/user', verifyToken, (req, res) => {
  DBpool.query('SELECT * FROM user', (err, results) => {
      if (err) {
        console.log('Error executing query:', err);
        res.send({
          "status": 200,
          "message": err,
          "data": []
        });
        return;
      } else {
          res.send({
            "status": 200,
            "message": "success!",
            "data": results
          });
      }
    });
});

router.post('/save_user' , upload.fields([
  { name: "image", maxCount: 1 },
]), (req, res) => {
  console.log("wrhiwuriweurhioewrh", req.body);  

  let profile_image = "";

        if (req.files.image) {
          const extension = req.files.image[0]["mimetype"].split('/')[1]
          profile_image = req.files.image[0]["filename"] + '.' + extension
        }
  
  DBpool.query(`INSERT INTO user (user_name,email,password,image,status) values('${req.body?.name}','${req.body?.email}','${req.body?.password}','${profile_image}','1')`, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.send({ message: err });
        return;
      } else {

        if (req.files.image) {
          const currentPath = path.join(process.cwd(), "uploads", req.files.image[0]["filename"]);
          const destinationPath = path.join(process.cwd(), "uploads/users/profile_image/" + `${results.insertId}`, profile_image);
          const baseUrl = process.cwd() + '/uploads/users/profile_image/' + `${results.insertId}`
          fs.mkdirSync(baseUrl, { recursive: true })
          fs.rename(currentPath, destinationPath, function (err) {
            if (err) {
              throw err
            } else {
              console.log("Successfully Profile image Uploaded!")
            }
          });
        }
        res.send({
          "status": 200,
          "message": "success!"          
        });
      }
    
      console.log('Query results:', results.insertId);
    });
});

router.post('/login', async (req, res) => {
  try {
    // const data = await DBpool.query(`SELECT * FROM test.user WHERE email='${req.body.email}'`).then((ejrhwie) => console.log('gggggggggggggggggg', ejrhwie)).catch((err) => console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", err));
    let data;
    DBpool.query(`SELECT * FROM user WHERE email='${req.body.email}'`, (err, results) => {
      if (err) {
        console.log('Error executing query:', err);
        res.send({ message: err });
        // res.json({ message: err });
        return;
      } else {
        if (results.length == 0) {
          res.status(200).send({
            status:404,
            message: "Email not found.",
          });
        } else {
          // const match = await bcrypt.compare(req.body.password, data.password);
          if (req.body.password?.toString() === results[0].password?.toString()) {
            let id = results[0].id;
            let name = results[0].user_name;
            let email = results[0].email;
            let image = results[0].image;
            const token = jwt.accessTokenEncode(
              {id, name, email, image},
              'the-super-strong-secrect',
              {
                expiresIn: "24h",
              }
            );
            res.status(200).send({
              status: 200,
              message: "Login Successfully!",
              data: {
                "user_id": id,
                "email": email,
                "image": image,
                "token": token
              }
            });
          } else {
            res.status(200).send({
              status:403,
              message: "Incorrect password",
            });
          }
        }
      }
    
      console.log('Query results:', results);
    });
    
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

router.post('/send_message', verifyToken, (req, res) => {
  
  DBpool.query(`INSERT INTO messages (messages,created_by,user_to,status) values('${req.body?.messages}','${req.user?.id}','${req.body?.user_to}','1')`, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.send({
          "status": 403,
          "message": err
        });
        return;
      } else {
        res.send({
          "status": 200,
          "message": "success!"          
        });
      }
    
      console.log('Query results:', results.insertId);
    });
});

router.get('/messages', verifyToken, (req, res) => {
  const parsedUrl = url.parse(req.url);
  console.log("ekguergwurg", parsedUrl);
  const queryString = parsedUrl.query;
  const queryParams = querystring.parse(queryString);
  DBpool.query(`SELECT messages.id, messages.messages, messages.created_at, messages.created_by, messages.user_to, messages.status, messages.files, user.user_name, user.image FROM messages left join user on (user.id = messages.created_by) where messages.created_by = ${req.user?.id} OR messages.created_by = ${queryParams?.user_to} AND messages.user_to = ${queryParams?.user_to} OR messages.user_to = ${req.user?.id}`, (err, results) => {
  // DBpool.query(`SELECT messages.id, messages.messages, messages.created_at, messages.created_by, messages.user_to, messages.status, messages.files, user.user_name, user.image FROM messages LEFT JOIN user ON messages.created_by = user.id where messages.user_to = ${queryParams?.user_to || req.user?.id}`, (err, results) => {
      if (err) {
        console.log('Error executing query:', err);
        res.send({
          "status": 403,
          "message": err,
          "data": []
        });
        return;
      } else {
          res.send({
            "status": 200,
            "message": "Success",
            "data": results
          });
      }
    });
});

app.get('/index', (req, res) => {
  res.render('fil/index', { title: [
    {
      id: 0,
      name: "Cobol",
    },
    {
      id: 1,
      name: "JavaScript",
    },
    {
      id: 2,
      name: "Basic",
    },
    {
      id: 3,
      name: "PHP",
    },
    {
      id: 4,
      name: "Java",
    },
  ] }); // Render the "index.ejs" template
});

app.use('/', router)

http.listen(9001, () => {
  console.log('Server is running on port 4000');
});
