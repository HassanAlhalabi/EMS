import { ReactNode } from "react"

const PageCard = ({children}:
                {children: ReactNode}) => {
  return (
    <div className="card">
        <div className="card-body d-grid">
            {children}
        </div>
    </div>
  )
}

export default PageCard
