import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemsList from "./ItemsList";

interface Item {
  id: number;
  name: string;
  price: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

const Items = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }

    axios
      .get("https://test1.focal-x.com/api/items", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [navigate]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="max-w-[952px] mx-auto p-5">
        <div className="flex-col justify-center w-100">
          <div className="flex justify-center w-full">
            <div className="relative w-[664px] h-[40px]">
              <input
                type="text"
                className="border border-gray-300 rounded-lg w-full h-full p-2 pr-10 focus:outline-none focus:border-[#FEAF00] transition duration-200"
                placeholder="Search product by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <img
                src="/assets/search.svg"
                alt="Search Icon"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              />
            </div>
          </div>
          <div className="flex mt-10 justify-end mr-10">
            <button
              className="text-[14px] text-white rounded bg-[#FEAF00] py-3 px-5"
              onClick={() => navigate("/add")}
            >
              ADD NEW PRODUCT
            </button>
          </div>
          {/* Pass filteredItems array instead of the function */}
          <ItemsList items={filteredItems} setItems={setItems} />
        </div>
      </div>
    </>
  );
};

export default Items;
