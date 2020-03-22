import React from "react";

const Register = ({
  firstName,
  lastName,
  email,
  pass,
  confirmPass,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPassChange,
  onConfirmPassChange,
  onSubmit,
  registerFailed,
  firstNameActivated,
  lastNameActivated,
  registerEmailActivated,
  registerPasswordActivated,
  confirmPassActivated,
  registerPending
}) => {

  return (
    <div>
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  First Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="first-name"
                  id="first-name"
                  onChange={onFirstNameChange}
                />
                {firstNameActivated && <p className="washed-red">{validName(firstName)}</p>}
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Last Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="last-name"
                  id="last-name"
                  onChange={onLastNameChange}
                />
                {lastNameActivated && <p className="washed-red">{validName(lastName)}</p>}
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={onEmailChange}
                />
                {registerEmailActivated && <p className="washed-red">{validEmail(email)}</p>}
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={onPassChange}
                />
                {registerPasswordActivated && <p className="washed-red">{validPassword(pass)}</p>}
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="confirm-password">
                  Confirm Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  onChange={onConfirmPassChange}
                />
                {confirmPassActivated && <p className="washed-red">{checkPassMatch(pass, confirmPass)}</p>}
              </div>
            </fieldset>
            <div>
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
                disabled={registerPending}
                onClick={() =>
                  onSubmit(firstName, lastName, email, pass, confirmPass)
                }
              />
            </div>
          </div>
        </main>
      </article>

      {/* Display Error Information if occur */}
      {registerFailed.length > 0 && <p className="f4 washed-red">{registerFailed}</p>}
    </div >
  );
};

export default Register;

const validEmail = email => {
  // regex taken from https://www.w3resource.com/javascript/form/email-validation.php
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return "";
  }
  return "Please enter a valid email address";
};

// EXTREMELY BASIC - SUBJECT TO IMPROVEMENTS IN FUTURE
const validPassword = password => {
  if (password.length < 6) {
    return "Password must contain at least six characters";
  }
  return "";
};

// for checking names upon register - max length is 50, first letter must be Capital.
const validName = (name) => {

  const stringLength = name.replace(/\s/g, '')

  // remove all whitespaces and check if empty string
  if (!stringLength.length) {
    return `Please enter at least one alphabetical character`
  }

  if (!(/^[a-zA-Z\s]*$/.test(name))) {
    return `Please ensure your name only consists of alphabets`
  }

  if (stringLength > 50) {
    return `Please ensure your total characters does not exceed 50`
  }

  return ""
};

const checkPassMatch = (pass, submitPass) => {
  if (pass !== submitPass) {
    return "Please make sure your two passwords match"
  }
  return ""
}