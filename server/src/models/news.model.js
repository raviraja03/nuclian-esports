const mongoose = require('mongoose');
const slugify = require('slugify');

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

// Pre-save hook for slug generation from headline
newsSchema.pre('save', function(next) {
  if (this.isModified('headline')) {
    this.slug = slugify(this.headline, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  }
  next();
});

// Instance method to toggle status
newsSchema.methods.toggleStatus = async function(newStatus, userId) {
  const validStatuses = ["draft", "published", "archived"];
  if (!validStatuses.includes(newStatus)) {
    throw new Error("Invalid status. Must be one of: draft, published, archived");
  }

  this.status = newStatus;
  this.updatedBy = userId;

  if (newStatus === "published") {
    this.publishedAt = new Date();
  } else {
    this.publishedAt = null;
  }

  return this.save();
};

// Static method to get published news with filters and pagination
newsSchema.statics.getPublished = async function(filters = {}, { page = 1, limit = 10 } = {}) {
  const query = {
    status: "published",
    isDeleted: false
  };

  // Apply search filter
  if (filters.search) {
    query.$or = [
      { headline: { $regex: filters.search, $options: 'i' } },
      { summary: { $regex: filters.search, $options: 'i' } },
      { content: { $regex: filters.search, $options: 'i' } }
    ];
  }

  // Apply category filter
  if (filters.category) {
    query.category = filters.category;
  }

  // Apply tag filter
  if (filters.tag) {
    query.tags = filters.tag;
  }

  const skip = (page - 1) * limit;

  const [news, total] = await Promise.all([
    this.find(query)
      .populate('createdBy', 'name')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    this.countDocuments(query)
  ]);

  return {
    news,
    pagination: {
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      limit: parseInt(limit)
    }
  };
};

// Static method to get all unique tags
newsSchema.statics.getAllTags = async function() {
  const result = await this.aggregate([
    { $match: { isDeleted: false } },
    { $unwind: "$tags" },
    {
      $group: {
        _id: null,
        tags: { $addToSet: "$tags" }
      }
    },
    {
      $project: {
        _id: 0,
        tags: { $sortArray: { input: "$tags", sortBy: 1 } }
      }
    }
  ]);

  return result.length > 0 ? result[0].tags : [];
};

const News = mongoose.model("News", newsSchema);
module.exports = News;
