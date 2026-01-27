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