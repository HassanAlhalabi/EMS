import { Stack } from "react-bootstrap"
import Drawer from "../../components/drawer"
import LayoutHolder from "../../components/layout-holder"
import MainContent from "../../components/main-content"

const Main = () => {

  return (
    <LayoutHolder>
        <Drawer />
        <MainContent />
    </LayoutHolder>
  )
}

export default Main
