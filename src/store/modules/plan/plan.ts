import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    changePosition2DistanceArray,
    changePosition2DistanceCenter,
    getPosition2bound,
} from 'utils/mapPointHelper';
import { Place, Position } from '.';

export interface planState {
    title: string;
    startDate: Date;
    lastDate: Date;
    period: number;
    setDay: number;
    grabPlanId: string | null;
    grabPlaceOptionId: string | null;
    clickPlaceDetailId: string | null;
    planList: Place[][];
    placeOptionList: Place[];
    placeDistance: number[];
    placeDistanceCenter: Position[];
    mapCenterBound: kakao.maps.LatLngBounds | null;
    shareMode: boolean;
}

const initialState: planState = {
    title: '부산 바캉스',
    startDate: new Date(20, 11, 3),
    lastDate: new Date(20, 11, 10),
    period: 1,
    setDay: 0,
    grabPlanId: null,
    grabPlaceOptionId: null,
    clickPlaceDetailId: null,
    planList: [],
    placeOptionList: [],
    placeDistance: [],
    placeDistanceCenter: [],
    mapCenterBound: null,
    shareMode: false,
};
const setPointRelatedOptions = (state: planState) => {
    state.placeDistance = changePosition2DistanceArray(
        state.planList[state.setDay],
    );
    state.placeDistanceCenter = changePosition2DistanceCenter(
        state.planList[state.setDay],
    );
    state.mapCenterBound = getPosition2bound(state.planList[state.setDay]);
};

const planDetailSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        initializeData(state: planState, action) {
            const { initPlaceOptionList, initPlanDetailList } = action.payload;
            state.placeOptionList = [...initPlaceOptionList];
            // state.planList = [...initPlanDetailList];
        },
        insertPlaceOptionList(
            state: planState,
            action: PayloadAction<Place[]>,
        ) {
            const selectedPlaces = action.payload;
            state.placeOptionList = [
                ...state.placeOptionList,
                ...selectedPlaces,
            ];
        },
        deletePlaceOptionList(state: planState, action: PayloadAction<string>) {
            const optionPlaceId = action.payload;
            state.placeOptionList = state.placeOptionList.filter(
                (place) => place.id !== optionPlaceId,
            );
        },
        createPlanListArray(state: planState, action) {
            const days = action.payload.days ?? 1;
            const arr = new Array<Place[]>(days).fill([]);
            state.planList = arr;
        },
        setTitle(state: planState, action) {
            const { newTitle } = action.payload;
            state.title = newTitle;
        },
        setUpDay(state: planState, action) {
            const { selectedDay } = action.payload;
            state.setDay = selectedDay;
            setPointRelatedOptions(state);
        },
        sortPlanList(state: planState, action) {
            const { list } = action.payload;
            state.planList[state.setDay] = [...list];
            // calc distance
            setPointRelatedOptions(state);
        },
        sortplaceOptionList(state: planState, action) {
            const { list } = action.payload;
            state.placeOptionList = [...list];
        },
        grabPlan(state: planState, action) {
            const { id } = action.payload;
            state.grabPlanId = id;
        },
        grabPlaceOption(state: planState, action) {
            const { id } = action.payload;
            state.grabPlaceOptionId = id;
        },
        setClickPlaceDetailId(
            state: planState,
            action: PayloadAction<string | undefined>,
        ) {
            if (!action.payload) {
                state.clickPlaceDetailId = null;
                return;
            }
            state.clickPlaceDetailId = action.payload;
        },
        movePlanToPlaceOption(state: planState) {
            // dropPlan
            const droppedPlan = state.planList[state.setDay].find(
                (plan) => plan.id === state.grabPlanId,
            ) as Place;
            const idx = state.planList[state.setDay].indexOf(droppedPlan);
            console.log('CUSTOM LOG: ', state.grabPlanId, idx);
            state.planList[state.setDay].splice(idx, 1);
            state.placeOptionList.push(droppedPlan);
        },
        movePlaceOptionToPlan(state: planState) {
            // dropPlaceOption
            const droppedPlaceOption = state.placeOptionList.find(
                (option) => option.id === state.grabPlaceOptionId,
            ) as Place;

            const idx = state.placeOptionList.indexOf(droppedPlaceOption);
            console.log('CUSTOM LOG: ', state.grabPlanId, idx);
            state.placeOptionList.splice(idx, 1);
            state.planList[state.setDay].push(droppedPlaceOption);
            setPointRelatedOptions(state);
        },
        changeShareMode(state: planState, action:PayloadAction<boolean>) {
            state.shareMode = action.payload;
            console.log('CUSTOM SHARE', state.shareMode);
        },
    },
});

const { reducer, actions } = planDetailSlice;

export const {
    initializeData,
    createPlanListArray,
    insertPlaceOptionList,
    deletePlaceOptionList,
    setTitle,
    setUpDay,
    sortplaceOptionList,
    grabPlan,
    sortPlanList,
    grabPlaceOption,
    setClickPlaceDetailId,
    movePlanToPlaceOption,
    movePlaceOptionToPlan,
    changeShareMode,
} = actions;

export default reducer;
