import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {HiMail} from 'react-icons/hi'

import {ImPhone} from 'react-icons/im'

import {FaLandmark} from 'react-icons/fa'

import {GiPerson} from 'react-icons/gi'

import {GrMail} from 'react-icons/gr'

import './index.css'

class UserList extends Component {
  state = {
    isLoading: true,
    stateSearch: '',
    statePage: 1,
    stateType: 'Parent',
    stateCountryOption: '',
    stateOrder: 'ASC',
    stateTotalPages: 1,
    stateCountiesList: [],
  }

  componentDidMount = () => {
    this.fetchUserDataList()
    this.fetchAllCountries()
  }

  fetchUserDataList = async () => {
    const {
      stateSearch,
      statePage,
      stateType,
      stateCountryOption,
      stateOrder,
    } = this.state

    console.log(stateCountryOption)

    const url = `https://agile-woodland-97107.herokuapp.com/users/?search_q=${stateSearch}&page=${statePage}&type=${stateType}&country=${stateCountryOption}&order=${stateOrder}  `
    const options = {
      method: 'GET',
    }
    const userResponse = await fetch(url, options)
    const myData = await userResponse.json()
    const totalPages = myData.total_pages
    const {users} = myData
    console.log(users)
    const stringUsers = users.map(eachUser => ({
      id: eachUser.id,
      firstName: eachUser.first_name,
      lastName: eachUser.last_name,
      phone: eachUser.phone,
      email: eachUser.email,
      city: eachUser.city,
      stateName: eachUser.state,
      country: eachUser.country,
      personType: eachUser.person_type,
      optionalEmail: eachUser.option_email,
    }))

    if (statePage > totalPages) {
      console.log(statePage, totalPages)
      this.setState({statePage: 1})
    }

    this.setState({
      stateUserList: stringUsers,
      isLoading: false,
      stateTotalPages: totalPages,
    })
  }

  fetchAllCountries = async () => {
    const {stateCountiesList} = this.state
    const countryUrl = 'https://agile-woodland-97107.herokuapp.com/countries/'
    const options = {
      method: 'GET',
    }
    const response = await fetch(countryUrl, options)
    console.log(response)
    const countryData = await response.json()
    console.log(countryData)
    countryData.sort()
    const allCountryList = [{country: 'All'}, ...countryData]
    this.setState({stateCountiesList: allCountryList})
  }

  changeSearchValue = event => {
    this.setState({stateSearch: event.target.value}, this.fetchUserDataList)
  }

  changeStateType = event => {
    this.setState({stateType: event.target.value}, this.fetchUserDataList)
  }

  changeOrder = event => {
    this.setState({stateOrder: event.target.value}, this.fetchUserDataList)
  }

  changeCountry = event => {
    console.log(event.target.value)
    this.setState(
      {stateCountryOption: event.target.value},
      this.fetchUserDataList,
    )
  }

  clearClicked = () => {
    this.setState(
      {
        stateSearch: '',
        statePage: 1,
        stateType: 'Parent',
        stateCountryOption: '',
        stateOrder: 'ASC',
        stateTotalPages: 1,
      },
      this.fetchUserDataList,
    )
  }

  decrementClicked = () => {
    const {statePage} = this.state
    if (statePage > 1) {
      this.setState(
        previousState => ({
          statePage: previousState.statePage - 1,
        }),
        this.fetchUserDataList,
      )
    } else {
      this.setState({statePage: 1}, this.fetchUserDataList)
    }
  }

  incrementClicked = () => {
    const {statePage, stateTotalPages} = this.state
    if (statePage < stateTotalPages) {
      this.setState(
        previousState => ({
          statePage: previousState.statePage + 1,
        }),
        this.fetchUserDataList,
      )
    } else {
      this.setState({statePage: stateTotalPages}, this.fetchUserDataList)
    }
  }

  homeClicked = () => {
    const {history} = this.props
    history.replace('/')
  }

  renderAllUsers = () => {
    const {stateUserList} = this.state
    console.log(stateUserList)
    return (
      <div className="user-list-cont">
        {stateUserList.map(eachUser => (
          <div className="each-user-cont">
            <h1 className="name-heading">
              {eachUser.firstName} {eachUser.lastName}
            </h1>
            <hr />
            <p className="other-user-details">
              <ImPhone />{' '}
              <label className="user-details">{eachUser.phone}</label>
            </p>
            <p className="other-user-details">
              <HiMail />{' '}
              <label className="user-details">{eachUser.email}</label>
            </p>
            <p className="other-user-details">
              <FaLandmark />{' '}
              <label className="user-details">
                {eachUser.city}, {eachUser.stateName}, {eachUser.country}
              </label>
            </p>
            <p className="other-user-details">
              <GiPerson />{' '}
              <label className="user-details">{eachUser.personType}</label>
            </p>
            <p className="other-user-details">
              <GrMail />{' '}
              <label className="user-details">{eachUser.optionalEmail}</label>
            </p>
          </div>
        ))}
      </div>
    )
  }

  render() {
    const {
      isLoading,
      stateSearch,
      stateType,
      stateOrder,
      statePage,
      stateCountiesList,
      stateCountryOption,
    } = this.state
    return (
      <>
        <div className="search-main-container">
          <div>
            <button
              type="button"
              className="home-btn"
              onClick={this.homeClicked}
            >
              Home
            </button>
          </div>

          <div>
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              onChange={this.changeSearchValue}
              value={stateSearch}
            />
          </div>

          <div>
            <select
              className="search-input"
              onChange={this.changeStateType}
              value={stateType}
            >
              <option>Parent</option>
              <option>Children</option>
            </select>
          </div>

          <div>
            <select className="search-input" onChange={this.changeOrder}>
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </div>

          <div>
            <select
              className="search-input"
              onChange={this.changeCountry}
              value={stateCountryOption}
            >
              {stateCountiesList.map(eachCountry => {
                if (eachCountry.country === 'All') {
                  return <option value="">{eachCountry.country}</option>
                }
                return (
                  <option value={eachCountry.country}>
                    {eachCountry.country}
                  </option>
                )
              })}
            </select>
          </div>

          <div>
            <button
              type="button"
              className="clear-btn"
              onClick={this.clearClicked}
            >
              Clear All
            </button>
          </div>
        </div>

        <div className="user-list-main-cont">
          {isLoading ? (
            <div className="user-spinner-cont">
              <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
            </div>
          ) : (
            this.renderAllUsers()
          )}
          <div className="pagination-main-cont">
            <button
              className="page-btn"
              type="button"
              onClick={this.decrementClicked}
            >
              -
            </button>
            <label>{statePage}</label>
            <button className="page-btn" onClick={this.incrementClicked}>
              +
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default UserList
