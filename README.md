# Task 5 - "Online electronics store"

ASP .NET Core & React.js application "Online electronics store".




## Features

- Login and Register
- Counter of products added to shopping cart in Header
- See all products ('products' page)
- See product details
- Add product to shopping list ('products' page)
- Remove product form shopping list ('cart' page)
- Checkout for logged user when user has added products to shopping cart ('cart' page)

## Documentation

Project contains of 4 layers (Repository, Service, API, UI). 
Each layer is a different project. 

Project uses EF to connect to MsSql database. 
Models in RepositoryLayer were created by scaffolding DbContext. 

Validation was made with FluentValidation library which could help me separate request objects from validation.
I'm using Automapper to map DTOs

Authorization implemented with JWT.

## How to run (in Visual Studio)

- write 'cd ui' in Powershell terminal
- write 'npm install' (when running for the first time) 
- write 'npm start' to run React application
- run ASP .Net application using IIS Express

![first step](https://github.com/MichalOstrowskiSolbeg/Task5/blob/main/screenshot1.png?raw=true)

![second step](https://github.com/MichalOstrowskiSolbeg/Task5/blob/main/screenshot2.png?raw=true)

![third step](https://github.com/MichalOstrowskiSolbeg/Task5/blob/main/screenshot3.png?raw=true)
## Database

Database is hosted on https://freeasphosting.net/


