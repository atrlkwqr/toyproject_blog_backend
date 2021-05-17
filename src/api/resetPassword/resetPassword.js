import { PrismaClient } from "@prisma/client";
import {
    generateSaltedHash,
    generateFrontSaltedHash,
    generateRandomPassword,
    transport,
} from "../../utils";

const prisma = new PrismaClient();

const resetPassword = {
    Mutation: {
        resetPassword: async (_, args) => {
            try {
                const { email } = args;

                if (email == "") {
                    return false;
                }

                const isExist = await prisma.user.findFirst({
                    where: {
                        email,
                    },
                });

                if (isExist === null) {
                    return false;
                }

                const newPassword = generateRandomPassword();

                const hashedNewPassword = generateSaltedHash(
                    generateFrontSaltedHash(newPassword)
                );

                console.log("success hashedGenerateRandomPassword");

                //https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4NIYbrR8zXS17OOmtVWK1wnZ9zyoQd5EAa1VMcuzyOfq1wbDx9F_9v_zRGaEVPNRQXmS34Tm4Xx1dQk4cdNFP6eWL6C3w 보안설정 바꾸기
                transport.sendMail({
                    from: `BLOG <openblogyt@gmail.com>`,
                    to: email,
                    subject: "[BLOG] 새로운 비밀번호입니다.",
                    html: `
                      <div style="text-align: center;">
                        <h3 style="color: #505050">NEW PASSWORD</h3>
                        <br />
                        <p>${newPassword}</p>
                      </div>
                    `,
                });

                await prisma.user.update({
                    where: {
                        email,
                    },
                    data: {
                        password: hashedNewPassword,
                    },
                });

                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        },
    },
};

export default resetPassword;
