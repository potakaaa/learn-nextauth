import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";


export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        })
    ],
    callbacks: {
        async signIn({user, account, profile}) {
            if (!profile) return false;
            return true // will change later to integrate django
        },

        async jwt({ token, user, account, profile }) {
            return token
        },

        async session({ session, user }) {
            return session}
    }
}

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
