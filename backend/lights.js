import { get_hex } from "./parse.js";

const master_url = "http://192.168.0.19/TMG.htm";

// causes runlight in red
const original = 'UDP_Packet=0a.00.02.03.00.40.00.00.01.02'

// changes the color when lights on port 0 and in level mode - last to bytes are value


export async function switch_on(val) {
    const message1 = 'UDP_Packet=07.00.02.0b.00.' + val
    try{
        const options = {
            method: 'POST',
            body: message1,
        }
        const resp = await fetch(master_url, options);
    }
    catch(e){
        console.log("Switching didn't work: " + e.message);
    }
}

switch_on("00.00");