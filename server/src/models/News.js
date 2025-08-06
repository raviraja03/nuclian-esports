const mongoose = require('mongoose');
const slugify = require('slugify');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  content: { type: String, required: true },
  imageUrl: String,
  tags: [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  publishedAt: Date,
  metadata: {
    category: String
  }
}, { timestamps: true });

// Embedded Category schema for news metadata
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});

// Use categorySchema for metadata.category if you want to store category objects
// Otherwise, keep as String for simple use (as currently implemented)
// To support both, you could:
// metadata: {
//   category: { type: categorySchema, required: false }
// }
// But for most use cases, a string category is sufficient and more efficient.

// Generate slug before save
newsSchema.pre('validate', function(next) {
  if (this.title && (!this.slug || this.isModified('title'))) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// Static: Get all published news with filters
newsSchema.statics.getPublished = function(filters = {}, options = {}) {
  const query = { status: 'published', ...filters };
  return this.find(query, null, options);
};

// Static: Search news
newsSchema.statics.search = function(keyword, filters = {}, options = {}) {
  const query = {
    status: 'published',
    ...filters,
    $or: [
      { title: { $regex: keyword, $options: 'i' } },
      { content: { $regex: keyword, $options: 'i' } },
      { tags: { $regex: keyword, $options: 'i' } }
    ]
  };
  return this.find(query, null, options);
};

// Instance: regenerate slug
newsSchema.methods.generateSlug = function() {
  this.slug = slugify(this.title, { lower: true, strict: true });
};

const News = mongoose.model('News', newsSchema);
module.exports = News;
