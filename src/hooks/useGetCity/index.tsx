import { useState, useEffect } from "react";

import { useQuery } from "react-query";
import { Col, Form, Row } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { FormikProps } from "formik";

import { useGet } from "..";
import Feedback from "../../components/feedback";
import { mapToTyphead } from "../../util";
import { SelectedOption } from "../../types";

export interface UseGetCityConfig {
    onStateSelect?: (state: {stateId: number, stateName: string}) => void;
    onCitySelect?: (city: {cityId: number, cityName: string}) => void;
    onStateDeSelect?: () => void;
    onCityDeSelect?: () => void;
}

const useGetCity = function<T extends {cityId: number, stateId: number}>(formik: FormikProps<T> | null, config?: UseGetCityConfig) {

    const [selectedState, setSelectedState] = useState<SelectedOption[]>([]);
    const [selectedCity, setSelectedCity] = useState<SelectedOption[]>([]);
    const [stateId, setStateId] = useState(null);
    const [stateName, setStateName] = useState('');
    const [cityId,setCityId] = useState(null);
    const [cityName, setCityName] = useState('');
    const [disabled, setDisabled] = useState(false);

    const usedStateId = formik ? formik.values.stateId : stateId;
    const usedCityId = formik ? formik.values.cityId : cityId;

    const get = useGet();
    const { data: statesData } = useQuery(['/State/GetStates', usedStateId], 
    () => get(`/State/GetStates`),
    {
        onSuccess: data => {
            if(usedStateId){
                const selected = mapToTyphead(data?.data.states, 'stateName')
                .filter(state => state.stateId === usedStateId);
                setSelectedState(selected)
            }
        }
    });
    const { data, refetch, isFetching } = useQuery(['/City/GetAllCities', usedStateId], 
                                () => get(`/City/GetAllCities?page=1&pageSize=20&stateId=${usedStateId}`),
                                {
                                    enabled: false,
                                    onSuccess: data => {
                                        const selected = mapToTyphead(data?.data.cities, 'cityName')
                                                        .filter(state => state.cityId === usedCityId)
                                        setSelectedCity(selected)
                                    }
                                });

    useEffect(() => {
        if(usedStateId) {
            refetch();
        }
    },[usedStateId]);

    // const reset = () => {
    //     if(formik) {
    //         formik.setFieldValue('stateId', null); 
    //         formik.setFieldValue('stateName', ''); 
    //         formik.setFieldValue('cityId', null);
    //         formik.setFieldValue('cityName', '');
    //     }
    //     setStateId(null);
    //     setStateName('');
    //     setCityId(null);
    //     setCityName('');
    // }

    const handleStateChange = (selectedOptions: SelectedOption[]) =>  { 
        if(selectedOptions[0]) { 
            setSelectedState(selectedOptions)
            if(formik) {
                formik.setFieldValue('stateId', (selectedOptions[0] as Record<string, any>).stateId); 
                formik.setFieldValue('stateName', (selectedOptions[0] as Record<string, any>).stateName); 
            }
            setStateId((selectedOptions[0] as Record<string, any>).stateId);
            setStateName((selectedOptions[0] as Record<string, any>).stateName);
            if(config?.onStateSelect) {
                config.onStateSelect({
                    stateId: (selectedOptions[0] as Record<string, any>).stateId,
                    stateName: (selectedOptions[0] as Record<string, any>).stateName
                });
            }
            return;
        }
        // reset();
        if(config?.onStateDeSelect) {
            config.onStateDeSelect();
        }
    }   
    
    
    const handleCityChange = (selectedOptions: SelectedOption[]) =>  { 
        if(selectedOptions[0]) {   
            setSelectedCity(selectedOptions)
            if(formik) {
                formik.setFieldValue('cityId', (selectedOptions[0] as Record<string, any>).cityId);
                formik.setFieldValue('cityName', (selectedOptions[0] as Record<string, any>).cityName);
            }
            setCityId((selectedOptions[0] as Record<string, any>).cityId);
            setCityName((selectedOptions[0] as Record<string, any>).cityName);
            if(config?.onCitySelect) {
                config.onCitySelect({
                    cityId: (selectedOptions[0] as Record<string, any>).cityId,
                    cityName: (selectedOptions[0] as Record<string, any>).cityName
                });
            }
            return;
        }
        // reset()
        if(config?.onCityDeSelect) {
            config.onCityDeSelect();
        }
    } 

    const renderCitiesSelect = () => 
        <Row>
            <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="stateId">
                        State:
                    </Form.Label>
                    <Typeahead
                        disabled={disabled}
                        selected={ selectedState }
                        id="stateId"
                        size="lg"
                        className={usedStateId !== 0 && formik?.dirty ? 'is-valid': 'is-invalid'}
                        placeholder='Search States'
                        onInputChange={() => setSelectedState([])}
                        onChange={ handleStateChange }
                        options={statesData?.data.states ? mapToTyphead(statesData?.data.states, 'stateName') : []}
                        isInvalid={usedStateId === 0 && formik?.dirty}
                        isValid={usedCityId !== 0 && formik?.dirty}
                    />
                    <Feedback type="invalid">
                        {formik?.errors.stateId as string}
                    </Feedback>
                </Form.Group>
            </Col>
            <Col xs={12} md={6}>
                <Form.Group>
                    <Form.Label htmlFor="cityId">
                        City:
                    </Form.Label>
                    <Typeahead
                        id="cityId"
                        size="lg"
                        selected={ selectedCity }
                        disabled={ !usedStateId || disabled }
                        onInputChange={() => setSelectedCity([])}
                        className={usedCityId !== 0 && formik?.dirty ? 'is-valid': 'is-invalid'}
                        placeholder='Search Cities'
                        onChange={handleCityChange}
                        options={data?.data.cities ? mapToTyphead(data?.data.cities, 'cityName') : []}
                        isInvalid={usedCityId === 0 && formik?.dirty}
                        isValid={usedCityId !== 0 && formik?.dirty}
                        isLoading={isFetching}
                    />
                    <Feedback type="invalid">
                        {formik?.errors.cityId as string}
                    </Feedback>
                </Form.Group>
            </Col>
        </Row>

    return {    
                renderCitiesSelect, 
                selectedCity, 
                setSelectedCity, 
                selectedState, 
                setSelectedState,
                setDisabled
            }
}
 
export default useGetCity;