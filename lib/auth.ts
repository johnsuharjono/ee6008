import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'
import { compare } from 'bcrypt'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
	pages: {
		signIn: '/auth/sign-in',
	},
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'hello@example.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					return null
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				})

				if (!user) {
					return null
				}

				const isPasswordValid = await compare(
					credentials.password,
					user.password
				)
				console.log(isPasswordValid)

				if (!isPasswordValid) {
					return null
				}

				return {
					id: String(user.id),
					email: user.email,
					name: user.name,
					role: user.role,
				}
			},
		}),
	],
	callbacks: {
		jwt: ({ token, user }) => {
			if (user) {
				const u = user as unknown as User
				return {
					...token,
					id: u.id,
					role: u.role,
				}
			}
			return token
		},
		session: ({ session, token }) => {
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					role: token.role,
				},
			}
		},
	},
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
