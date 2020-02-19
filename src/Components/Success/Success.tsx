import React from 'react';
import './success.scss';
import { Link } from 'react-router-dom';

interface SuccessProps {

}
interface SuccessState {

}

class Success extends React.Component<SuccessProps, SuccessState> {

    render() {
        return (
            <div className="container login-container success mt-5">
                <div className="align-items-center d-flex justify-content-center row custom-login">
                    <div className="col-12 col-lg-6 success text-center">
                        <h3>Success!</h3>
                        <p className="pt-4 pb-4"> Now you will be taken to the speech<br />
                            editor where you will need to Fill<br />
                            in some additional information before you<br />
                            can get started.</p>
                        <Link to="/dashboard">
                            <button className="btn success-btn">
                            <a className="nav-link"> Lets get started &nbsp;&nbsp;
                            <i className=" fa fa-long-arrow-right" aria-hidden="true"></i>
                            </a>
                        </button>
                        </Link>
                       
                    </div>
                </div>

            </div>
        );
    }
}

export default Success;

