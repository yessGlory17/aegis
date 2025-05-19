import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "~/lib/mongo";
import User from "~/models/user.model";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials: any) {
        const { email, password } = credentials;

        try {
          await connectToDatabase();
          const user = await User.findOne({ email: { $eq: email } })
          console.log("BULUNAN USER: ", user, email);

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  secret: "test",
  pages: {
    signIn: "/auth/login",
  },
  session:{
    strategy:"jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT USER: ", user)
      if (user) { // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      // İlk sign-in’da jwt callback’te eklediğimiz token.id burada var
      console.log("SESSION TOKEN: ", token);
      session.user.id = token.id
      return session
    }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };