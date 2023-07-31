import useTranslate from "../../hooks/useTranslate"

const DashboardPage = () => {

  const t = useTranslate()

  return (
    <>
      {t('dashboard')}
    </>
  )
}

export default DashboardPage
