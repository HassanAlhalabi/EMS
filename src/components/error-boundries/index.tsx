import { Component, ErrorInfo, ReactNode } from "react";
import { ErrorBoundaryFallBack } from "../error-boundry-fallback";

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
        return <ErrorBoundaryFallBack errorMessage={this.state.errorMessage} />;
      }
  
      return this.props.children; 
    }
}

export default ErrorBoundary;