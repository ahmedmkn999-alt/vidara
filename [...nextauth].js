import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: "ضـع_هنا_رقم_CLIENT_ID_من_جوجل",
      clientSecret: "ضـع_هنا_رقم_CLIENT_SECRET_من_جوجل",
    }),
  ],
  secret: "vidara-secret-key-2025",
});
