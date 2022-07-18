import React, { FC } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

// Style
import { theme } from 'styles/theme';
import { GlobalStyle } from 'styles/global-style';
import GlobalFont from 'styles/global-font';

// Store
import { store } from 'store/config';

// components
import Header from 'components/Header';
import LoginHeader from 'components/LoginHeader';
import PickModal from 'components/PickModal';
import Home from 'routes/Home';
import Login from 'routes/Login';
import LoginForm from 'routes/LoginForm';
import Register from 'routes/Register';
import Plan from 'routes/Plan';
import Main from 'routes/Main';
import Board from 'routes/Board';
import NotFound from 'routes/NotFound';
import Profile from 'routes/Profile';

// Axios
const baseURL = 'http://localhost:5000';
axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

const App: FC = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <GlobalFont />
                <PickModal />
                <BrowserRouter>
                    <Routes>
                        <Route element={<LoginHeader />}>
                            <Route path="/" element={<Login />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/login-form" element={<LoginForm />} />
                            <Route path="/register" element={<Register />} />
                        </Route>
                        <Route element={<Header />}>
                            <Route path="/home" element={<Home />} />
                            <Route path="/plan" element={<Plan />} />
                            <Route path="/main" element={<Main />} />
                            <Route path="/board" element={<Board />} />
                            <Route path="/profile" element={<Profile />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
};

export default App;
