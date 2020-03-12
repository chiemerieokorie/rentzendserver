const express = require("express");
const database = require("./models");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const app = express();
const schema = require("./schema/schema");



app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql:true
}));

const PORT = process.env.PORT || 5000;

database.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`listening on: http://localhost:${PORT}`);
    });
});