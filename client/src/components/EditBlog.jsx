import blogImg from "../images/laptop3.jpg";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Tooltip from '@material-ui/core/Tooltip';
import "../css/EditBlog.css";


const EditBlog = ({setState}) => {
    const textFieldChange = () => {
        console.log("Text field change.")
    }

    const cancelButtonClick = () => {
      setState(true);
    }

    return(
        <>
         <div className="editblog_root_div">
             <div>
               <img src={blogImg} alt="" className="editblog_image" />
               <input accept="image/*" id="icon-button-file" type="file"  style={{display: "none"}} />
              <label htmlFor="icon-button-file">
                <IconButton color="secondary" aria-label="upload picture" component="span" >
                <Tooltip title="Change profile picture">
                  <PhotoCamera className="editblog_photo_icon" />
                  </Tooltip>
                </IconButton>
              </label>
             </div>
             <div className="editblog_body_div">
             <label htmlFor="exampleFormControlTextarea1" className="form-label create_blog_form_label">Blog Title*</label>
             <TextField
             onChange={textFieldChange}
              id="standard-full-width"
              style={{ margin: "8px"}}
              placeholder="Enter blog title"
              fullWidth
              margin="normal"
              InputLabelProps={{
              shrink: true,
              }} />
               <div className="my-3">
                 <label htmlFor="exampleFormControlTextarea1" className="form-label create_blog_form_label">Blog Text*</label>
                 <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" style={{height: "300px"}} placeholder="Write your blog here..."></textarea>
               </div>
               <div className="my-3">
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
                <label htmlFor="exampleFormControlTextarea1" className="form-label create_blog_form_label">Auther Name*</label>
                 <TextField
                 onChange={textFieldChange}
                  id="standard-full-width"
                  style={{ margin: "8px"}}
                  placeholder="Enter auther name"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                  shrink: true,
                  }} />

                  <div className="d-flex justify-content-start mt-4">
                   <div>
                   <Button variant="contained" color="secondary" className="editblog_cancel_button" startIcon={<CancelIcon /> } onClick={cancelButtonClick} >
                    Cancel
                  </Button>
                   </div>
                   <div>
                   <Button variant="contained" color="secondary" className="editblog_save_button ml-4" startIcon={<SaveIcon />} >
                    Save
                  </Button>
                   </div>
                  </div>

                 </div>
         </div>
        </>
    );
}

export default EditBlog;