import React from "react";

const Categories = () => {
  const data = [
    { cateName: "Fashion" },
    { cateName: "Electronic" },
    { cateName: "Cars" },
    { cateName: "Home & Garden" },
    { cateName: "Gifts" },
    { cateName: "Music" },
    { cateName: "Health & Beauty" },
    { cateName: "Pets" },
    { cateName: "Baby Toys" },
    { cateName: "Groceries" },
    { cateName: "Books" },
  ];

  return (
    <>
      <div className="category">
        {data.map((value, index) => {
          // Tạo URL động cho ảnh
          const imageUrl = `https://res.cloudinary.com/dgk73vcb2/image/upload/v1731565003/category/cat${index + 1}.png`;

          return (
            <div className="box f_flex" key={index}>
              <img src={imageUrl} alt={value.cateName} />
              <span>{value.cateName}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Categories;
