import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient()

const user = {
  Query: {
    getAccount: async(_, args) => {

      try{
        const{
          userId
        } = args;

        var token = await prisma.user.findUnique({
            where: {
              userId: userId
            }
        })

        if(token==null) {
            return {
              ok:false,
              token:"false"
            }
        } else {
            return {
              ok:true,
              token:"true"
            }
        }

      } catch(err){
        console.log(err)
        return {
          ok:false,
          token:null
        }
      }
    }
  }
};

export default user;