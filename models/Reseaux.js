const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Create Schema
const ObjectId = mongoose.Types.ObjectId;

ObjectId.prototype.valueOf = function () {
  return this.toString();
};
const ReseauxSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
    required: true,
  },
  instagram: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  localisation: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  },
});
module.exports = Reseau = mongoose.model("reseau", ReseauxSchema);
