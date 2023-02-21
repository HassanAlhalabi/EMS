import { useState } from "react";
import { Button } from "react-bootstrap";
import PopUp from "../../components/modal";

const DashboardPage = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>
      <PopUp  title={'my TiLe'}
              show={modalShow}
              onHide={() => setModalShow(false)}>
              <h2>Form Here</h2>
      </PopUp>
    </>
  )
}

export default DashboardPage
