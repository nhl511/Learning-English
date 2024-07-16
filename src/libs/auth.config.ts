export const authConfig = {
  pages: { signIn: "/login" },
  providers: [],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    authorized({ auth, request }: any) {
      const user = auth?.user;
      const isOnAdminPanel =
        request.nextUrl?.pathname.startsWith("/admin-dashboard");
      const isOnProfilePage = request.nextUrl?.pathname.startsWith("/profile");
      const isOnSavedVocabularies = request.nextUrl?.pathname.startsWith(
        "/saved-vocabularies"
      );
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

      if (isOnAdminPanel && !user?.isAdmin) return false;
      if (isOnProfilePage && !user) return false;
      if (isOnSavedVocabularies && !user) return false;
      if (isOnLoginPage && user)
        return Response.redirect(new URL("/", request.nextUrl));
      return true;
    },
  },
};
