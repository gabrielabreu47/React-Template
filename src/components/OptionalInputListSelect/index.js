import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { get } from 'services';
import BaseListSelect from 'components/BaseListSelect';

const OptionalInputListSelect = ({ controller = '', onOptionHide = () => { }, onOptionShow = () => { }, type = 'text', column = 12, inputName, title, values, name, handleChange, touched, errors, showInputWhenValueIs }) => {
    const [showCustom, setShowCustom] = useState(false);
    const [elements, setElements] = useState(false);

    useEffect(() => {
        get(controller)
            .then(({ data }) => setElements(data));
    }, []);

    useEffect(() => {
        if (showCustom)
            onOptionShow(inputName);
        else
            onOptionHide(inputName);
    }, [showCustom]);

    const onChange = (event) => {
        handleChange(event);
        const { value } = event.target;
        setShowCustom(value === showInputWhenValueIs);
    };


    return (
        <>
            <BaseListSelect
                values={values}
                elements={elements || []}
                name={name}
                handleChange={onChange}
                touched={touched}
                errors={errors}
                title={title}
                column={column}
            />
            {showCustom && (
                <>
                    <Form.Group as={Col} md={column} controlId="branchOfficeValidation">
                        <Form.Control
                            type={type}
                            name={inputName}
                            placeholder="Especifique"
                            value={values[inputName] || ''}
                            onChange={handleChange}
                            isValid={touched[inputName] && !errors[inputName]}
                            isInvalid={!!errors[inputName]}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors[inputName]}
                        </Form.Control.Feedback>
                    </Form.Group>
                </>
            )}
        </>
    );
};


export default OptionalInputListSelect;
