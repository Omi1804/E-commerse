import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { Remove, Add } from '@mui/icons-material'
import { mobile } from '../responsive'
import { useLocation } from 'react-router-dom'
import { publicRequest } from '../resquestMethods'
import {addProduct} from "../redux/cartRedux"
import {useDispatch,useSelector} from "react-redux"


const Container = styled.div``

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({
    padding: "10px", flexDirection: "column"
})}
`
const ImgContainer = styled.div`
    flex: 1; 
`
const Image = styled.img`
    width: 60%;
    height: 50vh;
    object-fit: contain;
    ${mobile({
    height: "40vh"
})}
`
const InfoContainer = styled.div`
    flex: 1; 
    padding: 0px 50px;
    ${mobile({
    padding: "10px"
})}
`
const Title = styled.h1`
    font-weight: 200;
`
const Desc = styled.p`
    margin: 20px 0px;
`
const Price = styled.span`
    font-weight: 200;
    font-size: 40px;
`
const FilterContainer = styled.div`
    display: flex;
    width: 50%;
    margin: 30px 0px;
    justify-content: space-between;
    ${mobile({
    width: "100%"
})}
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.div`
    font-size: 20px;
    font-weight: 200;
`
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0px 5px;
    cursor: pointer;
`
const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`
const FilterSizeOption = styled.option``
const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({
    width: "100%"
})}
`
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
    cursor: pointer;
`
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
    cursor: text;
`
const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;


    &:hover{
        background-color: #f8f8f8;
        transform: scale(1.05);
    }
`

const Product = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2]

    const [product, setProduct] = useState({});
    const [quantity,setQuantity] = useState(1) //for setting quantity
    const [color,setColor] = useState("") //for setting color
    const [size,setSize] = useState("") //for setting size
    const cart = useSelector((state) => state.cart); // Add this line to access the cart state
    const dispatch = useDispatch()


    useEffect(() => {
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/products/find/" + id)
                setProduct(res.data);
            } catch (error) {
            }
        }
        getProduct()
    }, [id])

    const handleQuantity = (type)=>{
        if(type==='dec'){
            setQuantity( quantity>1 ?quantity-1:quantity)
        }else{
            setQuantity(quantity+1)
        }
    }

    //updating the cart
    const handleClick = () => {
        dispatch(
          addProduct({ ...product, quantity, color, size })
        );
      };
      

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>{product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color?.map((c) => (
                                <FilterColor onClick={()=>setColor(c)} color={c} key={c} />
                            ))}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e)=>setSize(e.target.value)}>
                                {product.size?.map((s) => (
                                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={()=>handleQuantity("dec")} />
                            <Amount>{quantity}</Amount>
                            <Add onClick={()=>handleQuantity("inc")}/>
                        </AmountContainer>
                        <Button onClick={handleClick}>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Product