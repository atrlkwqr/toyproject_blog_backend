import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const writePost = {
  Mutation: {
    writePost: async(_, args, {request}) => {

      try{
        const{
          title,
          contents
        } = args;

        if(request.user.id !== null){
          const id = request.user.id;
          await prisma.post.create({
            data: {
              id,
              title,
              contents
            },
          })
        }
        else {
          false;
        }


        return true;

      } catch(err){
        console.log(err)
        return false;
      }
    }
  }
};

export default writePost;