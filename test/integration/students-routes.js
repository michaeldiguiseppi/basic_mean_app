process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app');
var should = chai.should();
var testUtilities = require('../utilities');

chai.use(chaiHttp);


describe('student routes', function() {


  beforeEach(function(done) {
    testUtilities.dropDatabase(done);
  });

  afterEach(function(done) {
    // drop database
    testUtilities.dropDatabase(done);
  });

  describe('/GET students', function() {

    it('should return all students', function(done) {
        chai.request(server)
          .get('/students')
          .end(function(err, res) {
            res.status.should.equal(200);
            done();
          });
    });
  });

});
