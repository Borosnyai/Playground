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
        // console.log(resp);
    }
    catch(e){
        console.log(e.message);
    }
}

// get the info from all active ports

async function get_ports() {
    try{
        const resp = await fetch(ports_url);
        const resp_string = await resp.json();
        const all_ports = resp_string.ports;
        const active_ports = all_ports.filter( port => port.productId != '');
        console.log("Folgende Sensoren sind angeschlossen:")
        active_ports.forEach(element => {
            console.log(element.productText + " mit ProductId " + element.productId)
        });
    }
    catch(e){
        console.log(e);
    }
}

//wakeup('02');
get_ports();