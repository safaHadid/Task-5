import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


interface Item {
  id: number;
  name: string;
  price: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const ItemDetails = () => {
  const [item, setItem] = useState<Item | null>(null);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [addedAt, setAddedAt] = useState<string>("");
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const { id } = useParams();
  const navigate = useNavigate();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    axios
      .get(`https://test1.focal-x.com/api/items/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const fetchedItem: Item = response.data;
        setItem(fetchedItem);
        setName(fetchedItem.name);
        setPrice(fetchedItem.price);
        setImage(fetchedItem.image_url);
        setAddedAt(formatDate(fetchedItem.created_at));
        setUpdatedAt(formatDate(fetchedItem.updated_at));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div className="mx-8">
      <img
        src="/assets/Control.svg"
        alt="Back"
        className="mb-8 hover:cursor-pointer"
        onClick={() => navigate("/")}
      />
      
      <h1 className="text-left mt-8 font-semibold text-6xl">{name}</h1>
      
      <div className="flex justify-center mt-[40px]">
        <img src={image} alt={name} className="h-[250px]" />
      </div>
      

      <div className="flex flex-col md:flex-row justify-between mt-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-left">
          Price: <span className="text-2xl md:text-3xl  font-medium text-[#8080808C]">{price} $</span>
          </h1>
        <h1 className="text-3xl md:text-4xl font-semibold text-left">
          Added at: <span className="text-2xl md:text-3xl font-medium text-[#8080808C]">{addedAt}</span>
          </h1>
      </div>
      <h1 className="text-3xl md:text-4xl md:mt-8 font-semibold text-left md:text-center">
        Updated at: <span className="text-2xl md:text-3xl font-medium text-[#8080808C]">{updatedAt}</span>
      </h1>
    </div>
  );
};

export default ItemDetails;
