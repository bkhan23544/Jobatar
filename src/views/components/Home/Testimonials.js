import React, { Component } from 'react';

class Testimonials extends Component{
    render(){
        return(
            // <div style={{border:"1px solid black"}}>
                <div>
               
            <div class="section-title section-padding">
            <h1 className="explore">TESTIMONIALS</h1>
           </div>
           <div className="row container w-90 testimonial-align">
<div className="col-">
<img src="assets/img/person1.png" width={200}/><br/>
<img className="ml-5" src="assets/img/person2.png" width={250}/><br/>
<img src="assets/img/person3.png" width={150}/>
</div>


           <div className="col-lg testimonial">
               <div className="text-center"><img className="main-man" src="assets/img/main-man.png" width={150}/></div>
               <div className="main-testimonial">
               <h5 className="text mt-5 w-80">"As a freelancer for the past ten years, I love the concept behind JoBarter.
                I have flexible options to earn money by charging clients on an hourly basis or per fixed price. When business is slow,
                 I use my skills to exchange services with other talented freelancers."</h5>
               <h6 className="mt-3">Dr. Jose Luis Angarita</h6>
               <h6>Architect and Designer</h6>
               </div>
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
           
        )
    }
}

export default Testimonials;