import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Link } from "react-router-dom"
import Sdata from "../../components/shops/Sdata"
const SearchResults = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    // Lấy query từ localStorage
    const query = localStorage.getItem("searchQuery")
    setSearchQuery(query || "")

    if (query) {
      const filtered = filterProducts(query, Sdata.shopItems)
      setFilteredProducts(filtered)
    }
  }, [])

  // Hàm tìm kiếm linh hoạt
  const filterProducts = (query, products) => {
    if (!query) return []
    
    query = query.toLowerCase().trim()
    const searchTerms = query.split(" ")
    
    return products.filter(product => {
      const productName = product.name.toLowerCase()
      return searchTerms.some(term => productName.includes(term))
    })
  }

  // Hàm highlight text tìm kiếm
  const highlightText = (text, query) => {
    if (!query) return text
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    
    return (
      <span>
        {parts.map((part, index) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="bg-yellow-200">{part}</span>
          ) : (
            part
          )
        )}
      </span>
    )
  }

  return (
    <div className="container mx-auto py-4">
      <div className="mb-4">
        <button 
          onClick={() => window.history.back()} 
          className="mb-4 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          ← Back
        </button>
        {searchQuery && (
          <h2 className="text-xl font-semibold">
            {filteredProducts.length} Results for: "{searchQuery}"
          </h2>
        )}
      </div>

      {searchQuery && filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No products found matching "{searchQuery}"
          </p>
        </div>
      ) : (
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <a
              href={`/detail/${product.id}`}
              key={product.id}
              className="product-card p-4 border rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="product-img mb-4">
                <img
                  src={product.cover}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded"
                />
              </div>
              <div className="product-details">
                <h3 className="font-medium mb-2">
                  {highlightText(product.name, searchQuery)}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">${product.price}</span>
                  {product.discount && (
                    <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
       
      )}
    </div>
  )
}

export default SearchResults