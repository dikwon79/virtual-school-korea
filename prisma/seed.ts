import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a sample Payment entry
  const payment = await prisma.payment.create({
    data: {
      amount: 100.0, // Example amount
      method: "Credit Card", // Example payment method
      transaction_id: "TX123456789", // Example transaction ID
      start_date: new Date("2025-02-18T00:00:00Z"), // Example start date
      end_date: new Date("9999-99-99T00:00:00Z"), // Example end date
      courseId: 1, // Replace with an actual course ID from your Course table
      userId: 1, // Replace with an actual user ID from your User table
    },
  });

  console.log("Sample payment created:", payment);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
