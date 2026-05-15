import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "./ui/dialog";
import { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-context-menu";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { updateProduct } from "../services/products/updateProduct";
import type { Product } from "../types/product.type";
import { createProduct } from "../services/products/createProduct";
import ImageUpload from "./ImageUpload";
import { Loader2 } from "lucide-react";
import { api } from "../lib/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  product: Product | null;
  isEdit?: boolean;
}
interface Category {
  id: number;
  name: string;
}

const emptyProduct: Product = {
  id: 0,
  name: "",
  price: 0,
  stock: 0,
  imageUrl: "",
  discount: 0,
  category: {
    name: "",
  },
  description: ""
};

const ProductModal = ({ isOpen, onClose, onSave, product, isEdit }: Props) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draft, setDraft] = useState<Product>(product ?? emptyProduct);
  const [categories, setCategories] = useState<Category[]>([]);

  const formData = product && isEdit ? { ...draft, id: product.id } : draft;

  useEffect(() => {
    if (!isOpen) return;
    const fetchCategories = async () => {
      const response = await api.get("/categories");
      setCategories(response.data.data);
    };
    fetchCategories();
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (isEdit) {
      const res = await updateProduct(formData.id, formData, imageFile)
      if (res.success) {
        onSave()
      }
    } else {
      const res = await createProduct(formData, imageFile)
      if (res.success) {
        onSave()
      }
    }
    console.log(formData, imageFile)
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent size="2xl" className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
          <DialogDescription>
            Keep product details accurate for cashier checkout and inventory reports.
          </DialogDescription>


        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Header Section (Optional if not in a Dialog) */}


          <div className="grid gap-6">
            {/* Product Name - Full Width */}
            <div className="w-full" >
              <ImageUpload
                key={formData.id || "new"}
                initialImage={formData.imageUrl}
                onImageChange={(file) => {
                  setImageFile(file);
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-left text-sm font-semibold text-slate-700">Product Name</Label>
              <Input
                id="name"
                className="col-span-3 h-10"
                value={formData.name}
                onChange={(e) => setDraft({ ...formData, name: e.target.value })}
                placeholder="Product Name"
              />

            </div>

            {/* Price and Stock - Two Column Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label className="text-sm font-semibold text-slate-700">Price ($)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1.25 text-muted-foreground text-sm">$</span>
                  <Input
                    id="price"
                    type="number"
                    className="h-10 pl-7"
                    value={formData.price}
                    onChange={(e) => setDraft({ ...formData, price: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label className="text-sm font-semibold text-slate-700">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  className="h-10"
                  value={formData.stock}
                  onChange={(e) => setDraft({ ...formData, stock: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label className="text-sm font-semibold text-slate-700">Category</Label>
              <select
                value={formData.categoryId ?? ""}
                onChange={(e) => setDraft({ ...formData, categoryId: Number(e.target.value) })}
                className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-slate-950"
                required
              >
                <option value="" disabled>Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Description - Textarea adds a professional feel */}
            <div className="grid gap-2">
              <Label className="text-sm font-semibold text-slate-700">Description (Optional)</Label>
              <textarea
                id="description"
                className="flex min-h-[90px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.description || ""}
                onChange={(e) => setDraft({ ...formData, description: e.target.value })}
                placeholder="Briefly describe the product..."
              />
            </div>
          </div>

          <DialogFooter className="border-t pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="px-4">
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  );
};

export default ProductModal;
