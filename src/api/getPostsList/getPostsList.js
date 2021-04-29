import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

const getPost = {
    Query: {
        getPostList: async (_, args) => {

            try {
                const {id} = args;

                const Id = await prisma.post.findMany({where: {id}});

                console.log(Id);

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