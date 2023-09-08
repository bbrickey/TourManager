import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../../prismadb";
import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";

export const Options: NextAuthOptions = {
  //const handler = NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    /*
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
    }),
    */
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        //username: { label: "Username", type: "text" },
      },
      async authorize(credentials, req) {
        console.log("TRYING");
        console.log("creds " + credentials);
        if (!credentials) {
          throw new Error("no credentials provided");
        }
        //check if email and password were provided
        if (!credentials.email || !credentials.password) {
          throw new Error("Missing Fields");
        }

        //check if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        console.log("USER " + user);

        if (!user || !user.password) {
          throw new Error("No user found");
        }

        //check password
        const passwordMatch = await bcrypt.compare(
          credentials?.password,
          user.password
        );

        console.log("Match " + passwordMatch);
        if (!passwordMatch) {
          throw new Error("incorrect password");
        }

        return user;
        /*
        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
        */
      },
    }),
    /*
    EmailProvider({
      server: {
        //host: process.env.EMAIL_SERVER_HOST,
        //port: process.env.EMAIL_SERVER_PORT,
        service: "gmail",
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    */
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(Options);
export { handler as GET, handler as POST };
