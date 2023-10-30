# React Weather App

This is a React Weather application that provides real-time weather information for cities around the world. It uses the OpenWeatherMap API for weather data, Unicon for weather icons, and Luxon to convert date and time to local time. The app offers several features to enhance your weather-checking experience.

## Getting Started

Before running the application, make sure you have Node.js and npm installed on your machine.

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the necessary dependencies.
4. Run `npm start` to start the development server.
5. The app will be available at `http://localhost:3000` in your browser.

## Features

### Home Page

- By default, the app displays a list of the 15 largest cities in the world by population in alphabetical order, along with their current temperatures and weather icons.
- You can remove individual cities from the list by clicking the remove button next to each city.
- You can add cities to your favorites list by clicking the star icon next to a city name. The favorites will appear at the top of the list, also in alphabetical order.

### City Details

- Clicking on a city's name in the list will open a detailed page with more weather information for that city.
- On the city details page, you can see additional weather data and a textarea field where you can enter and save notes about the city.
- You can edit and remove your notes.

### Search

- Use the search field to look up weather details for other cities. The app will display matching cities as you type.

### Location Permission

- The app will ask for your permission to access your current location. If granted, it will open the details page for your current city.

### Offline Functionality

- The app retains basic functionality offline. It caches the most up-to-date information and persists it in local storage.

### Components and Unit Testing

- The application is built with well-defined components for easy maintenance and scalability.
- Unit testing is implemented for applicable functionality to ensure stability.

## Tech Stack

- React
- React Router
- Local Storage for data persistence
- Jest for unit testing
- OpenWeatherMap API for weather data
- Unicon for weather icons
- Luxon for converting date and time to local time

## Acknowledgments

- Weather data provided by OpenWeatherMap.org
- Weather icons provided by Unicon
- City population data from a reliable source

Enjoy using the React Weather App, and stay updated on the latest weather conditions worldwide!
