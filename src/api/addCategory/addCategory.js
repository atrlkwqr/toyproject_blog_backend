import {PrismaClient} from "@prisma/client";
import { isAuthenticated } from "../../middleware";

const prisma = new PrismaClient()

const addCategory = {
    Mutation: {
        addCategory: async (_, args, {request}) => {
            try {
                const isAuth = isAuthenticated(request);
                if(isAuth === true){
                    const{
                        categoryTitle
                      } = args;
              
                    const Categories = await prisma.category.create({
                        data: {
                            title : categoryTitle,
                            id : request.user.id
                        },
                    })
    
                    return true;
                }
                else {
                    return true;
                }


            } catch (err) {
                console.log(err)
                return false;
            }
        }
    }
};

export default addCategory;