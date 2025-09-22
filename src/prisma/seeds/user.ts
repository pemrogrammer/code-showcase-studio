"use server";

import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import prisma from "../../lib/prisma";

export async function seedUsers() {
	const userId = nanoid();

	await prisma.user.upsert({
		where: { email: "hello@codeshowcase.dev" },
		update: {}, // kalau sudah ada, tidak perlu update
		create: {
			id: userId,
			name: "Super Admin",
			email: "hello@codeshowcase.dev",
			image: process.env.DEFAULT_USER_IMAGE,
			emailVerified: true,
			role: "MODERATOR",
			accounts: {
				create: {
					accountId: userId,
					providerId: "credential",
					password: bcrypt.hashSync(process.env.DEFAULT_PASSWORD as string || "Password1", 10),
				},
			},
		},
	});
}
