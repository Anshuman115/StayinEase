//dynamic route which can catch any other route in the api/auth

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import * as bcrypt from "bcrypt";
import dbConnect from "@/config/dbConnect";

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        dbConnect();
        const { email, password } = credentials;

        //check if email and password is entered
        if (!email || !password) {
          throw new Error("Please enter email or password");
        }

        //Find user in the database
        const user = await User.findOne({ email }).select("+password");
        // console.log("User found:", user);

        if (!user) {
          throw new Error("Invalid email or password");
        }

        //check if password is correct or not
        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
          throw new Error("Invalid email or password");
        }

        return Promise.resolve(user);
      },
    }),
  ],
  session: {
    jwt: true,
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
});
