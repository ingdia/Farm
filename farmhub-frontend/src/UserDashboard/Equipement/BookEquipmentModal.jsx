import React, { useState } from "react";
import { X, Calendar, DollarSign } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { parseISO } from "date-fns";

const BookEquipmentModal = ({ isOpen, onClose, equipment }) => {
  const [selected, setSelected] = useState();

  if (!isOpen || !equipment) return null;

  const availableDays = equipment.availableDates.map(dateStr => parseISO(dateStr));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{equipment.name}</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex gap-8">
          <img
            src={equipment.images?.[0]}
            alt={equipment.name}
            className="w-1/2 h-auto object-cover rounded-lg"
          />
          <div>
            <p className="text-lg font-semibold mb-2">{equipment.type}</p>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5" />
              <span>{equipment.dailyRate}/day</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5" />
              <span>{equipment.availability}</span>
            </div>
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={setSelected}
              modifiers={{ available: availableDays }}
              modifiersStyles={{
                available: {
                  color: "white",
                  backgroundColor: "#16a34a",
                },
              }}
            />
            <button className="w-full py-2 px-4 bg-green-600 text-white rounded-lg">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookEquipmentModal;
