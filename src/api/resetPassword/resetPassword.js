import { PrismaClient } from "@prisma/client";
import { generateFrontSaltedHash, generateSaltedHash } from "../../utils";
import { isAuthenticated } from "../../middleware";

const prisma = new PrismaClient();

const resetPassword = {
    Mutation: {
        resetPassword: async (_, args, { request }) => {
            try {
                const { oldPassword, newPassword, newPasswordConfirmation } =
                    args;

                const isAuth = isAuthenticated(request);

                if (isAuth === true) {
                    if (newPassword !== newPasswordConfirmation) {
                        return false;
                    }

                    const userInfo = await prisma.user.findUnique({
                        where: { id: request.user.id },
                    });

                    console.log(userInfo);

                    const hashedOldPassword = generateSaltedHash(
                        generateFrontSaltedHash(oldPassword)
                    );

                    if (hashedOldPassword !== userInfo.password) {
                        return false;
                    }

                    const hashedNewPassword = generateSaltedHash(
                        generateFrontSaltedHash(newPassword)
                    );

                    await prisma.user.update({
                        where: {
                            id: request.user.id,
                        },
                        data: {
                            password: hashedNewPassword,
                        },
                    });

                    return true;
                }
            } catch (err) {
                console.log(err);
                return false;
            }
        },
    },
};

export default resetPassword;
