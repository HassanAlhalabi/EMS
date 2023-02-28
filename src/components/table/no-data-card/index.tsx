import { Button, Card } from "react-bootstrap"

const NoDataCard = () => {
  return (
    <Card className="text-center p-5">
      <Card.Body>
        <Card.Title>There Is No Data To Display</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default NoDataCard
