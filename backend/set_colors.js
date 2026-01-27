import { get_ports, get_port_details } from "./wakeup.js";
import { datahexToDecimal, transform_range, get_hex, dec_to_hex } from "./parse.js";
import { switch_on } from "./lights.js";


//get_port_details();

// console.log(port_data);

// interval has to be min. 500!!!

async function val_to_light() 
    {
        try {
            const port_data = await get_ports();
            const sensor_value = port_data[1].processInputs;
            // first two bytes are the measured distance - parse to decimal:
            const decimal = datahexToDecimal(sensor_value, 0, 2, false);
            // the light takes 2 bytes as input - the maximum value from distance sensor is 6500
            // thus: value * 10
            const val = dec_to_hex(decimal * 10);
            console.log(val);
            console.log(decimal/10 + "mm");
            await switch_on(val);
        }
        catch (e) {
            console.log("Diesmal zu langsam: " + e.message);
        }
        finally {
            // waits for async functions, then short timeout
            setTimeout(val_to_light, 100);
        }
    }

val_to_light();
