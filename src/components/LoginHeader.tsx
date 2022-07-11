import React, { FC } from 'react';
import styled from 'styled-components';
import { PlaneIcon } from 'components/icons';
import { Outlet } from 'react-router-dom';

const LoginHeader = () => {
    return (
        <Wrapper>
            <TitleContainer>
                <Title>
                    <PlaneIcon
                        width="50px"
                        height="55px"
                        style={planeIconStyle}
                    />
                    여행가다
                </Title>
                <SubTitle>지금 당장 여행 계획을 짜보세요!</SubTitle>
            </TitleContainer>
            <Outlet />
        </Wrapper>
    )
}

export default LoginHeader;

const Wrapper = styled.div`
    background-color: #60A5F8;
    width: 100vw;
    height: 100vh;
`

const TitleContainer = styled.header`
    padding-top: 20vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Jalnan';
    color: white;
    letter-spacing: 1px;
`

const planeIconStyle = {
    marginBottom: '-5px',
}

const Title = styled.div`
    font-size: 32px;
    margin-bottom: 20px;
`
const SubTitle = styled.div`
    font-size: 24px;
`