import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import "../css/DefaultPage.css";


const DefaultPage = ({title}) => {
    const history = useHistory();
    const signUpButtonClick = () => {
        history.push("/signup");
    }

    const signInButtonClick = () => {
        history.push("/signin");
    }

    return(
        <>
          <div className="defaultpage_root_div d-flex justify-content-center flex-column align-items-center">
          <div>
          <h3 className="defaultpage_text">{title}</h3>
          </div>
           <div className="d-flex justify-content-center align-items-center mt-4">
           <div className="mr-4">
           <Button variant="contained"  className="defaultpage_signup_button" onClick={signUpButtonClick} >
             SignUp
           </Button>
           </div>
           <div>
           <Button variant="contained"  className="defaultpage_signin_button" onClick={signInButtonClick} >
            SignIn
          </Button>
           </div>
           </div>
         </div>
        </>
    );
}

export default DefaultPage;