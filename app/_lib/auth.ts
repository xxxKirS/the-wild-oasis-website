import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from './data-service';
import type { GuestCredentials } from '../_types/types';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        const guest = await getGuest(user.email!);

        if (!guest) {
          const newGuest: GuestCredentials = {
            fullName: user.name!,
            email: user.email!,
          };
          await createGuest(newGuest);
        }

        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      const guest = await getGuest(session.user.email!);

      session.user.guestId = guest.id;
      session.user.name = guest.fullName;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
