import { Spinner } from "react-bootstrap"

const SignIn = () => {


    return (
      <div className="row flex-center min-vh-100 py-6">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="d-flex flex-center mb-4">
              <span className="font-sans-serif fw-bolder fs-5 d-inline-block">EMS</span>
            </div>
            <div className="card">
              <div className="card-body p-4 p-sm-5">
                <div className="row flex-between-center mb-2">
                  <div className="col-auto">
                    <h5>Log in</h5>
                  </div>
                </div>
                <form>
                  <div className="mb-3"><input className="form-control" type="email" placeholder="Email address" /></div>
                  <div className="mb-3"><input className="form-control" type="password" placeholder="Password" /></div>
                  <div className="row flex-between-center">
                    <div className="col-auto">
                      <div className="form-check mb-0">
                        <input className="form-check-input" type="checkbox" id="basic-checkbox" checked={false} />
                          <label className="form-check-label mb-0" htmlFor="basic-checkbox">Remember me</label>
                        </div>
                    </div>
                    <div className="col-auto"><a className="fs--1" href="forgot-password.html">Forgot Password?</a></div>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-primary d-block w-100 mt-3 p-2" type="submit" name="submit">
                      Log in <Spinner size="sm" animation="grow" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    )
  }
  
  export default SignIn
  