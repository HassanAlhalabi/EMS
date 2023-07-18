import { Group } from "../../../types";


const GroupLinkItem = (groupProps: Group) => 
                            <li className="card mb-2 p-2 border-bottom cursor-pointer" onClick={() => groupProps.handleClick?.(groupProps)}>
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex flex-row">
                                        <div>
                                            {/* <img
                                            src={thumbnail}
                                            alt="avatar" className="d-flex align-self-center me-3" width="60" />
                                            <span className="badge bg-success badge-dot"></span> */}
                                        </div>
                                        <div className="pt-1">
                                            <p className="fw-bold mb-0">{groupProps.groupName}</p>
                                            <p className="small text-muted">Hello, Are you there?</p>
                                        </div>
                                    </div>
                                    <div className="pt-1">
                                        <p className="small text-muted mb-1">Just now</p>
                                        {groupProps.newMessagesCount !== 0 && 
                                            <span className="badge bg-danger rounded-pill float-end">{groupProps.newMessagesCount}</span>
                                        }
                                    </div>
                                </div>
                            </li>

export default GroupLinkItem;