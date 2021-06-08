import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


const BaseListSelect = ({ column, defaults = { show: true, value: '', display: 'Seleccione' }, title, values, name, handleChange, touched, errors, elements }) => {

    return (
        <>
            <Form.Group
                as={Col}
                md={column}
                controlId={name}
            >
                <Form.Label>
                    <b> {title} </b>
                </Form.Label>
                <Form.Control
                    as="select"
                    name={name}
                    value={values[name]}
                    onChange={handleChange}
                    isValid={
                        touched[name] &&
                        !errors[name] && values[name]
                    }
                    isInvalid={!!errors[name]}
                >
                    {defaults.show ?
                        (<option value={defaults.value}>{defaults.display}</option>)
                        : (<></>)
                    }
                    {elements.map(
                        (element) => (
                            <option
                                key={element.id}
                                value={element.id}
                            >
                                {element.value}
                            </option>
                        )
                    )}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    {errors[name]}
                </Form.Control.Feedback>
            </Form.Group>
        </>
    );
};


export default BaseListSelect;