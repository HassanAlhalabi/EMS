import { Group } from "../../../types";


const GroupLinkItem = ({groupName, 
                        groupId,
                        handleClick,
                        groupMembersCount, 
                        thumbnail, 
                        newMessagesCount, 
                        description}: Group) => 
                            <li className="card mb-2 p-2 border-bottom cursor-pointer" onClick={() => handleClick?.(groupId)}>
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex flex-row">
                                        <div>
                                            {/* <img
                                            src={thumbnail}
                                            alt="avatar" className="d-flex align-self-center me-3" width="60" />
                                            <span className="badge bg-success badge-dot"></span> */}
                                        </div>
                                        <div className="pt-1">
                                            <p className="fw-bold mb-0">{groupName}</p>
                                            <p className="small text-muted">Hello, Are you there?</p>
                                        </div>
                                    </div>
                                    <div className="pt-1">
                                        <p className="small text-muted mb-1">Just now</p>
                                        {newMessagesCount !== 0 && 
                                            <span className="badge bg-danger rounded-pill float-end">{newMessagesCount}</span>
                                        }
                                    </div>
                                </div>
                            </li>

export default GroupLinkItem;