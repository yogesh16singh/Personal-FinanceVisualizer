"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AddEditCategoryDialog from "./AddEditCategoryDialog";
import { Pencil, Trash } from "lucide-react";
import Pagination from "./Pagination";
import BudgetVsActualChart from "./BudgetVsActualChart";
import { FaPlus } from "react-icons/fa";

export default function BudgetComp() {
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [totalCategories, setTotalCategories] = useState(categories.length);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const fetchTransactions = async () => {
    try {
      const { data, status } = await axios.get(`/api/transactions`, {
        params: { getall: "true" },
      });

      if (status !== 200 || !data?.transactions) {
        throw new Error("Invalid response structure");
      }

      if (data.transactions && Array.isArray(data.transactions)) {
        setTransactions(data.transactions);
      }
    } catch (error) {
      toast.error("Error fetching transactions");
      console.error("Error fetching transactions:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    fetchTransactions();
  }, []);
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category");
      setCategories(data.data);
      if (data.data && Array.isArray(data.data)) {
        setTotalCategories(data.data.length);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error("Failed to fetch categories. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/category?id=${id}`);
      fetchCategories();
      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast.error("Failed to delete category.");
    }
  };

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className="sm:p-4 max-w-screen mx-auto">
      <BudgetVsActualChart
        categories={categories}
        transactions={transactions}
      />
      <div className="bg-white p-4 rounded-lg shadow-md mt-6">
        <div className="flex items-center justify-between flex-wrap xs:gap-6 gap-2 mb-4">
          <h2 className="text-xl font-bold">Category List</h2>
          <Button className="m" onClick={handleAdd}>
            <FaPlus className="mr-2" /> Add Category
          </Button>
        </div>

        <Table className="border rounded-lg w-full">
          <TableHeader>
            <TableRow className="bg-gray-100 w-full">
              <TableHead className="w-1/2">Name</TableHead>
              <TableHead className="w-full">Monthly Budget</TableHead>
              <TableHead className="w-full">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(categories) &&
              categories
                .slice((page - 1) * pageSize, page * pageSize)
                .map((category, idx) => (
                  <TableRow
                    key={category._id}
                    className="hover:bg-gray-50 w-full"
                  >
                    <TableCell className="font-medium w-full flex items-center">
                      <div className="relative aspect-square min-w-8 p-1 mr-4 inline-flex rounded-full bg-black text-white justify-center items-center">
                        {(page - 1) * pageSize + idx + 1}
                      </div>
                      <div className="w-full">
                        {String(category.name).toLocaleUpperCase()}
                      </div>
                    </TableCell>

                    <TableCell className="w-full">
                      ₹ {category.budget}
                    </TableCell>
                    <TableCell className="flex gap-2 w-full justify-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(category)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(category._id)}
                      >
                        <Trash size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <Pagination
          onPageChange={setPage}
          pageSize={pageSize}
          totalTransaction={totalCategories}
          setPageSize={setPageSize}
        />
      </div>

      {isDialogOpen && (
        <AddEditCategoryDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          category={editingCategory}
          onSuccess={fetchCategories}
        />
      )}
    </div>
  );
}
