"use server";
import { connectToDatabase } from "@/lib/connectToDb";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const getAll = searchParams.get("getall") == "true";
    if (getAll) {
      const transactions = await Transaction.find({}).sort({ createdAt: -1 });
      const totalTransactions = await Transaction.countDocuments();

      return NextResponse.json({ transactions, totalTransactions });
    }
    if (page < 1 || pageSize < 1) {
      return NextResponse.json(
        { message: "Invalid pagination values", error: true },
        { status: 400 }
      );
    }

    const totalTransactions = await Transaction.countDocuments();
    const transactions = await Transaction.find({})
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    if (!transactions || transactions.length === 0) {
      return NextResponse.json(
        {
          message: "No transactions found",
          transactions: [],
          totalTransactions: 0,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { transactions, totalTransactions },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { message: "Server error", error: true },
      { status: 500 }
    );
  }
}
export async function POST(req) {
  try {
    await connectToDatabase();
    const { amount, date, description, type, category } = await req.json();

    if (!amount || !date || !description || !type || !category) {
      return NextResponse.json(
        { message: "All fields are required", error: true },
        { status: 400 }
      );
    }

    const newTransaction = await Transaction.create({
      amount,
      date,
      description,
      type,
      category,
    });
    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add transaction", error: true },
      { status: 500 }
    );
  }
}
export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const transactionId = searchParams.get("transactionId");
  const updatedData = await req.json();
  if (!transactionId) {
    return NextResponse.json(
      { message: "Transaction ID is required" },
      { status: 400 }
    );
  }
  try {
    await connectToDatabase();

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ updatedTransaction }, { status: 200 });
  } catch (error) {
    console.error("Error updating transaction:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const transactionId = searchParams.get("transactionId");

  if (!transactionId) {
    return NextResponse.json(
      { message: "Transaction ID is required" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const deletedTransaction = await Transaction.findByIdAndDelete(
      transactionId
    );

    if (!deletedTransaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Transaction deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
