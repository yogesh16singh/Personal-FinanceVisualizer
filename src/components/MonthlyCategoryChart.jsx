import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const MonthlyCategoryChart = ({ transactions }) => {
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const filteredTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    return (
      tx.type === "expense" &&
      txDate.getMonth() === lastMonth.getMonth() &&
      txDate.getFullYear() === lastMonth.getFullYear()
    );
  });

  const categoryTotals = filteredTransactions.reduce((acc, tx) => {
    acc[tx.category] =
      (acc[tx.category] || 0) + Number(parseFloat(tx.amount).toPrecision(2));
    return acc;
  }, {});

  const chartData = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
  }));

  const COLORS = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4CAF50",
    "#FF9800",
    "#9C27B0",
  ];
  if (!transactions || transactions.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <ResponsiveContainer width="100%" className="" height={400}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `₹${Number(value.toFixed(2))}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MonthlyCategoryChart;
