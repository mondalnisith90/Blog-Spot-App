import Blog from "./Blog";
import blogimg1 from "../images/cat1.jpg";
import blogimg2 from "../images/cat2.jpg";
import blogimg3 from "../images/cat3.jpg";
import blogimg4 from "../images/cat4.jpg";
import blogimg5 from "../images/cat5.jpg";
import blogimg6 from "../images/cat6.jpg";
import "../css/Home.css";

const Home = () => {
    return(
        <>
          <section className="home_root_div">
            <div className="home_header_div d-flex justify-content-center align-items-center flex-column">
              <h1 className="home_header_heading_text">Blog-Spot</h1>
              <p className="home_header_para_text">
                More than 5000 blogs you can see here. You can create your own blog here and earn money online.
              </p>
            </div>
            <div className="home_body_div">
            <div className="home_category_div">
              <h3 className="home_blog_category_text">Blog Category</h3>
              <hr className="home_hr"/>
              <div className="row home_blog_category_div text-center">
                <div className="col-lg-2 col-md-2 col-sm-4 col-6 my-2 ">
                <button type="button" class="btn btn-outline-success category_option_button active ">All</button>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-4 col-6 my-2">
                <button type="button" class="btn btn-outline-success category_option_button ">Science</button>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-4 col-6 my-2">
                <button type="button" class="btn btn-outline-success category_option_button ">Technology</button>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-4 col-6 my-2">
                <button type="button" class="btn btn-outline-success category_option_button ">Game</button>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-4 col-6 my-2">
                <button type="button" class="btn btn-outline-success category_option_button ">Engineering</button>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-4 col-6 my-2">
                <button type="button" class="btn btn-outline-success category_option_button ">Covid-19</button>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-4 col-6 my-2">
                <button type="button" class="btn btn-outline-success category_option_button ">Covid-19</button>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-4 col-6 my-2">
                <button type="button" class="btn btn-outline-success category_option_button ">Covid-19</button>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-4 col-6 my-2">
                <button type="button" class="btn btn-outline-success category_option_button ">Covid-19</button>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-4 col-6 my-2">
                <button type="button" class="btn btn-outline-success category_option_button ">Covid-19</button>
                </div>
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