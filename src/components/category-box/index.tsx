import { ReactNode } from "react";
import { Badge, BadgeProps } from "react-bootstrap";

interface CategoryBox extends BadgeProps {
    children: ReactNode
}

const CategoryBox = ({children, ...props}: BadgeProps) => 
    <Badge style={{
        fontSize: '18px',
        margin: '4px',
        padding: '10px'
    }} {...props} >
        {children}
    </Badge>

export default CategoryBox;    