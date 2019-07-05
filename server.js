const express = require("express");
const bodyParser = require("body-parser");
const faker = require("faker");
const times = require("lodash.times");
const random = require("lodash.random");
const db = require("./models");
const apiPost = require("./app/api/post");
const apiComment = require("./app/api/comment");

const app = express();

app.use(bodyParser.json());
app.use(express.static("app/public"));
var cors = require('cors');

app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));
apiPost(app, db);
apiComment(app, db);

db.sequelize.sync().then(() => {
  // populate comment table with dummy data
  db.comment.bulkCreate(
    times(10, () => ({
      content: faker.lorem.paragraph(),
    }))
  );
  // populate post table with dummy data
  db.post.bulkCreate(
    times(10, () => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      // commentId: random(1, 10)
    }))
  );
  app.listen(8081, () => console.log("App listening on port 8080!"));
});
