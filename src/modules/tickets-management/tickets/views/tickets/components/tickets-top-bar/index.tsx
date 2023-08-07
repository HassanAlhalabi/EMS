

const TicketsTopBar = () => {
    return <div className="row gx-0 kanban-header rounded-2 px-card py-2 mt-2 mb-3">
                <div className="col d-flex align-items-center">
            
                    <div className="position-relative"><button className="btn btn-sm btn-falcon-default dropdown-toggle dropdown-caret-none" id="invitePeople" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="fas fa-plus me-2"></span> Invite</button>
                        <div className="dropdown-menu dropdown-menu-end pt-2 pb-0" aria-labelledby="invitePeople" style={{minWidth: "300px"}}>
                        <h6 className="dropdown-header text-center text-uppercase py-1 fs--2 ls fw-semi-bold">Invite To Board</h6>
                        <div className="dropdown-divider mb-0"></div>
                        <div className="p-3">
                            <form>
                            <div className="border rounded-1 fs--2 mb-3">
                                <div className="d-flex flex-between-center border-bottom bg-200">
                                <div className="px-2 text-700">Anyone with the link can join</div>
                                <div className="border-start"><button className="btn btn-link btn-sm text-decoration-none hover-300 rounded-0 fs--2" id="dataCopy" type="button" data-copy="#invite-link" data-bs-toggle="tooltip" data-bs-trigger="manual" title="" data-bs-original-title="Copy to clipboard"> <span className="far fa-copy me-2"></span>Copy link</button></div>
                                </div><input className="form-control bg-white dark__bg-dark border-0 fs--2 px-1 rounded-top-0" id="invite-link" type="text" value="https://prium.github.io/falcon/kanban/QhNCShh8TdxKx0kYN1oWzzKJDjOYUXhm9IJ035laUVdWMYsUN5" />
                            </div><input className="form-control form-control-sm" type="text" placeholder="Enter name or email" /><button className="btn btn-primary btn-sm d-block w-100 mt-2" type="button">Send Invitation</button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="col-auto d-flex align-items-center"><button className="btn btn-sm btn-falcon-default me-2 d-none d-md-block"> <span className="fas fa-plus me-2"></span> Create Task</button>
                <div className="dropdown font-sans-serif"><button className="btn btn-sm btn-falcon-default dropdown-toggle dropdown-caret-none" type="button" id="kanbanMenu" data-bs-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false"><span className="fas fa-ellipsis-h"></span> </button>
                    <div className="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="kanbanMenu"><a className="dropdown-item" href="#!">Copy link</a>
                    <div className="dropdown-divider"></div><a className="dropdown-item" href="#!">Settings</a><a className="dropdown-item" href="#!">Themes</a>
                    <div className="dropdown-divider"></div><a className="dropdown-item text-danger" href="#!">Remove </a>
                    </div>
                </div>
                </div>
            </div>;
}
 
export default TicketsTopBar;