require('dotenv').config()
const { exec } = require("child_process");
const { createYoga } = require("graphql-yoga")
const { createServer } = require("http")
const { schema } = require('./schema')
const { context } = require('./context')


const yoga = createYoga({
  graphqlEndpoint: '/',
  schema: schema,
  context
})
const server = createServer(yoga)

server.listen(4000, () => {
//image server
  exec(`http-server ./images -a ${process.env.FILE_SERVER_URL} -p ${process.env.FILE_SERVER_PORT} `, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
  console.log(`
  🚀 Server ready at: http://localhost:4000
  ⭐️ See sample queries: http://pris.ly/e/js/graphql-sdl-first#using-the-graphql-api`)
})
