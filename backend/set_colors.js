import { get_ports, get_port_details } from "./wakeup.js";
import { datahexToDecimal, transform_range, get_hex } from "./parse.js";
import { switch_on } from "./lights.js";


get_port_details();

// console.log(port_data);

// interval has to be min. 500!!!

setInterval(async ()=> 
    {
        try {
            const port_data = await get_ports();
            const sensor_value = port_data[1].processInputs;
            const decimal = datahexToDecimal(sensor_value, 0, 2, false);
            const val = get_hex(sensor_value,0,2,true);
            console.log(val);
            console.log(decimal/10 + "mm");
            await switch_on(val);
        }
        catch (e) {
            console.log("Diesmal zu langsam: " + e.message);
        }
    }, 1000);


