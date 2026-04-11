

require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const image = await prisma.image.create({
    data: {
      name: "Waldo Scene 1",
      url: "/waldo.webp",
      characters: {
        create: [
          { name: "Beard Man", x: 818, y: 845 },
          { name: "UFO", x: 127, y: 29 },
          { name: "Knights", x: 531, y: 32 },
        ]
      }
    }
  });
  console.log("Seeded:", image);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());