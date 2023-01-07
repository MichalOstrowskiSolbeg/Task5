# Task 5 - "Online electronics store"

Web application "Online electronics store". 

Main tools and frameworks used in application: MS SQL Server, .NET Core Web API, Entity Framework, HTML, CSS, React.js, Axios





## Features

- Login and Register. Register form requires FirstName, LastName, Usename (unique) and Password which has to be filled twice
- Icon and counter of products added to shopping cart in Header element
- See all products ('products' page)
- See product details
- Add product to shopping cart using 'ADD TO CART' button ('products' page)
- Remove product form shopping list using 'REMOVE' button ('cart' page)
- Checkout for clients when client has added added at least one product to shopping cart ('cart' page), when 'CHECKOUT' button is clicked order will be created and alert with message will be shown 
- See orders history (only for clients)
- Admin panel (only for admin)
- Change order status (only for admin)
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
I implemented role-based authorization with 2 roles: admin, client. 

I installed Axios library in UI layer to fetch data from backend. 
It helped me reduce code and increased readability.

List of product in shopping cart is stored in LocalStorage.

I created ApiControllerBase class which is inherited by all controllers in API layer. 
ApiControllerBase class has methods which check data stored in JWT: role, user ID. 
It allows me to process requested data for user without sending additional data. 
I used to functionality when I want to send user's orders.

In CreateOrder method in OrderService I used transaction to make sure that there will not be
a situation where order will be created but products will not be add to that order.
If an error occurs, whole transaction is rollbacked and no data in database is changed.

Checkout feature is available only to authorized users, 
that's why I created RequireAuth component in React to prevent unauthorized access.

Admin can change status of orders. 
There are 4 available statuses to choose: Pending, Accepted, Rejected and Completed.



## How to run (in Visual Studio)

- write 'cd ui' in Powershell terminal
- write 'npm install' (when running for the first time) 
- write 'npm start' to run React application
- run ASP .Net application using IIS Express

![first step](https://github.com/MichalOstrowskiSolbeg/Task5/blob/main/screenshot1.png?raw=true)

![second step](https://github.com/MichalOstrowskiSolbeg/Task5/blob/main/screenshot2.png?raw=true)

![third step](https://github.com/MichalOstrowskiSolbeg/Task5/blob/main/screenshot3.png?raw=true)
## Login credentials

Login credentials for admin account: (admin, admin)

Login credentials for client account: (client1, client1)


## Database

Database is hosted on https://freeasphosting.net/

I added non-clustered index on "username" column, because every login request requires to find user by username value.
Also, I added unique constraint on that column.


![Database](https://github.com/MichalOstrowskiSolbeg/Task5/blob/main/Database2.png?raw=true)
