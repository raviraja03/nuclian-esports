const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blog title is required"],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  content: {
    type: String,
    required: [true, "Blog content is required"]
  },
  coverImage: {
    type: String,
    default: null
  },
  images: [{
    type: String
  }],
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

// Auto-generate slug from title
blogSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  }
  next();
});

// Instance method to toggle status
blogSchema.methods.toggleStatus = async function(newStatus) {
  if (!["draft", "published", "archived"].includes(newStatus)) {
    throw new Error("Invalid status");
  }
  this.status = newStatus;
  return this.save();
};

// Static method to get published blogs with filters and pagination
blogSchema.statics.getPublished = async function(filters = {}, page = 1, limit = 10) {
  const query = {
    status: "published",
    isDeleted: false,
    ...filters
  };

  const skip = (page - 1) * limit;
  
  const [blogs, total] = await Promise.all([
    this.find(query)
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    this.countDocuments(query)
  ]);

  return {
    blogs,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit
    }
  };
};

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
