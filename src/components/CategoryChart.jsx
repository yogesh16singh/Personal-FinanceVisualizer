import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CategoryWisePieChart = ({ transactions }) => {
  const categoryData = transactions.reduce((acc, tx) => {
    if (tx.type === "expense") {
      acc[tx.category] =
        (acc[tx.category] || 0) + Number(parseFloat(tx.amount).toPrecision(2));
    }
    return acc;
  }, {});

  const chartData = Object.keys(categoryData).map((category) => ({
    name: category,
    value: categoryData[category],
  }));

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28FF2",
    "#F28FA2",
  ];
  if (!transactions || transactions.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `₹${Number(value.toFixed(2))}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoryWisePieChart;
