"use client";
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    html,body,button,input,div,form,ul,li,label {
        margin: 0;
        padding:0;
        box-sizing: border-box;
    }
    body{
        display: flex;
        align-items:center;
        justify-content:center;
        height: 100vh;
    }
`;
