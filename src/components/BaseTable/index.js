import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import PaginationComponent from 'components/PaginationComponent';

const BaseTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async function mounted() {

        })();
        return function cleanup() {
        };
    }, []);

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                    </tr>
                </thead>
                {
                    data.length > 0 &&
                    <>
                        <tbody>
                            {
                                data.map((user, index) =>
                                    <tr key={index}>
                                        <td>{user.adid}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </>
                }

            </Table>
            <div style={{ float: 'right' }}>
                <PaginationComponent controller="User" onDataLoaded={(data) => { setData(data); }} />
            </div>
        </>
    );
};

export default BaseTable;