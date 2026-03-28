from iodd_parser import IODDParser
import os
from dotenv import load_dotenv


parser = IODDParser()
load_dotenv()

iodd_path = os.getenv("IODD_PATH")

# Parse and resolve in one step
result = parser.parse_and_resolve(iodd_path + "Balluff-BOS21UUIRP30-20180207-IODD1.1.zip")

print(result.device_name)
print(result.device_manufacturer)

# Access resolved variables by ID
for var_id, var in result.variables.items():
    print(f"{var_id}: {var.name} (index={var.index})")

# Access resolved process data
for pd_id, pd in result.process_data.items():
    if pd.process_data_in:
        print(f"Input: {pd.process_data_in.name} ({pd.process_data_in.bit_length} bits)")

# Access resolved errors
for (code, additional_code), error in result.errors.items():
    print(f"Error {code}/{additional_code}: {error.name}")

# Access resolved units
# for unit_code, unit in result.units.items():
#     print(f"Unit {unit_code}: {unit.name} ({unit.abbreviation})")