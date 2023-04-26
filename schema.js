// Define a user schema for MongoDB
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
module.exports = { userSchema };
