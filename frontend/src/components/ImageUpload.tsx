import { useEffect, useState } from 'react';
import { X, RefreshCw, ImageIcon } from 'lucide-react'; // Using Lucide icons
interface Props {
    initialImage: string | File;
    onImageChange: (image: string | File) => void;
}
const ImageUpload = ({ initialImage, onImageChange }: Props) => {
    // 1. Initialize state with the existing product image URL
    const [image, setImage] = useState(initialImage);
    const [isDragging, setIsDragging] = useState(false);

    // 2. Sync state if the initialImage prop changes (e.g., selecting a different product)
    useEffect(() => {
        setImage(initialImage);
    }, [initialImage]);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onImageChange(file);
            setImage(URL.createObjectURL(file));
            onImageChange(file);
        }
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
            </label>

            <div
                className={`relative group w-48 h-48 border-2 border-dashed rounded-xl transition-all flex flex-col items-center justify-center overflow-hidden
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}
          ${!image ? 'hover:border-blue-400 hover:bg-blue-50' : 'border-none'}
        `}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    handleFile(e as any);
                }}
            >
                {image ? (
                    <>
                        {/* This renders either the old URL or the new base64 preview */}
                        <img
                            src={image as string}
                            alt="Product preview"
                            className="w-full h-full object-cover"
                        />

                        {/* Edit Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <label className="cursor-pointer p-2 bg-white rounded-full hover:bg-gray-100 shadow-lg">
                                <RefreshCw size={18} className="text-gray-700" />
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleFile(e)}
                                />
                            </label>
                            <button
                                type="button"
                                onClick={() => setImage(null)}
                                className="p-2 bg-red-500 rounded-full hover:bg-red-600 shadow-lg"
                            >
                                <X size={18} className="text-white" />
                            </button>
                        </div>
                    </>
                ) : (
                    /* Empty/Upload State */
                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                        <div className="p-3 bg-white rounded-full shadow-sm mb-2 text-gray-400">
                            <ImageIcon size={24} />
                        </div>
                        <span className="text-xs font-semibold text-gray-500">Add Image</span>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFile(e as any)}
                        />
                    </label>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;