import React, { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/modules';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { setDistanceText } from 'utils/mapPointHelper';
import CustomMarker from 'components/CustomMarker';

const planListSelector = (state: RootState) => state.plan.planList;
const setDaySelector = (state: RootState) => state.plan.setDay;
const placeDistanceSelector = (state: RootState) => state.plan.placeDistance;

const ShowDistance: FC = () => {
    const planList = useSelector(planListSelector);
    const setDay = useSelector(setDaySelector);
    const placeDistance = useSelector(placeDistanceSelector);
    const planListLength = useMemo(() => {
        if (planList && planList.length > 0)
            return planList[setDay].length ?? 0;
        return 0;
    }, [planList, setDay]);

    return (
        <Container>
            {planListLength > 0 &&
                [...new Array(planListLength)].map((value, index) => (
                    <LocationPointBox key={`${setDay}-${placeDistance[index]}`}>
                        <CustomMarker
                            size={32}
                            border={20}
                            color={theme.USER_PLAN_COLOR[index]}
                            text={index + 1}
                        />
                        {index < planListLength - 1 && (
                            <DistanceLine>
                                <DistanceText>
                                    {setDistanceText(placeDistance[index])}
                                </DistanceText>
                            </DistanceLine>
                        )}
                    </LocationPointBox>
                ))}
        </Container>
    );
};

const Container = styled.div`
    padding-top: 15px;

    width: 80px;
    margin-left: 40px;
`;
const LocationPointBox = styled.div`
    width: 70%;
    height: 115px;
`;

const DistanceLine = styled.div`
    width: 2px;
    height: 100%;
    background: black;
    margin: 0 auto;
    z-index: 2;
    position: relative;
`;
const DistanceText = styled.p`
    width:
    margin-left: 10px;
    display: block;
    position: absolute;
    top: 25%;
    left: 100%;
`;

export default ShowDistance;
