import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { popularProducts } from '../data'
import ProductItmes from './ProductItmes'
import axios from "axios"


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Product = ({cat,filters,sort}) => {


  const [products,setProducts] = useState([])
  const [filteredproducts,setFilteredProducts] = useState([])

  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:4400/api/products?category=${cat}`
            : "http://localhost:4400/api/products"
        );
        setProducts(res.data);
      } catch (error) {
        // Handle error
      }
    };
    getProducts();
  }, [cat]);

  //to filter the products based on colors and sizes
  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters])

  //filtering the products based on prices
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

    const productItem = cat
      ? filteredproducts.map((item)=>{
         return <ProductItmes item={item} key={item.id}/>})
      : products.slice(0,8).map((item)=>{
         return <ProductItmes item={item} key={item.id}/>})

  return (
    <Container>
        {productItem}
    </Container>
  )
}

export default Product