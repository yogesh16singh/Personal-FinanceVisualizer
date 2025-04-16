import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function BudgetVsActualChart({ transactions, categories }) {
  const actualSpending = transactions.reduce((acc, transaction) => {
    acc[transaction.category] =
      (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  const budgetVsActual = categories.map((category) => ({
    name: category.name,
    budget: category.budget,
    actual: actualSpending[category.name] || 0,
  }));

  return (
    <div className="sm:p-6 bg-white p-4 sm:rounded-2xl rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        Budget vs Actual Spending
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={budgetVsActual}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
          <XAxis dataKey="name" tick={{ fill: "#555" }} />
          <YAxis tick={{ fill: "#555" }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", borderRadius: "8px" }}
            formatter={(value, name) => [
              `₹${Number(value.toFixed(2))}`,
              name === "budget" ? "Budget" : "Actual",
            ]}
          />
          <Area
            type="monotone"
            dataKey="budget"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.2}
          />
          <Area
            type="monotone"
            dataKey="actual"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="w-full pt-4 flex justify-center gap-6 flex-wrap">
        <div className="flex items-center gap-3">
          <span
            className={`w-5 h-5 block`}
            style={{ backgroundColor: "#8884d8" }}
          ></span>
          <span className="">Budget</span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`w-5 h-5 block`}
            style={{ backgroundColor: "#82ca9d" }}
          ></span>
          <span className="">Actual</span>
        </div>
      </div>
    </div>
  );
}
