import React from "react";
import { Plus } from "lucide-react";
import type { Category } from "../types/dashboard";
import WidgetCard from "./WidgetCard";

interface CategorySectionProps {
  category: Category;
  onRemoveWidget: (categoryId: string, widgetId: string) => void;
  onAddWidget: (categoryId: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  onRemoveWidget,
  onAddWidget,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-base font-semibold mb-4 text-gray-900">
        {category.name}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {category.widgets.map((widget) => (
          <WidgetCard
            key={widget.id}
            widget={widget}
            categoryId={category.id}
            onRemove={onRemoveWidget}
          />
        ))}
        <div
          className="bg-white rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center min-h-[180px] cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all"
          onClick={() => onAddWidget(category.id)}
        >
          <Plus size={24} className="text-gray-400" />
          <span className="text-sm text-gray-500 font-medium mt-2">
            Add Widget
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
