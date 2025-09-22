
import { seedUsers } from "./user";
import prisma from "@/lib/prisma";

async function main() {
	console.log("🌱 Start seeding...");
	await seedUsers();
	// await seedPosts();
	console.log("✅ Seeding finished.");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
