import React, { Component } from 'react';
import { Main } from '../../layout';
import { DocumentTitle } from '../../../helpers/DocumentTitle';
import { Container, Row, Col } from 'react-bootstrap';

class ComingSoon extends Component {
    render() {
        return (<Main>
            <DocumentTitle title={`Coming Soon`} />
            <div className="contact-page" style={{backgroundImage: 'none', }}>
                <Container>
                    <Row>
                        <Col md="12">
                            <h1>Coming Soon...</h1>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Main>);
    }
}

export default ComingSoon;