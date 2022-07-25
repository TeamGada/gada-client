import React, { FC, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { PlaneIcon } from 'components/icons';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import useDetectClose from 'hooks/useDetectClose';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Header: FC = () => {
    const navigate = useNavigate();
    const myPageRef = useRef<any>(null);
    const boardRef = useRef<any>(null);
    const [myPageIsOpen, setmyPageIsOpen] = useDetectClose(myPageRef, false);
    const [boardIsOpen, setBoardIsOpen] = useDetectClose(boardRef, false);
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
    const navigateHandler = () => {
        navigate('/main');
    };

    const myPageHandler = () => {
        setmyPageIsOpen(!myPageIsOpen);
        setBoardIsOpen(false);
    };
    const boardHandler = () => {
        setBoardIsOpen(!boardIsOpen);
        setmyPageIsOpen(false);
    };
    const removeMenu = () => {
        setBoardIsOpen(false);
        setmyPageIsOpen(false);
    };

    const logoutClickHandler = () => {
        axios
            .get('/users/logout', {
                headers: {
                    Authorization: `Bearer ${cookies.accessToken}`,
                },
            })
            .then((response) => {
                console.log(response);
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2800}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <HeaderContainer>
                <PlaneIcon
                    width="49px"
                    height="46px"
                    style={planeIconStyle}
                    onClick={navigateHandler}
                />
                <HeaderTitle onClick={navigateHandler}>여행가다</HeaderTitle>
                <Menu>
                    <MyPageContainer>
                        <DropdownButton onClick={myPageHandler} ref={myPageRef}>
                            마이페이지
                        </DropdownButton>
                        <Nav myPageIsOpen={myPageIsOpen}>
                            <Ul onClick={removeMenu} onKeyDown={removeMenu}>
                                <Li>
                                    <LinkWrapper to="/profile">
                                        프로필
                                    </LinkWrapper>
                                </Li>
                                <Li>
                                    <LinkWrapper to="/main">
                                        내 계획
                                    </LinkWrapper>
                                </Li>
                            </Ul>
                        </Nav>
                    </MyPageContainer>
                    <BoardContainer>
                        <DropdownButton onClick={boardHandler} ref={boardRef}>
                            공유
                        </DropdownButton>
                        <Nav myPageIsOpen={boardIsOpen}>
                            <Ul onClick={removeMenu} onKeyDown={removeMenu}>
                                <Li>
                                    <LinkWrapper to="/board?type=all">
                                        전체 공유
                                    </LinkWrapper>
                                </Li>
                                <Li>
                                    <LinkWrapper to="/board?type=myShare">
                                        내 공유
                                    </LinkWrapper>
                                </Li>
                            </Ul>
                        </Nav>
                    </BoardContainer>
                    <DropdownContainer
                        onClick={removeMenu}
                        onKeyDown={removeMenu}
                    >
                        <Logout onClick={logoutClickHandler}>로그아웃</Logout>
                    </DropdownContainer>
                </Menu>
            </HeaderContainer>
            <Outlet />
        </>
    );
};

export default Header;

const planeIconStyle = {
    marginBottom: '10px',
    marginLeft: '30px',
    cursor: 'pointer',
};

const HeaderContainer = styled.header`
    min-width: 1287px;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #60a5f8;
    font-family: 'Jalnan';
    letter-spacing: 1px;
`;

const HeaderTitle = styled.h1`
    font-size: 30px;
    color: white;
    cursor: pointer;
`;

const Menu = styled.div`
    margin-left: auto;
    margin-right: 50px;
    display: flex;
    color: white;
    font-size: 19px;
`;

const DropdownContainer = styled.div`
    position: relative;
    width: 100px;
    text-align: center;
`;

const MyPageContainer = styled(DropdownContainer)``;

const BoardContainer = styled(DropdownContainer)`
    margin-left: 10px;
`;

const DropdownButton = styled.div`
    cursor: pointer;
`;

const Nav = styled.nav<{ myPageIsOpen: any }>`
    background: #60a5f8;
    position: absolute;
    top: 52px;
    left: 0;
    width: 100px;
    text-align: center;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
    z-index: 9;

    &:after {
        content: '';
        height: 0;
        width: 0;
        position: absolute;
        top: -10px;
        right: 37px;
        border: 12px solid transparent;
        border-top-width: 0;
        border-bottom-color: #60a5f8;
    }

    ${({ myPageIsOpen }) =>
        myPageIsOpen &&
        css`
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        `};
`;

const Ul = styled.ul`
    & > li:last-of-type {
        margin-bottom: 13px;
    }
`;
const Li = styled.li``;

const LinkWrapper = styled(Link)`
    font-size: 16px;
    margin-top: 13px;
    display: block;
    text-decoration: none;
    color: white;
`;

const LinkNoDropDown = styled(Link)`
    display: block;
    text-decoration: none;
    font-size: 19px;
    color: white;
`;

const Logout = styled.div`
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    display: block;
    text-decoration: none;
    color: white;
    font-size: 19px;
`;
