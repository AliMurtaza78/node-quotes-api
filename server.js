const express = require("express");
const app = express();

const quotes = require("./quotes.json");

const middleware = express.json()
app.use(middleware)

const middlewareTest = function(request,response,next){
  console.log("heyyyyyyyyyy you a request")
  next()
}
const middlewareMainEndPoint = function(request,response,next){
  console.log("heyyyyyyyyyy you a request for a Main End Point")
  next()
}

app.use(middlewareTest)
app.use(middlewareMainEndPoint)

app.get('/', middlewareMainEndPoint,function(request, response) {
  response.send('/quotes/17 should return one quote, by id')
});

app.get("/quotes", function(request, response){
  response.json(quotes);
});

function notValidRequest(quote) {
  return quote.id == undefined ||
  quote.author == undefined || 
  quote.body == undefined
}
app.post('/quotes', function(request, response) {
  const quote = request.body

  if (notValidRequest(quote)) {
    return response.status(400).send({success: false})
  }

  quotes.push(quote)
  response.status(201).send({success: true})
})

function notValidRequest(quote) {
  return quote.id == undefined ||
  quote.author == undefined || 
  quote.body == undefined
}

app.put('/quotes/:id', function(request, response) {
  const id = request.params.id  
  const quoteUpdated = {
    id: parseInt(id),
    author: request.body.author,
    quote: request.body.quote
  }
  const quotesFiltered = quotes.filter(function (quote) {
      return quote.id != id
  })
  quotesFiltered.push(quoteUpdated)
  quotes = quotesFiltered

  response.send({success: true})
})

app.delete('/quotes/:id', function(request, response) {
  const id = request.params.id
  const quotesFiltered = quotes.filter(function (quote) {
    return quote.id != id
  })
  quotes = quotesFiltered

  response.send({success: true})
})

app.listen(3000, () => console.log("Listening on port 3000"));