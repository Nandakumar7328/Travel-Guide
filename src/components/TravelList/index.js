import './index.css'

const TravelList = props => {
  const {travelDetails} = props
  const {name, description, imageUrl} = travelDetails

  return (
    <li className="li-container">
      <img src={imageUrl} alt={name} className="image-resize" />
      <h1 className="name-para">{name}</h1>
      <p className="description-para">{description}</p>
    </li>
  )
}

export default TravelList
