import React, { useState } from "react";
import { Link } from "react-router-dom";

const ShopCart = ({ shopItems, addToCart }) => {
  // Tạo state để quản lý số lượt thích của sản phẩm
  const [count, setCount] = useState(0);

  // Hàm để tăng số lượt thích
  const increment = () => {
    setCount(count + 1);
  };

  return (
    <>
      {/* Duyệt qua mảng shopItems để hiển thị từng sản phẩm */}
      {shopItems.map((shopItem, index) => {
        // Thay đổi nguồn ảnh để lấy từ folder shops trên Cloudinary
        const imageUrl = `https://res.cloudinary.com/dgk73vcb2/image/upload/v1731565094/shops/shops-${index + 1}.webp`;

        return (
          <div className="box" key={index}>
            <div className="product mtop">
              {/* Link đến trang chi tiết sản phẩm với đường dẫn động dựa trên ID của sản phẩm */}
              <Link to={`/detail/${shopItem.id}`}>
                <div className="img">
                  {/* Hiển thị phần trăm giảm giá */}
                  <span className="discount">{shopItem.discount}% Off</span>

                  {/* Hình ảnh của sản phẩm */}
                  <img src={imageUrl} alt={`Product ${shopItem.id}`} />

                  {/* Nút thích và bộ đếm lượt thích */}
                  <div className="product-like">
                    <label>{count}</label> <br />
                    <i className="fa-regular fa-heart" onClick={increment}></i>
                  </div>
                </div>

                {/* Hiển thị thông tin chi tiết của sản phẩm */}
                <div className="product-details">
                  <h3>{shopItem.name}</h3>
                  <div className="rate">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                  
                  <div className="price">
                    <h4>${shopItem.price}.00 </h4>
                    
                  </div>
                </div>
              </Link>
              <div className="price">
              <button onClick={() => addToCart(shopItem)}>
                      <i className="fa fa-plus"></i>
                    </button>
                    </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ShopCart;
