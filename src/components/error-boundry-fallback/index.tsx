

const ErrorBoundaryFallBack = ({error, componentStack}:{error: Error, componentStack: string}) => (
    <div className="d-flex align-items-center justify-content-center text-center"
        style={{height: "100vh", maxWidth:'80vw', margin: 'auto'}}>
            <div>
                <h1>Something went wrong.</h1>
                {
                import.meta.env.MODE === 'development' ? 
                <h3 className="bg-danger p-5 rounded">{error.toString()}</h3> :
                ''
                }
                <p>{componentStack}</p>
            </div>
    </div>
)

export { ErrorBoundaryFallBack } 