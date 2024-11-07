// Detail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Sdata from './Sdata';
import styles from './Detail.module.css';

const Detail = () => {
  const { id } = useParams();
  const product = Sdata.shopItems.find(shopItems => shopItems.id === parseInt(id));

  if (!product) {
    return <p>Sản phẩm không tồn tại.</p>;
  }

  return (
    <div className={styles.productDetail}>
       
      <img src={product.cover} className={styles.productImage} />
      <div className={styles.productInfo}>
        <h2>{product.name}</h2>
        <p>Giá: ${product.price}</p>
        <p>Giảm giá: {product.discount}%</p>
        <p>Mô tả sản phẩm: {product.description || "Không có mô tả."}</p>
      </div>
    </div>
  );
};

export default Detail;
