import mongoose from 'mongoose';
const registrationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    team: {
      name: { type: String, trim: true },
      members: [
        {
          _id: false,
          gameId: { type: String, trim: true }, // Player's game ID
          gameName: { type: String, trim: true }, // Player's game name
          role: {
            type: String,
            enum: ["leader", "member"],
            default: "member",
          },
        },
      ],
    },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

registrationSchema.post("save", async function (doc) {
  if (doc.tournament) {
    await mongoose.model("Tournament").findByIdAndUpdate(doc.tournament, {
      $inc: { registeredCount: 1 },
    });
  }
});


const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);

export default Registration;
