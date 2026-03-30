import 'dotenv/config';
import { writeFile } from 'node:fs/promises';

const API_url = process.env.IODD_URL
const api_key = process.env.IODD_FINDER_KEY

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

// getting iodd-zip:
const vendorId = output.content[0].vendorId
const ioddId = output.content[0].ioddId
const zip = await fetch(API_url + `vendors/${vendorId}/iodds/${ioddId}/files/zip`, {headers:{
    'X-API-KEY': api_key,
    }
});

console.log(zip.headers)

const filename = zip.headers.get('content-disposition')?.split('filename=')[1] || 'download.zip';

await writeFile(filename, zip.body);

console.log(API_url + `vendors/${vendorId}/iodds/${ioddId}/files/zip`);

console.log(output.content[0]);