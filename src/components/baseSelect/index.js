import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { get } from 'services';
import Spinner from 'react-bootstrap/Spinner';

const BaseSelect = ({errors, touched, handleChange, values, options, label, name, url, md, titleInBold, displayName = 'nombre', optionValue = 'id', onSelected, disabled = false }) => {
    const [data, setData] = useState([]);
    const [displayLoading, setDisplayLoading] = useState(false);
    
    useEffect( () => {
        setDisplayLoading(true);
        get(url).then(response => {
           const data = [
               {
                   [optionValue]: null,
                   [displayName]: 'Seleccione'
               },
               ...response.data
           ]
           setData(data);
           setDisplayLoading(false);
        });
    }, [])

    useEffect(() => {
        if (onSelected) {
            const result = data.find(x => x[optionValue] == values[name]);
            if (result) {
                onSelected(result)
            }
        }
    }, [values[name]])

    return (
        <>
            <Form.Group as={Col} md={md} controlId={"validationFormik_" + name}>
                <Form.Label> 
                    {   
                        titleInBold
                        ? <b> { label } </b>
                        : label 
                    }
                </Form.Label>
                
                {
                    displayLoading && 
                    <Spinner
                        as="span"
                        size="sm"
                        role="status"
                        animation="grow"
                        aria-hidden="true"
                    />
                }
                <Form.Control
                    name={name}
                    value={values[name]}
                    onChange={handleChange}
                    isValid={touched[name] && !errors[name]}
                    isInvalid={!!errors[name]}
                    as="select"
                    custom
                    disabled={disabled}
                >
                    {
                        data.map(option => {
                            return (
                                <option key={option[optionValue]} value={option[optionValue]}>{option[displayName]}</option>
                            )
                        })
                    }
                </Form.Control>
            </Form.Group>
        </>
    )
}

export default BaseSelect;