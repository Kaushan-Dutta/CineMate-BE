const express = require("express");
const http = require("http");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const server = http.createServer(app);
require("dotenv").config();

app.use(express.json());
app.use(cors({ option: true, credentials: true }));

app.use("/graphql", graphqlHTTP({
  schema: require('./Schema/index'), 
  graphiql: true 
}));

app.use('/user', require('./Routers/useroute'));


app.get("/test-mode", (req, res) => {
  res.status(200).json({ message: "Welcome to text-mode" });
});

const NODE_PORT = process.env.PORT || 5000;

server.listen(NODE_PORT, () => console.log("Server is running on port ", NODE_PORT));
