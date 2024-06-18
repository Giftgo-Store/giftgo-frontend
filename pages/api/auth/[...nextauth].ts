import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: "/admin/auth/login",
    error: "/admin/auth/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req): Promise<any> {
        try {
          const data = {
            email: (credentials as any).email || "",
            password: (credentials as any).password || "",
          };
          if (data) {
            const res = await fetch(
              "https://giftgo.onrender.com/api/v1/auth/sign-in",
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": `application/json`,
                },
                method: "POST",
                body: JSON.stringify(data),
              }
            );
            const resData = await res.json();
            console.log("API response status:", res.status);
            console.log("API response data:", resData);
            const adminToken = resData.data.token;
            if (res.ok && resData.data) {
              if (resData.data.statusCode === 404) {
                throw new Error("User details not found");
              } else {
                return adminToken;
              }
            } else {
              throw new Error("Invalid login details");
            }
          }
        } catch (error) {
          throw new Error("Invalid login details");
        }
      },
    }),
  ],
  callbacks: {
    // If there is a token, the user is authenticated
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user;
      }
      return token;
    },
  //     async redirect({ url, baseUrl }:any) {
  //   // Allows relative callback URLs
  //   if (url.startsWith("/admin")) return `${baseUrl}${url}`
  //   // Allows callback URLs on the same origin
  //   else if (new URL(url).origin === baseUrl) return url
  //   return baseUrl
  // },

    async session({ session, token }: any) {
      session.token = token.accessToken;
      return session;
    },
  
  },

  secret: process.env.NEXTAUTH_SECRET,
};


export default NextAuth(authOptions);
