import React, { useState } from "react";
import { X, Search, Plus } from "lucide-react";
import type { Widget } from "../types/dashboard";
import { allAvailableWidgets } from "../data/mockData";

interface AddWidgetDrawerProps {
  isOpen: boolean;
  selectedCategory: string;
  selectedWidgets: Set<string>;
  onClose: () => void;
  onConfirm: (widgetIds: string[]) => void;
  onToggleWidget: (widgetId: string) => void;
}

const AddWidgetDrawer: React.FC<AddWidgetDrawerProps> = ({
  isOpen,
  selectedCategory,
  selectedWidgets,
  onClose,
  onConfirm,
  onToggleWidget,
}) => {
  const [activeTab, setActiveTab] = useState("CSPM");
  const [drawerSearchTerm, setDrawerSearchTerm] = useState("");
  const [newWidgetName, setNewWidgetName] = useState("");
  const [newWidgetText, setNewWidgetText] = useState("");

  const handleAddWidget = () => {
    if (!newWidgetName.trim() || !newWidgetText.trim()) return;

    const newWidget: Widget = {
      id: `widget-custom-${Date.now()}`,
      name: newWidgetName,
      text: newWidgetText,
      type: "text",
    };

    allAvailableWidgets.push(newWidget);
    onToggleWidget(newWidget.id);

    setNewWidgetName("");
    setNewWidgetText("");
  };

  const handleConfirmSelection = () => {
    onConfirm(Array.from(selectedWidgets));
    onClose();
  };

  const filteredWidgets = allAvailableWidgets.filter((widget) =>
    widget.name.toLowerCase().includes(drawerSearchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed top-0 bottom-0 right-0 w-full sm:w-[500px] lg:w-[550px] bg-white shadow-xl z-50 flex flex-col transition-transform duration-300 translate-x-0">
        <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-blue-900 text-white">
          <h2 className="text-lg font-semibold">Add Widget</h2>
          <button
            className="text-white hover:bg-blue-800 p-1 rounded transition-colors"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <p className="px-6 py-4 text-sm text-gray-600">
          Personalise your dashboard by adding the following widget
        </p>

        <div className="flex gap-2 px-6 border-b border-gray-200">
          {["CSPM", "CWPP", "Image", "Ticket"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-blue-900 text-blue-900 font-semibold"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2.5 rounded-lg border border-gray-200 mb-4">
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search widgets..."
              className="bg-transparent border-none outline-none text-sm w-full"
              value={drawerSearchTerm}
              onChange={(e) => setDrawerSearchTerm(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
              Available Widgets ({filteredWidgets.length})
            </h3>
            {filteredWidgets.length > 0 ? (
              <div className="space-y-2">
                {filteredWidgets.map((widget) => (
                  <label
                    key={widget.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={selectedWidgets.has(widget.id)}
                      onChange={() => onToggleWidget(widget.id)}
                      className="w-4 h-4 mt-0.5 cursor-pointer flex-shrink-0"
                    />
                    <div className="flex flex-col gap-1 flex-1">
                      <span className="text-sm font-medium text-gray-900">
                        {widget.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {widget.text || "Dashboard widget"}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 text-sm py-6">
                No widgets found matching "{drawerSearchTerm}"
              </p>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold mb-3 text-gray-900">
              Create Custom Widget
            </h3>
            <input
              type="text"
              placeholder="Widget Name"
              value={newWidgetName}
              onChange={(e) => setNewWidgetName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Widget Text"
              value={newWidgetText}
              onChange={(e) => setNewWidgetText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-3 resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <button
              className={`w-full px-4 py-2.5 bg-blue-900 text-white rounded-lg text-sm font-medium transition-all ${
                !newWidgetName.trim() || !newWidgetText.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-800"
              }`}
              onClick={handleAddWidget}
              disabled={!newWidgetName.trim() || !newWidgetText.trim()}
            >
              Create Widget
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-white">
          <button
            className="px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
            onClick={handleConfirmSelection}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default AddWidgetDrawer;
