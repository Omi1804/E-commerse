import React, { useState } from 'react'
import styled from 'styled-components'
import {mobile} from '../responsive'
import {login} from '../redux/apiCalls'
import { useDispatch,useSelector } from 'react-redux';


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
    padding: 20px;
    width: 30%;
    background-color: white;
    opacity: .9;
    ${mobile({
    width: "75%"
})}
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    `
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    `
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 15px 0px;
    padding: 10px;
    border: none;
    border-bottom: 2px solid #0A99FE;
    outline: none;

`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;

    &:disabled{
        color: green;
        cursor: not-allowed;
    }
`

const Link = styled.a`
    margin: 5px 0px;
    font-size: 13px;
    text-decoration: underline;
    letter-spacing: 2px;
    cursor: pointer;
`

const Error = styled.span`
    color: red;
`
const Test = styled.span`
    color: red;
`

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
      };

  return (
    <Container>
    <Wrapper>
        <Title>SIGN IN</Title>
        <Test>For Test Purpose Use : Username = test , Pass = test</Test>
        <Form autoComplete='off'>
            <Input placeholder="Username"
                onChange={(e)=>setUsername(e.target.value)}
            />
            <Input placeholder="Password" 
                onChange={(e)=>setPassword(e.target.value)}/>
            <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
            {error && <Error>Something went wrong</Error>}
            <Link>DO NOT REMEMBER THE PASSWORD?</Link>
            <Link href="/register">CREATE A NEW ACCOUNT</Link>
        </Form>
    </Wrapper>
</Container>
  )
}

export default Login