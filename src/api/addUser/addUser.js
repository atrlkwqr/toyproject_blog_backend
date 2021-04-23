import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient()

const user = {
  Mutation: {
    registerAccount: async(_, args,{request}) => {

      try{
        const{
          userId,
          userName
        } = args;

        await prisma.user.create({
          data: {
            userId,
            userName
          },
        })
  
        return true;

      } catch(err){
        console.log(err)
        return false;
      }
    }
  }
};

export default user;