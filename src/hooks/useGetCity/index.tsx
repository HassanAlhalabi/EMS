import { useState, useEffect } from "react";

import { useQuery } from "react-query";
import { Col, Form, Row } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { FormikProps } from "formik";

import { useGet } from "..";
import Feedback from "../../components/feedback";
import { mapToTyphead } from "../../util";
import { SelectedOption } from "../../types";


const useGetCity = function<T extends {cityId: number, stateId: number}>(formik: FormikProps<T>) {

    const [searchKey, setSearchKey] = useState('');
    const [stateId, setStateId] = useState('');
    const [cityId, setCityId] = useState('');

    const get = useGet();
    const { data: statesData } = useQuery(['/State/GetStates'], 
    () => get(`/State/GetStates`));
    const { data, refetch } = useQuery(['/City/GetAllCities', searchKey, stateId, formik.values.stateId], 
                                () => get(`/City/GetAllCities?page=1&pageSize=20&stateId=${stateId || formik.values.stateId}&key=${searchKey}`),
                                {
                                    enabled: false
                                });

    useEffect(() => {
        let searchTimeout: number; 
        if(searchKey || stateId) {
            searchTimeout = setTimeout(() => {
            refetch();
            },300);
            return () => clearTimeout(searchTimeout);;
        }
        refetch();
        return () => clearTimeout(searchTimeout);
    },[searchKey, stateId, formik.values.stateId]);

    const handleStateChange = (options: SelectedOption[]) =>  { 
        if(options[0]) { setStateId(options[0].stateId); return; }
        setStateId('');setCityId('');setSearchKey('');
    }                  

    const selectedState = statesData?.data.states ? 
                          mapToTyphead(statesData?.data.states, 'stateName')
                          .filter(state => state.stateId === formik.values.stateId) :
                          undefined
    
    const selectedCity = data?.data.cities ? 
                            mapToTyphead(data?.data.cities, 'cityName')
                            .filter(state => state.cityId === formik.values.cityId) :
                            undefined

    const renderCitiesSelect = () => 
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="stateId">
                        State:
                    </Form.Label>
                    <Typeahead
                        defaultSelected={ selectedState }
                        id="stateId"
                        size="lg"
                        className={formik.values.stateId !== 0 && formik.dirty ? 'is-valid': 'is-invalid'}
                        placeholder='Search States'
                        onChange={handleStateChange}
                        options={statesData?.data.states ? mapToTyphead(statesData?.data.states, 'stateName') : []}
                        isInvalid={formik.values.stateId === 0 && formik.dirty}
                        isValid={formik.values.cityId !== 0 && formik.dirty}
                    />
                    <Feedback type="invalid">
                        {formik.errors.stateId as string}
                    </Feedback>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group>
                    <Form.Label htmlFor="cityId">
                        City:
                    </Form.Label>
                    <Typeahead
                        id="cityId"
                        size="lg"
                        defaultSelected={selectedCity}
                        disabled={!stateId }
                        onInputChange={input => setSearchKey(input)}
                        className={formik.values.cityId !== 0 && formik.dirty ? 'is-valid': 'is-invalid'}
                        placeholder='Search Cities'
                        onChange={(options: Record<string,string>[]) => options[0] ? formik.setFieldValue('cityId',options[0].cityId) : setCityId('')}
                        options={data?.data.cities ? mapToTyphead(data?.data.cities, 'cityName') : []}
                        isInvalid={formik.values.cityId === 0 && formik.dirty}
                        isValid={formik.values.cityId !== 0 && formik.dirty}
                    />
                    <Feedback type="invalid">
                        {formik.errors.cityId as string}
                    </Feedback>
                </Form.Group>
            </Col>
        </Row>

    return { renderCitiesSelect, cityId }
}
 
export default useGetCity;