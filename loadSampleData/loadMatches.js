import Match from "../models/match.js";

// IPL matches data
const iplMatches = [
  {
    matchName: "CSK vs MI",
    teams: [
      {
        teamName: "Chennai Super Kings",
        players: ["MS Dhoni", "Suresh Raina", "Ravindra Jadeja", "Faf du Plessis"],
      },
      {
        teamName: "Mumbai Indians",
        players: ["Rohit Sharma", "Jasprit Bumrah", "Kieron Pollard", "Hardik Pandya"],
      },
    ],
    startTime: new Date("2024-04-05T14:00:00Z"),
    endTime: new Date("2024-04-05T17:00:00Z"),
    venue: "Wankhede Stadium, Mumbai",
  },
  {
    matchName: "RCB vs KKR",
    teams: [
      {
        teamName: "Royal Challengers Bangalore",
        players: ["Virat Kohli", "AB de Villiers", "Glenn Maxwell", "Yuzvendra Chahal"],
      },
      {
        teamName: "Kolkata Knight Riders",
        players: ["Eoin Morgan", "Andre Russell", "Sunil Narine", "Varun Chakravarthy"],
      },
    ],
    startTime: new Date("2024-04-06T14:00:00Z"),
    endTime: new Date("2024-04-06T17:00:00Z"),
    venue: "M. Chinnaswamy Stadium, Bengaluru",
  },
];

export async function insertSampleMatches() {
  try {
    // Count documents in the notifications collection
    const count = await Match.countDocuments({});

    // Insert sample notification data only if notifications collection is empty
    if (count === 0) {
      // Insert sample notification data
      await Match.insertMany(iplMatches);
      console.log("Sample Matches data inserted successfully");
    } else {
      console.log("Matches collection is not empty. Skipping insertion.");
    }
  } catch (error) {
    console.error("Error inserting sample Matches data:", error);
  }
}
