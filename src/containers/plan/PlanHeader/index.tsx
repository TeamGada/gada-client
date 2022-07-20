import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useModal from 'hooks/useModal';
import useConfirmModal from 'hooks/useConfirmModal';
import PlanTitle from 'containers/plan/PlanHeader/PlanTitle';
import PlanPeriod from 'components/PlanPeriod';
import { useDispatch, useSelector } from 'react-redux';
import { changeShareMode } from 'store/modules/plan/plan';
import { RootState } from 'store/modules';

const shareModeSelector = (state: RootState) => state.plan.shareMode;
const confirmPropsPayload = {
    width: 400,
    height: 310,
    message: '계획 공유를 취소하시겠습니까?',
}

const PlanInfo: FC = () => {
    const openShareModal = useModal("ShareModal");
    const [confirmState, confirmType, confirmModalHandler] = useConfirmModal(confirmPropsPayload, "cancelShare");
    const dispatch = useDispatch();
    const shareMode = useSelector(shareModeSelector);

    useEffect(() => {
        if (confirmState && confirmType === 'cancelShare') {
            dispatch(changeShareMode(!shareMode))
        }
    }, [confirmState])
    
    const onClickSwitch = () => {
        if (shareMode) {
            // true -> false 니깐 공유 취소인 경우
            confirmModalHandler();            
        } else {
            // false -> true니깐 공유하는 경우
            openShareModal();
        }
    }

    return (
        <Container>
            <PlanTitle />
            <PlanPeriod />
            <PlanSwitch>
                <PlanSwitchLabel
                    shareMode={shareMode}>
                    공유하기
                </PlanSwitchLabel>
                <CheckBoxWrapper>
                    <CheckBox
                        checked={shareMode}
                        onClick={onClickSwitch}
                        id="checkbox"
                        type="checkbox" />
                    <CheckBoxLabel htmlFor="checkbox" />
                </CheckBoxWrapper>
            </PlanSwitch>
        </Container>
    );
};

const Container = styled.div`
    width: auto;
    height: 30px;
    margin: 30px;
    display: flex;
    flex-direction: row;

    align-items: center;

    & > button {
        cursor: pointer;
        border: none;
        border-radius: 20px;
        margin-top: 7px;
        background-color: ${({ theme }) => theme.PRIMARY};
        color: white;
    }
`;

const PlanSwitch = styled.div`
    display: flex;
    margin-left: auto;
`;

const PlanSwitchLabel = styled.p<{ shareMode: boolean }>`
    margin-right: 10px;
    height: 30px;
    line-height: 26px;
    font-weight: bold;
    color: ${({ shareMode }) => (
        shareMode ? "#60A5F8" : "#999"
    )};
    cursor: default;
`

const CheckBoxWrapper = styled.div`
    position: relative;
`;

const CheckBoxLabel = styled.label`
    position: absolute;
    top: 0;
    left: 0;
    width: 42px;
    height: 26px;
    border-radius: 15px;
    background: #bebebe;
    cursor: pointer;
    &::after {
        content: "";
        display: block;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        margin: 3px;
        background: #ffffff;
        box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
        transition: 0.2s;
    }
`;
const CheckBox = styled.input`
    opacity: 0;
    z-index: 1;
    border-radius: 15px;
    width: 42px;
    height: 26px;
    &:checked + ${CheckBoxLabel} {
        background: #60A5F8;
        &::after {
            content: "";
            display: block;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            margin-left: 21px;
            transition: 0.2s;
        }
    }
`;


export default PlanInfo;
