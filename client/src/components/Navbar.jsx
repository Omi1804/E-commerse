import React from 'react'
import styled from 'styled-components'
import { Search, ShoppingCartOutlined } from '@mui/icons-material'
import Badge from '@mui/material/Badge';
import { mobile } from '../responsive.js'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';

const Components = styled.div`
height:60px;
${mobile({
    height: "50px"
})}

`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({
    padding: "10px 0px"
})}
`

//left navbar Part
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({
    display: "none"
})}
`
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`
const Input = styled.input`
    border: none;
    outline: none;
    ${mobile({
    width: "50px"
})}
`

//Center navbar part
const Center = styled.h1`
flex: 1;
text-align: center;
font-weight: bold;
${mobile({
    fontSize: "24px"
})}
`


const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({
    flex: 2,
    justifyContent: "center"
})}
`
const MenuItem = styled.a`
    font-size: 14px;
    cursor: pointer;
    margin-left: 1rem;
    text-decoration: none;
    ${mobile({
    fontSize: "12px", marginLeft: "10px"
})}
`

const LoginInfo = styled.div`
    display: flex;
`

const Linking = styled.a`
    text-decoration: none;
    cursor: pointer;
`

const Navbar = () => {

    const quantity = useSelector(state => state.cart.quantity)
    const user = useSelector(state => state.user.currentUser)
    const navigate = useNavigate()

    const handleClick = (e) => {
        navigate('/')
    }

    return (
        <Components>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder='Search' />
                        <Search style={{ color: "grey", fontSize: "1rem" }} />
                    </SearchContainer>
                </Left>

                <Center>
                    <Linking onClick={handleClick}>Ø•M•Ī</Linking>
                </Center>

                <Right>
                    {!user ? (
                        <LoginInfo>
                            <MenuItem href="/register">REGISTER</MenuItem>
                            <MenuItem href="/login">LOGIN IN</MenuItem>
                        </LoginInfo>
                    ) : null}

                    <Link to="/cart">
                        <MenuItem>
                            <Badge badgeContent={quantity > 0 ? quantity : 0} color="primary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </MenuItem>
                    </Link>

                </Right>
            </Wrapper>
        </Components>
    )
}

export default Navbar