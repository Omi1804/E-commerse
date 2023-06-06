import React , {useState}from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {mobile} from '../responsive'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255,255,255,0),rgba(255, 255, 255, 0.5)),url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")center;
    display: flex;
    justify-content: center;
    align-items: center;

`
const Wrapper = styled.div`
    padding: 20px;
    width: 50%;
    background-color: white;
    opacity: .9;
    ${mobile({
    width: "75%"
})}
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    `
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    `
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0 0;
    padding: 10px;
    border: none;
    border-bottom: 2px solid #0A99FE;
    outline: none;
    background-size: cover;

`
const Agreement = styled.span`
    font-size: 13px;
    margin: 20px 0px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`

const Register = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform registration logic here (e.g., API call)
    // Assuming the registration is successful, navigate to the login page
    navigate('/login');
  };

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form autoComplete='off' onSubmit={handleSubmit}>
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                    <Input placeholder="Username" />
                    <Input placeholder="Email" />
                    <Input placeholder="Password" />
                    <Input placeholder="Confirm Password" />
                    <Agreement>
                        By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>

                    <Button type='submit'>CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register