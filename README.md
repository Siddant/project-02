# General Assembly Project 2: React Hackathon

A group project of 2 members [Begona Fernandez](https://github.com/aguairon), [Siddant Gurung](https://github.com/Siddant)

## Goal

To create a web application using React and external APIs.

A live version of this site can be found on Heroku ----> https://react-film-database.herokuapp.com/

## Timeframe
2 Days

## Technologies Used
* HTML5
* SASS/SCSS
* JavaScript (ES6)
* React
* Webpack
* Bulma (CSS framework)
* Git/GitHub
* Express
* Request-promise
* axios
* OMDb API
* MovieGlu API
* Mapbox API
* Node.js

## Installation
1. Clone or download the repo
2. Run ```yarn``` in Terminal
3. Run webpack dev server with ```yarn run serve```

## Overview
React Film Database is a front-end web application that allows users to search for their favourite movies, view their details and find cinemas near them. We aimed to created a web application similar to IMDB website.

## Instruction

## Process
We started the project by searching for API's which could be useful for us, after few hours of searching we decided to use the OMDB API. The API was used to fetch data about movies and these data were displayed on our application. We also wanted to use MovieQuotes API to generated a random quote from the movie, but we did not received the access key on time therefore we had remove this feature.

The first stage of our development was to read the documentation and test the external API endpoints using Insomnia to gain an understanding of the structural data we were receiving. We also drew up some wireframes so we could visualise how this data would be displayed on the application. Using the ```componentDidMount```, we made an axios get request to the OMDB API to retrieved data and set it on our component state. To display these data we used React components and Bulma, the list of movies that was retrieved from the API was shown in our Index page. Our index page was created using a classical component which made the axios request and passed the response data to the function component.

Each of the movies shown on the index page was link to the MoviesShow component which displays the information about the movie. Each movies stored in the OMDB API contains it own key to identify it, therefore we had to pass the key from the index to the show route. To get the key on the MoviesShow component we had to use the props, also to get the data about the movie we had to make a new axios request.

```
componentDidMount(){
  axios.get(`https://www.omdbapi.com/?i=${this.props.match.params.id}&apikey=591dc16c`)
    .then(res => this.setState({movie: res.data}))
    .catch(err => this.setState({ errors: err}))
}
```

To provided a better experience for the user we decided to add a search bar which would allow users to find the movie they are looking. This feature was achieved using search feature that is already been provided by the API. The API also provided information about TV shows, therefore when making the axios request we had to be more specific on the query string to tell API what information we wanted by including the type.  

```
axios.get(`https://www.omdbapi.com/?s=${this.state.search}&type=movie&apikey=${apikey}`)
.then(res => {
  if (res.data.Response === 'True') this.setState({ results: res.data.Search, error: '', searched: this.state.search })
  else this.setState({ results: [], error: res.data.Error, searched: this.state.search })
  console.log(this.state)
  })
  ```
The features mention above were paired coded with my team member, we choosed to implement more feature to the application and therefore decided to split our workload. I decided to implement a feature which allow users to located cinemas near their area, the other feature  implemented was the use of debouncing approach to allow user to search for movies without using the search button.

### Cinema near me
This feature uses the users current location and display the cinema that are closet to the users. This feature was achieved by using two API's, MovieGlu API was used to find cinemas closet to the user and Mapbox API was used to display the cinema on the map. In order to connect 2 APIs together I had to write several function to achieve it. The start of the implementation process started by getting the users location, this was achieved by using the geolocation property that was used to locate the user's position. The geolocation property returns the latitude and longitude value of the users location. The ```getLocation()``` function get the users geolocation.
```
  getLocation(){
    navigator.geolocation.getCurrentPosition(postion => {
      this.changeLocation(postion.coords.latitude, postion.coords.longitude)
      })
    }
```

The users geo coordination was passed to another function called ```changeLocation()```, this function uses the latitude and longitude to display the location of the user on the map which was provided by the Mapbox API. To get the cinemas based on the users location, I had create another function called ```getData()```. I also had to pass the geo coordination as the MovieGlu API required the latitude and longitude.

```
    getData(lat,lng){
      console.log('latituer: '+lat,'long: '+lng)
      const headers = {
        headers: {
          'client': 'EDUC_4',
          'Authorization': 'Basic RURVQ180OjZxRkJtdmxrTDN6RA==',
          'x-api-key': apikey,
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
```
Once the data was received another function ```plotMap()``` had to be invoked. This function will get the data that is stored in the state and plot the location of the cinema on the map. In the data all of cinema location had geolocation included, therefore combining two API MovieGlu and Mapbox to create this function was comfortable to do.

```
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
```

## Challenges


## Wins

## Future Features

          aasdad
