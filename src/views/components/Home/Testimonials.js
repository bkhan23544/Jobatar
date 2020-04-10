import React, { Component } from 'react';
import "../../../custom.css"

class Testimonials extends Component{
    render(){
        return(
            <div className="section-padding">
                <div>
               
            <div class="section-title section-padding">
            <h1 className="explore">TESTIMONIALS</h1>
           </div>
           <div className="row container">
<div className="col-">
<img src="assets/img/person1.png" width={200}/><br/>
<img className="ml-5" src="assets/img/person2.png" width={250}/><br/>
<img src="assets/img/person3.png" width={150}/>
</div>


           <div className="col-sm">
               <div className="text-center"><img className="main-man" src="assets/img/main-man.png" width={150}/></div>
               <h5 className="text quote-text mt-5">"As a freelancer for the past ten years. I love the concept behind jobarter. I have flexible
               options to earn money charging on hourly basis of fixed price. When business is slow, I use my skills to exchange services
               with other talented fleelancers from the platform."</h5>
               <h6 className="text font-bold mt-3">Jose Luis Angarita. PhD</h6>
               <h6 className="text font-bold">Architect and Designer</h6>

           </div>

           <div className="row">
<div className="col-sm">
<img src="assets/img/person5.png" width={150}/><br/>
<img src="assets/img/person4.png" width={200}/><br/>
<img className="ml-3" src="assets/img/person6.png" width={250}/>
</div>
</div>
           </div>
           </div>
           </div>
        )
    }
}

export default Testimonials;