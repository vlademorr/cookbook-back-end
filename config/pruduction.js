module.exports = {
  port: 8080,
  mongoUri: "mongodb://localhost:27017",
  options: {
    dbName: "cookBookBackend",
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
};
