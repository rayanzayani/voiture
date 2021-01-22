const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Create Schema
const ObjectId = mongoose.Types.ObjectId;

ObjectId.prototype.valueOf = function () {
  return this.toString();
};
const TableSchema = new Schema({
  numero: {
    type: String,
    required: true,
  },
  nbrPersonne: {
    type: Number,
    required: true,
  },
  etat: {
    type: Boolean,
    default: false,
  },
});
module.exports = Table = mongoose.model("table", TableSchema);
