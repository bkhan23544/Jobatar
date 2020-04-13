import React, { Component } from 'react';
import { Main } from '../../layout';
import { Container, Row, Col } from 'react-bootstrap';
import { DocumentTitle } from '../../../helpers/DocumentTitle';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import { NavLink } from "react-router-dom";



class HowItWorks extends Component {
  
    
    render() {
        var ar = window.innerWidth / window.innerHeight
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
        return (
<div>
    <Header/>
    <div className="hBanner">
                <img src="assets/img/background.png" alt="" className="img-fluid w-100" />
                <div className="caption d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                    
                        <div className="row hide-how">
                        <div>
                           <h1 className="how-text">How it works</h1>
                           <p className="exp-text">An Explanation of how Jobarter works</p>
                           </div>
                       <img src="assets/img/1.png" className="img-fluid w-50 ml-5 how-banner-img"/>
                       </div>
                        </div>
                    </div>
                </div>
</div>    



                       <div className="instruction">
               <div>
               <p className="section-heading">Hire the best experts</p>
              <div className="text-section"> <p className="section-text">
               Whatever you need, we have it. If you need to get work done,<br/>
JoBarter can help you two specific ways
               </p>
           </div>
           </div>

 <div className="guide-wrapper container">
     <div className="guide-section container">
<p className="guide-heading">1. Post A Job</p>

         <p className="guide-content">Simply click on our <span className="highlight">“Post a Job”</span> button to start describing the job that you need. Fill in
as much information that you can provide to make it easier for interested freelancers to
understand your requirements. Once your job is posted, freelancers will start sending
you proposals for your job post. You can choose to accept, decline, or revise the proposals.</p>
     </div> 
     <img className="guide-image" src="assets/img/home/2.png" />
     </div>          


     <div className="guide-wrapper container">
     <img className="guide-image" src="assets/img/home/3.png"/>
     <div className="guide-section">
<p className="guide-heading">2. Browse for Services</p>

         <p className="guide-content">If you have a job you want to get done, you can easily “Browse for Services” that
our freelancers have posted. We have a pool of skilled professionals that post services they offer. Use our filters and search bar to narrow down the type of service
that you need and once you find a service that you want, simply click on the “Send
an Offer” button to start bidding for the service. Our bidding system is designed for
you to get the most affordable rate. Even more interesting, we allow counter offers
so that you and the service provider can come to a price that works best for both
of you.
Note: And one more thing, if you are also a service provider, you can choose to exchange a service that you provide as payment for the service that you need. You
have the option to either buy a service or exchange services if both parties are
interested. Exchanging services with another service provider can help you save
money.</p>
     </div>
   
     </div>


      <div className="container">
               <p className="section-heading">Be a freelancer and manage your career.</p>
              <div className="text-section"> <p className="section-text">
              Need a job? You’ve come to the right place! JoBarter is here to help you sell your services and find
clients. JoBarter makes it easier for you to find jobs. We can help you find jobs two specific ways:
               </p>
           </div>
           </div> 

           <div className="guide-wrapper container">
     <div className="guide-section">
<p className="guide-heading">1. Post A Service</p>

         <p className="guide-content">Take advantage of your skills and talent. Most people have an undiscovered talent.
Whether you speak multiple languages, great in design, coding, bookkeeping, writing,
marketing, you can start getting jobs to earn extra income by applying your various
skills. It’s easier than you think! You simply have to click on “Post a Service” button and
start describing the service that you offer. Provide as much information as you can so
potential clients will know how proficient you are with your skills. After you submit and
post your service, just wait and potential clients will start sending offers to you.</p>
     </div>
     <img className="guide-image" src="assets/img/home/4.png" />
     </div> 

     
     <div className="guide-wrapper container">
     <img className="guide-image" src="assets/img/home/5.png" />
     <div className="guide-section">
<p className="guide-heading">2. Browse for Jobs</p>

         <p className="guide-content">You can easily find what members in our platform are looking for through our “Browse
for Jobs” page. Browse through a pool of jobs that are posted that hirers are looking
for freelancers to fulfill them. If you see something that matches your skill, and that
you can do, you can simply apply for it by clicking “Submit a Proposal” from the
posted job.
Prove to hirers that you have what it takes to accomplish the job. Put in as much
detail as possible when sending a proposal so that you will have a better chance of
getting hired. After submitting your proposal, wait for the hirer to respond back to you.
If they accept your proposal, the job is yours. You can get paid hourly or fixed price.
Just make sure you do the job well so that you can get a five-star rating and amazing
feedback.
Remember, the more positive feedback and five-star rating that you have will make it
a lot easier for hirer to hire you and for you to earn more money</p>
     </div>
   
     </div>         


     <div className="container">
               <p className="section-heading">Find a COFOUNDER</p>
              <div className="text-section"> <p className="section-text">
              Need an ideal co-founder or a business partner? Before you decide to partner with someone on a business idea, it is important
for you to get to know them first. Ideally, it would be great if you work with that person before making such a big decision. With
JoBarter, you have the option to hire that person for a job or exchange services with that person to have a better understanding
of the value they would bring to your business. In addition, you can also review their rating and feedback to have a better understanding of their experience working with other people. We can help you find the ideal partner you have been looking for to
launch your business venture in two specific ways:
               </p>
           </div>
           </div> 

           <div className="guide-wrapper container">
     <div className="guide-section">
<p className="guide-heading">1. Post Co-founder Profile</p>

         <p className="guide-content">If you are interested in finding a co-founder to partner with, you simply have to select
“Co-founder” when filling out your profile information. From there, a tab will appear for
you to provide more details about your own experience as a co-founder. You also will
need to provide information about the ideal co-founder you are looking for, including
your wish list, preferred location, and relevant industry.</p>
     </div>
     <img src="assets/img/home/6.png" className="guide-image" />
     </div> 

     
     <div className="guide-wrapper container">
     <img  src="assets/img/home/7.png" className="guide-image" />
     <div className="guide-section">
<p className="guide-heading">2. Browse for Co-founders</p>

         <p className="guide-content">You can easily find a partner for your business idea by navigating through our
“Browse for Co-founders” page. To make it easier, you can select the category,
rating, and country you want. If you find a potential candidate, you can add that
person on your “Connection”. Upon receiving an “Accepted Request” notification,
you can start messaging with the ideal co-founder.</p>
     </div>
   
     </div> 

     
     <div className="container">
               <p className="section-heading">Rating & Review</p>
              <div className="text-section"> <p className="section-text">
              After each transaction whether it is by hiring a freelancer of exchanging your service with another member,
you can provide feedback about your experience. This process helps create a stronger community that is
based on trust, transparency and collaboration.
               </p>
           </div>
           </div> 

           <div className="guide-wrapper container">
     <div className="guide-section">
<p className="guide-heading">1. Rating</p>

         <p className="guide-content">Provide a rating about your collaboration. You can assess the person’s communication,
competence, and whether you would recommend the person to other members of our
community.</p>
     </div>
     <img  src="assets/img/home/8.png" className="guide-image" />
     </div> 

     
     <div className="guide-wrapper container">
     <img  src="assets/img/home/9.png" className="guide-image" />
     <div className="guide-section">
<p className="guide-heading">2. Review</p>

         <p className="guide-content">You can write a review that will be public about your experience to describe your experience
          after you have completed a service or a job contract with another freelancer. </p>
     </div>
   
     </div>          
     <Footer/>

           </div>
           </div>
         
        );

    }
}

export default HowItWorks;