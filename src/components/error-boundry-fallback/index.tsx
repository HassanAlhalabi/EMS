import useTranslate from "../../hooks/useTranslate"


const ErrorBoundaryFallBack = ({errorMessage}:{errorMessage: string | null}) => {
    const t = useTranslate()
    return (
        <div className="d-flex align-items-center flex-column justify-content-center text-center"
            style={{height: "100vh", maxWidth:'80vw', margin: 'auto'}}>
            <h2>{t('something_went_wrong')}</h2>
            <p>{t('try_again_later')}</p>
            {
            import.meta.env.MODE === 'development' ? 
                <h3 className="bg-danger p-5 rounded">{errorMessage}</h3> :
                ''
            }
        </div>
    )
}

export { ErrorBoundaryFallBack } 