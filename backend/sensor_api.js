import 'dotenv/config';

const master_ip = process.env.MASTER_IP;

const get_data = {
    "code": "request",
    "cid": 4711,
    "adr": "/iolinkmaster/port[1]/iolinkdevice/iolreadacyclic",
    "data": { "index": 187, "subindex": 0 }
}

const send_data = {
    "code": "request",
    "cid": 4711,
    "adr": "/iolinkmaster/port[1]/iolinkdevice/iolwriteacyclic",
    "data": { "index": 187, "subindex": 0, "value": "04" }
}

let resp = await fetch(master_ip, {
    method: "POST",
    body: JSON.stringify(get_data)
});



let output = await resp.json();
console.log(`Der Wert beträgt ${output.data.value}.`);

resp = await fetch(master_ip, {
    method: "POST",
    body: JSON.stringify(send_data)
});

resp = await fetch(master_ip, {
    method: "POST",
    body: JSON.stringify(get_data)
});

output = await resp.json();
console.log(`Der Wert beträgt jetzt ${output.data.value}.`);