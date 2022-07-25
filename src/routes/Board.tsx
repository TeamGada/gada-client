import React, { useState, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LikeIcon, UnlikeIcon } from 'components/icons';
import Select from 'react-select';
import axios from 'axios';
import getAuthHeader from 'utils/getAuthHeader';
import useConfirmModal from 'hooks/useConfirmModal';
import { boardCustomStyles, selectOptions, tags } from 'utils/usefulFunctions';

const selectDefaultValue = {
    label: '전체',
    value: '전체',
};

const confirmPropsPayload = {
    width: 400,
    height: 310,
    message: '계획 공유를 취소하시겠습니까?',
};

const Board = () => {
    const [searchParams] = useSearchParams();
    const [clickedTag, setClickedTag] = useState<string>('전체');
    const [location, setLocation] = useState<string>('전체');
    const [datas, setDatas] = useState<any>();
    const [checkLike, setCheckLike] = useState<any>();
    const [clickedId, setClickedId] = useState<any>();
    const [shareState, setShareState] = useState<any>();
    const [pageType, setPageType] = useState<any>(searchParams.get('type'));
    const headers = getAuthHeader();
    const [confirmState, confirmType, confirmModalHandler] = useConfirmModal(
        confirmPropsPayload,
        'cancelShare',
    );
    const navigate = useNavigate();
    const options = selectOptions.map((option) => ({
        value: option,
        label: option,
    }));

    const changeLocationHandler = (value: any) => {
        setLocation(value.value);
    };

    const clickCardHandler = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        planId: string,
    ) => {
        navigate(`/share/${planId}`);
    };

    const cancelCardHandler = (e: any, planId: string) => {
        e.stopPropagation();
        setClickedId(planId);
        confirmModalHandler();
    };

    const clickLikeHandler = (
        e: React.MouseEvent<SVGSVGElement, MouseEvent>,
        planId: string,
        clickedLike: boolean,
    ) => {
        e.stopPropagation();

        (async () => {
            try {
                const body = {
                    planId,
                    toggle: !clickedLike,
                };
                await axios.post('/likes', body, { headers });
                setCheckLike(body);
            } catch (err) {
                console.error(err);
            }
        })();
    };

    const clickTagHandler = (e: any) => {
        setClickedTag(e.target.value);
    };

    useEffect(() => {
        /**
         * redux plan list -> []
         */
        setDatas([]);
        setPageType(searchParams.get('type'));
    }, [searchParams.get('type')]);

    // 공유 취소 관련
    useEffect(() => {
        (async () => {
            try {
                if (confirmState && confirmType === 'cancelShare') {
                    const data = {
                        toggle: false,
                    };
                    // 공유취소
                    await axios.post(`shares/${clickedId}`, data, {
                        headers,
                    });
                    setShareState(!shareState);
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, [confirmState]);

    // 초기 데이터 받아오기
    useEffect(() => {
        (async () => {
            try {
                let results;
                if (pageType === 'all') {
                    results = await axios.get(
                        `/shares/${clickedTag}/${location}`,
                        { headers },
                    );
                } else {
                    results = await axios.get(
                        `/shares/my-share/${clickedTag}/${location}`,
                        { headers },
                    );
                }
                const { myLikes } = results.data.data;
                let { sharedPlans } = results.data.data;

                // likeCount, clickedLike 추가
                sharedPlans = sharedPlans.map((data: any) => {
                    const clickedLike = myLikes.some(
                        (planId: string) => planId === data.planId,
                    );
                    return {
                        ...data,
                        likeCount: data.likes.length,
                        title: data.shareTitle,
                        location: data.area,
                        clickedLike,
                    };
                });
                setDatas(sharedPlans);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [clickedTag, location, pageType, shareState]);

    // 좋아요 관련 side effect
    useEffect(() => {
        if (checkLike) {
            const { planId, toggle } = checkLike;
            const newData = datas.map((data: any) => {
                const prevLikeCount = data.likeCount;
                if (data.planId === planId) {
                    // 같으면 좋아요 및 하트 변경
                    const newLikeCount = toggle
                        ? prevLikeCount + 1
                        : prevLikeCount - 1;
                    return {
                        ...data,
                        likeCount: newLikeCount,
                        clickedLike: toggle,
                    };
                }
                return data;
            });

            setDatas(newData);
        }
    }, [checkLike]);

    return (
        <>
            <BoardHeader>
                <TitleContainer>
                    <MainTitle>게시판</MainTitle>
                    <SubTitle1>여행 계획을 고민중이신가요?</SubTitle1>
                    <SubTitle2>
                        다른 사람의 계획을 내 계획에 추가해보세요!
                    </SubTitle2>
                </TitleContainer>
            </BoardHeader>
            <Main>
                <MainContainer>
                    <ButtonContainer>
                        {tags.map((tag) => (
                            <TagButton
                                key={tag}
                                onClick={clickTagHandler}
                                value={tag}
                                isClicked={clickedTag === tag}
                            >
                                {tag}
                            </TagButton>
                        ))}
                        <SelectWrapper>
                            <Select
                                options={options}
                                styles={boardCustomStyles}
                                placeholder="지역"
                                onChange={changeLocationHandler}
                                defaultValue={selectDefaultValue}
                            />
                        </SelectWrapper>
                    </ButtonContainer>
                    <CardListContainer>
                        {datas?.map((data: any) => (
                            <BoardCard
                                key={data.planId}
                                onClick={(e) =>
                                    clickCardHandler(e, data.planId)
                                }
                            >
                                <CardHeader>
                                    <Tag>{data.tag}</Tag>
                                    <Location>{data.area}</Location>
                                </CardHeader>
                                <CardTitle>{data.shareTitle}</CardTitle>
                                <CardButtons>
                                    {pageType === 'myShare' ? (
                                        <CancelButton
                                            onClick={(e) =>
                                                cancelCardHandler(
                                                    e,
                                                    data.planId,
                                                )
                                            }
                                        >
                                            공유취소
                                        </CancelButton>
                                    ) : (
                                        <Helper />
                                    )}
                                    {data.clickedLike ? (
                                        <LikeButton
                                            onClick={(e) =>
                                                clickLikeHandler(
                                                    e,
                                                    data.planId,
                                                    data.clickedLike,
                                                )
                                            }
                                            pageType={pageType}
                                        />
                                    ) : (
                                        <UnlikeButton
                                            onClick={(e) =>
                                                clickLikeHandler(
                                                    e,
                                                    data.planId,
                                                    data.clickedLike,
                                                )
                                            }
                                            pageType={pageType}
                                        />
                                    )}
                                </CardButtons>
                                <CardInfo>
                                    <UserName>{data.username}</UserName>
                                    <LikeCount>
                                        좋아요 {data.likeCount}개
                                    </LikeCount>
                                </CardInfo>
                            </BoardCard>
                        ))}
                    </CardListContainer>
                </MainContainer>
            </Main>
        </>
    );
};

export default Board;

const BoardHeader = styled.section`
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

const Main = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

const MainContainer = styled.div`
    width: 1287px;
    margin: 80px auto;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;

    & > button:not(:first-of-type) {
        margin-left: 10px;
    }

    padding-bottom: 10px;
    margin-bottom: 30px;
    border-bottom: solid #ccc 1px;
`;

const TagButton = styled.button<{ isClicked: boolean }>`
    cursor: pointer;
    border: none;
    font-weight: bold;
    padding: 6px 23px;
    border-radius: 50px;
    font-size: 16px;
    transition: all 0.2s;

    :hover {
        background-color: #60a5f8;
        color: white;
    }

    ${({ isClicked }) =>
        isClicked
            ? css`
                  background-color: #60a5f8;
                  color: white;
              `
            : css`
                  background-color: #e4f0ff;
                  color: #60a5f8;
              `}
`;

const SelectWrapper = styled.div`
    margin-left: auto;
    box-sizing: border-box;
`;

const CardListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 233px);
    grid-column-gap: 30px;
    grid-row-gap: 30px;
    place-content: center;
`;

const BoardCard = styled.div`
    width: 233px;
    height: 300px;
    border: solid #ccc 1px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    box-sizing: border-box;
    padding: 20px;

    &:hover {
        transform: translate(0, -5px);
        box-shadow: 0 8px 18px -5px rgb(0, 0, 0, 10%);
    }

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CardHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;
const Tag = styled.button`
    display: inline-block;
    padding: 7px 13px;
    border-radius: 30px;
    font-size: 12px;
    border: none;
    background-color: #60a5f8;
    color: white;
    font-weight: bold;
    cursor: pointer;
`;
const Location = styled.div`
    font-size: 14px;
    font-weight: bold;
    color: #666;
    margin-right: 7px;
`;

const CardTitle = styled.div`
    width: 100%;
    height: 90px;
    overflow: hidden;
    color: #444;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 45px;
    line-height: 140%;
`;

const CardButtons = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: solid #ccc 1px;
    margin-bottom: 15px;
`;

const Helper = styled.div`
    width: 1px;
    height: 28px;
`;

const CancelButton = styled.button`
    cursor: pointer;
    border: none;
    background-color: #f86960;
    font-weight: bold;
    color: white;
    padding: 6px 8px;
    border-radius: 5px;
    font-size: 12px;
    transition: all ease 0.2s;

    &:hover {
        transform: translate(0, -3px);
    }
`;

const LikeButton = styled(LikeIcon)<{ pageType: string }>`
    cursor: cursor;
    display: inline-block;
    margin-right: 7px;
    transition: all ease 0.2s;

    &:hover {
        transform: translate(0, -3px);
    }

    ${({ pageType }) =>
        pageType === 'all' &&
        css`
            margin-left: auto;
        `}
`;

const UnlikeButton = styled(UnlikeIcon)<{ pageType: string }>`
    cursor: cursor;
    display: inline-block;
    margin-right: 7px;
    transition: all ease 0.2s;

    &:hover {
        transform: translate(0, -3px);
    }

    ${({ pageType }) =>
        pageType === 'all' &&
        css`
            margin-left: auto;
        `}
`;

const CardInfo = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #666;
    font-weight: bold;
    font-size: 14px;
`;
const UserName = styled.div`
    margin-left: 7px;
    overflow: hidden;
`;
const LikeCount = styled.div`
    margin-right: 7px;
`;
