from iodd_parser import IODDParser
import os
from dotenv import load_dotenv
from pprint import pprint
from dataclasses import asdict

from iodd_parser.types import ResolvedDatatype, ResolvedRecordT, ResolvedVariable


parser = IODDParser()
load_dotenv()

iodd_path = os.getenv('IODD_PATH')

sensor1 = "Balluff-BOSR254KUUIPR10-ADSS-20210628-IODD1.1.zip"
sensor2 = "Balluff-BOS21UUIRP30-20180207-IODD1.1.zip"

# Parse and resolve in one step
result = parser.parse_and_resolve(iodd_path + sensor2)

print(result.device_name)
print(result.device_manufacturer)

vars_by_index = {v.index: v for v in result.variables.values()}


def get_variable_info(var):

    info = {
        "name": var.name,
        "id": var.id,
        "values": []
    }

    # Helper zum Extrahieren von SingleValues
    def extract_values(datatype):
        return [{"val": sv.value, "text": sv.name} for sv in getattr(datatype, 'single_values', [])]

    if hasattr(var.datatype, 'items'):  # Es ist ein Record
        for item in var.datatype.items:
            info["values"].append({
                "subindex": item.subindex,
                "name": item.name,
                "mappings": extract_values(item.datatype)
            })
    else:  # Einfacher Datentyp
        info["values"].append({
            "subindex": 0,
            "name": var.name,
            "mappings": extract_values(var.datatype)
        })
        
    return info

# Testlauf für Index 187
for key, value in vars_by_index.items():
    print(f"The details of Index {key} for {value.name}:\n")
    pprint(get_variable_info(value))
    print("--------------------------------------------------------")



