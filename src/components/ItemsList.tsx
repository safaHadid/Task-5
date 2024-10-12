import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from './Pagination';
import DeleteDialog from './DeleteDialog';

interface Item {
  id: number;
  name: string;
  image_url: string;
}

interface ItemsListProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const ItemsList = ({ items, setItems }: ItemsListProps) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 8;

  const openDeleteDialog = (item: Item) => {
    setSelectedItem(item);
    setShowDialog(true);
  };

  const handleDelete = () => {
    if (selectedItem) {
      axios
        .delete(`https://test1.focal-x.com/api/items/${selectedItem.id}`, {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
            Accept: 'application/json',
          },
        })
        .then(() => {
          setItems((prevItems) => prevItems.filter((item) => item.id !== selectedItem.id));
          setShowDialog(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
    setSelectedItem(null);
  };

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const currentItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-3 p-4">
        {currentItems.map((card) => (
          <div
            key={card.id}
            className="relative flex flex-col items-center justify-center group bg-white rounded-lg overflow-hidden py-2 max-w-[200px] max-h-[250px] mx-auto"
            style={{ boxShadow: '8px 8px 4px 0px #00000040' }}
          >
            <img src={card.image_url} alt={card.name} className="w-full h-[200px] object-cover" />
            <div className="absolute inset-0 bg-[#F2EAE1B2] flex flex-col justify-center items-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-lg font-semibold text-center hover:cursor-pointer" onClick={() => navigate(`/details/${card.id}`)}>
                {card.name}
              </p>
              <div className="flex justify-center gap-2 mt-2">
                <button className="bg-[#FEAF00] text-white py-1 px-5 rounded-md" onClick={() => navigate(`/update/${card.id}`)}>
                  Edit
                </button>
                <button className="bg-[#FE0000] text-white py-1 px-5 rounded-md" onClick={() => openDeleteDialog(card)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={setCurrentPage} />

      <DeleteDialog showDialog={showDialog} closeDialog={closeDialog} handleDelete={handleDelete} />
    </div>
  );
};

export default ItemsList;
