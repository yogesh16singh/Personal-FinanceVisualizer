import { toast } from "sonner";

const API_URL = "/api/transactions";

export const fetchTransactions = async (page = 1, pageSize = 10) => {
  try {
    const response = await axios.get(
      `${API_URL}?page=${page}&pageSize=${pageSize}`
    );

    if (!response.data || !response.data.transactions) {
      throw new Error("Invalid response structure");
    }

    const { transactions, totalTransactions } = response.data;

    console.log("Fetched Transactions:", transactions);

    return {
      transactions, // Return array directly instead of JSON string
      totalTransactions,
    };
  } catch (error) {
    toast.error("Error fetching transactions");
    console.error("Error fetching transactions:", error);

    return { transactions: [], totalTransactions: 0 };
  }
};

export async function addTransaction(transaction) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });

    if (!response.ok) {
      throw new Error("Failed to add transaction");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding transaction:", error);
    return null;
  }
}
