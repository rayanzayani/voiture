const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Create Schema
const ObjectId = mongoose.Types.ObjectId;

ObjectId.prototype.valueOf = function () {
  return this.toString();
};
const ClientSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
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
    required: true,
  },
});
module.exports = Client = mongoose.model("Client", ClientSchema);
