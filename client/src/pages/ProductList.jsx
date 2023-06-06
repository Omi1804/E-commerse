import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Product from '../components/Product'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import {mobile} from '../responsive'
import { useLocation } from 'react-router-dom'

const Container = styled.div``
const Title = styled.h1`
    margin: 20px;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;
    ${mobile({
    width: "0 20px", display:"flex" ,flexDirection:"column"
})}
`
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({
    marginRight: "0"
})}
`
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({
    margin: "10px 0px"
})}
`

const Option = styled.option`
`

const ProductList = () => {

    const location = useLocation(); //to know in which url i am in 
    const cat = (location.pathname.split("/")[2])
    const [filters,setFilters] = useState({})
    const [sort,setSorts] = useState("newest")

    const handleFilters = (e)=>{
        setFilters({
            ...filters,
            [e.target.name]:e.target.value
        })
    }

    useEffect(()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    },[])

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Title>{cat}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select name="color" onChange={handleFilters}>
                        <Option disabled defaultValue="white" >
                            Color
                        </Option>
                        <Option>white</Option>
                        <Option>black</Option>
                        <Option>red</Option>
                        <Option>blue</Option>
                        <Option>yellow</Option>
                        <Option>green</Option>
                    </Select>
                    <Select name="size" onChange={handleFilters}>
                        <Option disabled defaultValue="XS">
                            Size
                        </Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select onChange={e=>setSorts(e.target.value)}>
                        <Option value="newest">Newest</Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="desc">Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Product cat={cat} filters={filters} sort={sort} />
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default ProductList