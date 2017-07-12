const server = require('./app');

const port = (process.env.PORT) ? process.env.PORT : 3050;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
