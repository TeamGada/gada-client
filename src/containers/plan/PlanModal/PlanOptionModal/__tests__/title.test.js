/* eslint-disable no-undef */
import { fireEvent, render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import TitleTrigger from '../Title';

const Wrapper = () => {
    const [state, setState] = useState(true);
    return <TitleTrigger state={state} onClick={() => setState((f) => !f)} />;
};
describe('Plan Modal 타이틀 테스트', () => {
    it('타이틀이 렌더링 되었는가?', () => {
        render(<Wrapper />);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it('타이틀 클릭시 텍스트가 변하는가?', () => {
        render(<Wrapper />);

        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('나만의 장소 추가하기');
        fireEvent.click(button);
        expect(button).toHaveTextContent('검색으로 찾기');
    });
});
