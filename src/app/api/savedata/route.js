import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { connectToDatabase } from "@/lib/connectToDb";
import Transaction from "@/models/Transaction";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    if (searchParams.get("password") != "1234") {
      return { message: "Password not matched" };
    }
    // Path to JSON file inside "public" folder
    const filePath = path.join(process.cwd(), "public", "transactions.json");

    // Read JSON data
    const jsonData = fs.readFileSync(filePath, "utf-8");
    let transactions = JSON.parse(jsonData);

    // Convert date strings to JavaScript Date objects
    transactions = transactions.map((txn) => ({
      ...txn,
      createdAt: new Date(txn.createdAt),
      updatedAt: new Date(txn.updatedAt),
    }));

    // Insert transactions into MongoDB
    const result = await Transaction.insertMany(transactions);
    return NextResponse.json(
      { message: "Transactions imported successfully!", count: result.length },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Import failed:", error);
    return NextResponse.json(
      { message: "Import failed", error: error.message },
      { status: 500 }
    );
  }
}
