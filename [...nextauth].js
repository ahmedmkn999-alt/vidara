import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      // هذا هو الرقم الذي نسخته أنت من الصورة
      clientId: "627697628144-jhn1uu9825kqhb1qjqbtiu5joecu07sv.apps.googleusercontent.com",
      // ضع هنا الرقم السري الثاني (Secret) الذي ظهر لك تحت الرقم السابق في جوجل
      clientSecret: "ضـع_هنا_Secret_الذي_ظهر_لك_في_جوجل",
    }),
  ],
  secret: "vidara-secure-key-2025",
});
