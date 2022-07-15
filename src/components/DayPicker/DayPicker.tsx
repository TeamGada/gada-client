import React, { FC, Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { customAlphabet } from 'nanoid';
import SlickSlider from 'components/SlickSlider';
import { RootState } from 'store/modules';
import { setUpDay } from 'store/modules/plan';

interface IProps {
    setIsAllPlan: Dispatch<SetStateAction<boolean>>;
    planPeriod: number;
}

const setDaySelector = (state: RootState) => state.plan.setDay;

const DayPicker: FC<IProps> = ({ setIsAllPlan, planPeriod }) => {
    const dispatch = useDispatch();
    const nanoid = customAlphabet('01234567899abcedf', 6);
    const setDay = useSelector(setDaySelector);

    const onSetUpDay = (e: React.MouseEvent<HTMLButtonElement>) => {
        const selectedDay = parseInt(e.currentTarget.dataset.day as string, 10);
        dispatch(setUpDay({ selectedDay }));
    };

    return (
        <Container>
            <SlickSlider
                width={520}
                speed={500}
                slidesToShow={5}
                slidesToScroll={2}
                arrowPadding={0}
                arrowSize={13}
                itemCursor="default"
            >
                <ButtonCard>
                    <Button
                        type="button"
                        className="all-button"
                        onClick={() => setIsAllPlan(true)}
                    >
                        All
                    </Button>
                </ButtonCard>
                {[...Array(planPeriod)].map((x, i: number) => (
                    <ButtonCard key={nanoid()}>
                        <Button
                            type="button"
                            className={i === setDay ? 'selected-button' : ''}
                            data-day={i}
                            onClick={onSetUpDay}
                        >
                            Day{i + 1}
                        </Button>
                    </ButtonCard>
                ))}
            </SlickSlider>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 75px;
    display: flex;
    align-items: center;
`;

const ButtonCard = styled.div`
    width: 100px;
    height: 35px;
`;

const Button = styled.button`
    cursor: pointer;
    width: 95px;
    height: 100%;
    border-radius: 20px;
    border: solid 1px ${({ theme }) => theme.LIGHT_GRAY};
    border-radius: 20px;
    background-color: white;
    font-size: 16px;

    &.selected-button {
        border: solid 1px ${({ theme }) => theme.LIGHT_GRAY};
        background-color: ${({ theme }) => theme.PRIMARY};
        color: #ffffff;
    }

    &:hover {
        border: solid 1px ${({ theme }) => theme.LIGHT_GRAY};
        background-color: ${({ theme }) => theme.PRIMARY};
        color: #ffffff;
    }
`;

export default DayPicker;