import { get_ports, get_port_details } from "./wakeup.js";
import { datahexToDecimal, transform_range } from "./parse.js";


get_port_details();

// console.log(port_data);

// interval has to be min. 500!!!

setInterval(async ()=> 
    {
        try {
            const port_data = await get_ports();
            const sensor_value = port_data[1].processInputs;
            const decimal = datahexToDecimal(sensor_value, 0, 2, false);
            console.log(decimal/10 + "mm");


        }
        catch (e) {
            console.log("Diesmal zu langsam: " + e.message);
        }
    }, 2000);


