import React from "react";
import Ndata from "./Ndata"; // Import dữ liệu từ file Ndata

const Cart = () => {
  // Hàm tạo URL động cho ảnh
  const generateImageUrl = (index) =>
    `https://res.cloudinary.com/dgk73vcb2/image/upload/v1731564972/arrivals/arrivals${index + 1}.webp`;

  return (
    <>
      <div className="content grid product">
        {Ndata.map((val, index) => {
          return (
            <div className="box" key={index}>
              <div className="img">
                {/* Sử dụng URL động thay vì URL trong Ndata */}
                <img src={generateImageUrl(index)} alt={`arrivals${index + 1}`} />
              </div>
              <h4>{val.name}</h4>
              <span>${val.price}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cart;
