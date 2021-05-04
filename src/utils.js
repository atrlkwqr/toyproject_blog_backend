import jwt from "jsonwebtoken";
import crypto from "crypto"

export const generateToken = id => jwt.sign({id}, process.env.JWT_SECRET);

export const generateSaltedHash = (password) => {
    const salt = process.env.SALT;
    const hashedPassword = crypto.createHmac('sha256',salt).update(password).digest('hex');
    return hashedPassword;
  };