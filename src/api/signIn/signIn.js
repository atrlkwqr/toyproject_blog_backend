import { PrismaClient } from "@prisma/client";
import { generateToken } from "../../utils";

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

        ////console.log(user)
        
        const token = generateToken(user.userId);
        ////console.log(token)

        if(user===null) {
            return {
              ok:false,
              token:null
            };
        }
        return {
          ok:true,
          token:token
        };

      } catch(err){
        console.log(err)
        return {
          ok:false,
          token:null
        };
      }
    }
  }
};

export default login;