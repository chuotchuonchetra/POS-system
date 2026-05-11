import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "./ui/dialog";
import { useState, useEffect } from "react";
import { Label } from "@radix-ui/react-context-menu";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { updateProduct } from "../services/products/updateProduct";
import type { Product } from "../types/product.type";
import { createProduct } from "../services/products/createProduct";
import ImageUpload from "./ImageUpload";
import { Loader2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  product: any;
  isEdit?: boolean;
}
const ProductModal = ({ isOpen, onClose, onSave, product, isEdit }: Props) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Product>({
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
  });

  useEffect(() => {
    if (product) {
      setFormData({ ...product });
    } else {
      setFormData({ name: "", price: 0, stock: 0, imageUrl: "", discount: 0, category: { name: "" }, description: "", id: 0 });
    }
  }, [product, isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEdit) {
      console.log("update product", formData)

      const res = await updateProduct(formData.id, formData, imageFile!)
      console.log('update', res)
      if (res.success) {
        setIsSubmitting(true);
      }
    } else {
      console.log('new product', formData)

      const res = await createProduct(formData)
      if (res.success) {
        setIsSubmitting(true);
      }
      console.log('create', res)
    }
    onSave()
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent size="2xl">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
          <DialogDescription>
            View detailed information and specifications for this item.
          </DialogDescription>


        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Header Section (Optional if not in a Dialog) */}


          <div className="grid gap-6">
            {/* Product Name - Full Width */}
            <div className="flex justify-center w-full" >
              <ImageUpload
                initialImage={formData.imageUrl}
                onImageChange={(file) => {
                  setImageFile(file as File);
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-left font-semibold">Product Name</Label>
              <Input
                id="name"
                className="col-span-3"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Product Name"
              />

            </div>

            {/* Price and Stock - Two Column Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label className="font-semibold">Price ($)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1.25 text-muted-foreground text-sm">$</span>
                  <Input
                    id="price"
                    type="number"
                    className="pl-7"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label className="font-semibold">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                />
              </div>
            </div>

            {/* Description - Textarea adds a professional feel */}
            <div className="grid gap-2">
              <Label className="font-semibold">Description (Optional)</Label>
              <textarea
                id="description"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Briefly describe the product..."
              />
            </div>
          </div>

          <DialogFooter className="pt-4 border-t">
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