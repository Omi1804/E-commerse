import {React,useState} from 'react'
import styled from 'styled-components'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material'
import { sliderItems } from '../data'
import {mobile} from '../responsive'

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({
    display: "none"
})}
`

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: ${props => props.direction === "left" && "10px"};
    right: ${props => props.direction === "right" && "10px"};
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
`
const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1s ease;
    transform: translateX(${props=>props.slideIndex * -100}vw);
`
const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #${props => props.bg};
`
const ImgContainer = styled.div`
    flex: 1;
    height: 100%;
`
const Image = styled.img`
    height: 90%;
    margin-left:2rem ;

`

const InfoContainer = styled.div`
    flex: 1;
    /* padding: 50px; */
`
const Title = styled.h1`
    font-size: 50px;
    font-weight: 500;
`
const Desc = styled.p`
    margin: 50px 0px;
    font-size: 1.3rem;
    font-weight: 500;
    letter-spacing: 2px;

`
const Button = styled.button`
    padding: 7px;
    font-size: 17px;
    background-color: transparent;
    cursor: pointer;
`

const Slider = () => {

    const [slideIndex,setSlideIndex] = useState(0)

    const handleClick = (direction) => {

        if(direction === 'left')
        {
            setSlideIndex(slideIndex>0 ? slideIndex -1 : 2)
        } else{
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }
    }

    const handleShop = (e) => {
        window.scrollTo({
            top:900,
            behavior:'smooth'
        })
    }


    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlined />
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {sliderItems.map(item => {
                    return  <Slide bg={item.bg} key={item.id}>
                        <ImgContainer>
                            <Image src={item.img} />
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.desc}</Desc>
                            <Button onClick={handleShop}>SHOP NOW</Button>
                        </InfoContainer>
                    </Slide>
                })}

            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowRightOutlined />
            </Arrow>
        </Container>
    )
}

export default Slider