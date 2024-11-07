import React from "react"
import logo from "../../components/assets/images/logo.svg"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const Search = ({ CartItem, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("")

  // fixed Header
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search")
    search.classList.toggle("active", window.scrollY > 100)
  })

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      localStorage.setItem("searchQuery", searchTerm.trim())
      window.location.href = "/search-results"
    }
  }
  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <div className="logo width ">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>

          <div className="search-box f_flex">
            <i className="fa fa-search"></i>
            <input
              type="text"
              placeholder="Search and hit enter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleSearch}
            />
            <span>All Category</span>
          </div>

          <div className="icon f_flex width">
            <Link to="/AuthPages">
              <i className="fa fa-user icon-circle"></i>
            </Link>
            <div className="cart">
              <Link to="/cart">
                <i className="fa fa-shopping-bag icon-circle"></i>
                <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Search
