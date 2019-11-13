import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({auth: false, message: 'No token provided.'});
  }

  jwt.verify(token, process.env.PG_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({auth: false, message: 'Failed to authenticate token.'});
    }

    req.user = {
      email: decoded.email,
      id: decoded.id
    };

    next();
  });
};

export default {
  checkAuth
};