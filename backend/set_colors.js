import { get_ports } from "./wakeup.js";



// console.log(port_data);

// interval has to be min. 500!!!

setInterval(async ()=> 
    {
        try {
            const port_data = await get_ports();   
            console.log(port_data[1].processInputs);
        }
        catch (e) {
            console.log("Diesmal zu langsam: " + e.message);
        }
    }, 500);