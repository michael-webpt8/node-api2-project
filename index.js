const express = require('express');
const postRouter = require('./routers/posts');
const cors = require('cors');

const server = express();
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;

server.use(express.json());
server.use(cors());

server.use('/api/posts', postRouter);

server.listen(port, host, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
