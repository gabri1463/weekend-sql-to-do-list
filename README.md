(View Raw will give you the markdown that you can copy to your repos!)


![MIT LICENSE](https://img.shields.io/github/license/scottbromander/the_marketplace.svg?style=flat-square)
![REPO SIZE](https://img.shields.io/github/repo-size/scottbromander/the_marketplace.svg?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/scottbromander/the_marketplace.svg?style=flat-square)
![FORKS](https://img.shields.io/github/forks/scottbromander/the_marketplace.svg?style=social)

# PROJECT NAME

SQL To-Do List

## Description

_Duration: 2 Days_

I aimed to create a To-Do list using a Postgres database. 

For my browser I used html and Bootstrap CSS to style my inputs and to-do list table. I used jQuery to take user input from the DOM, ajax calls to post the information to the express server. I used a get route to append the information to the DOM, a delete route to remove tasks, and two put routes to update the completion of tasks and edit the time tasks were completed. 

In order to delete a task I used an svg image for my icon and a sweetalert message to confirm with the user that they wanted to delete the task. I used a checkbox to allow users to determine when a task was complete and there was a sweetalert confirming completion. Once completed I used moment.js to append the time completed to the DOM. If the task was completed earlier, I used an svg edit icon to allow users to change the time. 


## Screen Shot


### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)

## Installation

1. Create a database named `weekend-to-do-app`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm start` in your terminal
5. Open brower at localhost:5000

## Usage

1. Add tasks to your database
2. Complete or Delete tasks 
3. Update time of completion if necessary


## Built With

- Express
- Node.js
- Moment.js
- Node-postgres
- Bootstrap CSS


## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality, my brother [Graham Gabrielson](https://www.researchgate.net/profile/Graham-Gabrielson) and wife [Jaclyn Gabrielson](https://www.linkedin.com/in/jmerriamcpa/) for input on the usability. 

## Support
If you have suggestions or issues, please email me at [lucas.c.gbarielson@gmail.com]
