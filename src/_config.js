var config = {};

config.mongoURI = {
  test: 'mongodb://localhost/first-mean-app-testing',
  development: 'mongodb://localhost/first-mean-app',
  production: process.env.MONGODB_URI
};

// config.SALT_WORK_FACTOR = {
//   test: 10,
//   development: 10,
//   production: 12,
// };

config.SALT_WORK_FACTOR = 10;


module.exports = config;
