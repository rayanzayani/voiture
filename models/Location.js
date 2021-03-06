const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Create Schema
const ObjectId = mongoose.Types.ObjectId;

ObjectId.prototype.valueOf = function () {
  return this.toString();
};
const LocationSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  voiture: {
    type: String,
    required: true,
  },
  dateDeb: {
    type: String,
    required: true,
  },
  dateFin: {
    type: String,
    required: true,
  },
});
module.exports = Location = mongoose.model("Location", LocationSchema);
