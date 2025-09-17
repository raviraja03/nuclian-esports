const mongoose = require("mongoose");
const { CustomError } = require("../middleware/errorMiddleware");

const tournamentParticipantSchema = new mongoose.Schema(
  {
    tournamentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    registeredAt: { type: Date, default: Date.now },

    status: {
      type: String,
      enum: ["registered", "checked-in", "playing", "eliminated", "winner"],
      default: "registered",
    },

    teamName: { type: String, trim: true },
    position: { type: Number },

    metadata: { type: Map, of: String },
  },
  { timestamps: true }
);

// Prevent duplicate registrations
tournamentParticipantSchema.index(
  { tournamentId: 1, userId: 1 },
  { unique: true }
);

const TournamentParticipant = mongoose.model(
  "TournamentParticipant",
  tournamentParticipantSchema
);
module.exports = { TournamentParticipant };




const tournamentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },

    type: { type: String, enum: ["solo", "duo", "squad"], required: true },

    game: { type: String, required: true },
    // gameId: { type: String, required: true },

    platform: {
      type: String,
      enum: ["pc", "mobile", "console", "cross-platform"],
      default: "mobile",
      required: true,
    },

    schedule: {
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true },
      checkInStart: { type: Date, required: true },
      checkInEnd: { type: Date, required: true },
    },

    maxParticipants: { type: Number, required: true },
    minParticipants: { type: Number, required: true, default: 2 },

    entryFee: {
      coins: { type: Number, default: 0, min: 0 },
      amount: { type: Number, default: 0, min: 0 },
    },

    prizePool: {
      distribution: [
        {
          position: { type: Number, required: true },
          rewardType: {
            type: String,
            enum: ["coins", "currency", "item"],
            default: "currency",
          },
          amount: { type: Number, min: 0 },
          itemId: String,
        },
      ],
      totalCoins: { type: Number, min: 0 },
      totalCurrency: { type: Number, min: 0 },
    },

    rules: [String],

    status: {
      type: String,
      enum: [
        "draft",
        "published",
        "registration-open",
        "registration-closed",
        "check-in",
        "in-progress",
        "completed",
        "cancelled",
      ],
      default: "draft",
    },

    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },

    // region: { type: String, required: true },
    streamLink: { type: String, trim: true },
    discordLink: { type: String, trim: true },

    metadata: { type: Map, of: String },

    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Indexes for performance
tournamentSchema.index({ status: 1, "schedule.startTime": 1 });
tournamentSchema.index({ createdBy: 1 });
tournamentSchema.index({ game: 1, status: 1 });
tournamentSchema.index({ platform: 1, isVisible: 1 });

// Validations
tournamentSchema.pre("save", function (next) {
  if (this.schedule.startTime >= this.schedule.endTime) {
    return next(new CustomError("End time must be after start time", 400));
  }
  if (this.schedule.checkInStart >= this.schedule.checkInEnd) {
    return next(new CustomError("Check-in end must be after start", 400));
  }
  if (this.schedule.checkInEnd > this.schedule.startTime) {
    return next(
      new CustomError("Check-in must end before tournament starts", 400)
    );
  }
  if (this.minParticipants > this.maxParticipants) {
    return next(
      new CustomError(
        "Minimum cannot be greater than maximum participants",
        400
      )
    );
  }
  next();
});

const Tournament = mongoose.model("Tournament", tournamentSchema);
module.exports = Tournament;
