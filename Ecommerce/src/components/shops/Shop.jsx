import React from "react"
import Catg from "./Catg"
import ShopCart from "./ShopCart"
import "./style.css"
const Shop = ({ addToCart, shopItems }) => {
  return (
    <>
      <section className='shop background'>
        <div className='container d_flex'>
          {/* Component Catg: là một danh mục hoặc thanh điều hướng bên cạnh */}
          <Catg />

          <div className='contentWidth'>
            {/* Phần tiêu đề cho khu vực sản phẩm */}
            <div className='heading d_flex'>
              <div className='heading-left row f_flex'>
                {/* Tiêu đề danh mục sản phẩm */}
                <h2>Mobile Phones</h2>
              </div>
              <div className='heading-right row'>
                {/* Liên kết hoặc nút để xem toàn bộ sản phẩm */}
                <span>View all</span>
                <i className='fa-solid fa-caret-right'></i>
              </div>
            </div>

            {/* Phần nội dung sản phẩm */}
            <div className='product-content grid1'>
              {/* Component ShopCart để hiển thị danh sách sản phẩm và thêm vào giỏ hàng */}
              <ShopCart addToCart={addToCart} shopItems={shopItems} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Shop
