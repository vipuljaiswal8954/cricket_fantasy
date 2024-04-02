import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  matchName: {
    type: String,
    required: true,
  },
  teams: [
    {
      teamName: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        default: 0,
      },
      players: {
        type: [String],
        required: true,
      },
    },
  ],
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
});

// Define virtual property for match status
matchSchema.virtual("status").get(function () {
  const now = new Date();
  if (now < this.startTime) {
    return "upcoming";
  } else if (now >= this.startTime && now <= this.endTime) {
    return "ongoing";
  } else {
    return "completed";
  }
});

const Match = mongoose.model("Match", matchSchema);

export default Match;
