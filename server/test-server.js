import { PrismaClient } from "./src/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

async function testPrismaConnection() {
  console.log("🧪 Testing Prisma Connection with PrismaPg...\n");

  try {
    // Step 1: Test basic pool connection
    console.log("1️⃣ Testing Pool connection...");
    const connectionString = process.env.DATABASE_URL;
    console.log(connectionString);

    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is not set!");
    }

    console.log(`   Connection String: ${connectionString.split("@")[1]}`);

    const pool = new Pool({ connectionString });

    // Test the pool
    const poolTest = await pool.query("SELECT NOW()");
    console.log("   ✅ Pool connection successful!");
    console.log(`   Server time: ${poolTest.rows[0].now}\n`);

    // Step 2: Test PrismaPg adapter
    console.log("2️⃣ Testing PrismaPg adapter...");
    const adapter = new PrismaPg(pool);
    console.log("   ✅ PrismaPg adapter initialized!\n");

    // Step 3: Test Prisma Client
    console.log("3️⃣ Testing Prisma Client...");
    const prisma = new PrismaClient({ adapter });

    const result = await prisma.$queryRaw`SELECT NOW()`;
    console.log("   ✅ Prisma Client connection successful!");
    console.log(`   Query result: ${result[0].now}\n`);

    // Step 4: Test User model (if table exists)
    console.log("4️⃣ Testing User model query...");
    try {
      const userCount = await prisma.user.count();
      console.log(
        `   ✅ User table accessible! Current user count: ${userCount}\n`,
      );
    } catch (err) {
      console.log(`   ⚠️  User table not ready yet: ${err.message}\n`);
    }

    console.log(
      "✨ All tests passed! Your Prisma setup is working correctly.\n",
    );

    await prisma.$disconnect();
    await pool.end();
  } catch (error) {
    console.error("❌ Test failed!");
    console.error(`Error: ${error.message}\n`);

    if (error.message.includes("ECONNREFUSED")) {
      console.log(
        "💡 Suggestion: PostgreSQL server is not running. Start it and try again.",
      );
    } else if (error.message.includes("password authentication failed")) {
      console.log("💡 Suggestion: Check your DATABASE_URL password.");
    } else if (error.message.includes("does not exist")) {
      console.log(
        "💡 Suggestion: Database doesn't exist. Create it with: createdb Flard.aiDB",
      );
    }

    process.exit(1);
  }
}

testPrismaConnection();
