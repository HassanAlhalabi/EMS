import { useState } from "react";
import { Group } from "../../types";
import GroupLinkItem from "./group";
import { t } from "i18next";
import useTranslate from "../../../../hooks/useTranslate";

const filterGroups = (groups: Group[], searchterm = '') => {
    return groups ? groups.filter(group => group.groupName.includes(searchterm.trim())) : [];
}   

const GroupsList = ({ groups, handleClickGroup }: 
                    { groups: Group[], 
                      handleClickGroup: (group: Group) => void }) => {
                                                   
    const t = useTranslate();                    
    const [searchGroupInput, setSearchGroupInput] = useState('');
    const getGroups = () => filterGroups(groups, searchGroupInput);

    return <div className="p-3 bg-dark-blue rounded h-100">
                <h4 className="border-bottom pb-3 d-flex justify-content-between flex-wrap">
                    Groups
                </h4>
                <div className="input-group rounded mb-3">
                    <input  type="search" 
                            className="form-control rounded" 
                            placeholder={`${t('search_groups')}...`}
                            value={searchGroupInput}
                            onChange={e => setSearchGroupInput(e.target.value)} 
                            aria-label="Search"
                            aria-describedby="search-addon" />
                    <span className="input-group-text border-0" id="search-addon">
                        <i className="fas fa-search"></i>
                    </span>
                </div>

                <div className="vh-75" style={{position: "relative",  overflowY: 'auto', maxHeight: '500px'}}>
                    <ul className="list-unstyled mb-0">
                        { getGroups().map(group => <GroupLinkItem key={group.groupId} {...group} handleClick={handleClickGroup}/>)}
                    </ul>
                </div>
            </div>

}
 
export default GroupsList;