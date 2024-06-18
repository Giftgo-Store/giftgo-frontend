import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/auth/login",
  },
});

export const config = { matcher: ["/admin/dashboard"] };
