import React, { FC, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns'
import ko from 'date-fns/locale/ko';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import useConfirmModal from 'hooks/useConfirmModal';
import useModal from 'hooks/useModal';

const confirmPropsPayload = {
  width: 400,
  height: 310,
  message: '확인을 누르면 콘솔에 확인이, 취소를 투르면 아무것도 안떠야 한다.',
}

const Home: FC = () => {
    const [confirmState, confirmType, confirmModalHandler] = useConfirmModal(confirmPropsPayload, "password");
    const shareModalClickHandler = useModal("ShareModal");

    useEffect(() => {
      if (confirmState && confirmType === 'password') {
        console.log('확인이 눌렸음');
      }
      else {
        console.log('변화 없음')
      }

    }, [confirmState])

    const [calendar, setCalendar] = useState<any>([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: "selection",
        },
    ])

    const getDateInput = useCallback((calendar: any) => {
        const start = calendar.startDate.toLocaleDateString();
        const end = calendar.endDate.toLocaleDateString();
        return `${start} ~ ${end}`
    }, [calendar])

    const dateRangeChangeHandler = (item: any) => {
      setCalendar(() => {
        return [item.selection]
      })
    }

    return (
        <>  
            <ConfirmModalButton
            onClick={confirmModalHandler}>
              확인창
            </ConfirmModalButton>
            <ShareModalButton
            onClick={shareModalClickHandler}
            >
              공유 모달
            </ShareModalButton>
            <DateWrapper>
                <DateLabel
                    htmlFor="title"
                >
                    날짜
                </DateLabel>
                <DateInput
                    type='text'
                    name="date"
                    value={getDateInput(calendar[0])}
                    disabled
                />
            </DateWrapper>

            <DateRangeWrapper
                locale={ko}
                onChange={dateRangeChangeHandler}
                moveRangeOnFirstSelection={false}
                ranges={calendar}
                dateDisplayFormat='yyyy.MM.dd'
            />
        </>
    )
}

export default Home;

const DateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const DateLabel = styled.label`
  display: inline-block;
  width: 62.56px;
  color: #60A5F8;
  font-weight: bold;
  font-size: 17px;
  margin-right: 26px;
  letter-spacing: 10px;
  text-align: center;

`
const DateInput = styled.input`
  width: 180px;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 500;
  border: none;
  border-radius: 5px;
  background-color: #ECF3FD;
  cursor: not-allowed;

  &:focus {outline:none;}
`

const DateRangeWrapper = styled(DateRange)`
  background-color: white;

  .rdrMonth {
    width: 240px;
    height: 160px;
  }

  .rdrMonthAndYearWrapper {
    padding: 0 10px;
  }
  .rdrMonthsVertical {
    margin-left: auto;
    margin-right: auto;
  }

  .rdrDateDisplayWrapper {
    display: none;
  }
`

const ShareModalButton = styled.button``;

const ConfirmModalButton = styled.button``