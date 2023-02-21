import { Outlet } from "react-router-dom"
import Header from "../header"
import PageCard from "../page-card"

const MainContent = () => {
  return (
    <div className="content">
      <Header />
      <main>
        <PageCard>
          <Outlet />
        </PageCard>
      </main>
    </div>
  )
}

export default MainContent
