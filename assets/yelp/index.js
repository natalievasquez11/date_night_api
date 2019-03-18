const yelp = require('yelp-fusion');

const apiKey = 'eri9vNYtpqnxVyACCuwfLQ6pSIpb-PHjCCjnycIaBuC3s5nlCemmGO6KnLDKsMNuBIEqdXh9aAbkxcRO_2scAffCW0cLf-AJfqfNY83KppdZW7L7Sh1V8eYYvz9bW3Yx';

exports.handler = (event, context, callback) => {
const searchRequest = {
    term: 'restaurants',
    price: event.budget,
    radius: 30000,
    limit: 6,
    location: event.zipCode
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    console.log(firstResult);
    callback(null, {"statusCode": 200, "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}, "body": response.jsonBody.businesses});
}).catch(e => {
    console.log(e);
});
};