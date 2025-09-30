// ImagesDocumentsSection.tsx
import { Card } from "@heroui/card";
import { FileText, ImageIcon, Upload, X } from "lucide-react";
import { useEffect } from "react";

// types/assetMedia.ts
export interface AssetImage {
  id: string;
  file: File;
  url: string; // object URL
}

export interface AssetDocument {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
}

export interface ImagesDocumentsData {
  images: AssetImage[];
  documents: AssetDocument[];
}

interface ImagesDocumentsSectionProps {
  value: ImagesDocumentsData;
  onChange: (data: ImagesDocumentsData) => void;
}

function ImagesDocumentsSection({
  value,
  onChange,
}: ImagesDocumentsSectionProps) {
  useEffect(() => {
    return () => {
      value.images.forEach(img => URL.revokeObjectURL(img.url));
    };
  }, [value.images]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newImages: AssetImage[] = Array.from(files).map(file => ({
        id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        url: URL.createObjectURL(file)
      }));
      
      onChange({
        ...value,
        images: [...value.images, ...newImages]
      });
    }
    
    // Reset input value to allow re-uploading same file
    if (event.target) {
      event.target.value = "";
    }
  };

  const handleDeleteImage = (id: string) => {
    const updatedImages = value.images.filter(img => img.id !== id);
    // Revoke the object URL of the deleted image
    const deletedImage = value.images.find(img => img.id === id);
    if (deletedImage) {
      URL.revokeObjectURL(deletedImage.url);
    }
    
    onChange({
      ...value,
      images: updatedImages
    });
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newDocuments: AssetDocument[] = Array.from(files).map(file => ({
        id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type
      }));
      
      onChange({
        ...value,
        documents: [...value.documents, ...newDocuments]
      });
    }
    
    if (event.target) {
      event.target.value = "";
    }
  };

  return (
    <Card className="p-6 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="p-2 bg-purple-50 rounded-lg">
          <FileText className="w-4 h-4 text-violet-600" />
        </span>
        <h2 className="text-sm font-semibold text-violet-600">Images & Documents</h2>
      </div>

      {/* Asset Images Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <ImageIcon className="w-4 h-4 text-violet-700" />
          <h3 className="text-sm font-medium text-gray-700">Asset Images</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Display existing images */}
          {value.images.map((image) => (
            <div key={image.id} className="relative w-16 h-16 border border-gray-300 rounded-lg overflow-hidden">
              <img 
                src={image.url} 
                alt="Uploaded" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLImageElement).src = "/placeholder-image.png";
                }}
              />
              <button 
                onClick={() => handleDeleteImage(image.id)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                aria-label="Delete image"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          {/* Add Image button */}
          <label className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="text-center">
              <ImageIcon className="w-4 h-4 text-gray-500 mx-auto mb-1" />
              <p className="text-xs text-gray-600">Add Image</p>
            </div>
          </label>
        </div>
      </div>

      {/* Documents Section */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-5">Documents</h3>
        
        {/* Display uploaded documents */}
        {value.documents.length > 0 ? (
          <div className="space-y-2">
            {value.documents.map(doc => (
              <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 truncate max-w-xs">{doc.name}</p>
                    <p className="text-xs text-gray-500">
                      {(doc.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    onChange({
                      ...value,
                      documents: value.documents.filter(d => d.id !== doc.id)
                    });
                  }}
                  className="text-red-500 hover:text-red-700 bg-red-100 p-1 rounded-sm"
                  aria-label="Delete document"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : null}

        {/* Upload area */}
        <label className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-5 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer block">
          <input 
            type="file" 
            accept=".pdf,.doc,.docx,.txt" 
            multiple 
            onChange={handleDocumentUpload}
            className="hidden"
          />
          <div className="w-12 h-12 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
            <Upload className="w-6 h-6 text-gray-500" />
          </div>
          <p className="mb-2 text-sm font-semibold">
            <span className="cursor-pointer text-blue-600">Upload files</span> or drag and drop
          </p>
          <p className="text-gray-500 text-xs font-semibold">PDF, DOC up to 10MB</p>
        </label>
      </div>
    </Card>
  );
}

export default ImagesDocumentsSection;