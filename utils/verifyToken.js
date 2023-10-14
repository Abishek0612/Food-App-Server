import jwt from 'jsonwebtoken';

export const verifyToken = (token) => {
  try {
      const decoded = jwt.verify(token, process.env.JWT);
      console.log(decoded); // Log the decoded token
      return decoded;
  } catch (error) {
      throw new Error('Invalid/Expired token, please login again');
  }
};
