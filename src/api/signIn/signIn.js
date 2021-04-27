import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const login = {
  Mutation: {
    getAccount: async(_, args) => {

      try{
        const{
          email,
          password
        } = args;

        var user = await prisma.user.findUnique({
            where: {
              email
            }
        })

        console.log(user)

        if(user===null) {
            return false;
        }
        return true;

      } catch(err){
        console.log(err)
        return false;
      }
    }
  }
};

export default login;