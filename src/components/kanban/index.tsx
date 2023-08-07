import { ReactNode } from "react";

import KanbanColumn from "./kanban-column";
import KanbanItem from "./kanban-item";

const Kanban = (props: {children: ReactNode}) => {
    return  <div className="kanban-container scrollbar me-n3">
                {props.children}
            </div>;
}

Kanban.Column = KanbanColumn;
Kanban.Item = KanbanItem;
 
export default Kanban;