import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { FaArrowDownLong } from "react-icons/fa6";
import { TbShoppingBag } from "react-icons/tb";
import { format } from "date-fns";

const calculateMonthlyIncome = (transactions, monthOffset) => {
  const targetMonth = new Date();
  targetMonth.setMonth(targetMonth.getMonth() - monthOffset);

  return transactions
    .filter(
      (tx) =>
        format(new Date(tx.date), "MM/yy") === format(targetMonth, "MM/yy")
    )
    .reduce((sum, tx) => (tx.type === "income" ? sum + tx.amount : sum), 0);
};

const calculateMonthlyExpense = (transactions, monthOffset) => {
  const targetMonth = new Date();
  targetMonth.setMonth(targetMonth.getMonth() - monthOffset);
  return transactions
    .filter(
      (tx) =>
        format(new Date(tx.date), "MM/yy") === format(targetMonth, "MM/yy")
    )
    .reduce((sum, tx) => (tx.type === "expense" ? sum + tx.amount : sum), 0);
};

const IncomeExpenseChart = ({ transactions }) => {
  const income = [
    {
      value: calculateMonthlyIncome(transactions, 1),
      monthYear: format(
        new Date().setMonth(new Date().getMonth() - 1),
        "MM/yy"
      ),
      color: "#4CAF50",
    },
    {
      value: calculateMonthlyIncome(transactions, 0),
      monthYear: format(new Date(), "MM/yy"),
      color: "#2196F3",
    },
  ];

  const expense = [
    {
      value: calculateMonthlyExpense(transactions, 1),
      monthYear: format(
        new Date().setMonth(new Date().getMonth() - 1),
        "MM/yy"
      ),
      color: "#FF5722",
    },
    {
      value: calculateMonthlyExpense(transactions, 0),
      monthYear: format(new Date(), "MM/yy"),
      color: "#E91E63",
    },
  ];
  const ChartCard = ({ title, icon, data, color }) => {
    const percentageChange = (
      ((data[1].value - data[0].value) / data[0].value) *
      100
    ).toFixed(2);

    return (
      <Card className="flex">
        <CardContent className="p-4 w-full">
          <span className="w-10 h-10 justify-center items-center bg-gray-100 rounded-lg flex text-blue-800 cursor-pointer">
            {icon}
          </span>
          <p className="text-md text-gray-500 pt-1 pb-2">{title}</p>
          <p className="text-2xl font-bold pb-2">₹{data[1].value.toFixed(2)}</p>
          <div className="flex items-center gap-1.5">
            <div className={`w-[2px] h-6 ${color}`}></div>
            <div className="text-sm">
              {`${isNaN(percentageChange) ? 0 : percentageChange}% ${
                Number(percentageChange) < 0 ? "Decrease" : "Increase"
              }`}
            </div>
          </div>
          <div className="w-full pt-4 flex gap-6 flex-wrap">
            {data.map((item, idx) => (
              <div className="flex items-center gap-3" key={idx}>
                <span
                  className={`w-5 h-5 block`}
                  style={{ backgroundColor: item?.color }}
                ></span>
                <span className="">{item?.monthYear}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <div className="w-full">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie
                  data={[data[0]]}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={45}
                  dataKey="value"
                  startAngle={90}
                  endAngle={
                    90 +
                    (data[0].value / Math.max(data[0].value, data[1].value)) *
                      360
                  }
                >
                  <Cell fill={data[0].color} />
                </Pie>
                <Pie
                  data={[data[1]]}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={60}
                  dataKey="value"
                  startAngle={90}
                  endAngle={
                    90 +
                    (data[1].value / Math.max(data[0].value, data[1].value)) *
                      360
                  }
                >
                  <Cell fill={data[1].color} />
                </Pie>
                <Tooltip
                  formatter={(value, props) => [`₹${Number(value.toFixed(2))}`]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    );
  };
  if (!transactions || transactions.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-4 mb-6">
      <ChartCard
        title="Income"
        icon={<FaArrowDownLong size={22} />}
        data={income}
        color="bg-yellow-300"
      />
      <ChartCard
        title="Expense"
        icon={<TbShoppingBag size={22} />}
        data={expense}
        color="bg-blue-800"
      />
    </div>
  );
};

export default IncomeExpenseChart;
