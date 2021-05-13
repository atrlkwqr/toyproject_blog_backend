import {PrismaClient} from "@prisma/client";
import {isAuthenticated} from "../../middleware";

const prisma = new PrismaClient()

const writePost = {
    Mutation: {
        writePost: async (_, args, {request}) => {

            try {
                const isAuth = isAuthenticated(request);

                if (isAuth === true) {

                    const {title, contents} = args;

                    if (request.user.id !== null) {
                        const id = request.user.id;
                        const Post = await prisma
                            .post
                            .create({
                                data: {
                                    id,
                                    title,
                                    contents,
                                    categoryId : "test"
                                }
                            })

                        return {ok: true, postId: Post.postId}
                    } else {
                        return {ok: false, postId: null}
                    }

                } else {
                    return {ok: false, postId: null}
                }

            } catch (err) {
                console.log(err)
                return {ok: false, postId: null}
            }
        }
    }
};

export default writePost;