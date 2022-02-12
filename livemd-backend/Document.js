const { Schema, model } = require("mongoose")

const Document = new Schema({
  _id: String,
  name: String,
  owner: String,
  data: Object,
}, {
  timestamps: true
})

module.exports = model("Document", Document)
