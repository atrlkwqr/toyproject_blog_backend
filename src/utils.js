import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

export const generateSaltedHash = (password) => {
    const { SALT } = process.env;
    const salt = `${SALT}`;
    const hashedPassword = crypto
        .createHmac("sha256", salt)
        .update(password)
        .digest("hex");
    return hashedPassword;
};

export const generateFrontSaltedHash = (password) => {
    const { FRONT_SALT } = process.env;
    const salt = `${FRONT_SALT}`;
    const hashedPassword = crypto
        .createHmac("sha256", salt)
        .update(password)
        .digest("hex");
    return hashedPassword;
};

export const checkPasswordRegularExpression = (password) => {
    var regex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if (!regex.test(password)) {
        return false;
    }
    return true;
};

export const generateRandomPassword = () => {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let result = "";
    const charactersLength = characters.length;
    while (!checkPasswordRegularExpression(result)) {
        for (let i = 0; i < 10; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
    }
    return result;
};

export const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});
