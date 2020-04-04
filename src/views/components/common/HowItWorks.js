import React, { Component } from 'react';
import { Main } from '../../layout';
import { Container, Row, Col } from 'react-bootstrap';
import { DocumentTitle } from '../../../helpers/DocumentTitle';


class HowItWorks extends Component {
    
    render() {
        const posts = [
            {id: 1, title: 'Post', content: 'Job or Service', image: 'images/work-Post.svg'},
            {id: 2, title: 'Find', content: 'Job, Freelancer, and Co-founders', image: 'images/work-Find.svg'},
            {id: 3, title: 'Bid', content: 'Negotiate fixed or per hour price or exchange skills', image: 'images/work-Bid.svg'},
            {id: 4, title: 'Hire', content: 'Close deal when finding the best talent', image: 'images/work-Hire.svg'},
            {id: 5, title: 'Rate', content: 'Provide feedback and rating', image: 'images/work-Rate.svg'},
            {id: 6, title: 'Connect', content: 'Find Co-founder to partner', image: 'images/work-Connect.svg'}
        ];
        const { location } = this.props;
        let search = new URLSearchParams(location.search);

        const content = posts.map((post) =>
            <Col xs="12" sm="4" key={post.id}>
                <div className="boxs d-flex align-items-center justify-content-center">
                    <div>
                        <img src={post.image} alt={post.title} />
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </div>
                </div>
            </Col>
        );
        return (<Main onlycontent={search.get("onlycontent")}>
            <DocumentTitle title={`How it Works`}/>
            <div className="howWork-page">
                <div className="heading mb-3 mb-lg-4 text-center">
                    {/* <img src="images/howitworks1.PNG" alt="" className="img-fluid" /> */}
                    <div className="caption d-flex align-items-center justify-content-center w-100 h-100 mt-4">
                        <h1 className="text-center mb-0">How JoBarter Works</h1>
                    </div>
                </div>
                <Container>
                    <Row className="equipments d-flex">
                        {content}
                    </Row>  
                </Container>
            </div>
        </Main>);

    }
}

export default HowItWorks;