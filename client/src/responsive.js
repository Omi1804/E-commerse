//shortcut to media query whole statement
import {css} from 'styled-components'


export const mobile = (props)=>{

    return css`
    @media only screen and (max-width: 380px){
        ${props}
    }
    `
}


//like this we can write for other screens also
/*
export const tablet = (props)=>{

    return css`
    @media only screen and (max-width: 380px){
        ${props}
    }
    `
}
*/