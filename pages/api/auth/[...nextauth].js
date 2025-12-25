import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: "627697628144-jhn1uu9825kqhb1qjqbtiu5joecu07sv.apps.googleusercontent.com",
      clientSecret: "ضـع_هنا_Secret_الذي_نسخته_من_جوجل", // تأكد من وضعه ليعمل الزر
    }),
  ],
  secret: "vidara-secure-key-2025",
});
