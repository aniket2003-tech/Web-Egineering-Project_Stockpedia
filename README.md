# Web-Engineering-Project_Stockpedia
My project is about stock market advice. Subscribed users can take advantage of premium stock selection advice, whereas normal users are only provided with basic information about stock terms and the history of a stock.

# Necessary Dependencies Installation
Once the directories are installed on system, run the command 'npm install' in the server-side repository and run the command 'npm start' for the client-side repository.

# Necessary Data Insertion
After completing the above steps, a folder named StockMarket will be created on your local MongoDB server. To make changes to the web application, you need admin privileges. Since our newly created MongoDB server doesn't have an admin user, you won't be able to make any changes initially. Insert the following document into your users collection to gain admin privileges:

{
  "_id": {
    "$oid": "6606e480d63bb80bceab9c2a"
  },
  "username": "admin",
  "email": "youremail@gmail.com",
  "password": "$2a$10$kwl9nX05pGah5Ggw2rsYp.fnGQ2tCBmhLQI2Kx7HZIsriKdXc3bVK",
  "isAdmin": true,
  "isSubscriber": true,
  "subscription_date": {
    "$date": "2024-03-29T15:55:44.156Z"
  },
  "unsubscription_date": {
    "$date": "2024-03-29T15:55:44.156Z"
  },
  "__v": 0,
  "profileImageUrl": ""
}
In the above document, the password is hashed. Its value is '1234'. Once everything is set up, you can update the password as needed.
