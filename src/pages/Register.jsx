// import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom'
// import { Container } from "reactstrap";
// import "../styles/login.css";

// const Register = (props) => {
//   const [email, setEmail] = useState('')
//   const [fname, setFName] = useState('')
//   const [lname, setLName] = useState('')
//   const [password, setPassword] = useState('')
//   const [emailError, setEmailError] = useState('')
//   const [passwordError, setPasswordError] = useState('')

//   const navigate = useNavigate()

//   const onButtonClick = () => {
//     // update later
//   }

//   return (
//     <div className={'mainContainer'}>
//       <div className={'titleContainer'}>
//         <div>Sign Up</div>
//       </div>
//       <br />

//       <div className={'inputContainer'}>
//         <input
//           value={fname}
//           placeholder="First Name"
//           onChange={(ev) => setFName(ev.target.value)}
//           className={'inputBox'}
//         />

//         <label className="errorLabel">{emailError}</label>
//       </div>

//       <div className={'inputContainer'}>
//         <input
//           value={lname}
//           placeholder="Last Name"
//           onChange={(ev) => setLName(ev.target.value)}
//           className={'inputBox'}
//         />

//         <label className="errorLabel">{emailError}</label>
//       </div>
//       <br />
//       <div className={'inputContainer'}>
//         <input
//           value={email}
//           placeholder="Email"
//           onChange={(ev) => setEmail(ev.target.value)}
//           className={'inputBox'}
//         />
//         <label className="errorLabel">{emailError}</label>
//       </div>
//       <div className={'inputContainer'}>
//         <input
//           value={password}
//           placeholder="Password"
//           onChange={(ev) => setPassword(ev.target.value)}
//           className={'inputBox'}
//         />
//         <label className="errorLabel">{passwordError}</label>
//       </div>
//       <div className={'inputContainer'}>
//         <input
//           value={password}
//           placeholder="Confirm password"
//           onChange={(ev) => setPassword(ev.target.value)}
//           className={'inputBox'}
//         />
//         <label className="errorLabel">{passwordError}</label>
//       </div>
//       <br />
//       <div className={'inputContainer'}>
//         <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Register'} />
//       </div>
//     </div>
//   )
// }

// export default Register

import React, { useState } from "react";
import { Button, Row, Col, Form, Container, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";
import loginimage from "../assets/images/loginimage.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    phone: undefined,
    question1: undefined,
    question2: undefined,
  });

  const [qrcodeUrl, setQrCodeUrl] = useState(null);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [twoFactorSecret, settwoFactorSecret] = useState("");

  const handlechange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleclick = async (e) => {
    e.preventDefault();
    console.log(credentials);

    try {
      const response = await axios.post("http://localhost:4000/auth/register", {
        name: credentials.username,
        email: credentials.email,
        password: credentials.password,
        phone: credentials.phone,
        securityquestion1: credentials.question1,
        securityquestion2: credentials.question2
      });
      console.log(response)
      if (response.data.qrCodeImageUrl) {
        setQrCodeUrl(response.data.qrCodeImageUrl);
        setRegistrationComplete(true);
        settwoFactorSecret(response.data.secretKey);
      }
    
    }catch(err){
      console.log(err);
    }
  };
  
  return (
    <section>
      <Container>
        {qrcodeUrl? (<div>
          <h1>QR Code</h1>
          <img src={qrcodeUrl} alt="QR Code" />
          <p className="secretcode">Use the secret code to manually add the application: {twoFactorSecret}</p>
          <a href="/login">Go back to Login</a>
        </div>):(<Row>
          {/* <Col lg="8" className="m-auto"> */}
          <div className="login__container d-flex justify-content-between">
            <div className="login__image">
              <img src={""} alt="" />
            </div>
            <div className="login__form">
              <h2>Register</h2>
              <Form className="form" onSubmit={handleclick}>
                <FormGroup>
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    id="username"
                    onChange={handlechange}
                  />
                </FormGroup>
                <FormGroup>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    id="email"
                    onChange={handlechange}
                  />
                </FormGroup>
                <FormGroup>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    id="password"
                    onChange={handlechange}
                  />
                </FormGroup>
                <FormGroup>
                  <input
                    type="text"
                    placeholder="Phone"
                    required
                    id="phone"
                    onChange={handlechange}
                  />
                </FormGroup>
                <FormGroup>
                  <input
                    type="text"
                    placeholder="Where was your first job?"
                    required
                    id="question1"
                    onChange={handlechange}
                  />
                </FormGroup>
                <FormGroup>
                  <input
                    type="text"
                    placeholder="Who is your favorite author?"
                    required
                    id="question2"
                    onChange={handlechange}
                  />
                </FormGroup>
                <Button
                  className="btn secondary__btn auth__btn rounded-circle"
                  type="submit"
                >
                  Register
                </Button>
              </Form>
              <p>
                Already have an account? <Link to="/login"> LogIn </Link>
              </p>
            </div>
          </div>
          {/* </Col> */}
        </Row>)}
      </Container>
    </section>
  );
};

export default Register;