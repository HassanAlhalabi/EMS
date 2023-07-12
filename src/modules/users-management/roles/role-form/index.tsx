import { ChangeEvent, MutableRefObject, createRef, useEffect, useState } from "react";

import { FormikProps } from 'formik';
import { Row, Col, Form, FormLabel, Accordion } from "react-bootstrap"

import Feedback from "../../../../components/feedback"
import { getAllClaimsByType, getClaimsMap, splitCamel } from "../../../../util";
import { NewRole } from "../types";

const RoleForm = ({formik}:{formik: FormikProps<NewRole>}) => {

    const [allRolesRefs, setAllRolesRef] = useState<MutableRefObject<HTMLInputElement>[]>([]);
    const rolesNum = getClaimsMap().size;

    useEffect(() => {
        setAllRolesRef((elRefs) =>
          Array(rolesNum)
            .fill([])
            .map((_, i) => elRefs[i] || createRef()),
        );
    }, [rolesNum]);

    // Handle Initial Roles Claims Load
    useEffect(() => {   
        allRolesRefs.forEach(roleRef => {
            const subClaims = Array.from((roleRef.current.closest('.accordion-header')?.nextSibling as HTMLElement)?.querySelectorAll('input'));
            const allChecked = subClaims.every(claim => claim.checked);
            if(allChecked) roleRef.current.checked = true;
        })
    },[formik.values.roleClaims.length])

    const handleAllRoles = (e: ChangeEvent<HTMLInputElement>) => {
        const { target: {value} } = e;
        const claims = getAllClaimsByType(value);
        const newTypeClaims = claims.map((claim: string) => 'Permissions.'+value+'.'+claim);
        let newClaims = [];
        if(e.target.checked) {
            newClaims = Array.from(new Set([...formik.values.roleClaims,...newTypeClaims]))
        } else {
            newClaims = formik.values.roleClaims.filter(claim => !newTypeClaims.includes(claim))
        }
        formik.setFieldValue('roleClaims', newClaims)

    }

    const handleRoleChange = (e: ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(e);
        const {target: {value, checked}} = e
        // Handle All Roles Checkbox
        const role = value.split('.')[1];
        const targetInput = allRolesRefs.find(roleInputRef => roleInputRef.current.value === role )?.current;
        if(!checked && targetInput) {
            targetInput.checked = false;
            return;
        }
        if(checked && targetInput) {
            const selectedRoleClaimsNum = getAllClaimsByType(role).length;
            const selectedRoleClaims = formik.values.roleClaims.filter(claim => claim.includes(role)).length + 1;
            if(selectedRoleClaims === selectedRoleClaimsNum) targetInput.checked = true;
        }
    } 

    return (
        <Form noValidate validated={formik.dirty}>
            <Form.Group className="mb-3">
                <Form.Control
                    size="lg"
                    required
                    type="text" 
                    placeholder="Role Name"
                    name="name"
                    value={formik.values.name} 
                    onChange={formik.handleChange} />
                <Feedback type="invalid">
                    {formik.errors.name as string}
                </Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Feedback type="invalid">
                    {formik.errors.roleClaims as string}
                </Feedback>
                <FormLabel>Role Claims:</FormLabel>
                <Row>
                    {Array.from(getClaimsMap()).map((claim, index) =>               
                        <Col key={claim[0]} md="4" className="mb-3">
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <Form.Check
                                            ref={allRolesRefs[index]}
                                            className="d-inline-block cursor-pointer m-0"
                                            id={claim[0]}
                                            type="checkbox"
                                            name={claim[0]}
                                            value={claim[0]}
                                            onChange={handleAllRoles} 
                                            onClick={e => e.stopPropagation()}/> {splitCamel(claim[0])}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {claim[1].map((claimType: string) => 
                                            <Form.Group key={claimType}>
                                                <Form.Check
                                                    label={claimType}
                                                    required
                                                    className="d-inline-block cursor-pointer"
                                                    id={`${claim[0]}.${claimType}`}
                                                    type="checkbox"
                                                    name={`roleClaims`}
                                                    value={`Permissions.${claim[0]}.${claimType}`}
                                                    checked={formik.values.roleClaims && 
                                                                                (formik.values.roleClaims.includes(`Permissions.${claim[0]}.${claimType}`) ||
                                                                                formik.values.roleClaims.includes(`Permissions.${claim[0]}.All`) )}
                                                    onChange={handleRoleChange} />
                                            </Form.Group>
                                        )}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>  
                        </Col>
                    )}
                </Row>
            </Form.Group>
        </Form>
    )
}

export default RoleForm
