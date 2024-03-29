import { Component, ErrorInfo, ReactNode } from "react";

type ErrorBoundryState = {
    hasError: boolean,
    errorMessage: string | null
}

type ErrorBoundryProps = {
    children: ReactNode,
}

class ErrorBoundary extends Component<ErrorBoundryProps,ErrorBoundryState> {
    constructor(props: ErrorBoundryProps) {
      super(props);
      this.state = { hasError: false, errorMessage: null };
    }

  
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      this.setState({...this.state, hasError: true, errorMessage: error.message});
    }
  
    render() {
      if (this.state.hasError) {
        return <div className="d-flex align-items-center justify-content-center text-center"
                    style={{height: "100vh"}}>
                        <div>
                            <h1>Something went wrong.</h1>
                            {
                              import.meta.env.MODE === 'development' ? 
                              <h3 className="bg-danger p-5 rounded">{this.state.errorMessage}</h3> :
                              ''
                            }
                        </div>
                </div>;
      }
  
      return this.props.children; 
    }
}

export default ErrorBoundary;