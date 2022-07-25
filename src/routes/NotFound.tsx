import React, { FC } from 'react';
import styled from 'styled-components';
import { SpeechIcon, ErrorIcon, PlaneIcon } from 'components/icons';

const NotFound: FC = () => {
    return (
        <Container>
            <BalloonContainer>
                <SpeechIcon width="330px" height="300px" />
                <div className="plane-icon">
                    <PlaneIcon width="65px" height="60px" />
                </div>
                <div className="gada-title">여행가다</div>
            </BalloonContainer>
            <MessageContainer>
                <div className="status-code">
                    <ErrorIcon width="110px" height="110px" />
                    <span>404</span>
                </div>
                <div className="code-message">Not Found</div>
                <div className="code-info">
                    요청하신 페이지를 찾을 수 없습니다 :)
                </div>
            </MessageContainer>
        </Container>
    );
};

const Container = styled.div`
    background-color: ${({ theme }) => theme.PRIMARY};
    font-family: 'Jalnan';
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BalloonContainer = styled.div`
    position: absolute;
    left: 60%;
    top: 10%;

    & > .plane-icon {
        position: absolute;
        font-size: 50px;
        color: white;
        left: 25px;
        top: 95px;
    }

    & > .gada-title {
        position: absolute;
        font-family: 'Jalnan';
        font-size: 50px;
        color: white;
        left: 86px;
        top: 115px;
    }
`;

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > .status-code {
        font-size: 130px;
    }
    & > .status-code > span {
        margin-left: 10px;
    }
    & > .code-message {
        font-size: 40px;
        margin-bottom: 15px;
    }
    & > .code-info {
        font-size: 23px;
    }
`;

export default NotFound;
