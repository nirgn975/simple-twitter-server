module.exports = {
  logging: true, // enabled logging for production.
  seed: false,
  db: process.env.DATABASE_URI,
  port: process.env.PORT,
};
