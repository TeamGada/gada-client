import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { PencilIcon, ResetIcon } from 'components/icons';
import { RootState } from 'store/modules';
import { useDispatch, useSelector } from 'react-redux';
import { setTitle } from 'store/modules/plan/plan';

const planTitleSelector = (state: RootState) => state.plan.title;

const PlanTitle: FC = () => {
    const dispatch = useDispatch();
    const title = useSelector(planTitleSelector);
    const container = useRef<HTMLDivElement>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(title);

    // useEffect(() => {
    //     document.addEventListener('mousedown', (e) => onClickOutside(e));
    // }, [newTitle]);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value);
    }, []);

    const onEnterKeyUp = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.code !== 'Enter') return;

            dispatch(setTitle({ newTitle }));
            setIsEdit(false);
        },
        [newTitle],
    );

    const onStartEdit = useCallback(() => {
        setIsEdit(true);
    }, []);

    const onResetTitle = useCallback(() => {
        setNewTitle(title);
    }, [title]);

    // const onClickOutside = useCallback(
    //     (e: React.MouseEvent | MouseEvent): void => {
    //         if (container.current?.contains(e.target as Node)) return;
    //         dispatch(setTitle({ newTitle }));
    //         setIsEdit(false);
    //     },
    //     [newTitle],
    // );

    return (
        <Container ref={container as React.RefObject<HTMLDivElement>}>
            {isEdit ? (
                <InputContainer>
                    <div className="input-info">
                        나만의 특별한 여행 제목을 만들어보세요.
                    </div>
                    <Input
                        type="text"
                        maxLength={15}
                        value={newTitle}
                        onChange={onChange}
                        onKeyUp={onEnterKeyUp}
                    />
                    <FocusBorder />
                </InputContainer>
            ) : (
                <Title>{title}</Title>
            )}
            <EditButton type="button">
                {isEdit ? (
                    <ResetIcon
                        width="15px"
                        height="15px"
                        onClick={onResetTitle}
                    />
                ) : (
                    <PencilIcon
                        width="14px"
                        height="12px"
                        onClick={onStartEdit}
                    />
                )}
            </EditButton>
        </Container>
    );
};

const mount = keyframes`
    from {
        transform: translateY(-90%);
    }
    to {
        transform: translateY(0%);
    }
`;

const Container = styled.div`
    margin-left: 15px;
    display: flex;
`;

const Title = styled.div`
    font-size: 28px;
`;

const InputContainer = styled.div`
    position: relative;
    width: 300px;

    & > .input-info {
        font-size: 12px;
        color: #ff0000;
        margin-bottom: 3px;
        animation: ${mount} 0.5s ease-in-out 0s 1 normal;
    }
`;

const Input = styled.input`
    font-size: 28px;
    margin-right: 5px;
    border: none;
    border-bottom: solid #aaaaaa 1px;
    box-sizing: border-box;

    &:focus {
        outline: none;
    }
    &:focus ~ span {
        width: 100%;
    }
    &:focus::placeholder {
        color: transparent;
    }
`;

const FocusBorder = styled.span`
    display: block;
    position: absolute;
    bottom: 0;
    left: 50%;
    background-color: #999999;
    width: 0;
    height: 2px;
    border-radius: 2px;
    transform: translateX(-50%);
    transition: 0.5s;
`;

const EditButton = styled.button`
    cursor: pointer;
    border: none;
    background-color: transparent;
    margin-bottom: 10px;
`;

export default PlanTitle;
