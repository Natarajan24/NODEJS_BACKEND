const jwt = require("jsonwebtoken");

const generateToken = (payload, secret, expiresIn) => {
  const accessToken = jwt.sign(payload, secret, { expiresIn });
  expiresIn = expiresIn * 2;
  const refreshToken = jwt.sign(payload, secret, { expiresIn });

  return { accessToken, refreshToken };
};

const authenticateToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication token missing." });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    req.user = decodedToken; 
    next();
  });
};

module.exports = { generateToken, authenticateToken };
