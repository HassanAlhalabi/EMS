import { ReactNode } from "react"

const Card = (  {title, children}:
                {title?: string,children: ReactNode}) => {
  return (
    <div className="card">
        <div className="card-header">
            {title}
        </div>
        <div className="card-body">
            {children}
        </div>
    </div>
  )
}

export default Card
