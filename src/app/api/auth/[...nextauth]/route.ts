import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user: any = await User.findOne({ email: credentials?.email });
        if (!user) throw new Error("No user found");

        const isPasswordValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!isPasswordValid) throw new Error("Invalid password");

        return { id: user._id.toString(), email: user.email, name: user.name };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user, account }) {
      await connectDB();

      if (account?.provider === "google") {
        let existingUser: any = await User.findOne({ email: token.email });
        if (!existingUser) {
          existingUser = await User.create({
            name: token.name,
            email: token.email,
            password: null,
          });
        }
        token.id = existingUser._id.toString();
      }

      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
