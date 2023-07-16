import { useState } from "react";
import Table from "../../components/table";
import { Column } from "react-table";
import { Form, Row } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import useTranslate from "../useTranslate";
import Feedback from "../../components/feedback";


const useTableSelect = (label: string, options: any, error?: string, config?: {
    onSelect?: (selectedItems: Record<string, any>[]) => void,
    onDelete?: (itemId: string) => void
}) => {

    const t = useTranslate();
    
    const [allSelectedItems, setAllSelectedItems] = useState<Record<string, any>[]>([]);

    const valid = !Boolean(error);

    console.log(error)

    console.log(valid)

    const handleSelectItem = (selectedItems: Record<string, any>[]) => {
 
         if(selectedItems.length === 0) return;
         
         // Check If Object Already Exists
         const objectExits = allSelectedItems.find(item => item.id === selectedItems[0].id);
 
         if(objectExits) return;  
         
         setAllSelectedItems([
             ...allSelectedItems,
             selectedItems[0]
         ])
         
         config?.onSelect?.(selectedItems)
     }
     
 
     const handleDeleteItem = (itemId: string) => {

         const newItemsForTable = allSelectedItems?.filter(item => {
             return (item.id !== itemId) 
         });
         setAllSelectedItems(newItemsForTable);

        config?.onDelete?.(itemId)
     }

     const renderSelectTable = (columns: readonly Column<{}>[]) => 
                            <>
                                <Row>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            {label}:
                                        </Form.Label>
                                        <Typeahead
                                            size="lg"
                                            className={valid ? 'is-valid': 'is-invalid'}
                                            placeholder={label}
                                            onChange={(options) => handleSelectItem(options as Record<string, any>[])}
                                            options={options}
                                            isInvalid={!valid}
                                            isValid={valid}
                                        />
                                        <Feedback type="invalid">
                                            {error as string}
                                        </Feedback>
                                    </Form.Group> 
                                </Row>
                                <Table<Record<string, any>>  
                                            columns={columns} 
                                            data={allSelectedItems}
                                            renderRowActions={data =>  <button className="btn btn-falcon-danger btn-sm m-1" 
                                            type="button" 
                                            onClick={() => handleDeleteItem(data.id)}>        
                                                    <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                                                </button>}  /> 
                            </>


            return {
                renderSelectTable,
                allSelectedItems,
                setAllSelectedItems
            }
     

}
 
export default useTableSelect;