import { PrismaClient } from "@prisma/client";
import { isAuthenticated } from "../../middleware";

const prisma = new PrismaClient();

const getProfile = {
    Query: {
        getUserProfile: async (_, args, { request }) => {
            try {
                const isAuth = isAuthenticated(request);

                if (isAuth === true) {
                    var userInfo = await prisma.user.findUnique({
                        where: {
                            id: request.user.id,
                        },
                    });

                    if (userInfo === null) {
                        return {
                            userId: null,
                            email: null,
                            profileImageId: null,
                            id: null,
                        };
                    }

                    return {
                        userId: userInfo.userId,
                        email: userInfo.email,
                        profileImageId: userInfo.profileImageId,
                        id: userInfo.id,
                    };
                }
            } catch (err) {
                console.log(err);
                return {
                    userId: null,
                    email: null,
                    profileImageId: null,
                    id: null,
                };
            }
        },
    },
};

export default getProfile;
