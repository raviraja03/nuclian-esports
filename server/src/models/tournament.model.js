import mongoose from "mongoose";
import { CustomError } from "../middleware/errorMiddleware.js";

const tournamentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    thumbnail: {
      url: { type: String },
      public_id: { type: String },
    },

    type: { type: String, enum: ["solo", "duo", "squad"], required: true },

    game: { type: String, required: true, trim: true, index: true,enum: ["Free Fire","BGMI","Valorant","COD"]  },
    name: { type: String, trim: true,enum: ["Qualifier-#1","Qualifier-#2","Qualifier-#3","Qualifier-#4","Semi-Final-#1","Semi-Final-#2","Final","Single"]  },
    round: { type: String, trim: true ,enum: ["Qualifier","Semi-Final","Final","Single"]  },
    
    eventCode: { type: String, required: true, trim: true, uppercase: true, unique: true },
    teamSize: {
      type: Number,
      required: true,
      default: function () {
        return this.type === "solo" ? 1 : this.type === "duo" ? 2 : 4;
      },
    },
    maxTeams: { type: Number },
    maxPlayers: {
      type: Number,
      default: function () {
        return this.type === "solo"
          ? this.maxTeams // in solo, maxTeams actually = maxPlayers
          : this.maxTeams * this.teamSize;
      },
    },
    platform: {
      type: String,
      enum: ["pc", "mobile", "console", "cross-platform"],
      default: "mobile",
      required: true,
    },

    schedule: {
      registrationStart: { type: Date, required: true },
      registrationEnd: { type: Date, required: true },
      matchStart: { type: Date, required: true },
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
      default: "published",
    },

    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    //
    // },

    streamLink: { type: String, trim: true },
    discordLink: { type: String, trim: true },

    metadata: { type: Map, of: String },

    isVisible: { type: Boolean, default: true, index: true },
    roomId: {
      type: String,
      trim: true,
      default: "will be released 15 minutes before match start at",
      select: false,
    },
    roomPassword: { type: String, trim: true, default: null , select: false },
  },
  { timestamps: true }
);

// Indexes for performance
tournamentSchema.index({ status: 1, "schedule.matchStart": 1 }); 
// tournamentSchema.index({ createdBy: 1 });
tournamentSchema.index({ eventCode: 1, round: 1 });
tournamentSchema.index({ game: 1, status: 1 });
tournamentSchema.index({ platform: 1, isVisible: 1 });

// Validations
tournamentSchema.pre("save", function (next) {
  const { registrationStart, registrationEnd, matchStart } = this.schedule;

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


  next();
});

const Tournament = mongoose.model("Tournament", tournamentSchema);
export default Tournament;


