import 'dotenv/config';

const API_url = process.env.IODD_URL

const product_IDs = ["VVB302",
"OGD551",
"TA2115",
"PL1514",
"DV2310"]

console.log(product_IDs);

product_IDs.forEach(id => {
    console.log(id);
})
const params = new URLSearchParams();
params.append("productId", product_IDs[0]);
console.log(API_url + "drivers?" + params);

const data = await fetch(API_url + "drivers?" + params);
const output = await data.json();

console.log(output.content[0]);