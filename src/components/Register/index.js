import {Component} from 'react'

import UserList from '../UsersList'

import './index.css'

class Register extends Component {
  state = {
    stateFirstName: '',
    stateLastName: '',
    statePhone: '',
    stateEmail: '',
    stateCity: '',
    stateState: '',
    stateCountry: '',
    statePersonalType: 'Parent',
    stateOptionalEmail: '',
    stateUserList: [],
    isEmpty: false,
    isSuccess: false,
    emailExists: false,
  }

  allUsersClicked = () => {
    const {history} = this.props
    history.replace('/users/')
  }

  changeFirstName = event => {
    this.setState({stateFirstName: event.target.value})
  }

  changeLastName = event => {
    this.setState({stateLastName: event.target.value})
  }

  changePhone = event => {
    this.setState({statePhone: event.target.value})
  }

  changeEmail = event => {
    this.setState({stateEmail: event.target.value})
  }

  changeCity = event => {
    this.setState({stateCity: event.target.value})
  }

  changeState = event => {
    this.setState({stateState: event.target.value})
  }

  changeCountry = event => {
    this.setState({stateCountry: event.target.value})
  }

  changeType = event => {
    this.setState({statePersonalType: event.target.value})
  }

  changeOptionalEmail = event => {
    this.setState({stateOptionalEmail: event.target.value})
  }

  postUserDetails = async userDetails => {
    const url = 'https://agile-woodland-97107.herokuapp.com/register/'
    console.log(JSON.stringify(userDetails))
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      this.setState({
        stateFirstName: '',
        stateLastName: '',
        statePhone: '',
        stateEmail: '',
        stateCity: '',
        stateState: '',
        stateCountry: '',
        statePersonalType: 'Parent',
        stateOptionalEmail: '',
        isEmpty: false,
        isSuccess: true,
        emailExists: false,
      })
    } else {
      this.setState({
        isEmpty: false,
        isSuccess: false,
        emailExists: true,
      })
    }
  }

  formSubmitted = event => {
    event.preventDefault()
    const {
      stateFirstName,
      stateLastName,
      statePhone,
      stateEmail,
      stateCity,
      stateState,
      stateCountry,
      statePersonalType,
      stateOptionalEmail,
      stateUserList,
    } = this.state

    if (
      stateFirstName !== '' &&
      stateLastName !== '' &&
      statePhone !== '' &&
      stateEmail !== '' &&
      stateCity !== '' &&
      stateState !== '' &&
      stateCountry !== '' &&
      statePersonalType !== '' &&
      stateOptionalEmail !== '' &&
      stateUserList !== ''
    ) {
      const userDetails = {
        firstName: stateFirstName,
        lastName: stateLastName,
        phone: statePhone,
        email: stateEmail,
        city: stateCity,
        stateName: stateState,
        country: stateCountry,
        personType: statePersonalType,
        optionalEmail: stateOptionalEmail,
      }
      this.postUserDetails(userDetails)
    } else {
      this.setState({isEmpty: true, isSuccess: false})
    }
  }

  render() {
    const {
      stateFirstName,
      stateLastName,
      statePhone,
      stateEmail,
      stateCity,
      stateState,
      stateCountry,
      statePersonalType,
      stateOptionalEmail,
      stateUserList,
      isEmpty,
      isSuccess,
      emailExists,
    } = this.state
    console.log(stateUserList)
    return (
      <div className="main-bg-container">
        <div className="form-main-container">
          <h1 className="main-heading">Person Register Form</h1>
          <form className="form-container" onSubmit={this.formSubmitted}>
            <div>
              <label className="label-headings" htmlFor="firstNameId">
                First Name
              </label>
              <br />
              <input
                type="text"
                id="lastNameId"
                className="input-text-style"
                placeholder="First name"
                onChange={this.changeFirstName}
                value={stateFirstName}
              />
            </div>

            <div>
              <label className="label-headings" htmlFor="lastNameId">
                Last Name
              </label>
              <br />
              <input
                type="text"
                id="firstNameId"
                className="input-text-style"
                placeholder="Last name"
                onChange={this.changeLastName}
                value={stateLastName}
              />
            </div>

            <div>
              <label className="label-headings" htmlFor="phoneId">
                Phone
              </label>
              <br />
              <input
                type="text"
                id="phoneId"
                className="input-text-style"
                placeholder="Phone"
                onChange={this.changePhone}
                value={statePhone}
              />
            </div>

            <div>
              <label className="label-headings" htmlFor="emailId">
                Email
              </label>
              <br />
              <input
                type="text"
                id="emailId"
                className="input-text-style"
                placeholder="Email"
                onChange={this.changeEmail}
                value={stateEmail}
              />
            </div>

            <div>
              <label className="label-headings" htmlFor="cityId">
                City
              </label>
              <br />
              <input
                type="text"
                id="cityId"
                className="input-text-style"
                placeholder="City"
                onChange={this.changeCity}
                value={stateCity}
              />
            </div>

            <div>
              <label className="label-headings" htmlFor="stateId">
                State
              </label>
              <br />
              <input
                type="text"
                id="stateId"
                className="input-text-style"
                placeholder="State"
                onChange={this.changeState}
                value={stateState}
              />
            </div>

            <div>
              <label className="label-headings" htmlFor="countryId">
                Country
              </label>
              <br />
              <input
                type="text"
                id="countryId"
                className="input-text-style"
                placeholder="Country"
                onChange={this.changeCountry}
                value={stateCountry}
              />
            </div>

            <div>
              <label className="label-headings" htmlFor="typeId">
                Person Type
              </label>
              <br />
              <select
                className="input-text-style"
                onChange={this.changeType}
                value={statePersonalType}
              >
                <option>Parent</option>
                <option>Children</option>
              </select>
            </div>

            <div>
              <label className="label-headings" htmlFor="optionalEmailId">
                Optional Email
              </label>
              <br />
              <input
                type="text"
                id="optionalEmailId"
                className="input-text-style"
                placeholder="Optional Email"
                onChange={this.changeOptionalEmail}
                value={stateOptionalEmail}
              />
            </div>

            <div className="register-btn-cont">
              <button type="submit" className="register-btn">
                Register
              </button>
            </div>
          </form>

          {isEmpty ? (
            <p className="error-msg-style">
              Please fill all the inputs with appropriate data
            </p>
          ) : (
            ''
          )}
          {isSuccess ? (
            <p className="success-msg-style">User Registered Successfully</p>
          ) : (
            ''
          )}
          {emailExists ? (
            <p className="error-msg-style">Email Already Exists</p>
          ) : (
            ''
          )}

          <div className="all-users-btn-cont">
            <button
              className="all-users-btn"
              type="button"
              onClick={this.allUsersClicked}
            >
              Get All Users
            </button>
          </div>
        </div>

        <div className="main-image-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            className="main-image"
            alt="Home"
          />
        </div>
      </div>
    )
  }
}

export default Register

/*

const newUserDetails = [...stateUserList, userDetails]

    console.log(
      stateFirstName,
      stateLastName,
      statePhone,
      stateEmail,
      stateCity,
      stateState,
      stateCountry,
      statePersonalType,
      stateOptionalEmail,
      stateUserList,
    )


          const newUserDetails = [...stateUserList, userDetails]
      this.setState({
        stateUserList: newUserDetails,
        stateFirstName: '',
        stateLastName: '',
        statePhone: '',
        stateEmail: '',
        stateCity: '',
        stateState: '',
        stateCountry: '',
        statePersonalType: 'Parent',
        stateOptionalEmail: '',
        isSuccess: true,
      })

    */
