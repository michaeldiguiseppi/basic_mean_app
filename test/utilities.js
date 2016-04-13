var mongoose = require('mongoose');
var Students = require('../src/server/models/students');
function dropDatabase(done) {
  mongoose.connection.db.dropDatabase();
  if (done) {
    done();
  }
}


module.exports = {
  dropDatabase: dropDatabase,
};
