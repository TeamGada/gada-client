import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import AddCard from 'containers/main/PlanList/AddCard';
import PlanCard from 'containers/main/PlanList/PlanCard';
import jejuImg from 'images/jeju.jpg';
import SlickSlider from 'components/SlickSlider';
import axios from 'axios';
import { PlanModel } from 'store/modules/plan/plan.model'
import { getDday, getTerm } from 'utils/usefulFunctions';
import getAuthHeader from 'utils/getAuthHeader'

const preprocessPlanDatas = (planDataArray: PlanModel[]) => {
    return planDataArray.map((data) => {
        const { _id, area, title, imgUrl, startDate, lastDate } = data;
        return {
            id: _id,
            area,
            title,
            imgUrl,
            dDay: getDday(startDate),
            term: getTerm(startDate, lastDate)
        }
    })
}

interface PreprocessedPlanModel {
    id: string;
    area: string;
    title: string;
    imgUrl: string;
    dDay: string;
    term: string;
}

const PlanList : FC = () => {
    const [ planDatas, setPlanDatas ] = useState<PreprocessedPlanModel[]>();
    const headers = getAuthHeader();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('/plans', { headers });
                const preprocessedData = preprocessPlanDatas(data);
                setPlanDatas(preprocessedData);
                console.log(preprocessedData)
            } catch(err) {
                console.log(err);
            }
        })()
    }, [])

    return (
        <PlanListWrapper>
            <PlanListTitle>유저님, 여행을 준비하세요.</PlanListTitle>
            <PlanListContainer>
                <SlickSlider
                width={1200}
                slidesToShow={5}
                slidesToScroll={2}
                arrowPadding={50}
                arrowSize={25}
                boxShadow
                >
                    <AddCard />
                    {planDatas?.map((data) => (
                        <PlanCard
                            key={data.id}
                            dday={data.dDay}
                            src={jejuImg}
                            imageName={data.area}
                            title={data.title}
                            term={data.term}
                        />
                    ))}
                </SlickSlider>
            </PlanListContainer>
        </PlanListWrapper>
    )
}

export default PlanList;

const PlanListWrapper = styled.section`
    width: 1287px;
    margin: 70px auto;
`;

const PlanListTitle = styled.h2`
    font-size: 30px;
    margin-bottom: 35px;
    cursor: default;
`;

const PlanListContainer = styled.div`
    padding: 20px 30px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    border-radius: 10px;
`;