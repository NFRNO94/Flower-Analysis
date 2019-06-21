const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
      },
      imgLink: {
        type: String,
        required: true
      },
      summary: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true
      }
    });

    var Article = mongoose.model("Article", ArticleSchema);

    module.exports = Article;