import { authConfig } from "./auth.config";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { connectToDb } from "./utils";
import { User } from "./models";

const login = async (credentials) => {
  try {
    connectToDb();
    const user = await User.findOne({ username: credentials.username });

    if (!user) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (err) {
    throw new Error("Failed to login!");
  }
};

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        await connectToDb();
        try {
          let registeredUser = await User.findOne({
            username: user?.email,
          });
          if (!registeredUser) {
            const newUser = new User({
              username: profile?.email,
              name: profile?.name,
              img: profile?.picture,
            });
            registeredUser = await newUser.save();
          }
          user.newId = registeredUser.id;
          user.isAdmin = registeredUser.isAdmin;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      console.log(user);

      return true;
    },
    ...authConfig.callbacks,
  },
});
