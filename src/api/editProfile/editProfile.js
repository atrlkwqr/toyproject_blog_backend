import { PrismaClient } from "@prisma/client";
import { isAuthenticated } from "../../middleware";

const prisma = new PrismaClient();

const editProfile = {
    Mutation: {
        editProfile: async (_, args, { request }) => {
            try {
                const isAuth = isAuthenticated(request);
                if (isAuth === true) {
                    await prisma.user.update({
                        where: {
                            id: request.user.id,
                        },
                        data: {
                            profileImageId: request.user.id + "_profileId",
                        },
                    });

                    return {
                        ok: true,
                        profileImageId: request.user.id + "_profileId",
                    };
                } else {
                    return { ok: false, profileImageId: null };
                }
            } catch (err) {
                console.log(err);
                return { ok: false, profileImageId: null };
            }
        },
    },
};

export default editProfile;
