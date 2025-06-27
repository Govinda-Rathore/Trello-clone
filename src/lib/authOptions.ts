import clientPromise from "@/lib/mongoClient";
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import {AuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Extend the Session type to include refreshToken
declare module "next-auth" {
  interface Session {
    refreshToken?: string;
    accessToken?: string;
  }
}

export const authOptions:AuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // authorization: {
      //   params: {
      //     prompt: "consent",         
      //     access_type: "offline", // Needed for refresh token
      //     scope: "openid email profile https://www.googleapis.com/auth/userinfo.email",
      //   },
      // },
    }),
  ],

  // callbacks: {
  //   async jwt({ token, account }) {
  //     // On first login
  //     if (account) {
  //       token.accessToken = account.access_token;
  //       if (account.refresh_token) {
  //         token.refreshToken = account.refresh_token; // Save only if present
  //       }
  //       token.expires_at = account.expires_at; // optional
  //     }
  //     return token;
  //   },

  //   async session({ session, token }) {
  //     session.accessToken = token.accessToken as string;
  //     session.refreshToken = token.refreshToken as string;
  //     return session;
  //   },
  // },
  
    adapter: MongoDBAdapter(clientPromise),
};