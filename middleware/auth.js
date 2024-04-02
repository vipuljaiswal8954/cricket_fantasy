import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  // Get the JWT token from the request headers
  const token = req.headers.authorization.split(" ")[1];

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ error: "Authorization token is missing" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user data to the request object for further processing
    req.userDetails = decoded;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Return unauthorized if the token is invalid
    return res.status(401).json({ error: "Invalid authorization token" });
  }
};

export default auth;
