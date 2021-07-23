import Blog from "./Blog";
import BlogCategoryData from "../Data/BlogCategoryData";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import blogimg1 from "../images/cat1.jpg";
import blogimg2 from "../images/cat2.jpg";
import blogimg3 from "../images/cat3.jpg";
import blogimg4 from "../images/cat4.jpg";
import blogimg5 from "../images/cat5.jpg";
import blogimg6 from "../images/cat6.jpg";
import "../css/Home.css";



const Home = () => { 

     const [categoryButtonState, setCategoryButtonState] = useState(
      [{category: "All" ,state: true}, {category: "Art" ,state: false},  {category: "Engineering" ,state: false}, 
      {category: "Medical" ,state: false}, {category: "Science" ,state: false}, {category: "Technology" ,state: false}, 
      {category: "Game" ,state: false}, {category: "Video Game" ,state: false}, {category: "Cooking" ,state: false},
       {category: "Covid-19" ,state: false}, {category: "Story" ,state: false}]
     );
    
      const blogCategoryButtonClick =  (event) => {
        //get clicked button category value
        const buttonCaptionText = event.target.innerHTML;
        for(let index=0; index<categoryButtonState.length; index++){
          if(categoryButtonState[index].category == buttonCaptionText){
            categoryButtonState[index].state = true;
          }else{
            categoryButtonState[index].state = false;
          }
        }
        setCategoryButtonState([...categoryButtonState]);
     
      }



   

      const buttonNormanState = "btn btn-outline-success category_option_button";
      const buttonActiveState = "btn btn-outline-success category_option_button active";

    return(
        <>
          <section className="home_root_div">
            <div className="home_header_div d-flex justify-content-center align-items-center flex-column">
              <h1 className="home_header_heading_text">Blog-Spot</h1>
              <p className="home_header_para_text">
                More than 5000 blogs you can see here. You can create your own blog here and earn money online.
              </p>
              <div className="row header_button_div w-100">
              <div className="col-6  d-flex justify-content-md-end justify-content-sm-center justify-content-center my-3">
               <NavLink to="/create-blog" > <button className="home_about_button">Create Blog</button> </NavLink>
              </div>
              <div className="col-6 d-flex justify-content-md-start  justify-content-sm-center justify-content-center my-3">
              <NavLink to="/my-blog"> <button className="home_contact_button">My Profile</button> </NavLink>
              </div>
              </div> 
            </div>
            <div className="home_body_div">
            <div className="home_category_div">
              <h3 className="home_blog_category_text">Blog Category</h3>
              <hr className="home_hr"/>
              <div className="row home_blog_category_div text-center">
              {BlogCategoryData.map((value, index) => {
              
                return(<>
              
                  <div className="col-lg-2 col-md-2 col-sm-4 col-6 my-2" key={index}>
                   <button type="button" className={ categoryButtonState[index].state ? buttonActiveState : buttonNormanState} onClick={blogCategoryButtonClick}>{value}</button>
                </div>
                </>)
              })}

              {/* <div className="col-lg-2 col-md-2 col-sm-4 col-6 my-2">
                   <button type="button" className={ categoryButtonState.state1 ? buttonActiveState : buttonNormanState} onClick={blogCategoryButtonClick}>All</button>
                </div>

                <div className="col-lg-2 col-md-2 col-sm-4 col-6 my-2">
                   <button type="button" className={ buttonState.state2 ? buttonActiveState : buttonNormanState} onClick={blogCategoryButtonClick}>Art</button>
                </div>

                <div className="col-lg-2 col-md-2 col-sm-4 col-6 my-2">
                   <button type="button" className={ buttonState.state3 ? buttonActiveState : buttonNormanState} onClick={blogCategoryButtonClick}>Engineering</button>
                </div>

                <div className="col-lg-2 col-md-2 col-sm-4 col-6 my-2">
                   <button type="button" className={ buttonState.state4 ? buttonActiveState : buttonNormanState} onClick={blogCategoryButtonClick}>Medical</button>
                </div>

                <div className="col-lg-2 col-md-2 col-sm-4 col-6 my-2">
                   <button type="button" className={ buttonState.state5 ? buttonActiveState : buttonNormanState} onClick={blogCategoryButtonClick}>Science</button>
                </div> */}


               
              </div>
              <hr className="home_hr"/>
              <div>
              <div className="row home_blog_div">
              <div className="col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-block d-flex justify-content-center">
              <Blog image={blogimg1}  />
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-block  d-flex justify-content-center">
              <Blog image={blogimg2} />
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-block  d-flex justify-content-center">
              <Blog image={blogimg3} />
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-block  d-flex justify-content-center">
              <Blog image={blogimg4} />
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-block  d-flex justify-content-center">
              <Blog image={blogimg5} />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-block  d-flex justify-content-center">
              <Blog image={blogimg6} />
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-block d-flex justify-content-center">
              <Blog image={blogimg1}  />
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-block  d-flex justify-content-center">
              <Blog image={blogimg2} />
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-block  d-flex justify-content-center">
              <Blog image={blogimg3} />
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-block  d-flex justify-content-center">
              <Blog image={blogimg4} />
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-block  d-flex justify-content-center">
              <Blog image={blogimg5} />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-12 m-auto d-block  d-flex justify-content-center">
              <Blog image={blogimg6} />
              </div>

              </div>
             
              
              </div>
            </div>
         
            </div>
          </section>
        </>
      
    );
}

export default Home;