const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Create Schema
const ObjectId = mongoose.Types.ObjectId;

ObjectId.prototype.valueOf = function () {
  return this.toString();
};
const CarSchema = new Schema({
  marque: {
    type: String,
    required: true,
  },
  modele: {
    type: String,
    required: true,
  },
  couleur: {
    type: String,
    required: true,
  },
  matricule: {
    type: String,
    required: true,
  },
  annee: {
    type: Number,
    required: true,
  },
  carburant: {
    type: String,
    required: true,
  },
});
module.exports = Car = mongoose.model("Car", CarSchema);
