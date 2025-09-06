const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: [true, "News headline is required"],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  summary: {
    type: String,
    required: [true, "News summary is required"],
    trim: true
  },
  content: {
    type: String,
    required: [true, "News content is required"]
  },
  coverImage: {
    type: String,
    default: null
  },
  source: {
    type: String,
    default: "in-house"
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    trim: true,
    default: "general"
  },
  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "draft"
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  metaTitle: {
    type: String,
    default: null
  },
  metaDescription: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

const News = mongoose.model("News", newsSchema);
module.exports = News;
