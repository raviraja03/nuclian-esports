import mongoose from "mongoose";
import { CustomError } from "../middleware/errorMiddleware.js";

// const tournamentParticipantSchema = new mongoose.Schema(
//   {
//     tournamentId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Tournament",
//       required: true,
//     },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     registeredAt: { type: Date, default: Date.now },

//     status: {
//       type: String,
//       enum: ["registered", "checked-in", "playing", "eliminated", "winner"],
//       default: "registered",
//     },

//     teamName: { type: String, trim: true },
//     position: { type: Number },

//     metadata: { type: Map, of: String },
//   },
//   { timestamps: true }
// );

// // Prevent duplicate registrations
// tournamentParticipantSchema.index(
//   { tournamentId: 1, userId: 1 },
//   { unique: true }
// );

// const TournamentParticipant = mongoose.model(
//   "TournamentParticipant",
//   tournamentParticipantSchema
// );
// module.exports = { TournamentParticipant };

const tournamentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },

    type: { type: String, enum: ["solo", "duo", "squad"], required: true },

    game: { type: String, required: true },
    // gameId: { type: String, required: true },
    totalMember: {
      type: Number,
      required: true,
      default: function () {
        return this.type === "solo" ? 1 : this.type === "duo" ? 2 : 4;
      },
    },
    totalTeams: { type: Number, required: true },
    platform: {
      type: String,
      enum: ["pc", "mobile", "console", "cross-platform"],
      default: "mobile",
      required: true,
    },

    schedule: {
      registrationStart: { type: Date, required: true }, // e.g. 27 Sept 2025
      registrationEnd: { type: Date, required: true }, // e.g. 29 Sept 2025
      matchStart: { type: Date, required: true },
      idPasswordRelease: { 
        type: Date, 
        required: true,
        default: function() {
          return new Date(this.matchStart.getTime() - 15 * 60 * 1000);
        }
      },
        },

        maxParticipants: {
      type: Number,
      required: true,
      default: function () {
        return this.totalTeams * this.totalMember;
      },
    },
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
            enum: ["coins", "currency"],
            default: "currency",
          },
          amount: { type: Number, min: 0 },
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

    streamLink: { type: String, trim: true },
    discordLink: { type: String, trim: true },

    metadata: { type: Map, of: String },

    isVisible: { type: Boolean, default: true },
    roomId: { type: String, trim: true, default: null },
    registeredCount: { type: Number, default: 0 },
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
  const { registrationStart, registrationEnd, matchStart, idPasswordRelease } =
    this.schedule;

  if (registrationStart >= registrationEnd) {
    return next(
      new CustomError("Registration end must be after registration start", 400)
    );
  }
  if (registrationEnd >= matchStart) {
    return next(
      new CustomError("Registration must end before match starts", 400)
    );
  }
  if (idPasswordRelease >= matchStart) {
    return next(
      new CustomError("ID/Password must be released before match starts", 400)
    );
  }

  next();
});

const Tournament = mongoose.model("Tournament", tournamentSchema);
export default Tournament;
