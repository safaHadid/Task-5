import React from 'react';

interface DeleteDialogProps {
  showDialog: boolean;
  closeDialog: () => void;
  handleDelete: () => void;
}

const DeleteDialog = ({ showDialog, closeDialog, handleDelete }: DeleteDialogProps) => {
  if (!showDialog) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-10 w-100 shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-center">
          Are you sure you want to delete the product?
        </h2>
        <div className="flex justify-around">
          <button className="bg-[#FEAF00] text-white px-8 py-2 rounded-md" onClick={handleDelete}>
            Yes
          </button>
          <button className="bg-[#FEAF00] text-white px-8 py-2 rounded-md" onClick={closeDialog}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
