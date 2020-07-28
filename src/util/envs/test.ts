module.exports = {
  logging: false, // disbable logging for testing.
  seed: true,
  db: process.env.DATABASE_URI,
  port: process.env.PORT,
};
