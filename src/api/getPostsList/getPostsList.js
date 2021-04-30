import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

const getPost = {
    Query: {
        getPostList: async (_, args) => {

            try {
                const {id} = args;
                console.log(id);

                const Posts = await prisma.post.findMany({where: {id}});

                console.log(Posts);

                if (Posts === null) {
                    return {
                        ok:false,
                        posts:null
                    };
                }

                return {
                    ok:true,
                    posts:Posts
                };

            } catch (err) {
                console.log(err)
                return {
                    ok:false,
                    posts:null
                };
            }
        }
    }
};

export default getPost;