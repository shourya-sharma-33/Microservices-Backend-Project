import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_Secret = process.env.JWT_SIKURETTO;
export const generateToken = (user) => {
    return jwt.sign({ user }, JWT_Secret, { expiresIn: "15d" });
};
//# sourceMappingURL=generate_token.js.map