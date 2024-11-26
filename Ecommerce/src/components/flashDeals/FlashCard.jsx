import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Component nút điều hướng tiếp theo
const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <i className="fa fa-long-arrow-alt-right"></i>
      </button>
    </div>
  );
};

// Component nút điều hướng quay lại
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <i className="fa fa-long-arrow-alt-left"></i>
      </button>
    </div>
  );
};

// Component FlashCard hiển thị các sản phẩm trong slider
const FlashCard = ({ productItems, addToCart }) => {
  const [count, setCount] = useState(0);

  // Hàm để tăng số lượt thích
  const increment = () => {
    setCount(count + 1);
  };

  // Cấu hình cho slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
      {/* Slider hiển thị danh sách sản phẩm */}
      <Slider {...settings}>
        {productItems.map((product, index) => {
          // Tạo URL động cho ảnh flash từ 1 đến 5
          const imageUrl = `https://res.cloudinary.com/dgk73vcb2/image/upload/v1731565027/flash/flash-${index + 1}.webp`;

          return (
            <div className="box" key={product.id}>
              <div className="product mtop">
                {/* Hình ảnh và giảm giá */}
                <div className="img">
                  <span className="discount">{product.discount}% Off</span>
                  <img src={imageUrl} alt="" />
                </div>

                {/* Thông tin chi tiết sản phẩm */}
                <div className="product-details">
                  <h3>{product.name}</h3>

                  {/* Đánh giá sao */}
                  <div className="rate">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>

                  {/* Giá sản phẩm và nút thêm vào giỏ hàng */}
                  <div className="price">
                    <h4>${product.price}.00 </h4>
                    <button onClick={() => addToCart(product)}>
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default FlashCard;
