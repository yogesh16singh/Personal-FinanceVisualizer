import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

export default function AddEditCategoryDialog({
  isOpen,
  onClose,
  category,
  onSuccess,
}) {
  const [formData, setFormData] = useState({ name: "", budget: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (category) {
      setFormData({ name: category.name, budget: category.budget });
    } else {
      setFormData({ name: "", budget: "" });
    }
  }, [category]);

  const validate = () => {
    if (!formData.name.trim()) return "Category name is required";
    if (
      !formData.budget ||
      isNaN(formData.budget) ||
      Number(formData.budget) <= 0
    )
      return "Valid budget is required";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError("");
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) return setError(validationError);

    try {
      if (category) {
        await axios.put(`/api/category?id=${category._id}`, formData);
        toast.success("Category updated successfully!");
      } else {
        await axios.post("/api/category", formData);
        toast.success("Category added successfully!");
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.log(error);
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to save category.");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Add Category"}
          </DialogTitle>
        </DialogHeader>
        <Input
          name="name"
          placeholder="Category Name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          name="budget"
          placeholder="Budget"
          type="number"
          value={formData.budget}
          onChange={handleChange}
        />
        {error && <p className="text-red-500">{error}</p>}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{category ? "Update" : "Add"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
