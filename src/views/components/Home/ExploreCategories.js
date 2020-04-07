import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import "../../../custom.css"

class ExploreCategories extends Component {
    render() {
        return (
        <div className="category-list">
               <div class="section-title section-padding">
	    <h1 className="explore">EXPLORE CATEGORIES</h1>
       <p className="tagline-text">Buid a trusted team for your business</p>
	   </div>
       <div className="container category-margin">
       <div className="inline-wrapper">
  <div class="col-lg-3">
		   <div class="category-box tr-category">
			<a href="hire.html">
			 <span class="icon"><img width={50} src="assets/icons/2.png"/></span>
			 <span class="category-title">Admin Support</span>
			 <span class="category-quantity">(1298)</span>
			</a>
		   </div>
		  </div>
          <div class="col-lg-3">
		   <div class="category-box tr-category">
			<a href="hire.html">
			 <span class="icon"><img width={50} src="assets/icons/3.png"/></span>
			 <span class="category-title">Business and Finance</span>
			 <span class="category-quantity">(76212)</span>
			</a>
		   </div>
		  </div>
          <div class="col-lg-3">
		   <div class="category-box tr-category">
			<a href="hire.html">
			 <span class="icon"><img width={50} src="assets/icons/4.png"/></span>
			 <span class="category-title">Graphic and Design</span>
			 <span class="category-quantity">(212)</span>
			</a>
		   </div>
		  </div>
          <div class="col-lg-3">
		   <div class="category-box tr-category">
			<a href="hire.html">
			 <span class="icon"><img width={50} src="assets/icons/5.png"/></span>
			 <span class="category-title">Legal</span>
			 <span class="category-quantity">(972)</span>
			</a>
		   </div>
		  </div>
          </div>


          <div class="inline-wrapper">
		 
         <div class="col-lg-3">
          <div class="category-box tr-category">
           <a href="hire.html">
            <span class="icon"><img width={50} src="assets/icons/6.png"/></span>
            <span class="category-title">Sales</span>
            <span class="category-quantity">(1298)</span>
           </a>
          </div>
         </div>
         <div class="col-lg-3">
          <div class="category-box tr-category">
           <a href="hire.html">
            <span class="icon"><img width={50} src="assets/icons/8.png"/></span>
            <span class="category-title">Video</span>
            <span class="category-quantity">(76212)</span>
           </a>
          </div>
         </div>
         <div class="col-lg-3">
          <div class="category-box tr-category">
           <a href="hire.html">
            <span class="icon"><img width={50} src="assets/icons/7.png"/></span>
            <span class="category-title">Software</span>
            <span class="category-quantity">(1298)</span>
           </a>
          </div>
         </div>
         <div class="col-lg-3">
          <div class="category-box tr-category">
           <a href="hire.html">
            <span class="icon"><img width={50} src="assets/icons/1.png"/></span>
            <span class="category-title">Writing</span>
            <span class="category-quantity">(76212)</span>
           </a>
          </div>
         </div>
         
        </div>
        </div>
           

        </div>
		
		 
             
           
                
                





           
	
        );
    }
}

export default ExploreCategories;