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

    const [selectedState, setSelectedState] = useState<SelectedOption[]>([]);
    const [selectedCity, setSelectedCity] = useState<SelectedOption[]>([]);

    const get = useGet();
    const { data: statesData, isLoading: loadingStates } = useQuery(['/State/GetStates', formik.values.stateId], 
    () => get(`/State/GetStates`),
    {
        onSuccess: data => {
            if(formik.values.stateId){
                const selected = mapToTyphead(data?.data.states, 'stateName')
                .filter(state => state.stateId === formik.values.stateId);
                setSelectedState(selected)
            }
        }
    });
    const { data, refetch, isFetching } = useQuery(['/City/GetAllCities', formik.values.stateId], 
                                () => get(`/City/GetAllCities?page=1&pageSize=20&stateId=${formik.values.stateId}`),
                                {
                                    enabled: false,
                                    onSuccess: data => {
                                        const selected = mapToTyphead(data?.data.cities, 'cityName')
                                                        .filter(state => state.cityId === formik.values.cityId)
                                        setSelectedCity(selected)
                                    }
                                });

    useEffect(() => {
        if(formik.values.stateId) {
            refetch();
        }
    },[formik.values.stateId]);

    const handleStateChange = (selectedOptions: SelectedOption[]) =>  { 
        if(selectedOptions[0]) { 
            setSelectedState(selectedOptions)
            formik.setFieldValue('stateId', selectedOptions[0].stateId); 
            formik.setFieldValue('stateName', selectedOptions[0].stateName); 
        }
    }          
    
    const handleCityChange = (selectedOptions: SelectedOption[]) =>  { 
        if(selectedOptions[0]) { 
            formik.setFieldValue('cityId', selectedOptions[0].cityId);
            formik.setFieldValue('cityName', selectedOptions[0].cityName);
            setSelectedCity(selectedOptions)
        }
    } 

    const renderCitiesSelect = () => 
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="stateId">
                        State:
                    </Form.Label>
                    <Typeahead
                        selected={ selectedState }
                        id="stateId"
                        size="lg"
                        name="state"
                        className={formik.values.stateId !== 0 && formik.dirty ? 'is-valid': 'is-invalid'}
                        placeholder='Search States'
                        onInputChange={() => setSelectedState([])}
                        onChange={ handleStateChange }
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
                        selected={ selectedCity }
                        disabled={ !formik.values.stateId }
                        onInputChange={() => setSelectedCity([])}
                        className={formik.values.cityId !== 0 && formik.dirty ? 'is-valid': 'is-invalid'}
                        placeholder='Search Cities'
                        onChange={handleCityChange}
                        options={data?.data.cities ? mapToTyphead(data?.data.cities, 'cityName') : []}
                        isInvalid={formik.values.cityId === 0 && formik.dirty}
                        isValid={formik.values.cityId !== 0 && formik.dirty}
                        isLoading={isFetching}
                    />
                    <Feedback type="invalid">
                        {formik.errors.cityId as string}
                    </Feedback>
                </Form.Group>
            </Col>
        </Row>

    return { renderCitiesSelect }
}
 
export default useGetCity;