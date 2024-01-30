import {createGlobalStyle} from "styled-components";
import bg from './asset/back.jpg'

const GlobalStyles = createGlobalStyle`
 a {
  text-decoration: none;
  color: inherit;
 }

 body {
   font-family: apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
   //background-image: url(../public/asset/background.jpg);
   background-image: url(${bg});
   background-repeat: no-repeat;
   background-position: top center;
   background-size: cover;
   background-attachment: fixed;
   
   margin: 0 auto;
   width: 70vw;
   height: 200vh;
   box-shadow: inset 0 0 20px
 }`;


export default GlobalStyles;
