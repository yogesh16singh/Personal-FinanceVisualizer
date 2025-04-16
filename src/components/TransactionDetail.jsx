"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import axios from "axios";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Pagination from "./Pagination";
import { initialState, validateTransaction } from "@/utils/constants";
import TransactionForm from "./TransactionForm";
import CustomDialog from "./CustomDialog";
import { FaEdit } from "react-icons/fa";

function TransactionDetail() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [transactions, setTransactions] = useState([]);
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editTransaction, setEditTransaction] = useState(initialState);
  const [editTransactionMessage, setEditTransactionMessage] =
    useState(initialState);
  const [loading, setLoading] = useState(false);
  const fetchTransactionWithParams = useCallback(async () => {
    try {
      const { data, status } = await axios.get(`/api/transactions`, {
        params: { page, pageSize },
      });

      if (status !== 200 || !data?.transactions) {
        throw new Error("Invalid response structure");
      }

      if (data.transactions && Array.isArray(data.transactions)) {
        setTransactions(data.transactions);
      }
      setTotalTransaction(data.totalTransactions);
    } catch (error) {
      toast.error("Error fetching transactions");
      console.error("Error fetching transactions:", error);
    }
  }, [page, pageSize]);
  const [deleteId, setDeleteId] = useState("");
  const handleChange = (name, value) => {
    setEditTransaction((prev) => ({ ...prev, [name]: value }));
    setEditTransactionMessage((prev) => ({ ...prev, [name]: "" }));
  };
  const handleEditTransaction = async (transactionId) => {
    const { error, name, message } = validateTransaction(editTransaction);
    if (error) {
      return setFormMessage((prev) => ({ ...prev, [name]: message }));
    }
    if (!transactionId) {
      return alert("Select the transaction to edit");
    }
    setLoading(true);
    try {
      const updatedTransaction = await axios.put(
        `/api/transactions?transactionId=${transactionId}`,
        editTransaction
      );
      if (updatedTransaction.status === 200) {
        setEditTransaction(initialState);
        setEditTransactionMessage(initialState);
        await fetchTransactionWithParams();
        setIsDialogOpen(false);
        toast.success("Transaction updated successfully");
      }
    } catch (error) {
      toast.error("Error updating transaction: ", error.message);
      console.error("Error updating transaction:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteTransaction = async (transactionId) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `/api/transactions?transactionId=${transactionId}`
      );
      if (response.status === 200) {
        await fetchTransactionWithParams();
        toast.success("Transaction deleted successfully");
      }
    } catch (error) {
      toast.error("Error deleting transaction");
      console.error("Error deleting transaction:", error.message);
    } finally {
      setLoading(false);
      setDeleteId("");
    }
  };
  useEffect(() => {
    fetchTransactionWithParams();
  }, [fetchTransactionWithParams]);
  return (
    <>
      <CustomDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditTransaction(initialState);
          setEditTransactionMessage(initialState);
        }}
      >
        <h2 className="text-xl font-bold mb-4">Edit Transaction</h2>
        <TransactionForm
          form={editTransaction}
          formMessage={editTransactionMessage}
          handleClick={() => handleEditTransaction(editTransaction._id)}
          handleChange={handleChange}
          loading={loading}
          textbutton="Edit"
          textloading="Updating..."
          icon={<FaEdit />}
        />
      </CustomDialog>
      <CustomDialog
        isOpen={deleteId != ""}
        onClose={() => {
          setDeleteId("");
        }}
      >
        <h2 className="text-xl font-bold mb-4">Delete Transaction</h2>
        <p className="opacity-75">Confirm DELETE transaction</p>
        <Button
          variant=""
          className="w-full mt-4"
          onClick={() => handleDeleteTransaction(deleteId)}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </CustomDialog>
      <Table className="overflow-hidden border relative mt-6 min-w-[800px]">
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
          {transactions.map((tx, idx) => (
            <TableRow
              key={tx._id}
              className="hover:bg-gray-50 bg-gray-100 cursor-pointer"
            >
              <TableCell className="font-medium w-full flex items-center">
                <div className="relative aspect-square min-w-8 p-1 mr-4 inline-flex rounded-full bg-black text-white justify-center items-center">
                  {(page - 1) * pageSize + idx + 1}
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <BsThreeDots size={24} color="black" onClick={() => {}} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Transaction Action</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => {
                        setIsDialogOpen(true);
                        setEditTransaction(tx);
                      }}
                    >
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => setDeleteId(tx._id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>

      <Pagination
        pageSize={pageSize}
        totalTransaction={totalTransaction}
        onPageChange={setPage}
        setPageSize={setPageSize}
      />
    </>
  );
}

export default TransactionDetail;
