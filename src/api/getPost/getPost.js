import {PrismaClient} from "@prisma/client";
import { isAuthenticated } from "../../middleware";

const prisma = new PrismaClient()

const getPost = {
    Query: {
        getPost: async (_, args, {request}) => {

            try {
                const isAuth = isAuthenticated(request);
                let title, contents

                if(isAuth === true){

                    const{
                        postId
                    } = args;
                    const Post = await prisma.post.findUnique({where: {postId : postId}});
                    if (Post === null) {
                        return {
                            ok:false,
                            title:null,
                            contents:null
                        };
                    }
                    console.log(Post)
                    return {
                        ok:true,
                        title:Post.title,
                        contents:Post.contents
                    };
                }
                else {
                    return {
                        ok:false,
                        title:null,
                        contents:null
                    };
                }


            } catch (err) {
                console.log(err)
                return {
                    ok:false,
                    title:null,
                    contents:null
                };
            }
        }
    }
};

export default getPost;