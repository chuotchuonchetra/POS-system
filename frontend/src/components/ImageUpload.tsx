import { useMemo, useState } from 'react';
import { X, RefreshCw, ImageIcon } from 'lucide-react'; // Using Lucide icons
interface Props {
    initialImage: string;
    onImageChange: (image: File | null) => void;
}
const ImageUpload = ({ initialImage, onImageChange }: Props) => {
    // 1. Initialize state with the existing product image URL
    const [image, setImage] = useState<string>(initialImage);
    const [isDragging, setIsDragging] = useState(false);
    const previewUrl = useMemo(() => image, [image]);

    const handleFile = (file: File | undefined) => {
        if (file) {
            onImageChange(file);
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="w-full">
            <label className="mb-2 block text-sm font-medium text-slate-700">
                Product Image
            </label>

            <div
                className={`group relative flex h-44 w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed transition
          ${isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 bg-slate-50'}
          ${!image ? 'hover:border-slate-400 hover:bg-white' : 'border-slate-200'}
        `}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    handleFile(e.dataTransfer.files?.[0]);
                }}
            >
                {image ? (
                    <>
                        {/* This renders either the old URL or the new base64 preview */}
                        <img
                            src={previewUrl}
                            alt="Product preview"
                            className="h-full w-full object-cover"
                        />

                        {/* Edit Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-slate-950/45 opacity-0 transition-opacity group-hover:opacity-100">
                            <label className="cursor-pointer rounded-md bg-white p-2 shadow-sm hover:bg-slate-100">
                                <RefreshCw size={18} className="text-slate-700" />
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                onChange={(e) => handleFile(e.target.files?.[0])}
                                />
                            </label>
                            <button
                                type="button"
                                onClick={() => {
                                    setImage("");
                                    onImageChange(null);
                                }}
                                className="rounded-md bg-red-600 p-2 shadow-sm hover:bg-red-700"
                            >
                                <X size={18} className="text-white" />
                            </button>
                        </div>
                    </>
                ) : (
                    /* Empty/Upload State */
                    <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center">
                        <div className="mb-2 rounded-lg bg-white p-3 text-slate-400 shadow-sm">
                            <ImageIcon size={24} />
                        </div>
                        <span className="text-xs font-semibold text-slate-500">Add image</span>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFile(e.target.files?.[0])}
                        />
                    </label>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
