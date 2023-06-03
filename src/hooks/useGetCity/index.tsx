import { useState, useEffect, useMemo } from "react";

import { useQuery } from "react-query";
import { Col, Form, Row } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { FormikProps } from "formik";

import { useGet } from "..";
import Feedback from "../../components/feedback";
import { mapToTyphead } from "../../util";
import { SelectedOption } from "../../types";

export interface State {stateId: number, stateName: string}
export interface City {cityId: number, cityName: string}

export interface UseGetCityConfig {
    initialValues?: {state: State, city: City};
    onStateSelect?: (state: State) => void;
    onCitySelect?: (city: City) => void;
}

const useGetCity = function<T extends {cityId: number, stateId: number}>(formik: FormikProps<T> | null, config?: UseGetCityConfig) {

    selectedState = useState<SelectedOption[]>([]);
    selectedCit = useState<SelectedOption[]>([]);
    const [stateId, setStateId] = useState(null);
    const [stateName, setStateName] = useState('');
    const [cityId,setCityId] = useState(null);
    const [cityName, setCityName] = useState('');

    // const configurations = useMemo(() => config, [config?.initialValues?.city.cityId,config?.initialValues?.state.stateId])

    // Case Initil Values and No Formik
    // useEffect(() => {
    //     console.log('Triigeref', configurations)
    //     if(!formik && config?.initialValues?.state.stateId) {
    //         setSelectedState([{...config?.initialValues?.state, label: config?.initialValues?.state.stateName}]);
    //     }
    // },[configurations?.initialValues?.state.stateId])

    // useEffect(() => {
    //     console.log('Triigeref', configurations)
    //     if(!formik && config?.initialValues?.city.cityId) {
    //         setSelectedCity([{...config?.initialValues?.city, label: config?.initialValues?.city.cityName}]);
    //     }
    // },[configurations?.initialValues?.city.cityId])

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

    const handleStateChange = (selectedOptions: SelectedOption[]) =>  { 
        if(selectedOptions[0]) { 
            setSelectedState(selectedOptions)
            if(formik) {
                formik.setFieldValue('stateId', selectedOptions[0].stateId); 
                formik.setFieldValue('stateName', selectedOptions[0].stateName); 
            }
            setStateId(selectedOptions[0].stateId);
            setStateName(selectedOptions[0].stateName);
            if(config && config.onStateSelect) {
                config.onStateSelect({
                    stateId: selectedOptions[0].stateId,
                    stateName: selectedOptions[0].stateName
                });
            }
        }
    }   
    
    
    const handleCityChange = (selectedOptions: SelectedOption[]) =>  { 
        if(selectedOptions[0]) {   
            setSelectedCity(selectedOptions)
            if(formik) {
                formik.setFieldValue('cityId', selectedOptions[0].cityId);
                formik.setFieldValue('cityName', selectedOptions[0].cityName);
            }
            setCityId(selectedOptions[0].cityId);
            setCityName(selectedOptions[0].cityName);
            if(config && config.onCitySelect) {
                config.onCitySelect({
                    cityId: selectedOptions[0].cityId,
                    cityName: selectedOptions[0].cityName
                });
            }
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
                        selected={ selectedState }
                        id="stateId"
                        size="lg"
                        name="state"
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
                        disabled={ !selectedCity }
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

    return { renderCitiesSelect, cityId, stateId, cityName, stateName }
}
 
export default useGetCity;