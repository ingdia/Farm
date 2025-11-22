import React from "react";
import { motion } from "framer-motion";
import { DollarSign, MapPin, User, Edit, Trash2 } from "lucide-react";

const EquipmentCard = ({ equipment, user, onBookClick, onEditClick, onDeleteClick }) => {
  const isOwner = user && user.id === equipment.owner.id;

  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
    >
      <div className="relative overflow-hidden">
        <img
          src={equipment.images[0]}
          alt={equipment.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {isOwner && (
            <>
              <button
                onClick={() => onEditClick(equipment)}
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              >
                <Edit className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => onDeleteClick(equipment.id)}
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              >
                <Trash2 className="w-4 h-4 text-gray-600" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="p-4">
        <span className="inline-block text-xs text-green-600 bg-green-50 px-2 py-1 rounded font-medium mb-2">
          {equipment.type}
        </span>

        <h3 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2 min-h-[3rem]">
          {equipment.name}
        </h3>

        <div className="flex items-center gap-2 text-xs text-gray-600 mb-3 pb-3 border-b">
          <User className="w-3.5 h-3.5" />
          <span>{equipment.owner.name}</span>
          <span className="text-gray-400">•</span>
          <MapPin className="w-3.5 h-3.5" />
          <span>{equipment.location}</span>
        </div>

        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-green-600">
              ${equipment.dailyRate.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">/ day</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-600">
              ${equipment.hourlyRate.toLocaleString()}
            </span>
            <span className="text-xs text-gray-500">/ hour</span>
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          {!isOwner && (
            <button
              onClick={() => onBookClick(equipment)}
              className="flex-1 py-2 rounded-lg font-medium text-sm bg-green-600 text-white hover:bg-green-700"
            >
              Book Now
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EquipmentCard;
