import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import BASE_URL from "@/app/config/baseurl";

async function loginWithGoogle(user: { name: string; email: string }) {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/auth/sign-up-google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        name: user.name,
      }),
    });
    const resData = await res.json();
    if (res.ok) {
      return resData.data.accessToken.token;
    }
    return null;
  } catch (error) {
    // console.log(error);
  }
}

export const authOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: "/admin/auth/login",
    error: "/admin/auth/login",
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
        try {
          const data = {
            email: (credentials as any).email || "",
            password: (credentials as any).password || "",
          };
          if (data) {
            const res = await fetch(`${BASE_URL}/api/v1/auth/sign-in`, {
              headers: {
                Accept: "application/json",
                "Content-Type": `application/json`,
              },
              method: "POST",
              body: JSON.stringify(data),
            });
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
    async jwt({ token, user, account }: any) {
      if (user) {
        token.accessToken = user;
      }
      if (account && account.provider === "google") {
        const userToken = await loginWithGoogle(user);
        token.accessToken = userToken;
      }
      return token;
    },

    async session({ session, token }: any) {
      session.token = token.accessToken;
      return session;
    },
  },
  session: {
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 2 * 24 * 60 * 60, // 2 days
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
