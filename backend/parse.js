export function datahexToDecimal(hexStr, startIndex, length, littleEndian = true) {
    // split hex-data from sensor and transform to an array
    const bytes = hexStr.split(' ');

    // select the desired bytes (as specified)
    const selectedBytes = bytes.slice(startIndex, startIndex + length);

    // little endian is default for sensors
    if (littleEndian) {
        selectedBytes.reverse();
    }

    // make a string again
    const hexValue = selectedBytes.join('');
    
    // use built-in function to calculate the decimal value
    return parseInt(hexValue, 16);
}

export function transform_range(value, output_lower, output_upper, value_upper, value_lower = 0 ){
    return ((((value - value_lower)/(value_upper-value_lower))*(output_upper-output_lower))+ output_lower)
}


export function get_hex(hexStr, startIndex, length, littleEndian = true){
    // split hex-data from sensor and transform to an array
    const bytes = hexStr.split(' ');

    // select the desired bytes (as specified)
    const selectedBytes = bytes.slice(startIndex, startIndex + length);

    // little endian is default for sensors
    if (littleEndian) {
        selectedBytes.reverse();
    }

    // make a string again
    const hexValue = selectedBytes.join('.');
    
    // use built-in function to calculate the decimal value
    return hexValue;
}


export function dec_to_hex(dec){
    // convert to hex
    const hex = dec.toString(16);
    // padding for full hex, e.g. 0x1 --> 0x0001
    const full_hex = hex.padStart(4,'0').toUpperCase();
    // split hex into 2 values (first and second byte)
    const hex_01 = full_hex.substring(0,2);
    const hex_02 = full_hex.substring(2,4);
    // convert to string:
    const result = hex_01 + '.' + hex_02;
    return result;
}

//dec_to_hex(250);