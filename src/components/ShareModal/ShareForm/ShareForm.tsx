import React, { FC, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import getAuthHeader from 'utils/getAuthHeader';
import useModal from 'hooks/useModal';
import { useDispatch, useSelector } from 'react-redux';
import { changeShareMode } from 'store/modules/plan/plan';
import { RootState } from 'store/modules';
import ShareHeader from './ShareHeader';
import ShareTitle from './ShareTitle';
import ShareTheme from './ShareTheme';

const planSelector = (state: RootState) => state.plan;

const ShareForm: FC = () => {
    const [theme, setTheme] = useState<string>('');
    const [ title, setTitle ] = useState<string>("");
    const closeModal = useModal('ShareForm');
    const dispatch = useDispatch();
    const headers = getAuthHeader();
    const { shareMode, _id } = useSelector(planSelector);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        (async () => {
            try {
                if (!title) {
                    alert('제목을 입력해주세요!');
                } else if (!theme) {
                    alert('주제를 선택해주세요!');
                } else {
                    const data = {
                        shareTitle: title,
                        tag: theme,
                        toggle: !shareMode,
                    };

                    // 공유하기
                    await axios.post(`shares/${_id}`, data, {
                        headers,
                    });

                    dispatch(changeShareMode(!shareMode));
                    closeModal();
                }
            } catch (err) {
                console.log(err);
            }
        })();
    };

    return (
        <Form onSubmit={submitHandler}>
            <ShareHeader />
            <ShareTitle 
            setTitle={setTitle}
            title={title} />
            <ShareTheme setTheme={setTheme} />
            <SubmitButton type="submit" value="공유하기" />
        </Form>
    );
};

export default ShareForm;

const Form = styled.form`
    padding: 20px;
    width: 500px;
    height: 550px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SubmitButton = styled.input`
    background-color: #60a5f8;
    border: none;
    padding: 10px 100px;
    font-size: 18px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    margin-top: 60px;
`;
