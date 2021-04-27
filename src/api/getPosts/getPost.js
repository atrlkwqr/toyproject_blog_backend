import {PrismaClient, User} from "@prisma/client";

const prisma = new PrismaClient()

const getPost = {
    Query: {
        getPost: async (_, args) => {

            try {
                const {id, postId} = args;

                const Id = await prisma
                    .post
                    .findUnique({where: {
                            postId
                        }});
                console.log(Id.id);
                console.log(id);

                if (Id === null) {
                    return false;
                }
                if (Id.id !== id) {
                    return false;
                }
                return true;

            } catch (err) {
                console.log(err)
                return false;
            }
        }
    }
};

export default getPost;