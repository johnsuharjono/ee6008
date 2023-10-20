import { UserRole } from '@prisma/client'
import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
	interface Session {
		user: User
	}

	interface User extends DefaultUser {
		role: UserRole
		studentId?: string
		facultyId?: string
		adminId?: string
	}
}

declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		role: UserRole
		id: string
		studentId?: string
		facultyId?: string
		adminId?: string
	}
}
