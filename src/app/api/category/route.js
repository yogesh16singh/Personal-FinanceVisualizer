import { connectToDatabase } from "@/lib/connectToDb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();

  try {
    const categories = await Category.find();
    return NextResponse.json({ data: categories }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await connectToDatabase();

  try {
    const { name, budget } = await req.json();

    const existingCategory = await Category.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });

    if (existingCategory) {
      return NextResponse.json(
        { message: "Category already exists" },
        { status: 400 }
      );
    }

    const newCategory = new Category({ name, budget });
    const savedCategory = await newCategory.save();

    return NextResponse.json(
      { message: "Category added successfully", data: savedCategory },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Category already exists" },
        { status: 409 }
      );
    }
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const { name, budget } = await req.json();
    const existingCategory = await Category.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });

    if (existingCategory && existingCategory._id != id) {
      return NextResponse.json(
        { message: "Category already exists" },
        { status: 400 }
      );
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, budget },
      { new: true }
    );

    if (!updatedCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Category updated successfully", data: updatedCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
