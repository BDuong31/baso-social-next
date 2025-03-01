import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextRequest, NextResponse } from "next/server";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

// ✅ Định nghĩa `authOptions`
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: '697579782317-tjcpc3k2in99vskgkbgms4jsv1o8ro2l.apps.googleusercontent.com',
      clientSecret: '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',
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.sub;
        session.user.firstName = session.user.name?.split(" ").slice(0, -1).join(" ") || "";
        session.user.lastName = session.user.name?.split(" ").slice(-1).join(" ") || "";
        session.user.username = session.user.email?.split("@")[0] || "";
      }
      return session;
    },
  },
  secret:'http://localhost:3001',
};

// ✅ Dùng `NextAuth()` đúng cách
const handler = NextAuth(authOptions);

// ✅ Export API routes
export { handler as GET, handler as POST };
