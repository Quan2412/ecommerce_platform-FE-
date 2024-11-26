import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Sdata from "./Sdata"  // Giữ nguyên Sdata

const SlideCard = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>
    },
  }

  return (
    <>
      <Slider {...settings}>
        {Sdata.map((value, index) => {
          // Cập nhật URL ảnh từ Cloudinary
          const imageUrl = `https://res.cloudinary.com/dgk73vcb2/image/upload/v1731565110/SlideCard/slide-${index + 1}.png`;

          return (
            <div className='box d_flex top' key={index}>
              <div className='left'>
                <h1>{value.title}</h1>
                <p>{value.desc}</p>
                <button className='btn-primary'>Visit Collections</button>
              </div>
              <div className='right'>
                {/* Dùng URL ảnh động */}
                <img src={imageUrl} alt={`slide-${index + 1}`} />
              </div>
            </div>
          )
        })}
      </Slider>
    </>
  )
}

export default SlideCard
