const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Create Schema
const ObjectId = mongoose.Types.ObjectId;

ObjectId.prototype.valueOf = function () {
  return this.toString();
};
const LocationSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: "Client" },
  prenom: {
    type: String,
    required: true,
  },
  cin: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: ture,
  },
});
module.exports = Location = mongoose.model("Location", LocationSchema);
