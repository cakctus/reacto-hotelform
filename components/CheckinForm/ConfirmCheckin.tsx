import styles from "../../styles/CheckinForm.module.css"

type Props = {
  fname: string
  sname: string
  dateCheckin: string
  emailAddress: string
  location: string
  persons: number
  childrens: number
  rooms: number
}

const ConfirmCheckin = ({ personInfo, state }: any) => {
  const {
    fname,
    sname,
    dateCheckin,
    emailAddress,
    location,
    persons,
    childrens,
    rooms,
  } = personInfo

  const checkName = (name: any) => {
    let n: string = ""
    switch (name) {
      case "fname":
        n = "First name:"
        break
      case "sname":
        n = "Last name:"
        break
      case "emailAddress":
        n = "Email Address:"
        break
      case "persons":
        n = "Adults:"
        break
      case "childrens":
        n = "Childrens:"
        break
      case "rooms":
        n = "Rooms:"
        break
    }
    return n
  }

  const loopConfObj = (obj: Props) => {
    const values = Object.entries(obj)
    return (
      <>
        {values.map((item, index) => {
          return (
            <div key={index}>
              <span className={styles.title}>{checkName(item[0])}</span>{" "}
              {item[1]}
            </div>
          )
        })}
      </>
    )
  }

  return (
    <>
      <div>
        <h1>Confirmation Checkin</h1>
        <div>{loopConfObj(personInfo)}</div>
      </div>
      <div>
        <span className={styles.title}>Checkin:</span>
        <div>{state[0].startDate.toLocaleDateString("us")}</div>
      </div>
      <div>
        <span className={styles.title}>Checkout</span>
        <div>{state[0].endDate.toLocaleDateString("us")}</div>
      </div>
    </>
  )
}

export default ConfirmCheckin
