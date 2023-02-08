import { useAppSelector, useAppDispatch } from "@/hooks/hooks"
import { removeForm } from "@/features/hotelFormSlice"
import styles from "../../styles/MyCheckinForm.module.css"

type Props = {}

const MyCheckinForm = (props: Props) => {
  const myCheckin = useAppSelector((item) => item.hotelForm)
  const dispatch = useAppDispatch()

  const handleCancel = () => {
    localStorage.removeItem("hotelForm")
    dispatch(removeForm(null))
  }

  return (
    <>
      <div className={styles.block}>
        {myCheckin.fname.length > 0 ? (
          <>
            <div>
              <span className={styles.title}>First name:</span>
              {myCheckin.fname}
            </div>
            <div>
              <span className={styles.title}>Last name:</span> {myCheckin.sname}
            </div>
            <div>
              <span className={styles.title}>Email:</span>
              {myCheckin.emailAddress}
            </div>
            <div>
              <span className={styles.title}>Adults:</span>
              {myCheckin.persons}
            </div>
            <div>
              <span className={styles.title}>Checkin:</span>
              {myCheckin.startDate}
            </div>
            <div>
              <span className={styles.title}>Checkout:</span>
              {myCheckin.endDate}
            </div>
            <div>
              <button onClick={handleCancel}>Cancel Checkin</button>
            </div>
          </>
        ) : (
          <h1>You don't have yet any check in</h1>
        )}
      </div>
    </>
  )
}

export default MyCheckinForm
