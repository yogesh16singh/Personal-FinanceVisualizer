"use client";
import { useCallback, useEffect, useState } from "react";
import { addTransaction } from "@/lib/api";
import CustomDialog from "./CustomDialog";
import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa";
import TransactionForm from "./TransactionForm";
import { initialState, validateTransaction } from "@/utils/constants";
import axios from "axios";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Link from "next/link";
import MonthlyExpensesChart from "./MonthlyExpensesChart";
import MonthlyIncomeChart from "./MonthlyIncomeChart";
import IncomeExpenseChart from "./IncomeExpenseChart";
import CategoryWisePieChart from "./CategoryChart";
import MonthlyCategoryChart from "./MonthlyCategoryChart";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState(initialState);
  const [formMessage, setFormMessage] = useState(initialState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchTransactionWithParams = useCallback(async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactionWithParams();
  }, [fetchTransactionWithParams]);

  const handleAddTransaction = async () => {
    const { error, name, message } = validateTransaction(form);
    if (error) {
      return setFormMessage({ ...formMessage, [name]: message });
    }

    setLoading(true);
    const newTransaction = await addTransaction(form);
    if (newTransaction) {
      setForm(initialState);
      setFormMessage(initialState);
      fetchTransactionWithParams();
      setIsDialogOpen(false);
    }
    setLoading(false);
  };

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormMessage((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <>
      <CustomDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setForm(initialState);
          setFormMessage(initialState);
        }}
      >
        <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
        <TransactionForm
          form={form}
          formMessage={formMessage}
          handleClick={handleAddTransaction}
          handleChange={handleChange}
          loading={loading}
          textbutton="Add"
          textloading="Adding..."
          icon={<FaPlus />}
        />
      </CustomDialog>
      <IncomeExpenseChart transactions={transactions} />
      <div className="w-full grid lg:grid-cols-2 gap-4">
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Monthly Income</h2>
          <MonthlyIncomeChart transactions={transactions} />
        </div>
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Monthly Expenses</h2>
          <MonthlyExpensesChart transactions={transactions} />
        </div>
      </div>
      <div className="w-full grid lg:grid-cols-2 gap-4">
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">
            Monthly Category Wise Distribution
          </h2>
          <MonthlyCategoryChart transactions={transactions} />
        </div>
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">
            Overall Category Wise Distribution
          </h2>
          <CategoryWisePieChart transactions={transactions} />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md mt-6">
        <div className="flex items-center justify-between flex-wrap xs:gap-6 gap-2">
          <h2 className="text-xl font-bold">Transaction List</h2>
          <Button className="m" onClick={() => setIsDialogOpen(true)}>
            <FaPlus className="mr-2" /> Add Transaction
          </Button>
        </div>
        <Table className="overflow-hidden border relative mt-6 min-w-[750px]">
          <TableHeader>
            <TableRow className="w-full">
              <TableHead className="w-1/2">Description</TableHead>
              <TableHead className="w-1/6">Type</TableHead>
              <TableHead className="w-1/6">Category</TableHead>
              <TableHead className="w-1/6">Amount</TableHead>
              <TableHead className="text-center w-full">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.slice(0, 10).map((tx, idx) => (
              <TableRow
                key={tx._id}
                className="hover:bg-gray-50 bg-gray-100 cursor-pointer"
              >
                <TableCell className="font-medium w-full flex items-center">
                  <div className="relative aspect-square min-w-8 p-1 mr-4 inline-flex rounded-full bg-black text-white justify-center items-center">
                    {idx + 1}
                  </div>{" "}
                  <div className="w-full">{tx.description}</div>
                </TableCell>
                <TableCell className=" w-1/6">
                  {String(tx.type).toLocaleUpperCase()}
                </TableCell>
                <TableCell className=" w-1/6">{tx.category}</TableCell>
                <TableCell className=" w-1fit">₹ {tx.amount}</TableCell>
                <TableCell className="text-right w-max gap-6 flex justify-between items-center">
                  {new Date(tx.date).toISOString().split("T")[0]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="w-full  py-2 flex justify-between items-center">
          <div className="">Latest 10 Transactions</div>
          <Link
            href={"/transactions"}
            className="text-right text-blue-600 underline"
          >
            See more transactions
          </Link>
        </div>
      </div>
    </>
  );
}
