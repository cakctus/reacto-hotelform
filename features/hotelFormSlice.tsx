import { createSlice } from "@reduxjs/toolkit"

interface initState {
  fname: string
  sname: string
  checkinDate: string
  checkoutDate: string
  persons: number
  childrens: number
  rooms: number
  startDate: any
  endDate: any
  emailAddress: string
}

const initialState: initState = {
  fname: "",
  sname: "",
  checkinDate: "",
  checkoutDate: "",
  persons: 1,
  childrens: 0,
  rooms: 1,
  startDate: "",
  endDate: "",
  emailAddress: "",
}

const hotelFormSlice = createSlice({
  name: "hotelForm",
  initialState,
  reducers: {
    addForm(state, action) {
      return (state = {
        // ...state,
        ...action.payload,
      })
    },
    addDate(state, action) {
      return (state = {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      })
    },
    removeForm(state, action) {
      return (state = {
        fname: "",
        sname: "",
        checkinDate: "",
        checkoutDate: "",
        persons: 1,
        childrens: 0,
        rooms: 1,
        startDate: "",
        endDate: "",
        emailAddress: "",
      })
    },
  },
})

export const { addForm, addDate, removeForm } = hotelFormSlice.actions
export default hotelFormSlice.reducer
