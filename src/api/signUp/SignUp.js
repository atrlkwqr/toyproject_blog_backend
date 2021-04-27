import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient()

const SignUp = {
  Mutation: {
    registerAccount: async(_, args) => {

      try{
        const{
          email,
          userId,
          password
        } = args;

        await prisma.user.create({
          data: {
            email,
            userId,
            password
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

export default SignUp;