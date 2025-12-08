import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const JWT_Secret = process.env.JWT_SIKURETTO as string;

export const generateToken = (user : any) => {
    return jwt.sign(
        {user}, JWT_Secret, {expiresIn : "15d"}
    );
};


