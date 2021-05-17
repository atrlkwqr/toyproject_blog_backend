import { PrismaClient } from "@prisma/client";
import { generateToken, generateSaltedHash } from "../../utils";

const prisma = new PrismaClient();

const login = {
    Mutation: {
        getAccount: async (_, args) => {
            try {
                const { email, password } = args;

                var userInfo = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                });

                if (userInfo.password !== generateSaltedHash(password)) {
                    return {
                        ok: false,
                        token: null,
                    };
                }

                ////console.log(user)

                const token = generateToken(userInfo.id);
                ////console.log(token)

                if (userInfo === null) {
                    return {
                        ok: false,
                        token: null,
                    };
                }
                return {
                    ok: true,
                    token: token,
                };
            } catch (err) {
                console.log(err);
                return {
                    ok: false,
                    token: null,
                };
            }
        },
    },
};

export default login;
