import SharedPlan from 'containers/share/SharedPlan';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getSharedPlanInfoById } from 'store/modules/plan/share';
import styled from 'styled-components';
import getAuthHeader from 'utils/getAuthHeader';
import useConfirmModal from 'hooks/useConfirmModal';

const confirmSharePayload = {
    width: 400,
    height: 300,
    message: `계획을 내 계획으로 가져오시겠습니까? 가져온 계획은 '마이페이지 > 내 계획'에서 확인 가능합니다.`,
};

const Share = () => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const { id } = useParams<'id'>();
    const headers = getAuthHeader();
    const [shareState, shareType, shareModalHandler] = useConfirmModal(
        confirmSharePayload,
        'share',
    );

    useEffect(() => {
        if (id) dispatch(getSharedPlanInfoById({ headers, planId: id }));
    }, []);

    useEffect(() => {
        if (shareState && shareType === 'share') {
            (async () => {
                try {
                    await axios.post(`/shares/${id}/bring`, {}, { headers });
                    navigate('/main');
                } catch (err) {
                    console.error(err);
                }
            })();
        }
    }, [shareState]);

    return (
        <>
            <ShareHeader>
                <TitleContainer>
                    <MainTitle>게시판</MainTitle>
                    <SubTitle1>여행 계획을 고민중이신가요?</SubTitle1>
                    <SubTitle2>
                        다른 사람의 계획을 내 계획에 추가해보세요!
                    </SubTitle2>
                </TitleContainer>
            </ShareHeader>
            <ShareBody>
                <ShareContents>
                    <SharedPlan />
                </ShareContents>
                <SubmitButton
                    onClick={shareModalHandler}
                    type="submit"
                    value="계획 가져오기"
                />
            </ShareBody>
        </>
    );
};

export default Share;

const ShareHeader = styled.section`
    min-width: 1287px;
    width: 100%;
    background-color: #e4f0ff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 60px 0;
`;
const TitleContainer = styled.div`
    width: 1287px;
    margin: 0 auto;
    color: #333;
`;
const MainTitle = styled.h1`
    font-size: 30px;
    font-weight: bold;
    letter-spacing: 1px;
`;

const Subtitle = styled.h2`
    font-size: 22px;
    font-weight: 400;
    letter-spacing: 1.5px;
`;
const SubTitle1 = styled(Subtitle)`
    margin-top: 35px;
    margin-bottom: 15px;
`;
const SubTitle2 = styled(Subtitle)``;

const ShareBody = styled.main`
    min-width: 1287px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 40px;
    margin-top: 10px;
`;

const ShareContents = styled.article`
    margin-top: 25px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const SubmitButton = styled.input`
    background-color: #60a5f8;
    border: none;
    padding: 12px 130px;
    font-size: 22px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    margin: 0px auto;
`;
