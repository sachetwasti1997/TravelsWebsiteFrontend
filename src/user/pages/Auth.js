import React, { Component } from "react";
import { Formik } from "formik";
import { Form, Container, Button } from "react-bootstrap";
import * as EmailValidator from "email-validator";
import { connect } from "react-redux";
import { fetchLogIn, signUp } from "../../actions";
import ImageUpload from "../../shared/components/ImageUpload";
import AuthDialog from "./AuthDialog";

class Authentication extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    mode: true,
    disableLoginbutton: true,
    disableSignUpButton: true,
    image: null,
    errorState: false,
    errorTitle: "",
    errorDescription: "",
  };

  setError = (title, description) => {
    this.setState({
      errorState: true,
      errorDescription: description,
      errorTitle: title,
    });
  };

  handleState = () => {
    this.setState({
      errorState: false,
    });
  };

  setLoginButton = () => {
    this.setState({
      disableLoginbutton: false,
    });
  };

  setImage = (imageData) => {
    this.setState({
      image: imageData,
    });
  };

  unsetLoginButton = () => {
    this.setState({
      disableLoginbutton: true,
    });
  };

  setSignUpButton = () => {
    this.setState({
      disableSignUpButton: false,
    });
  };

  unsetSignUpButton = () => {
    this.setState({
      disableSignUpButton: true,
    });
  };

  onLoginFormSubmit = (values) => {
    this.setState({
      email: values.email,
      password: values.password,
    });
    // console.log(this.state);
  };

  onSignUpFormSubmit = (values) => {
    this.setState({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };

  tweakmode = () => {
    if (this.state.mode) {
      this.setState({
        name: "",
        email: "",
        password: "",
        mode: false,
      });
    } else {
      this.setState({
        name: "",
        email: "",
        password: "",
        mode: true,
      });
    }
  };

  onLogInClick = () => {
    // console.log({
    //   email: this.state.email,
    //   password: this.state.password,
    // });
    this.props.login({
      email: this.state.email,
      password: this.state.password,
    })
    .catch(err => {
      let raw = document.createElement("html");
      raw.innerHTML = err.response.data;
      this.setState({
        errorState: true,
        errorTitle:'There is an error!',
        errorDescription:raw
        .getElementsByTagName("BODY")[0]
        .getElementsByTagName("PRE")[0]
        .innerHTML.split("<br>")[0]
      });
    })
  };

  componentDidCatch(error, info) {
    console.log(error);
  }

  onSignUpClick = () => {
    const value = new FormData();
    value.append("name", this.state.name);
    value.append("email", this.state.email);
    value.append("password", this.state.password);
    value.append("image", this.state.image);
    for (var valuet of value.values()) {
      console.log(valuet);
    }
    this.props.signUp(value).catch((err) => {
      let raw = document.createElement("html");
      raw.innerHTML = err.response.data;
      this.setState({
        errorState: true,
        errorTitle:'There is an error!',
        errorDescription:raw
        .getElementsByTagName("BODY")[0]
        .getElementsByTagName("PRE")[0]
        .innerHTML.split("<br>")[0]
      });
    });
  };

  componentToRender = () => {
    return (
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Submitting", values);
          // this.onFormSubmit(values);
        }}
        validate={(values) => {
          let errors = {};

          if (!values.name) {
            errors.name = "Required";
          }

          if (!values.email) {
            errors.email = "Required";
          } else if (!EmailValidator.validate(values.email)) {
            errors.email = "Invalid Email Address";
          }

          const strongRegex = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
          );
          if (!values.password) {
            errors.password = "Required";
          } else if (!strongRegex.test(values.password)) {
            // console.log(strongRegex.test(values.password));
            errors.password =
              "Password must contain one lower case character, one upppercase, one special character and one digit";
          }

          if (!this.state.mode) {
            if (Object.keys(errors).length === 1) {
              this.setLoginButton();
              this.onLoginFormSubmit(values);
            } else if (Object.keys(errors).length > 1) {
              // console.log("Called");
              this.unsetLoginButton();
            }
          } else {
            if (Object.keys(errors).length === 0) {
              this.setSignUpButton();
              this.onSignUpFormSubmit(values);
            } else if (Object.keys(errors).length > 0) {
              this.unsetSignUpButton();
            }
          }

          if (this.props.signupImages) {
            this.setImage();
          }

          // console.log(errors, this.state.disableSignUpButton);

          return errors;
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            // isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;
          return (
            <div>
              <h2>
                {this.state.mode ? "Signup Required" : "Log In to your account"}
              </h2>
              <hr />
              <Form onSubmit={handleSubmit}>
                {this.state.mode && (
                  <Form.Group>
                    <Form.Label>NAME:</Form.Label>
                    <Form.Control
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={values.name}
                      onChange={handleChange}
                      className={errors.name && touched.name && "error"}
                    />
                    {errors.name && touched.name && (
                      <div style={{ color: "red" }}>{errors.name}</div>
                    )}
                  </Form.Group>
                )}
                <Form.Group>
                  <Form.Label>EMAIL:</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="yourname@email.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.email && touched.email && "error"}
                  />
                  {errors.email && touched.email && (
                    <div style={{ color: "red" }}>{errors.email}</div>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>PASSWORD:</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.password && touched.password && "error"}
                  />
                  {errors.password && touched.password && (
                    <div style={{ color: "red" }}>{errors.password}</div>
                  )}
                </Form.Group>
                {this.state.mode && <ImageUpload image={this.setImage} />}
                <hr />
                {this.state.mode ? (
                  <Button
                    type="submit"
                    disabled={
                      this.state.disableSignUpButton ||
                      this.state.image === null
                    }
                    to="/"
                    onClick={this.onSignUpClick}
                  >
                    SIGN UP
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={this.state.disableLoginbutton}
                    onClick={this.onLogInClick}
                  >
                    LOGIN
                  </Button>
                )}
              </Form>
              {this.state.mode ? (
                <div style={{ color: "white" }}>
                  Already an user ?{" "}
                  <span onClick={this.tweakmode}> LOG IN</span>
                </div>
              ) : (
                <div style={{ color: "white" }}>
                  New User ?<span onClick={this.tweakmode}> SIGN UP</span>
                </div>
              )}
            </div>
          );
        }}
      </Formik>
    );
  };

  render() {
    if (this.state.error) {
      let raw = document.createElement("html");
      raw.innerHTML = this.state.error.response.data;
      this.setError(
        'There is an error',
        raw
        .getElementsByTagName("BODY")[0]
        .getElementsByTagName("PRE")[0]
        .innerHTML.split("<br>")[0]
      )
      console.log(this.state.errorState, this.state.errorTitle, this.state.errorDescription)
    }
    return (
      <Container>
        {this.componentToRender()}
        <AuthDialog
          open={this.state.errorState}
          handleClose={this.handleState}
          title={this.state.errorTitle}
          description={this.state.errorDescription}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return state;
};

export default connect(mapStateToProps, {
  login: fetchLogIn,
  signUp,
})(Authentication);
