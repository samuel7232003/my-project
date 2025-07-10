** Ex 4: Do a simple market app **

4.1: Home page
- Fetch API to get list Products. Show Image and Infor of list products. 
- When click on Product, navigate to Detail Page show more information of products.

Requiment: 
- Fetch API list products and save in context
- Make new router to navigate to DetailPage. (use useParam here)

Backend API: 

BASE URL: `https://fakestoreapi.com`

1. Get all products:

- **URL:** `/products`
- **Method:** `GET`
- **Response:**

```json
[
  {
    "id": 0,
    "title": "string",
    "price": 0.1,
    "description": "string",
    "category": "string",
    "image": "http://example.com"
  }
  // ...
]
```

1. Get a single product:

- **URL:** `/products/{id}`
- **Method:** `GET`
- **Response:**

```json
{
  "id": 0,
  "title": "string",
  "price": 0.1,
  "description": "string",
  "category": "string",
  "image": "http://example.com"
}
```