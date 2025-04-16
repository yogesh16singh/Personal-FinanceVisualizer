# Personal Finance Visualizer

A simple and interactive web application to track and visualize your personal finances.

## 🚀 Tech Stack

- **Frontend:** Next.js 15, React, shadcn/ui, Recharts , framer-motion, react-icons
- **Backend:** Next.js Server API
- **Database:** MongoDB
- **Deployment:** Vercel

## 🌟 Features

### Stage 1: Basic Transaction Tracking
- Add/Edit/Delete transactions (amount, date, description, type , category)
- Transaction list view
- Monthly expenses bar chart
- Basic form validation

### Stage 2: Categories
- Predefined categories for transactions
- Category-wise pie chart
- Dashboard with summary cards (total income, total expenses, current month ans prev month comparision charts, category breakdown, recent transactions)

### Stage 3: Budgeting
- Set monthly category budgets
- Budget vs actual comparison chart
- Simple spending insights

## 🛠 Setup & Installation

1. **Clone the repository:**

```bash
$ git clone https://github.com/yogesh16singh/Personal-FinanceVisualizer.git
$ cd personal-finance-visualizer
```

2. **Install dependencies:**

```bash
$ npm install
```

3. **Set up environment variables:**

Create a `.env.local` file and add the following:

```env
MONGO_URI=mongodb+srv://your_mongodb_uri
```

4. **Run the development server:**

```bash
$ npm run dev
```

Access the app at `http://localhost:3000`

5. **Build for production:**

```bash
$ npm run build
$ npm start
```

## 📁 Project Structure

```
.
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── savedata
│   │   │   │   └── route.js
│   │   │   └── transactions
│   │   │       └── route.js
│   │   ├── pages
│   │   │   └── transactions.js
│   │   ├── layout.js
│   │   ├── not-found.js
│   │   ├── page.js
│   │   └── styles
│   ├── components
│   ├── lib
│   ├── models
│   ├── utils
├── .env.local
├── next.config.js
├── package.json
└── README.md
```

## 💡 Notes

- Ensure data persists in MongoDB.
- Handle error states gracefully.

---

💻 Built with ❤️ by [Yogesh Singh] 

