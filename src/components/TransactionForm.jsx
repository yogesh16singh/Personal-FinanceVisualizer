"use client";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { DatePicker } from "./DatePicker";

export default function TransactionForm({
  form,
  formMessage,
  handleChange,
  handleClick,
  loading,
  textbutton,
  textloading,
  icon,
}) {
  const [customCategory, setCustomCategory] = useState(form.category);

  return (
    <div className="grid grid-cols-1 gap-4 max-h-[70vh] overflow-auto  px-1">
      <div className="space-y-1">
        <Label
          htmlFor="amount"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Amount
        </Label>
        <Input
          id="amount"
          name="amount"
          placeholder="Enter amount"
          value={form.amount}
          onChange={({ target }) => handleChange(target.name, target.value)}
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 
                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                     rounded-lg px-4 py-2 text-gray-900 dark:text-gray-100"
        />
        {formMessage.amount && (
          <p className="text-red-500 text-sm">{formMessage.amount}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label
          htmlFor="date"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Date
        </Label>
        <DatePicker onChange={handleChange} date={form.date} />
        {formMessage.date && (
          <p className="text-red-500 text-sm">{formMessage.date}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label
          htmlFor="description"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Description
        </Label>
        <Input
          id="description"
          name="description"
          placeholder="Enter description"
          value={form.description}
          onChange={({ target }) => handleChange(target.name, target.value)}
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 
                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                     rounded-lg px-4 py-2 text-gray-900 dark:text-gray-100"
        />
        {formMessage.description && (
          <p className="text-red-500 text-sm">{formMessage.description}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Transaction Type
        </Label>
        <Select
          value={form.type}
          onValueChange={(value) => handleChange("type", value)}
        >
          <SelectTrigger
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 
                                   focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                                   rounded-lg px-4 py-2 text-gray-900 dark:text-gray-100"
          >
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">💰 Income</SelectItem>
            <SelectItem value="expense">📉 Expense</SelectItem>
          </SelectContent>
        </Select>
        {formMessage.type && (
          <p className="text-red-500 text-sm">{formMessage.type}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Transaction Category
        </Label>

        <Select
          name="category"
          value={
            !["shopping", "rents", "food", "travel"].includes(form.category)
              ? "other"
              : form.category
          }
          onValueChange={(value) => handleChange("category", value)}
        >
          <SelectTrigger
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 
                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                     rounded-lg px-4 py-2 text-gray-900 dark:text-gray-100"
          >
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="shopping">🛍️ Shopping</SelectItem>
            <SelectItem value="rents">🏠 Rent</SelectItem>
            <SelectItem value="food">🍔 Food</SelectItem>
            <SelectItem value="travel">✈️ Travel</SelectItem>
            <SelectItem value="other">➕ Other</SelectItem>
          </SelectContent>
        </Select>
        {(form.category === "other" ||
          !["shopping", "rents", "food", "travel"].includes(form.category)) && (
          <div className="mt-2">
            <Input
              placeholder="Enter custom category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              onBlur={() => handleChange("category", customCategory)}
              className="border border-gray-300 dark:border-gray-700 mt-2 bg-white dark:bg-gray-900 
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                       rounded-lg px-4 py-2 text-gray-900 dark:text-gray-100"
            />
          </div>
        )}

        {formMessage.category && (
          <p className="text-red-500 text-sm">{formMessage.category}</p>
        )}
      </div>
      <Button
        onClick={handleClick}
        disabled={loading}
        className="flex items-center gap-2 bg-black dark:bg-blue-500 hover:bg-gray-800 disabled:opacity-80 dark:hover:bg-blue-400 text-white px-4 py-2 rounded-lg"
      >
        {icon} {loading ? textloading : textbutton}
      </Button>
    </div>
  );
}
