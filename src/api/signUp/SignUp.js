import { PrismaClient } from "@prisma/client";
import { generateSaltedHash } from "../../utils";

const prisma = new PrismaClient();

const signUp = {
    Mutation: {
        registerAccount: async (_, args) => {
            try {
                const { email, userId, password } = args;

                await prisma.user.create({
                    data: {
                        email,
                        userId,
                        password: generateSaltedHash(password),
                    },
                });

                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        },
    },
};

export default signUp;
