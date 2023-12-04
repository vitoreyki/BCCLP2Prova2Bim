import { styled } from "styled-components";

export const ChatBox = styled.div`
    margin-left: 50px;
    border-radius: 20px;
    align-items: center;
`

export const ChatBoxContent = styled.div`
    width: 40%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const ChatBoxInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ChatBoxMessage = styled.p`
    font-size: 16px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`