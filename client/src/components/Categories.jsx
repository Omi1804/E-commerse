import React from 'react'
import styled from 'styled-components'
import { categories } from '../data.js'
import CategoriesItem from './CategoriesItem'
import {mobile} from '../responsive.js'


const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile({
    padding: "0px",
    flexDirection:"column"
})}
`


const Categories = () => {

    const CategoryItem = categories.map((items)=>{
        return (
            <CategoriesItem items={items} key={items.id}/>
        )
    })


    return (
        <Container>
            {CategoryItem}
        </Container>
  )
            }

            export default Categories