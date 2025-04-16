export const initialState = {
  amount: "",
  date: "",
  description: "",
  type: "",
  category: "",
};
export const validateTransaction = (form) => {
  if (!form.amount) {
    return { error: true, name: "amount", message: "Amount is required" };
  }
  if (!form.date) {
    return { error: true, name: "date", message: "Date is required" };
  }
  if (!form.description) {
    return {
      error: true,
      name: "description",
      message: "Description is required",
    };
  }
  if (!form.type) {
    return {
      error: true,
      name: "type",
      message: "Transaction Type is required",
    };
  }
  if (!form.category) {
    return {
      error: true,
      name: "category",
      message: "Transaction Category is required",
    };
  }
  return { error: false };
};
