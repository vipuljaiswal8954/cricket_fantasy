import Match from "../models/match.js";

export const getMatches = async (req, res) => {
  try {
    // Fetch all matches from the database
    const matches = await Match.find();

    // Check if there are no matches
    if (!matches || matches.length === 0) {
      return res.status(404).json({ message: "No matches found" });
    }

    // Return the matches
    res.status(200).json(matches);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
};
