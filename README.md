# General Assembly Project 2: React Hackathon

A group project of 2 members [Begona Fernandez](https://github.com/aguairon), [Siddant Gurung](https://github.com/Siddant)

## Goal

To create a web application using React and external APIs.

A live version of this site can be found on Heroku ----> https://project-02-sable.vercel.app/

## Timeframe

2 Days

## Technologies Used

- HTML5
- SASS/SCSS
- JavaScript (ES6)
- React
- Webpack
- Bulma (CSS framework)
- Git/GitHub
- Express
- Request-promise
- axios
- OMDb API
- MovieGlu API
- Mapbox API
- Node.js

## Installation

1. Clone or download the repo
2. Run `yarn` in Terminal
3. Run webpack dev server with `yarn run serve`

## Overview

React Film Database is a front-end web application that allows users to search for their favourite movies, view their details and find cinemas near them. We aimed to created a web application similar to IMDB website.

## Instruction

1. The home page of the application will display all the movies which contains the title Star by default.

![screenshot](https://user-images.githubusercontent.com/5802969/55035646-62df2200-5010-11e9-9003-18f0d8b8033e.png)

2. The user also has the ability to search for movies by giving the movie tile. The application will show an error message if the application cannot find the movie.

![screenshot 2019-01-11 at 10 56 35](https://user-images.githubusercontent.com/5802969/55035729-a33ea000-5010-11e9-93a7-aaf616e92968.png)

3. If the application find the movies, then it will be displayed on the search result page. The user can click on any of the movies, which will redirect them to movies show page.

![screenshot](https://user-images.githubusercontent.com/5802969/55035650-6377b880-5010-11e9-876c-fe68e397880c.png)

4. The movie show page displays more detailed information on the movie including the movie's metascore, actors and plot but also the runtime, language and genre.

![screenshot](https://user-images.githubusercontent.com/5802969/55035644-62df2200-5010-11e9-8068-6061fde8364b.png)

5. The user can also find cinemas near them on the Cinema Near Me tab, by clicking on the button. The application will get the user location and then update the map which will all the cinemas nearer to them. The blue marker indicated the users location and the red markers indicated the all the cinemas the application has found.

![screenshot](https://user-images.githubusercontent.com/5802969/55035633-5d81d780-5010-11e9-9c9e-179be8a834c1.png)

## Process

We started the project by searching for API's which could be useful for us, after few hours of searching we decided to use the OMDB API. The API was used to fetch data about movies and these data were displayed on our application. We also wanted to use MovieQuotes API to generated a random quote from the movie, but we did not received the access key on time therefore we had remove this feature.

The first stage of our development was to read the documentation and test the external API endpoints using Insomnia to gain an understanding of the structural data we were receiving. We also drew up some wireframes so we could visualise how this data would be displayed on the application. Using the `componentDidMount`, we made an axios get request to the OMDB API to retrieved data and set it on our component state. To display these data we used React components and Bulma, the list of movies that was retrieved from the API was shown in our Index page. Our index page was created using a classical component which made the axios request and passed the response data to the function component.

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

The features mention above were paired coded, we choosed to implement more feature to the application and therefore decided to split our workload. I decided to implement a feature which allow users to located cinemas near their area. The other feature implemented was the use of debouncing approach to allow user to search for movies without using the search button, this feature was implement by my
colleague.

### Cinema near me

This feature uses the users current location and display the cinema that are closet to the users. This feature was achieved by using two API's, MovieGlu API was used to find cinemas closet to the user and Mapbox API was used to display the cinema on the map. In order to connect 2 APIs together I had to write several function to achieve it. The start of the implementation process started by getting the users location, this was achieved by using the geolocation property that was used to locate the user's position. The geolocation property returns the latitude and longitude value of the users location. The `getLocation()` function get the users geolocation.

```
getLocation(){
  navigator.geolocation.getCurrentPosition(postion => {
    this.changeLocation(postion.coords.latitude, postion.coords.longitude)
  })
}
```

The users geo coordination was passed to another function called `changeLocation()`, this function uses the latitude and longitude to display the location of the user on the map which was provided by the Mapbox API. To get the cinemas based on the users location, I had create another function called `getData()`. I also had to pass the geo coordination as the MovieGlu API required the latitude and longitude.

```
getData(lat,lng){
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

Once the data was received another function `plotMap()` had to be invoked. This function will get the data that is stored in the state and plot the location of the cinema on the map. In the data all of cinema location had geolocation included, therefore combining two API MovieGlu and Mapbox to create this function was comfortable to do.

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

The main challenges of this project was to finding API's we could used, functionality and the idea for this project had to be changed serval times. Also combining 2 APIs together was hard, trying to figuring out how to chain functions together to pass the data around was the hardest part for me.

Using the MovieGlu API was a bit of a challenge as well, when testing the API in Insomnia I was able to get the data from the API. But incorporating the API to the application proved to bit of a challenged as it gave an error stating `No 'Access-Control-Allow-Origin'` trying to solve this issue was time consuming. After searching the internet I able to solve it using `https://cors-anywhere.herokuapp.com`.

## Wins

For me the biggest win was being able to combine two different types of API to create a feature that allows users to locate cinema using their location. I wasn't really familiarly with React, therefore using it to create this application was a huge win. Also we did use some new concept such as state, destructing object, HTTP request Methods, classical component and functional component. By doing this project I am more comfortable with using these technologies for future projects.

## Future Features

There some extra feature I want to implement in the future:

- show recommendations based on the movie that was selected.
- show the users where they can buy the movie they have selected.
- show the list of movies that are currently being shown on the select cinema.
- using navigation system direct users to the cinema they have selected.
- so far there is a limited of 10 movies that can be shown to the users, I would like to implement a pagination.
