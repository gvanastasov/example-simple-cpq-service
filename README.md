# Example Simple CPQ Service

This repository contains a simple CPQ (Configure, Price, Quote) service. The service is designed to handle product configuration, pricing calculations, and quote generation. 

## Table of Contents
 
- [About](#about)
- [Rules](#rules)
- [Installation](#installation)
- [Usage](#usage)

## About

In a nutshell the project consists of a simple api layer, under which an `engine` takes `input`, process it and provides CPQ `output`. The processor logic consists of 3 phases, namely configure, price and validate - composition of which results in a quote. Each phase is further broken down into an ordered queue of simple logical operations, applied one after another. Data for each operation is kept inside in-memory db, seeded at runtime with some dummy values.

Notes:

> The engine input makes use of context pattern (or more like anti pattern, but the nature of javascripts is fairly okay when working with godly objects). This of course can be improved a lot, but for the sake of simplicity - context it is.

> Some rules might be over simplified, but thats just for the showcase of how to break down CPQ capabilities.

> Actual quotes are not persisted, even though it might make sense to do so.

> This is not a REAL CPQ, but just a demo of such, many features can be added on top (like quote persitency from prev point).

> The solution includes a simple 'discount' example rule, but for a full separation of concerns (example in a microservice architecture pattern) that should 
likely be broken out into a separate service on its own. (nevertheless, this is subjective, given project requirements).

> Same is applicable for the product catalog itself.

> New rules can be easily added and configured in DB as relation to products - just create a rule, set its relation in DB and register inside the rule-loader.

> Focus is not designing proper APIs and in some cases data models are straight forward exposed in the API responses (simply not the point of this demo).

> Running expressjs web server under the hood, using hardcoded port 3000 on localhost.

## Rules

Currently the following rules are added (and showcased with some variation around them):

1. Configurations:
    - `product-exists`: checks wheather product is configured in data or not and sets base pricing
    - `product-options-ensure`: ensures product options are configured, even if not provided
2. Pricing
    - `product-options-include`: updates pricing based on options included
    - `volume-discount`: applies discount given thresshold quantity
    - `volume-purchase`: safe guards allowence of quantity purchase (this could be moved into configuration rule) and applies quantity multiplier to the price calculation
3. Validation
    - `max-quantity`: ensures max quantity limitation

## Installation

To install the dependencies, run the following command:

```bash
npm install
```

## Usage

1. Start the process

```bash
npm run start
```

2. Query the catalog for products and options `api/products` (in reality this would be way more complicated), or just a single product via `api/products/{id}`.

```bash
curl  -X GET \
  'localhost:3000/api/products/1' \
  --header 'Accept: */*' \
```

```json
{
  "id": 1,
  "name": "Laptop",
  "category": "Hardware",
  "basePrice": 1000,
  "options": [
    {
      "id": 1,
      "productId": 1,
      "name": "color",
      "value": "Black",
      "price": 0
    },
    {
      "id": 2,
      "productId": 1,
      "name": "color",
      "value": "Silver",
      "price": 0
    },
    {
      "id": 3,
      "productId": 1,
      "name": "ram",
      "value": "8GB",
      "price": 0
    },
    {
      "id": 4,
      "productId": 1,
      "name": "ram",
      "value": "16GB",
      "price": 200
    }
  ]
}
```

3. Request a quote by providing product, options and quantity

```bash
curl  -X POST \
  'localhost:3000/api/quotes' \
  --header 'Accept: */*' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "productId": 1,
  "options": [
    {
      "name": "color",
      "value": "Silver"
    },
    {
      "name": "ram",
      "value": "16GB"
    }
  ],
  "quantity": 10
}'
```

```json
{
  "product": {
    "id": 1,
    "name": "Laptop",
    "category": "Hardware",
    "basePrice": 1000,
    "options": [
      {
        "id": 2,
        "productId": 1,
        "name": "color",
        "value": "Silver",
        "price": 0
      },
      {
        "id": 4,
        "productId": 1,
        "name": "ram",
        "value": "16GB",
        "price": 200
      }
    ]
  },
  "price": {
    "unit": 1200,
    "base": 12000,
    "discounts": [
      {
        "name": "Volume Discount",
        "amount": 1200
      }
    ],
    "offering": 10800
  }
}
```