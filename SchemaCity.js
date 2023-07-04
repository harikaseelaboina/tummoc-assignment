const mongoose = require("mongoose");

const CitySchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "registerDB" },
  city: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("CityDB", CitySchema);
