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
  registerFailed
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
              </div>
            </fieldset>
            <div>
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
                onClick={() =>
                  onSubmit(firstName, lastName, email, pass, confirmPass)
                }
              />
            </div>
          </div>
        </main>
      </article>

      {/* Display Error Information if occurr */}
      {registerFailed.length > 0 && (
        <div className="white">
          <p className="f4">Error Occured, Resolve the following issues:</p>
          <ul style={{ listStyleType: "none" }}>
            {
              registerFailed.map((error, i) => <li key={i}>{error}</li>)
            }
          </ul>
        </div>
      )
      }
    </div >
  );
};
export default Register;
