import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

const MonthlyExpensesChart = ({
  transactions,
  filterType = "expense",
  barColor = "#8884d8",
}) => {
  if (!transactions || transactions.length === 0) {
    return <p>No data available.</p>;
  }

  const expenses = transactions
    .filter((tx) => tx.type === filterType)
    .reduce((acc, tx) => {
      const monthYear = format(new Date(tx.date), "MM/yy");
      acc[monthYear] = (acc[monthYear] || 0) + tx.amount;
      return acc;
    }, {});

  const chartData = Object.keys(expenses)
    .map((monthYear) => ({ monthYear, amount: expenses[monthYear] }))
    .sort(
      (a, b) => new Date(`01/${b.monthYear}`) - new Date(`01/${a.monthYear}`)
    );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="monthYear" />
        <YAxis tickFormatter={(value) => `₹${value}`} />
        <Tooltip formatter={(value) => `₹${Number(value.toFixed(2))}`} />
        <Bar dataKey="amount" fill={barColor} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyExpensesChart;
