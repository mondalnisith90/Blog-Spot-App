import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import {NavLink} from 'react-router-dom';
import "../css/CreateBlog.css";

const CreateBlog = () => {
    return(
        <>
           <section className="create_blog_root_div d-flex justify-content-center">
             <div className="create_blog_main_div shadow">
             <div className="create_blog_heading_div">
               <h2 className="create_blog_heading_text" >Create Blog</h2>
               <hr className="create_blog_hr" />
            </div>
              <form >
               <div className="FORM_div" >
               <div className="mb-3">
                 <label htmlFor="exampleInputusername" className="form-label create_blog_form_label"> Blog Title*</label>
                 <input type="text" className="form-control" id="exampleInputusername" aria-describedby="emailHelp" placeholder="Enter blog title" />
               </div>
               <div className="mb-3">
                 <label htmlFor="exampleFormControlTextarea1" className="form-label create_blog_form_label">Blog Text*</label>
                 <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" style={{height: "200px"}} placeholder="Write your blog here..."></textarea>
               </div>
               <div className="mb-3">
               <label htmlFor="exampleDataList" className="form-label create_blog_form_label">Blog Catogery*</label>
                <input className="form-control" type="text" list="datalistOptions" id="exampleDataList" placeholder="Select blog catogery" />
                <datalist id="datalistOptions">
                  <option value="Technology" />
                  <option value="Science" />
                  <option value="Cooking" />
                  <option value="Software" />
                  <option value="Computer" />
                </datalist>
                </div>

               <div className="mb-3">
                 <label htmlFor="exampleInputEmail1" className="form-label create_blog_form_label"> Auther Name*</label>
                 <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter auther name" />
               </div>

               <div className="mb-3">
                 <label className="form-label create_blog_form_label" htmlFor="inputFile">Blog Image* </label>
                 <input type="file" className="form-control" id="inputFile" />
               </div>
               <div className="row my-4">
                <div className="col-md-6">
                  <Button variant="contained" color="primary" className="create_blog_button"  endIcon={<SendIcon />} >
                    Publish Blog
                  </Button>
                </div>
               <div className="col-md-6 mt-4">
               <NavLink exact to="/signup" style={{textDecoration: "none"}}>
                 <h3 className="create_blog_login_text">New user? Create account</h3>
               </NavLink>
               </div>
               </div>
                 </div>
                </form>
             </div>
            
          </section>
        </>
    );
}

export default CreateBlog;