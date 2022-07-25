import React, { FC } from 'react';
import styled from 'styled-components';

const ProfileHeader: FC = () => {
    return (
        <Wrapper>
            <TitleContainer>
                <MainTitle>프로필</MainTitle>
                <SubTitle1>내 정보를 조회하고,</SubTitle1>
                <SubTitle2>내 정보를 수정해보세요!</SubTitle2>
            </TitleContainer>
        </Wrapper>
    )

}

export default ProfileHeader;

const Wrapper = styled.section`
    min-width: 1287px;
    width: 100%;
    background-color: #E4F0FF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 60px 0;
`
const TitleContainer = styled.div`
    width: 1287px;
    margin: 0 auto;
    color: #333;
`
const MainTitle = styled.h1`
    font-size: 30px;
    font-weight: bold;
    letter-spacing: 1px;
`

const Subtitle = styled.h2`
    font-size: 22px;
    font-weight: 400;
    letter-spacing: 1.5px;
`
const SubTitle1 = styled(Subtitle)`
    margin-top: 35px;
    margin-bottom: 15px;
`
const SubTitle2 = styled(Subtitle)``