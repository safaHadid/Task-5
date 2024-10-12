import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddItem = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);

    axios
      .post("https://test1.focal-x.com/api/items", formData, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setName("");
        setPrice("");
        setImage(null);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="ml-5">
      <img
        src="/assets/Control.svg"
        alt="Back"
        className="mb-8 hover:cursor-pointer"
        onClick={() => navigate("/")}
      />
      <h1 className="text-left mt-8 font-semibold text-6xl">ADD NEW ITEM</h1>
      <form className="mt-[76px] mx-2" onSubmit={handleSubmit}>
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/2 px-2">
            <div className="mb-8">
              <label
                htmlFor="name"
                className="block text-2xl font-medium text-gray-700 mb-5"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter the product name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FEAF00] focus:border-[#FEAF00]"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-2xl font-medium text-gray-700 mb-5"
              >
                Price:
              </label>
              <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="Enter the product price"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FEAF00] focus:border-[#FEAF00]"
              />
            </div>
          </div>

          <div className="w-full sm:w-1/2 px-2">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {image ? (
                    <span className="text-xl font-semibold">{image.name}</span>
                  ) : (
                    <img src="/assets/Upload icon.svg" alt="Upload Icon" />
                  )}
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    setImage(e.target.files?.[0] || null);
                  }}
                  required
                />
              </label>
            </div>
          </div>
        </div>

        <div className="mx-auto justify-center flex mt-8">
          <button
            type="submit"
            className="w-[199px] text-2xl bg-[#FEAF00] text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#DB9A00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FEAF00]"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
