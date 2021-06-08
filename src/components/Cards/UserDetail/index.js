import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import BaseTable from 'components/BaseTable';

const formatPhoneNumber = (phone) => {
    if (phone.length == 10) {
        return `(${phone.substring(0, 3)}) ${phone.substring(4, 7)}-${phone.substring(6, 10)}`
    } else {
        return phone
    }
}

const lastNameFormat = (first, second) => {
    if (first && second) {
        return `${first} ${second}`
    } else if (first) {
        return first;
    } else {
        return second;
    }
}

const UserDetail = ({ user }) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async function mounted() {
        })();
        return function cleanup() {
        };
    }, [])

    return (
        <>
            {
                isLoading &&
                <div className={'display-flex flex-direction-row flex-center'}>
                    <Spinner
                        animation="grow"
                        variant="primary"
                        className={'is-absolute center-spinner-vertically'}
                        size="lg" />
                </div>
            }
            <Card>
                <Card.Body className={'p-30'}>
                    <Row>
                        <Col xs={12}>
                            <h2> Bienvenido </h2>
                            <br/>
                            <BaseTable/>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserDetail);