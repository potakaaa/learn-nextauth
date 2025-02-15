import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { AuthenticatedUser } from "@/app/lib/auth/types";
import axios from "axios";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }: { 
            user: AuthenticatedUser; 
            account: any; 
            profile?: any; 
          }): Promise<boolean | string> {  
            console.log("Account Object:", account);
            
            if (account?.provider === "google") {
              const { access_token, refresh_token } = account;
          
              if (!account.access_token) {
                console.error("Google did not return an access_token");
                return false;
              }

              try {
                const response = await axios.post("http://127.0.0.1:8000/api/social/login/google/", {
                  access_token,
                  refresh_token,
                });
          
                console.log("Django API Response:", response.data); // Debugging step

                const apiAccessToken = response.data.access_token || response.data.key;
          
                // Ensure response contains the access token
                if (!apiAccessToken) {
                  console.error("Missing access_token in response");
                  return false;
                }
          
                user.accessToken = apiAccessToken; // Attach received token
          
                return true;
              } catch (error) {
                console.error("Google Sign-in Error:", error);
                return false;
              }
            }
          
            return false;
          },

        async jwt({token, user, account, profile, isNewUser} : {   token: any, 
            user: AuthenticatedUser, 
            account: any, 
            profile?: any, 
            isNewUser?: boolean, }) {
            if (user) {
                const { accessToken } = user;

                token.accessToken = user.accessToken;
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            } else if (account) {
                token.accessToken = account.access_token;
            }
            console.log("JWT Callback Params:", { token, user, account, profile, isNewUser });
            return token;
        },

        async session({ session, token } : { session: any, token: any }) {
            session.accessToken = token.accessToken;
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            return session
        }
    }
}

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
