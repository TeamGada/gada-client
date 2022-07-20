import React, { FC, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Modal from 'components/Modal';
import { RootState } from 'store/modules';
import { useDispatch, useSelector } from 'react-redux';
import { changeOpenState, changeModalName } from 'store/modules/modal';
import jeju from 'images/jeju.jpg';
import { PencilIcon, ClockIcon, WonIcon } from 'components/icons';
import { theme } from 'styles/theme';
import SubmitButton from 'components/StyledSmitButton';
import { Place } from 'store/modules/plan';

const ModalSelector = (state: RootState) => state.modal;
const PlanSelector = (state: RootState) => state.plan;
const setDay = (state: RootState) => state.plan.setDay;
const detailIdSelector = (state: RootState) => state.plan.clickPlaceDetailId;

const PlanDetailModal: FC = () => {
    const dispatch = useDispatch();
    const { modalIsOpen } = useSelector(ModalSelector);
    const {
        planList,
        setDay,
        clickPlaceDetailId: detailId,
    } = useSelector(PlanSelector);

    /**
     * 이벤트 요청이 들어온 Place정보를 같아오는 Memo
     */
    const SelectedDetailPlace: Place | undefined = useMemo(() => {
        if (!detailId) return undefined;
        const Place = planList[setDay].find((p) => p.id === detailId);
        return Place;
    }, [detailId]);

    const [details, setDetails] = useState({
        description: '',
        time: '',
        cost: '',
    });

    useEffect(() => {
        // setDetails
        if (SelectedDetailPlace) {
            setDetails({
                description: SelectedDetailPlace?.description ?? '',
                time: SelectedDetailPlace?.time ?? '',
                cost: SelectedDetailPlace?.cost ?? '',
            });
        }
        console.log('CUSTOM: It is State When you enter Detail', details);
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const name: string = e.target?.name;
        const value: any = e.target?.value;
        if (!name) return;
        setDetails((detail) => ({ ...detail, [name]: value }));
    };

    // click 이벤트 핸들러 - 모달 삭제 함수
    const removeHandler = (e: React.MouseEvent) => {
        e.preventDefault();

        console.log('CUSTOM: It is State When you leave Detail', details);

        dispatch(changeOpenState(!modalIsOpen));
    };

    return (
        <Modal
        width={500}
        height={770}
        >
            <PlaceDetailThumbnail
                src={SelectedDetailPlace?.imgUrl ?? jeju}
            />
            <PlaceDetailContents>
                <PlaceDetailTitle>
                    <p className="title">{SelectedDetailPlace?.name}</p>
                    <p className="subtitle">
                        {SelectedDetailPlace?.address}
                    </p>
                </PlaceDetailTitle>
                <PlaceDetailMemo>
                    <MemoHeader className="head">
                        <PencilIcon
                            color="#666"
                            width={20}
                            height={20}
                        />
                        <p>메모하기</p>
                    </MemoHeader>
                    <textarea
                        name="description"
                        value={details.description}
                        onChange={handleChange}
                    />
                </PlaceDetailMemo>
                <PlaceDetailTime>
                    <MemoHeader className="head">
                        <ClockIcon
                            color="#666"
                            width={22}
                            height={22}
                        />
                        <p>시간</p>
                    </MemoHeader>
                    <Input
                        type="text"
                        name="time"
                        value={details.time}
                        onChange={handleChange}
                    />
                </PlaceDetailTime>
                <PlaceDetailCost>
                    <MemoHeader className="head">
                        <WonIcon
                            color="#666"
                            width={20}
                            height={20}
                        />
                        <p>비용</p>
                    </MemoHeader>
                    <Input
                        type="text"
                        name="cost"
                        value={details.cost}
                        onChange={handleChange}
                    />
                </PlaceDetailCost>
            </PlaceDetailContents>
            <SubmitButton 
            width={250} 
            height={50} 
            fontSize={18}
            onClick={removeHandler}>
                메모하기
            </SubmitButton>
        </Modal>
    );
};
const PlaceDetailCost = styled.div`
    margin-bottom: 50px;
`;
const PlaceDetailTime = styled.div`
    margin: 20px 0;
`;
const PlaceDetailContents = styled.div`
    width: calc(100% - 100px);
    .head {
        margin: 10px 0 5px 0;
        > p {
            font-family: 'Noto Sans KR';
            font-style: normal;
            font-weight: 700;
            font-size: 18px;
            line-height: 29px;
            color: #666;
            display: inline;
            margin: 0 10px;
        }
    }
`;

const PlaceDetailThumbnail = styled.img`
    width: 140px;
    height: 140px;
    border-radius: 50%;
    object-fit: cover;
    margin-top: 30px;
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
`;
const PlaceDetailTitle = styled.div`
    height: 72px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    .title {
        font-weight: bold;
        font-size: 20px;
        color: #444;
    }
    .subtitle {
        font-weight: 400;
        font-size: 17px;
        color: #666;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    border-bottom: 1px solid #ababab;
`;

const MemoHeader = styled.div`
    display: flex;
    align-items: center;
`

const PlaceDetailMemo = styled.div`
    margin-top: 30px;
    textarea {
        width: 100%;
        height: 110px;
        border-radius: 5px;
        border: 0px;
        padding 20px;
        resize: none;
        box-sizing: border-box;
        box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
        outline: none;
        font-size: 14px;
        color: #666;
    }
`;

const Input = styled.input`
    :focus {
        outline: none;
    }

    height: 35px;
    font-size: 14px;
    border: none;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
    padding: 0 20px;
    color: #666;
`

const Backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 101;
    background-color: rgba(0, 0, 0, 0.2);
`;

// const Cancel = styled(CancelIcon)`
//     position: absolute;
//     right: 30px;
//     top: 30px;
//     cursor: pointer;
// `;

export default PlanDetailModal;
