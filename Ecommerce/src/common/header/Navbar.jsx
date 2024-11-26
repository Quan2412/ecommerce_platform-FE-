import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="header">
        <div className="container" style={{ position: "relative" }}>
          {/* Button Categories */}
          <div
            className="categories"
            onClick={toggleDropdown}
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f8fbff",
              padding: "10px 15px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              width: "180px",
            }}
          >
            <span
              className="fa-solid fa-border-all"
              style={{
                display: "inline-block",
                marginRight: "10px",
                fontSize: "18px",
              }}
            ></span>
            <h4
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#000",
                margin: 0,
              }}
            >
              Categories
            </h4>
            <i
              className={`fa fa-chevron-down ${
                isOpen ? "rotate-180" : ""
              } transition-transform`}
              style={{
                fontSize: "14px",
                marginLeft: "8px",
              }}
            ></i>
          </div>

          {/* Dropdown */}
          {isOpen && (
            <div
              className="dropdown"
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                width: "450px", // Tăng chiều rộng để chứa 2 cột
                marginTop: "10px",
                zIndex: 1000,
              }}
            >
              <div
                className="category"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr", // Tạo 2 cột
                  gap: "10px", // Khoảng cách giữa các mục
                  padding: "10px",
                }}
              >
                {data.map((value, index) => {
                  const imageUrl = `https://res.cloudinary.com/dgk73vcb2/image/upload/v1731565003/category/cat${
                    index + 1
                  }.png`;

                  return (
                    <div
                      className="box"
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "5px",
                        cursor: "pointer",
                        width: "200px",
                      }}
                    >
                      <img
                        src={imageUrl}
                        alt={value.cateName}
                        style={{
                          width: "20px",
                          height: "20px",
                          marginRight: "10px",
                        }}
                      />
                      <span>{value.cateName}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
