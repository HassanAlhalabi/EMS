import { Button, Card } from "react-bootstrap"
import { useTranslation } from "react-i18next"

const NoDataCard = () => {

  const {t} = useTranslation();

  return (
    <Card className="text-center p-5">
      <Card.Body>
        <Card.Title>{t('no_data')}</Card.Title>
        <Card.Text>
          
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default NoDataCard
