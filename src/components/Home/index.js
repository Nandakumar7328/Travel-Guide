import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelList from '../TravelList'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstant.initial, travelData: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstant.inprogress})
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updateData = data.packages.map(eachData => ({
        id: eachData.id,
        name: eachData.name,
        description: eachData.description,
        imageUrl: eachData.image_url,
      }))
      this.setState({
        travelData: updateData,
        apiStatus: apiStatusConstant.success,
      })
    }
  }

  renderInSuccessView = () => {
    const {travelData} = this.state
    return (
      <>
        <ul className="ul-container">
          {travelData.map(eachList => (
            <TravelList key={eachList.id} travelDetails={eachList} />
          ))}
        </ul>
      </>
    )
  }

  renderInProgress = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.inprogress:
        return this.renderInProgress()
      case apiStatusConstant.success:
        return this.renderInSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <h1 className="main-heading">Travel Guide</h1>
        {this.renderData()}
      </div>
    )
  }
}

export default Home
