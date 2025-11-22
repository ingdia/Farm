import React, { useState } from "react";
import { dummyEquipment } from "./dummyData";
import EquipmentCard from "./EquipmentCard";
import PostEquipmentModal from "./PostEquipmentModal";
import BookEquipmentModal from "./BookEquipmentModal";
import EditEquipmentModal from "./EditEquipmentModal";
import { useAuthContext } from "../../website/context/auth/AuthProvider";

const EquipementDash = () => {
  const { user } = useAuthContext();
  const [equipment, setEquipment] = useState(dummyEquipment);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const handleAddEquipment = (newEquipment) => {
    setEquipment((prev) => [...prev, newEquipment]);
  };

  const handleEditEquipment = (editedEquipment) => {
    setEquipment((prev) =>
      prev.map((item) =>
        item.id === editedEquipment.id ? editedEquipment : item
      )
    );
  };

  const handleDeleteEquipment = (id) => {
    setEquipment((prev) => prev.filter((item) => item.id !== id));
  };

  const handleBookClick = (equipment) => {
    setSelectedEquipment(equipment);
    setIsBookModalOpen(true);
  };

  const handleEditClick = (equipment) => {
    setSelectedEquipment(equipment);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen font-sanserif bg-gray-50 pt-50 ">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-6">
        <div className="flex justify-between items-center mt-8">
          <h1 className="text-3xl font-bold text-gray-800">Equipment Dashboard</h1>
          {user && (
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="py-2 px-4 bg-green-600 text-white rounded-lg"
            >
              Post Equipment
            </button>
          )}
        </div>
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8 gap-5">
          {equipment.map(item => (
            <EquipmentCard
              key={item.id}
              equipment={item}
              user={user}
              onBookClick={handleBookClick}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteEquipment}
            />
          ))}
        </main>
      </div>
      <PostEquipmentModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onAddEquipment={handleAddEquipment}
        user={user}
      />
      <BookEquipmentModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        equipment={selectedEquipment}
      />
      <EditEquipmentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        equipment={selectedEquipment}
        onEditEquipment={handleEditEquipment}
      />
    </div>
  );
};

export default EquipementDash;
