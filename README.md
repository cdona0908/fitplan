# fitplan

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This application was built as a fitness routine application that helps one build and create fitness routines with saved exercises.
<img width="1436" alt="Screen Shot 2022-06-01 at 5 55 33 PM" src="https://user-images.githubusercontent.com/95589049/171508555-896e3631-d05d-4941-b695-d135fcaa8983.png">

## Installation

1. Clone the repository from GitHub.
2. Run `npm i` To install the neccesary dependencies:
   - dotenv: to use environment variables to store sensitive data, like your MySQL username, password, and database name.
   - express, mysql2 and sequelize: to connect to the database.
   - bcrypt: to handle password encryyption
   - connect-session-sequelize and express-session: to create and manage user sessions
   - express-handlebars and handlebars: to render web pages from templates.
3. Run `mysql -u root -p` and enter your mysql password to connect to the database
4. Use the schema.sql file in the db folder to create your database using MySQL shell commands
5. Run `npm run seed` to seed data to the database
6. Run `npm start` to connect to the server

## Usage

Once the application is connected to the server, the user will be able to get, create, edit and delete posts. Create an account and log into it. Mark other user's post as helpful or unhelpful. Add comments to posts and see the latests news in the gaming community

## Links

Deployed application:

## Technologies

- JavaScript
- HTML
- CSS
- Apollo
- Graph QL
- React
- Heroku
- MongoDB
- Node
- Chakra UI
- Express

## License

This project is licensed under MIT license.

## Contributing

If you like to contribute to this application, please refer to the following guidelines:

Please refer to the Contributor Covenant v2.1 in the following website: https://www.contributor-covenant.org for guidelines details on how to contribute

## Creators

You can find us on Github:

- Celia Dona : [cdona0908](https://github.com/cdona0908) <br>
- Ajaypal Ghuman: [AjaypalGhuman](https://github.com/AjaypalGhuman) <br>
- Wilmer Ojeda: [wilmerojeda13](https://github.com/wilmerojeda13) <br>
