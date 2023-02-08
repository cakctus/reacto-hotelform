import React, { useState, useEffect } from "react"
import { DateRange } from "react-date-range"
import Link from "next/link"
import { addDays } from "date-fns"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { addForm, addDate } from "@/features/hotelFormSlice"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import Stack from "@mui/material/Stack"

import Snackbar from "@mui/material/Snackbar"
import MuiAlert, { AlertProps } from "@mui/material/Alert"
import "react-date-range/dist/styles.css" // main css file
import "react-date-range/dist/theme/default.css" // theme css file
import ConfirmCheckin from "./ConfirmCheckin"
import styles from "../../styles/CheckinForm.module.css"
type Props = {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const CheckinForm = (props: Props) => {
  const [openM, setOpenM] = React.useState(false)
  const [showNearLocation, setShowNearLocation] = useState<boolean>(false)
  const [open, setOpen] = React.useState(false)
  const [personInfo, setPersonInfo] = useState({
    fname: "",
    sname: "",
    dateCheckin: "",
    emailAddress: "",
    location: "",
    persons: 1,
    childrens: 0,
    rooms: 1,
  })
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
  ])
  const [locationToMe, setLocationToMe] = useState([
    "Manitoba",
    "Winnipeg",
    "Banf",
    "Calgary",
  ])

  const dispatch = useAppDispatch()
  const sliceForm = useAppSelector((form) => form.hotelForm)

  const redDates = [new Date("2023-02-01"), new Date("2023-02-16")]

  const getDaysInMonth = (month: any, year: any) => {
    const date = new Array(31)
      .fill("")
      .map((v, i) => new Date(year, month - 1, i + 1).getUTCDate())

    return date
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setShowNearLocation(false)
    const name = e.target.name
    const value = e.target.value
    setPersonInfo({
      ...personInfo,
      [name]: value,
    })
  }

  const handleClick = (item: string) => {
    setPersonInfo({
      ...personInfo,
      location: item,
    })
  }

  const handleSubmit = (e: React.FormEvent): void => {
    if (personInfo.fname && personInfo.sname && personInfo.emailAddress) {
      handleClickOpen()
    } else {
      alert("Please be sure you fill all required fields")
    }
  }

  const handleSave = () => {
    dispatch(addForm(personInfo))
    dispatch(
      addDate({
        startDate: `${state[0].startDate.getFullYear()}-${
          state[0].startDate.getMonth() + 1
        }-${state[0].startDate.getDate()}`,
        endDate: `${state[0].endDate.getFullYear()}-${
          state[0].endDate.getMonth() + 1
        }-${state[0].endDate.getDate()}`,
      })
    )
    handleClose()
    handleClickM()
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setPersonInfo({
      fname: "",
      sname: "",
      dateCheckin: "",
      emailAddress: "",
      location: "",
      persons: 1,
      childrens: 0,
      rooms: 1,
    })
    setState([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 0),
        key: "selection",
      },
    ])
  }

  const handleClickM = () => {
    setOpenM(true)
  }

  const handleCloseM = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setOpenM(false)
  }

  useEffect(() => {
    document.documentElement.addEventListener("click", (e: any) => {
      if (e.target.id !== "location") {
        setShowNearLocation(false)
      }
    })
  }, [])

  return (
    <>
      <div className={styles.checkinBlock}>
        <h1>Checkin Form</h1>
        <div className={styles.blockDiv}>
          <label htmlFor="fname">
            <span className={styles.lableTitle}>First Name</span>
          </label>
          <input
            type="text"
            name="fname"
            id="fname"
            value={personInfo.fname}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.blockDiv}>
          <label htmlFor="sname" className={styles.lableTitle}>
            Second Name
          </label>
          <input
            type="text"
            name="sname"
            id="sname"
            value={personInfo.sname}
            onChange={handleChange}
          />
        </div>
        <div className={styles.blockDiv}>
          <label htmlFor="emailAddress" className={styles.lableTitle}>
            Email Address
          </label>
          <input
            type="email"
            name="emailAddress"
            id="emailAddress"
            value={personInfo.emailAddress}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className={styles.blockDiv}>
          <label htmlFor="location">Where are you looking for?</label>
          <input
            type="text"
            id="location"
            name="location"
            value={personInfo.location}
            onChange={handleChange}
            onClick={() => setShowNearLocation((prev) => !prev)}
          />
        </div> */}
        {/* {showNearLocation && (
          <div>
            <p>Popular nearby destination</p>
            {locationToMe.map((item, index) => {
              return (
                <ul key={index}>
                  <li
                    onClick={() => handleClick(item)}
                    style={{ cursor: "pointer" }}
                  >
                    {item}
                  </li>
                </ul>
              )
            })}
          </div>
        )} */}
        <DateRange
          onChange={(item: any) => setState([item.selection])}
          ranges={state}
        />
        <div className={styles.blockDiv}>
          <label htmlFor="persons" className={styles.lableTitle}>
            Adults
          </label>
          <input
            type="number"
            id="persons"
            name="persons"
            value={personInfo.persons}
            min="1"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.blockDiv}>
          <label htmlFor="childrens" className={styles.lableTitle}>
            Childrens
          </label>
          <input
            type="number"
            id="childrens"
            name="childrens"
            value={personInfo.childrens}
            min="0"
            onChange={handleChange}
          />
        </div>
        <div className={styles.blockDiv}>
          <label htmlFor="rooms" className={styles.lableTitle}>
            Rooms
          </label>
          <input
            type="number"
            id="rooms"
            name="rooms"
            value={personInfo.rooms}
            min="1"
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSubmit} className={styles.sendButton}>
          Send
        </button>
      </div>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <ConfirmCheckin personInfo={personInfo} state={state} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave} autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={openM} autoHideDuration={3000} onClose={handleCloseM}>
          <Alert
            onClose={handleCloseM}
            severity="success"
            sx={{ width: "100%" }}
          >
            This is a success message!
          </Alert>
        </Snackbar>
      </Stack>
      <main className={styles.main}>
        <div>
          <Link href="/">
            <h1>Home</h1>
          </Link>
        </div>
        <div>
          <Link href="mycheckin">
            <h1>My checkin</h1>
          </Link>
        </div>
      </main>
    </>
  )
}

export default CheckinForm
