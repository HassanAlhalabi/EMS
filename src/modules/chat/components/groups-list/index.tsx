import { Group } from "../../types";
import GroupLinkItem from "./group";



const GroupsList = ({groups}: {groups: Group[]}) => {

    return <div className="p-3 bg-dark-blue rounded h-100">
                <div className="input-group rounded mb-3">
                    <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                        aria-describedby="search-addon" />
                    <span className="input-group-text border-0" id="search-addon">
                        <i className="fas fa-search"></i>
                    </span>
                </div>

                <div className="vh-75" style={{position: "relative",  overflowY: 'auto', maxHeight: '500px'}}>
                    <ul className="list-unstyled mb-0">
                        {groups.map(group => <GroupLinkItem key={group.groupId} {...group} />)}
                    </ul>
                </div>
            </div>

}
 
export default GroupsList;