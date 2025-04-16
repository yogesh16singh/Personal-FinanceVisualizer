import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MonthlyIncomeChart = ({ transactions }) => {
  const income = transactions
    .filter((tx) => tx.type === "income")
    .reduce((acc, tx) => {
      const date = new Date(tx.date);
      const monthYear = `${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}/${String(date.getFullYear()).slice(-2)}`;
      acc[monthYear] = (acc[monthYear] || 0) + tx.amount;
      return acc;
    }, {});

  const chartData = Object.keys(income).map((monthYear) => ({
    monthYear,
    amount: income[monthYear],
  }));
  if (!transactions || transactions.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="monthYear" />
        <YAxis />
        <Tooltip formatter={(value) => `₹${Number(value.toFixed(2))}`} />
        <Bar dataKey="amount" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyIncomeChart;
