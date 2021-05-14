import {PrismaClient} from "@prisma/client";
import { isAuthenticated } from "../../middleware";

const prisma = new PrismaClient()

const getUserCategories = {
    Query: {
        getUserCategories: async (_, args, {request}) => {
            try {
                const isAuth = isAuthenticated(request);
                if(isAuth === true){

                    const Categories = await prisma.category.findMany({
                        where: {
                            id : request.user.id
                        }
                    })

                    if(Categories === null) {
                        return {
                            ok : false,
                            categories : null
                        };
                    }

                    return {
                        ok : true,
                        categories : Categories
                    };
                }
                else {
                    return {
                        ok : true,
                        categories : null
                    };
                }


            } catch (err) {
                console.log(err)
                return {
                    ok : false,
                    categories : null
                };
            }
        }
    }
};

export default getUserCategories;