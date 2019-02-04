import React from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
mapboxgl.accessToken = process.env.MAPBOX_TOKEN
import axios from 'axios'


class CinemasNear extends React.Component{
  constructor(){
    super()
    this.getLocation =this.getLocation.bind(this)
    this.state ={
      cinemas: []
    }
    this.changePlace = this.changePlace.bind(this)
  }

  componentDidMount(){
    this.map = new mapboxgl.Map({
      container: this.mapDiv,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: {lng: 0, lat: -0},
      zoom: 1
    })
  }

  getData(lat,lng){
    console.log('latituer: '+lat,'long: '+lng)
    const headers = {
      headers: {
        'client': 'EDUC_4',
        'Authorization': 'Basic RURVQ180OjZxRkJtdmxrTDN6RA==',
        'x-api-key': 'MFRqjbphK01Ti2gXLI0dE2iebhWHAMZHa0Kb11Dp',
        'api-version': 'v102',
        'geolocation': `${lat};${lng}`
      }
    }
    axios.get('https://cors-anywhere.herokuapp.com/https://api-gate.movieglu.com/cinemasNearby/?n=10',headers )
      .then(res =>{
        this.setState({cinemas: res.data.cinemas})
        this.plotMap()
      } )
      .catch(err=> console.log(err))

  }
  changePlace(){
    alert('here')
  }

  plotMap(){
    this.state.cinemas.map(cinema =>{
      new mapboxgl.Marker({color: 'red'})
        .setLngLat({lat: cinema.lat, lng: cinema.lng})
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(`
            <p>${cinema.cinema_name}</p>
            <p>${cinema.address}, ${cinema.city}, ${cinema.county} ${cinema.postcode}</p>
            `
          ))
        .addTo(this.map)
    } )
  }

  getLocation(){
    navigator.geolocation.getCurrentPosition(postion => {
      this.changeLocation(postion.coords.latitude, postion.coords.longitude)
    })
  }

  changeLocation(lat,lng){
    this.map.flyTo({
      center: {lat: lat, lng: lng},
      zoom: 13
    })
    this.getData(lat,lng)
    new mapboxgl.Marker()
      .setLngLat({lat: lat, lng: lng})
      .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<p>your Location</p>'))
      .addTo(this.map)
  }

  render(){
    return(
      <section className="section">
        <h1 className="title">Cinemas Near Me</h1>
        <button onClick={this.getLocation}>Locate Now</button>
        <div className="map" ref={el => this.mapDiv = el}/>
      </section>
    )
  }


}

export default CinemasNear
