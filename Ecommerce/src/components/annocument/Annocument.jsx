import React from "react";

const Annocument = () => {
  const mystyle = {
    width: "30%",
    height: "340px",
  };
  const mystyle1 = {
    width: "68%",
    height: "340px",
  };

  // URL ảnh từ folder banner trên Cloudinary
  const banner1Url = "https://res.cloudinary.com/dgk73vcb2/image/upload/v1731564990/banner/banner-1.webp";
  const banner2Url = "https://res.cloudinary.com/dgk73vcb2/image/upload/v1731564990/banner/banner-2.webp";

  return (
    <>
      <section className="annocument background">
        <div className="container d_flex">
          <div className="img" style={mystyle}>
            {/* Sử dụng URL từ Cloudinary */}
            <img src={banner1Url} alt="Banner 1" width="100%" height="100%" />
          </div>
          <div className="img" style={mystyle1}>
            {/* Sử dụng URL từ Cloudinary */}
            <img src={banner2Url} alt="Banner 2" width="100%" height="100%" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Annocument;
