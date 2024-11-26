import React from "react";

const Catg = () => {
  const data = [
    {
      cateName: "Apple",
    },
    {
      cateName: "Samsung",
    },
    {
      cateName: "Oppo",
    },
    {
      cateName: "Vivo",
    },
    {
      cateName: "Redmi",
    },
    {
      cateName: "Sony",
    },
  ];

  // Hàm tạo URL động cho ảnh
  const generateImageUrl = (index) =>
    `https://res.cloudinary.com/dgk73vcb2/image/upload/v1731565001/category/cat-${(index % 3) + 1}.webp`;

  return (
    <>
      <div className="category">
        <div className="chead d_flex">
          <h1>Brands </h1>
          <h1>Shops </h1>
        </div>
        {data.map((value, index) => {
          return (
            <div className="box f_flex" key={index}>
              {/* Sử dụng URL động */}
              <img src={generateImageUrl(index)} alt={`cat-${(index % 3) + 1}`} />
              <span>{value.cateName}</span>
            </div>
          );
        })}
        <div className="box box2">
          <button>View All Brands</button>
        </div>
      </div>
    </>
  );
};

export default Catg;
