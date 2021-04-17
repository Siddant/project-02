/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'

import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2lkZGFudCIsImEiOiJjanIyM2ExaWUwdnF1NDNxcTdsZzk2YThsIn0.fULncdmb9pF9YfnkS4J0Rw'

// process.env.MAPBOX_TOKEN

interface Cinemas {
  // eslint-disable-next-line camelcase
  cinema_name: string
  address: string
  city: string
  county: string
  postcode: string
  lat: number
  lng: number
}

const CinemasNear: React.FC = () => {
  let map: mapboxgl.Map
  const [cinemas, setCinemas] = useState<Cinemas[]>([])
  const mapDiv = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    map = new mapboxgl.Map({
      container: mapDiv.current || '',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 1,
    })
    return () => map.remove()
  }, [])

  const getData = (lat: number, lng: number) => {
    const headers = {
      headers: {
        client: 'EDUC_4',
        Authorization: 'Basic RURVQ180OjZxRkJtdmxrTDN6RA==',
        'x-api-key': 'MFRqjbphK01Ti2gXLI0dE2iebhWHAMZHa0Kb11Dp',
        'api-version': 'v102',
        geolocation: `${lat};${lng}`,
      },
    }
    axios
      .get(
        'https://cors-anywhere.herokuapp.com/https://api-gate.movieglu.com/cinemasNearby/?n=10',
        headers
      )
      .then(res => {
        setCinemas(res.data.cinemas)
        plotMap()
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  }

  const plotMap = () => {
    // eslint-disable-next-line array-callback-return
    cinemas.map((cinema): void => {
      new mapboxgl.Marker({ color: 'red' })
        .setLngLat({ lat: cinema.lat, lng: cinema.lng })
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            // add popups
            `
            <p>${cinema.cinema_name}</p>
            <p>${cinema.address}, ${cinema.city}, ${cinema.county} ${cinema.postcode}</p>
            `
          )
        )
        .addTo(map)
    })
  }
  const getLocation = () => {
    navigator.geolocation.watchPosition(
      postion => {
        changeLocation(postion.coords.latitude, postion.coords.longitude)
      },
      () => console.log('err')
    )
  }

  const changeLocation = (lat: number, lng: number) => {
    map.flyTo({
      center: { lat, lng },
      zoom: 13,
    })

    getData(lat, lng)
    new mapboxgl.Marker()
      .setLngLat({ lat, lng })
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML('<p>your Location</p>')
      )
      .addTo(map)
  }

  return (
    <section className="section">
      <h1 className="title">Cinemas Near Me</h1>
      <button className="button is-primary" onClick={getLocation}>
        Locate Now
      </button>
      <div className="map" ref={mapDiv} />
    </section>
  )
}

export default CinemasNear
