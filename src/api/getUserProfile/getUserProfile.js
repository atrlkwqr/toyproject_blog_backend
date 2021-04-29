import { PrismaClient } from "@prisma/client";
import { isAuthenticated } from "../../middleware";

const prisma = new PrismaClient()


const getProfile = {
  Query: {
    getUserProfile: async(_, args, {request}) => {

      try{

        const isAuth = isAuthenticated(request);
        console.log(isAuth)


        var userInfo = await prisma.user.findUnique({
            where: {
              id:request.user.id
            }
        })

        console.log(userInfo)

        if(userInfo===null) {
            return {
              userId:null
            };
        }

        return {
            userId:userInfo.userId
        };

      } catch(err){
        console.log(err)
        return {
            userId:null
        };
      }
    }
  }
};

export default getProfile;