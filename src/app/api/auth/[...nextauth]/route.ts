import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
// import { User } from "@/generated/prisma";
import { User } from "@prisma/client";

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          return null;
        }
        if (!user.verifyEmail) {
          return null;
        }
        if (!user.password) {
          return null;
        }
        const confirmPassword = await bcrypt.compare(
          password as string,
          user.password as string
        );
        if (!confirmPassword) {
          return null;
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === "google") {
        await prisma.user.update({
          where: {
            email: user.email!,
          },
          data: {
            verifyEmail: true,
          },
        });
        const existUser = await prisma.user.findUnique({
          where: {
            email: user.email!,
          },
        });
        if (existUser) {
          if (existUser.image && existUser.image !== user.image) {
            user.image = existUser.image;
          }
          if (existUser.name && existUser.name !== user.name) {
            user.name = existUser.name;
          }
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user as User;
      }
      const DbUser = await prisma.user.findUnique({
        where: {
          email: token.email as string,
        },
      });
      if (DbUser) {
        token.user.name = DbUser.name;
        token.user.image = DbUser.image;
        token.user.number = DbUser.number;
        token.user.address = DbUser.address;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
} as AuthOptions;

const handlers = NextAuth(authOptions);

export { handlers as GET, handlers as POST };
