const master_url = "http://192.168.0.19/TMG.htm";
const ports_url = "http://192.168.0.19/ports.jsn"

// wakes up the port (starting with index 0) of the master

async function wakeup(port) {
    try{
        const options = {
            method: 'POST',
            body: `UDP_Packet=24.00.02.0F.${port}.00.0C.11.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.00.20.20`,
        }
        const resp = await fetch(master_url, options);
    }
    catch(e){
        console.log("Wakeup didn't work: " + e.message);
    }
}

// get the info from all active ports

export async function get_ports() {
    try{
        const resp = await fetch(ports_url);
        const resp_string = await resp.json();
        const all_ports = resp_string.ports;
        const active_ports = all_ports.filter( port => port.productId != '');

        // the following 4 lines just for control purposes (uncomment if necessary)

        // console.log(`Folgende ${active_ports.length} Sensoren sind angeschlossen:`)
        // active_ports.forEach(element => {
        //     console.log(element.productText + " mit ProductId " + element.productId)
        // });
        return active_ports;
    }
    catch(e){
        console.log("Didn't get any ports: " + e.message);
    }
}

const sensor_count = 2;

async function init_master(ports){ 
    for (let i = 0; i<= sensor_count; i++){
        await wakeup(i.toString());
    };
    await get_ports();
}



