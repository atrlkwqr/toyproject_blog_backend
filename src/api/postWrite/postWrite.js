import {PrismaClient} from "@prisma/client";
import {isAuthenticated} from "../../middleware";

const prisma = new PrismaClient()

const writePost = {
    Mutation: {
        writePost: async (_, args, {request}) => {

            try {
                const isAuth = isAuthenticated(request);

                if (isAuth === true) {

                    const {title, categoryTitle} = args;

                    const category = await prisma.category.create({
                        data: {
                            title : categoryTitle,
                            id : request.user.id
                        },
                    })


                    if (request.user.id !== null) {
                        const id = request.user.id;
                        const Post = await prisma
                            .post
                            .create({
                                data: {
                                    id,
                                    title,
                                    categoryId: category.categoryId
                                }
                            })

                        return {ok: true, postId: Post.postId, categoryId: Post.categoryId}
                    } else {
                        return {ok: false, postId: null, categoryId: null}
                    }

                } else {
                    return {ok: false, postId: null, categoryId: null}
                }

            } catch (err) {
                console.log(err)
                return {ok: false, postId: null, categoryId: null}
            }
        }
    }
};

export default writePost;