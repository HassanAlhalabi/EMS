import { useTranslation } from "react-i18next"

const DashboardPage = () => {

  const {t} = useTranslation();

  return (
    <>
      {t('dashboard')}
    </>
  )
}

export default DashboardPage
