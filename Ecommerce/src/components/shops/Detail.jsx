// Detail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Sdata from './Sdata';
import styles from './Detail.module.css';

const Detail = () => {
  // Lấy `id` từ URL bằng `useParams` để xác định sản phẩm nào sẽ được hiển thị chi tiết
  const { id } = useParams();
  
  // Tìm sản phẩm có `id` trùng với `id` từ URL trong dữ liệu `Sdata.shopItems`
  const product = Sdata.shopItems.find(shopItem => shopItem.id === parseInt(id));

  // Nếu không tìm thấy sản phẩm, hiển thị thông báo
  if (!product) {
    return <p>Sản phẩm không tồn tại.</p>;
  }

  // Tạo URL động cho ảnh từ folder shops
  const dynamicImageUrl = `https://res.cloudinary.com/dgk73vcb2/image/upload/v1731565094/shops/shops-${product.id}.webp`;
  return (
    <div className={styles.productDetail}>
      {/* Hiển thị hình ảnh sản phẩm */}
      <img src={dynamicImageUrl} className={styles.productImage} alt={product.name} />

      {/* Thông tin chi tiết của sản phẩm */}
      <div className={styles.productInfo}>
        <h2>{product.name}</h2>
        <p>Giá: ${product.price}</p>
        <p>Giảm giá: {product.discount}%</p>
        {/* Hiển thị mô tả sản phẩm, nếu không có thì hiển thị thông báo "Không có mô tả." */}
        <p>Mô tả sản phẩm: {product.description || "Không có mô tả."}</p>
      </div>
    </div>
  );
};

export default Detail;
