module.exports = {
  logging: true, // enabled logging for development.
  seed: true,
  db: process.env.DATABASE_URI,
  port: process.env.PORT,
};
