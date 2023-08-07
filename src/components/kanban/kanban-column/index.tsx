import {  ReactElement, ReactNode, useEffect, useState } from "react";

import {
    DndContext, 
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
  } from '@dnd-kit/core';
  import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
  } from '@dnd-kit/sortable';
import KanbanItem from "../kanban-item";

const KanbanColumn = (props: {children: ReactElement[], header?: ReactNode, footer?: ReactNode}) => {

    const [items, setItems] = useState( props.children.map(child => ({id: child.props.id, ...child}) ) )
    useEffect(() => {
        setItems(props.children.map(child => ({id: child.props.id, ...child}) ))
    },[props.children])

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return <div className="kanban-column">
                <div className="kanban-column-header">
                    <h5 className="fs-0 mb-0">{props.header} 
                    <span className="text-500"> (8)</span></h5>
                </div>
                    <div className="kanban-items-container scrollbar">
                        <DndContext 
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}>
                            <SortableContext 
                                items={items}
                                strategy={verticalListSortingStrategy}
                            >
                                {
                                    items.map(item => {
                                        return <KanbanItem key={item.id} id={item.id} >
                                                    {item}
                                                </KanbanItem>
                                    })
                                }
                            </SortableContext>
                        </DndContext>
                    </div>
                <div className="kanban-column-footer">
                    {props.footer}
                </div>
            </div>

    function handleDragEnd(event: DragEndEvent) {
        const {active, over} = event;
            if (active.id !== over?.id) {
                setItems((items) => {
                    const oldIndex = items.findIndex(item => item.id === active.id);
                    const newIndex = items.findIndex(item => item.id === over?.id);      
                    return arrayMove(items, oldIndex, newIndex);
                });
            }
        }
    }
 
export default KanbanColumn;