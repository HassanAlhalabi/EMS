import LayoutSettingsButton from "./layout-settings-button"

const LayoutSettings = () => {
  return (
    <>
        <div className="offcanvas offcanvas-end settings-panel border-0" id="settings-offcanvas" aria-labelledby="settings-offcanvas" style={{visibility: 'hidden'}} aria-hidden="true">
        <div className="offcanvas-header settings-panel-header bg-shape">
            <div className="z-index-1 py-1 light">
            <h5 className="text-white"><span className="fas fa-palette me-2 fs-0"></span>Settings</h5>
            <p className="mb-0 fs--1 text-white opacity-75"> Set your own customized style</p>
            </div><button className="btn-close btn-close-white z-index-1 mt-0" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body scrollbar-overlay px-card" id="themeController">
            <h5 className="fs-0">Color Scheme</h5>
            <p className="fs--1">Choose the perfect color mode for your app.</p>
            <div className="btn-group d-block w-100 btn-group-navbar-style">
            <div className="row gx-2">
                <div className="col-6">
                    <input className="btn-check" id="themeSwitcherLight" name="theme-color" type="radio" value="light" data-theme-control="theme" />
                    <label className="btn d-inline-block btn-navbar-style fs--1" htmlFor="themeSwitcherLight"> 
                        <span className="hover-overlay mb-2 rounded d-block">
                            <img className="img-fluid img-prototype mb-0" src="assets/img/generic/falcon-mode-default.jpg" alt=""/>
                        </span>
                        <span className="label-text">Light</span>
                    </label>
                </div>
                <div className="col-6"><input className="btn-check" id="themeSwitcherDark" name="theme-color" type="radio" value="dark" data-theme-control="theme" /><label className="btn d-inline-block btn-navbar-style fs--1" htmlFor="themeSwitcherDark"> <span className="hover-overlay mb-2 rounded d-block">
                    <img className="img-fluid img-prototype mb-0" src="assets/img/generic/falcon-mode-dark.jpg" alt="" /></span><span className="label-text"> Dark</span></label></div>
            </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
            <div className="d-flex align-items-start"><img className="me-2" src="assets/img/icons/left-arrow-from-left.svg" width="20" alt="" />
                <div className="flex-1">
                <h5 className="fs-0">RTL Mode</h5>
                <p className="fs--1 mb-0">Switch your language direction </p><a className="fs--1" href="documentation/customization/configuration.html">RTL Documentation</a>
                </div>
            </div>
            <div className="form-check form-switch"><input className="form-check-input ms-0" id="mode-rtl" type="checkbox" data-theme-control="isRTL"/></div>
            </div>
            <hr/>
            <div className="d-flex justify-content-between">
            <div className="d-flex align-items-start"><img className="me-2" src="assets/img/icons/arrows-h.svg" width="20" alt=""/>
                <div className="flex-1">
                <h5 className="fs-0">Fluid Layout</h5>
                <p className="fs--1 mb-0">Toggle container layout system </p><a className="fs--1" href="documentation/customization/configuration.html">Fluid Documentation</a>
                </div>
            </div>
            <div className="form-check form-switch"><input className="form-check-input ms-0" id="mode-fluid" type="checkbox" data-theme-control="isFluid" /></div>
            </div>
            <hr/>
        </div>
        </div>
        <LayoutSettingsButton />
    </>

  )
}

export default LayoutSettings
