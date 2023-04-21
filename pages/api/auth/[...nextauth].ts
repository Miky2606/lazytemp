import { FirestoreAdapter, initFirestore } from "@next-auth/firebase-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { cert } from "firebase-admin/app";
import { IUser } from "../../../app/user/[user]/components/info_user";
import { use } from "react";
import { AdapterUser } from "next-auth/adapters";
import { nanoid } from "nanoid";

const init = initFirestore({
  credential: cert({
    privateKey: process.env.FIREBASE_KEYS?.replace(/\\n/g, "\n"),
    clientEmail: process.env.CLIENT_EMAIL,
    projectId: process.env.PROJECT_ID,
  }),
});

export default NextAuth({
  adapter: FirestoreAdapter(init),

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async ({ user }) => {
      const userNew = user as Partial<IUser>;
      userNew.code_auth = nanoid(5);
      userNew.links = [];
      userNew.template = [];

      return true;
    },
    session: async ({ session, token, user }) => {
      const users = user as Partial<IUser>;
      if (session?.user) {
        let userNew: IUser = {
          id: user.id,
          email: user.email,
          name: user.name!,
          image: user.image as string,
          links: users.links!,
          code_auth: users.code_auth as string,
          template: users.template!,
          expires: session.expires,
        };
        return userNew;
      }

      return session;
    },
  },
});
