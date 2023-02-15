import { Outlet } from "react-router-dom"
import Header from "../header"

const MainContent = () => {
  return (
    <div className="content">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default MainContent
