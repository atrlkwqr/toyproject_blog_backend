import {PrismaClient} from "@prisma/client";
import { isAuthenticated } from "../../middleware";

const prisma = new PrismaClient()

const getPost = {
    Query: {
        getPostList: async (_, args, {request}) => {

            try {
                const isAuth = isAuthenticated(request);

                if(isAuth === true){
                    const Posts = await prisma.post.findMany({where: {id:request.user.id}});
    
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
                }
                else {
                    return {
                        ok:true,
                        posts:null
                    };
                }


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