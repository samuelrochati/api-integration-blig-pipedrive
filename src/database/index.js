const mongoose = require('mongoose');

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/linkapi',
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );
  }
}

module.exports = new Database();
