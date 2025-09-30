import { Tag, Plus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import CustomInput from "@/components/common/CustomInput";
import { Chip } from "@heroui/chip";
import CustomButton from "@/components/common/CustomButton";

export interface AssetTagsData {
  tags: string[];
}

interface AssetTagsSectionProps {
  value: AssetTagsData;
  onChange: (data: AssetTagsData) => void;
}

function AssetTagsSection({
  value,
  onChange,
}: AssetTagsSectionProps) {
  const [tagInput, setTagInput] = useState("");
  const inputRef = useRef<HTMLDivElement>(null);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !value.tags.includes(trimmed)) {
      const newTags = [...value.tags, trimmed];
      onChange({ tags: newTags });
      setTagInput("");
    }
  };

  useEffect(() => {
    const inputElement = inputRef.current?.querySelector("input");
    if (inputElement) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleAddTag();
        }
      };

      inputElement.addEventListener("keydown", handleKeyDown);
      return () => inputElement.removeEventListener("keydown", handleKeyDown);
    }
  }, [tagInput, value.tags]); // ✅ Added value.tags to dependency array

  const removeTag = (tagToRemove: string) => {
    const newTags = value.tags.filter((tag) => tag !== tagToRemove);
    onChange({ tags: newTags });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-cyan-50 rounded-lg">
          <Tag className="w-4 h-4 text-cyan-600" />
        </div>
        <h2 className="text-sm font-semibold text-cyan-600">Asset Tags</h2>
      </div>

      {/* Input + Button */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1 px-1">
            Add New Tags
          </label>
          <div className="flex items-center gap-2">
            <div ref={inputRef} className="flex-1">
              <CustomInput
                variant="bordered"
                placeholder="Type a tag name..."
                value={tagInput}
                onChange={setTagInput}
                classNames={{
                  inputWrapper: "w-full",
                  base: "w-full",
                  input: "text-sm font-semibold"
                }}
                size="sm"
              />
            </div>

            <CustomButton
              label="Add"
              endContent={<Plus className="w-4 h-4" />}
              variant="flat"
              className="border-cyan-600 text-cyan-600 font-semibold"
              onPress={handleAddTag}
              size="sm"
              radius="sm"
            />
          </div>
        </div>

        {/* Tags list */}
        {value.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {value.tags.map((tag) => (
              <Chip
                key={tag}
                size="sm"
                variant="flat"
                onClose={() => removeTag(tag)}
                classNames={{
                  base: "max-w-full bg-blue-100 text-gray-900 border border-gray-200 hover:bg-blue-200 transition-colors duration-200",
                  content: "truncate text-xs font-medium px-2 max-w-[120px]",
                  closeButton:
                    "text-gray-400 hover:text-gray-600 hover:bg-gray-300/30 rounded-full transition-all duration-200",
                }}
              >
                {tag}
              </Chip>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AssetTagsSection;