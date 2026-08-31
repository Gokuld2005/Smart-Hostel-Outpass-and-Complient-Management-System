
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import "./Screen.css";

const Mainscreen = ({title,children}) => {
    return (
        <div className='mainblack'>
            <Container>
                <Row>
                    <div className="page">
                        {title && (
                            <>
                                <h1 className="heading">{title}</h1>
                                <hr />
                            </>
                        )}
                        {children}
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default Mainscreen