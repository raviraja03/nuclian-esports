import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({

    tournamentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
      
    },
    teamName: { type: String, trim: true, default: null },
    mode: {
      type: String,
      enum: ["duo", "squad", "solo"],
      required: true,
    },
     captainID: { // User who created the team
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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

})
teamSchema.index(
  { tournamentID: 1, teamName: 1 },
  {
    unique: true,
    partialFilterExpression: { teamName: { $type: "string" } },
  }
);

const Team= mongoose.model("Team", teamSchema);
export default Team;
