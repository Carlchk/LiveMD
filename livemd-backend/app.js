const mongoose = require("mongoose")
const http = require("http")
const Document = require("./Document")

const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
var jwt = require('jsonwebtoken');
const fs = require('fs')

const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());


mongoose.connect("mongodb://user:1234@localhost/livemd", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})



const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  var cert = fs.readFileSync('livemd-us.pem');
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, cert, (err, decoded) => {
    if (err) return res.sendStatus(403)
    req.sub = decoded.sub
    next()
  })
}

app.post('/jwt', authenticateToken, async (req, res) => {
  const userid = req.sub
  res.send(userid)
});


app.get('/getDocument', authenticateToken, function (req, res) {
  // res.type('text/plain');
  const userid = req.sub
  const query = Document.find({ owner: userid });
  query.select('id name createdAt updatedAt');

  // const document = await Document
  query.sort([['updatedAt', -1]]).exec(function (err, result) {
    if (err) return handleError(err);
    // athletes contains an ordered list of 5 athletes who play Tennis
    res.status(200).send(result);
  })

})

app.delete('/deleteDocument', (req, res) => {

})

var onlineUser = {}
io.on("connection", socket => {
  socket.on("get-document", async ({ documentId, userData }) => {
    const document = await findOrCreateDocument(documentId, userData.userid)

    if (onlineUser[documentId] === undefined) {
      onlineUser[documentId] = {}
    }

onlineUser[documentId][userData.sub] = { userid: userData.sub, user_pic: userData.picture }
    socket.join(documentId)

    socket.emit("load-document", document)

    socket.on("send-changes", ({ delta }) => {
      // console.log({ delta })
      const onlineUserByDocument = Object.values(onlineUser[documentId])
      socket.broadcast.to(documentId).emit("receive-changes", { delta, onlineUser: onlineUserByDocument })
    })

    socket.broadcast.to(documentId).emit("receive-changes-on-online-user", { onlineUser: Object.values(onlineUser[documentId]) })

    socket.on("save-document", async ({ data }) => {
      // await console.log(req)
      await Document.findByIdAndUpdate(documentId, { data })
    })

    socket.on("send-document-name-changes", async ({ documentName }) => {
      const onlineUserByDocument = Object.values(onlineUser[documentId])
      socket.broadcast.to(documentId).emit("receive-document-name-changes", { documentName, onlineUser: onlineUserByDocument })
      if (document === null) return
      await Document.findByIdAndUpdate(documentId, { name: documentName })
    })

    socket.on('disconnect', () => {
      console.log(`user ${userData.sub} Disconnected`);
      delete onlineUser[documentId][userData.sub]
      socket.broadcast.to(documentId).emit("receive-changes-on-online-user", { onlineUser: Object.values(onlineUser[documentId]) })
    });
  })
})

async function findOrCreateDocument(id, ownerid) {
  if (id == null) return
  const document = await Document.findById(id)
  if (document) return document

  return await Document.create({
    _id: id, name: "New Document", owner: ownerid, data: {
      "ops": [{
        "insert": "## Hello World :)"
      }, {
        "insert": "\n"
      }]
    }
  })
}

server.listen(3001);