
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { ReactNode } from 'react';

const KanbanItem = (props: {id: number | string, children: ReactNode}) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
      } = useSortable({id: props.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return <div className="kanban-item" ref={setNodeRef} style={style} {...attributes} {...listeners}>
                <div className="card kanban-item-card hover-actions-trigger">
                    <div className="card-body">
                       {props.children}
                    </div>
                </div>
            </div>
}
 
export default KanbanItem;