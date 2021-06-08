import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { isBrowser, isMobile } from "react-device-detect";
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';

const navLinkStyle = {
    color: 'white',
    textDecoration: 'none'
}

const activeLinkStyle = {
    fontWeight: 'bold'
}

const HuStyle = {
    marginTop: 10,
}

const marginLeft = {
    marginLeft: 150
}

const bardsStyle = {
    color: 'white'
}

const browserBarsStyle = {
    ...marginLeft,
    ...bardsStyle
}

const whiteWords = {
    color: 'white'
};

const bold = {
    fontWeight: 'bold'
};

const activeNavLinkStyle = {
    ...whiteWords,
    ...bold
};

const successNotify = (text = "Operación realizada con exito") => toast.success(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

const Header = ({ toggleSidebar, opeationSuccess }) => {

    useEffect(() => {
        if (opeationSuccess != 0) {
            successNotify();
        }
    }, [opeationSuccess])

    return (
        <>
            <ToastContainer />
            <Navbar bg="primary" variant="dark">
                <Nav className="mr-auto">
                    <div style={HuStyle}>
                        <NavLink className="mr-5" to="/" style={navLinkStyle} exact activeStyle={activeLinkStyle}>
                            
                        </NavLink>
                        <NavLink className="mr-3"
                            to="/"
                            exact
                            style={navLinkStyle}
                            activeStyle={activeNavLinkStyle}
                        >
                            Inicio
                        </NavLink>

                        <NavLink className="mr-3"
                            to="/meetYourLegalPerson"
                            style={navLinkStyle}
                            activeStyle={activeNavLinkStyle}
                        >
                            Conoce a tu persona jurídica
                        </NavLink>

                        <NavLink className="mr-3"
                            to="/meetYourPhysicalPerson"
                            style={navLinkStyle}
                            activeStyle={activeNavLinkStyle}
                        >
                            Conoce a tu persona física
                        </NavLink>

                        <NavLink className="mr-3"
                            to="/applicationForInsuranceIncome"
                            style={navLinkStyle}
                            activeStyle={activeNavLinkStyle}
                        >
                            Solicitud de ingreso de seguro
                        </NavLink>

                        <NavLink className="mr-3"
                            to="/formDocument"
                            style={navLinkStyle}
                            activeStyle={activeNavLinkStyle}
                        >
                            Documentos de identidad
                        </NavLink>

                        <NavLink className="mr-3"
                            to="/documentForm"
                            style={navLinkStyle}
                            activeStyle={activeNavLinkStyle}
                        >
                            Documentos de formularios
                        </NavLink>
                    </div>


                </Nav>
                <Form inline>
                    {
                        isMobile &&
                        <Nav.Link style={bardsStyle} onClick={toggleSidebar}>
                            <i className="fa fa-bars"></i>
                        </Nav.Link>
                    }
                </Form>
            </Navbar>
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        opeationSuccess: state.opeationSuccess,
    }
}

export default connect(mapStateToProps)(Header);