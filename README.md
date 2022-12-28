# Task 5 - "Online electronics store"

Web application "Online electronics store". 

Main tools and frameworks used in application: MS SQL Server, .NET Core Web API, Entity Framework, HTML, CSS, React.js, Axios





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

I used Automapper to map DTOs.

Users' passwords stored in database are hashed using Pbkdf2 HMACSHA_512 algorithm with 20000 iterations. 
To decrease chance of passwords getting broken I added random string "salt" which is hashed together with password. 

Authorization implemented with JWT Bearer Token. 
Some endpoint (for example '/Shopping/Purchase') require Bearer Token in request.

I installed Axios library in UI layer to fetch data from backend. 
It helped me reduce code and increased readability.

Checkout feature is available only to authorized users, 
that's why I created RequireAuth component in React to prevent unauthorized access.



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

I added non-clustered index on "username" column, because every login request requires to find user by username value.
Also, I added unique constraint on that column.


![Database](https://github.com/MichalOstrowskiSolbeg/Task5/blob/main/Database.png?raw=true)
