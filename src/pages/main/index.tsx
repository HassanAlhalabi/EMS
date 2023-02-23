import Drawer from "../../components/drawer"
import LayoutHolder from "../../components/layout-holder"
import MainContent from "../../components/main-content"
import { LayoutContextProvider } from "../../contexts/layout-context"

const Main = () => {
  return (
    <LayoutContextProvider>
      <LayoutHolder>
          <Drawer />
          <MainContent />
      </LayoutHolder>
    </LayoutContextProvider>
  )
}

export default Main
