
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
export const { handlers, signIn, signOut, auth } = NextAuth({
  // Configure one or more authentication providers
  pages: {
    signIn: "/admin/auth/login",
    // error:"admin/error"
  },
  providers: [
    GoogleProvider({
      name: "google",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req): Promise<any> {
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

          if (res.ok && resData.data) {
            return resData.data;
          } else {
            // throw new Error("User not found.");
          }
        }
      },
    }),
  ],
});
