import { cookieOption } from '@/constants/data';
import { ExtentedDataInterface } from '@/pages/dashboard/queries/queries';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export enum AgeTypes {
  All = 'all',
  Age15To25 = '15-25',
  Over25 = '>25'
}
export enum Gender {
  All = 'all',
  Male = 'Male',
  Female = 'Female'
}
export interface DataSliceInterface {
  data: ExtentedDataInterface[];
  active: string;
  age: AgeTypes;
  gender: Gender;
  firstAdd: boolean;
  date: {
    from: string;
    to: string;
  };
}
const initialState: DataSliceInterface = {
  data: [
    {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      F: 0,
      Age: AgeTypes.All,
      Gender: Gender.All,
      Day: new Date().toISOString()
    }
  ],
  active: (Cookies.get('active') as string) || '',
  age: (Cookies.get('age') as AgeTypes) || AgeTypes.All,
  gender: (Cookies.get('gender') as Gender) || Gender.All,
  firstAdd: false,
  date: {
    from: Cookies.get('from') || '2022-10-01T00:00:00.000Z',
    to: Cookies.get('to') || '2022-10-29T00:00:00.000Z'
  }
};

const dataSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addAllDataReducers: (
      state,
      action: { payload: ExtentedDataInterface[] }
    ) => {
      state.data = action.payload;
      state.firstAdd = true;
    },
    activeReducers: (state, action: { payload: string }) => {
      Cookies.set('active', action.payload, cookieOption);
      state.active = action.payload;
    },
    ageReducers: (state, action: { payload: AgeTypes }) => {
      Cookies.set('age', action.payload, cookieOption);
      state.age = action.payload;
    },
    genderReducers: (state, action: { payload: Gender }) => {
      Cookies.set('gender', action.payload, cookieOption);
      state.gender = action.payload;
    },
    getCookieReducers: (state) => {
      state.gender = Cookies.get('gender') as Gender || Gender.All;
      state.age = Cookies.get('age') as AgeTypes || AgeTypes.All;
      state.date.from = Cookies.get('from') as string || "";
      state.date.to = Cookies.get('to') as string || "";
      state.active = Cookies.get('active') as string || "";
    },
    dateReducers: (
      state,
      action: { payload: { from: string; to: string } }
    ) => {
      Cookies.set('from', action.payload.from, cookieOption);
      Cookies.set('to', action.payload.to, cookieOption);
      state.date = {
        from: action.payload.from,
        to: action.payload.to
      };
    }
  }
});

export const {
  addAllDataReducers,
  activeReducers,
  ageReducers,
  genderReducers,
  dateReducers,
  getCookieReducers
} = dataSlice.actions;
export default dataSlice.reducer;
