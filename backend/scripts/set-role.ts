// Promotes a user to a given role. Run with:
//   npx ts-node scripts/set-role.ts someone@example.com SALES_MANAGER
// There is no in-app UI for this on purpose — role changes should go through
// someone with direct database access, not be self-service.
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const [, , email, role] = process.argv;

  if (!email || !role) {
    console.error('Usage: npx ts-node scripts/set-role.ts <email> <role>');
    console.error(`Valid roles: ${Object.values(Role).join(', ')}`);
    process.exit(1);
  }

  if (!Object.values(Role).includes(role as Role)) {
    console.error(`Invalid role "${role}". Valid roles: ${Object.values(Role).join(', ')}`);
    process.exit(1);
  }

  const user = await prisma.user.update({
    where: { email: email.toLowerCase() },
    data: { role: role as Role },
  });

  console.log(`${user.email} is now ${user.role}.`);
}

main()
  .catch(e => {
    console.error(e.message ?? e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
