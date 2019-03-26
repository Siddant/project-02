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
We started the project by searching for API's which could be useful for us, after few hours of searching we decided to use the OMDB API. The API was used to fetch data about movies and these data were displayed on our application. We also wanted to use MovieQuotes API to generated a random quote from the movie, but we did not received the access key therefore we had remove this feature.

The First step of our project was to get the data for the OMDB API, this task achieved easily by making an axios get request to the API. The retrieved data was displayed using Bulma to create an index page which shows the list of all the films that are stored in the API database. We also created a show page for movies to have their own individual page which gives more description about the movie, the user has selected. To provided a better experience for the user we decided to add a search feature, this feature was achieved using search feature that is already been provided by the API. The API also provided information about TV shows, therefore when making the axios request we had to be more specific on the query string to tell API what information we wanted by including the type.

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
This feature uses the users current location and display the cinema that are closet to the users. This feature was achieved by using two API's, MovieGlu API was used to find cinemas closet to the user and Mapbox API was used to display the cinema on the map. In order to connect 2 APIs together I had to write several function to achieve it. The start of the implementation process started by getting the users location which was achieved by using the geolocation property that was used to locate the user's position.  










## Challenges


## Wins

## Future Features

aasdad
