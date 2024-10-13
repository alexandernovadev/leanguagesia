import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { CardList } from "./CardList";
import { Modal } from "../../shared/Modal";
import { FormFilters } from "./FormFilters";
import { MainLayout } from "../../shared/Layouts/MainLayout";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <MainLayout>
      <div className="sticky top-0 z-10 bg-gradient-to-b from-black-800 to-transparent p-4">
        <div className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-customBlack-200 rounded-lg py-2 pl-10 pr-4"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-700 w-5 h-5" />
          </div>
          <button
            onClick={toggleModal}
            className="bg-customBlack-200 p-2 rounded-lg"
          >
            <SlidersHorizontal className="text-green-700 w-5 h-5" />
          </button>
        </div>
      </div>
      <main className="flex-1 p-4 pb-20">
        <CardList />
      </main>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <FormFilters />
      </Modal>
    </MainLayout>
  );
}
