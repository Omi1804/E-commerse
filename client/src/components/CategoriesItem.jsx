import React from 'react'
import styled from 'styled-components'
import {mobile} from '../responsive'
import { Link } from 'react-router-dom'


const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${mobile({
    height: "40vh"
})}
`
const Info = styled.div`
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Title = styled.h1`
    color: white;
    margin-bottom: 1rem;
`
const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    color: gray;
    cursor: pointer;
    font-weight: 600;
`

const CategoriesItem = ({items}) => {
  return (
    <Container>
        <Link to={`/products/${items.cat}`}>
        <Image src={items.img}/>
        <Info>
            <Title>{items.title}</Title>
            <Button>SHOP NOW</Button>
        </Info>
        </Link>
    </Container>
  )
}

export default CategoriesItem