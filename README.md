# WISER

This project was developed with Node.js, Koa2 and MongoDB - ES6

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Installing & Running

Step1: 
```
node v6.9.1
mongo v3.2.11
```
Step2:
```
npm install 
Run npm start script
```
server listens on port 8080

Step3:
```
Run npm start script
```

### THE API - Query examples
First step you need to create the Dummy Data in order to use the api
```
Execute Post request '/import' to create Dummy Data for the project
localhost:8080/import
```
#### Get all products with query strings
```
htt://localhost:8080/products
htt://localhost:8080/products?sort=asc/desc
htt://localhost:8080/products?limit=2
htt://localhost:8080/products?sort=asc&limit=2
```
Response
```
[
    {
        "_id": "5a26396b99173b18b360bf48",
        "title": "lumberjack tools hsbk1 home series beginners kit",
        "price": 49,
        "brand": "capital one financial corporation",
        "shipping": "0-983796-36-X",
        "sku": 12735167,
        "store_id": "5a26396b99173b18b360bf25",
        "__v": 0,
        "createdAt": "2017-12-05T15:28:31.572Z"
    },
    {
        "_id": "5a26396b99173b18b360bf54",
        "title": "bostitch prozhoze, 3/8\" x 100, hopb38100",
        "price": 48,
        "brand": "securian financial",
        "shipping": "0-994341-87-3",
        "sku": 52820434,
        "store_id": "5a26396b99173b18b360bf28",
        "__v": 0,
        "createdAt": "2017-12-05T15:28:31.573Z"
    }
]
```
#### Get All stores
```
htt://localhost:8080/stores
```
Response
```
[
    {
        "_id": "5a26396b99173b18b360bf23",
        "name": "western union company",
        "url": "http://www.dedecms.com/people/metadata/index/features/2013/08/login",
        "__v": 0,
        "createdAt": "2017-12-05T15:28:31.458Z"
    },
    {
        "_id": "5a26396b99173b18b360bf26",
        "name": "boston scientific corporation",
        "url": "http://www.archive.org/features/browse/guide/images/2013/05/index",
        "__v": 0,
        "createdAt": "2017-12-05T15:28:31.463Z"
    },
    {
        "_id": "5a26396b99173b18b360bf24",
        "name": "the hershey company",
        "url": "http://www.linkedin.com/more/books/spring/2014/01/proposal.html",
        "__v": 0,
        "createdAt": "2017-12-05T15:28:31.463Z"
    }
]
```
#### Get a specific product by id
```
htt://localhost:8080/products/:id
```
Response
```
[
    {
        "_id": "5a26396b99173b18b360bf48",
        "title": "lumberjack tools hsbk1 home series beginners kit",
        "price": 49,
        "brand": "capital one financial corporation",
        "shipping": "0-983796-36-X",
        "sku": 12735167,
        "store_id": "5a26396b99173b18b360bf25",
        "__v": 0,
        "createdAt": "2017-12-05T15:28:31.572Z"
    }
]
```
#### Get all store products
```
htt://localhost:8080/store/:id/products
htt://localhost:8080/store/:id/products?sort=asc/desc
htt://localhost:8080/store/:id/products?limit=2
htt://localhost:8080/store/:id/products?sort=asc/desc&limit=2
```

Response
```
[
    {
        "_id": "5a26396b99173b18b360bf12",
        "title": "black and decker reciprocating saw, rs600k",
        "price": 27,
        "brand": "regal beloit corporation",
        "shipping": "0-936064-99-4",
        "sku": 75331023,
        "store_id": "5a26396b99173b18b360bf24",
        "__v": 0,
        "createdAt": "2017-12-05T15:28:31.566Z"
    },
    {
        "_id": "5a26396b99173b18b360bf13",
        "title": "century drill and tool reciprocating saw blade (set of 4)",
        "price": 3,
        "brand": "pinnacle west capital corporation",
        "shipping": "0-948604-83-2",
        "sku": 20108748,
        "store_id": "5a26396b99173b18b360bf24",
        "__v": 0,
        "createdAt": "2017-12-05T15:28:31.566Z"
    }
]
````
#### Create summary for all stores
```
htt://localhost:8080/summary
```
Response
```
{
    "5a26396b99173b18b360bf23": {
        "store_name": "western union company",
        "products_count": 10,
        "price_range": "3 - 47",
        "average_price": 15.66
    },
    "5a26396b99173b18b360bf26": {
        "store_name": "boston scientific corporation",
        "products_count": 0,
        "price_range": "N/A",
        "average_price": "N/A"
    },
    "5a26396b99173b18b360bf24": {
        "store_name": "the hershey company",
        "products_count": 10,
        "price_range": "3 - 39",
        "average_price": 13
    }
}
```
