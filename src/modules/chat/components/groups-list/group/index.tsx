import { Group } from "../../../types";


const GroupLinkItem = (groupProps: Group) => 
                            <li className="mb-2 p-2 border-bottom cursor-pointer" 
                                onClick={() => groupProps.handleClick?.(groupProps)}
                                style={{height: 80}}>
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex flex-row">
                                        <div>
                                            <img
                                                src={'https://placehold.co/55x55?text=group-thumbnail'}
                                                alt="avatar" className="d-flex align-self-center me-3 rounded-circle" width="60" />
                                            <span className="badge bg-success badge-dot"></span>
                                        </div>
                                        <div className="pt-1 d-flex flex-column justify-content-around">
                                            <p className="fw-bold mb-0">{groupProps.groupName}</p>
                                            <p className="small text-muted m-0">Some Description About The Group</p>
                                        </div>
                                    </div>
                                    <div className="pt-1">
                                        {/* <p className="small text-muted mb-1">Just now</p> */}
                                        {groupProps.newMessagesCount !== 0 && 
                                            <span className="badge bg-danger rounded-pill float-end">{groupProps.newMessagesCount}</span>
                                        }
                                    </div>
                                </div>
                            </li>

export default GroupLinkItem;