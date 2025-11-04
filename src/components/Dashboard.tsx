import React, { useState } from "react";
import { RefreshCw, Plus } from "lucide-react";
import { useDashboard } from "../context/DashboardContext";
import Header from "./Header";
import CategorySection from "./CategorySection";
import AddWidgetDrawer from "./AddWidgetDrawer";

const Dashboard: React.FC = () => {
  const { dashboardData, removeWidget, updateCategoryWidgets } = useDashboard();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWidgets, setSelectedWidgets] = useState<Set<string>>(
    new Set()
  );

  const openDrawer = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsDrawerOpen(true);
    const category = dashboardData.categories.find(
      (cat) => cat.id === categoryId
    );
    if (category) {
      setSelectedWidgets(new Set(category.widgets.map((w) => w.id)));
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedWidgets(new Set());
  };

  const toggleWidgetSelection = (widgetId: string) => {
    setSelectedWidgets((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(widgetId)) {
        newSet.delete(widgetId);
      } else {
        newSet.add(widgetId);
      }
      return newSet;
    });
  };

  const handleConfirmSelection = (widgetIds: string[]) => {
    updateCategoryWidgets(selectedCategory, widgetIds);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <main className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">CNAPP Dashboard</h1>
          <div className="flex gap-3">
            <button
              className="bg-white border border-gray-300 p-2 rounded-lg flex items-center text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => window.location.reload()}
            >
              <RefreshCw size={16} />
            </button>
            <button
              className="bg-white border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-colors"
              onClick={() => openDrawer(dashboardData.categories[0].id)}
            >
              Add Widget <Plus size={16} />
            </button>
          </div>
        </div>

        {(searchTerm.trim() === ""
          ? dashboardData.categories
          : dashboardData.categories
              .map((category) => ({
                ...category,
                widgets: category.widgets.filter((widget) => {
                  const q = searchTerm.toLowerCase();
                  const nameMatch = widget.name.toLowerCase().includes(q);
                  const textMatch = widget.text
                    ? widget.text.toLowerCase().includes(q)
                    : false;
                  return nameMatch || textMatch;
                }),
              }))
              .filter((category) => category.widgets.length > 0)
        ).map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            onRemoveWidget={removeWidget}
            onAddWidget={openDrawer}
          />
        ))}
      </main>

      <AddWidgetDrawer
        isOpen={isDrawerOpen}
        selectedCategory={selectedCategory}
        selectedWidgets={selectedWidgets}
        onClose={closeDrawer}
        onConfirm={handleConfirmSelection}
        onToggleWidget={toggleWidgetSelection}
      />
    </div>
  );
};

export default Dashboard;
