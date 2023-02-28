import { useState, ReactNode, useMemo } from 'react';
import PaneHead from './pane-head';
import { PaneHeadProps } from './pane-head';

interface FormWizardProps {
    headers: PaneHeadProps[]
    children: ReactNode[]
}

const FormWizard = ({children, headers}: FormWizardProps) => {

    const [currentTab, setCurrentTab] = useState(0);
    
    const updatedHeaders: PaneHeadProps[] = useMemo(() => {
        return headers.map((header: PaneHeadProps, index: number) => {
            if(index < currentTab) {
                return {
                    ...header,
                    status: 'done',
                }
            }
            if(currentTab === index) {
                return {
                    ...header,
                    status: 'active',
                }
            }
            return {
                ...header,
                status: 'unactive'
            }
        })
    },[currentTab])

    const handleChangeTab = (tabNumber: number) => setCurrentTab(tabNumber);

    return (
        <div className="theme-wizard h-100 mb-5">

            <div className="card-header bg-light pt-3 pb-2">
                <ul className="nav justify-content-between nav-wizard">
                    {
                        updatedHeaders.map((header) => (
                            <PaneHead key={header.title} {...header} />
                        ))
                    }
                </ul>
            </div>

            <div className="card-body py-4" id="wizard-controller">
                <div className="tab-content">
                    {
                        children.map((child: ReactNode, index: number) => 
                        <div key={index} className={`tab-pane px-sm-3 px-md-5 ${index === currentTab ? 'active' : ''}`} role="tabpane">
                            {child}
                        </div>)
                    }
                </div>
            </div>

            <div className="card-footer">
                <div className="px-sm-3 px-md-5">
                    <ul className="pager wizard list-inline mb-0">                         
                        <li className="previous">
                            <button onClick={() => handleChangeTab(currentTab - 1)} 
                                    className={`btn btn-link ps-0 ${currentTab <= 0 && 'd-none'}`} type="button"> 
                                <span className="fas fa-chevron-left me-2" data-fa-transform="shrink-3"></span> Prev
                            </button>
                        </li>
                        <li className="next">
                            <button onClick={() => handleChangeTab(currentTab + 1)} 
                                    className={`btn btn-primary px-5 px-sm-6 ${currentTab > children.length - 2 && 'd-none' }`} type="submit">
                                Next <span className="fas fa-chevron-right ms-2" data-fa-transform="shrink-3"> </span>
                            </button>
                        </li>
                        {
                            currentTab === (children.length - 1) && 
                            <button onClick={() => {}} 
                                    className={`btn btn-success px-5 px-sm-6`} type="submit">
                                Add 
                            </button>
                        }
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default FormWizard
