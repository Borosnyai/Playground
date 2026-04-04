from fastapi import FastAPI, HTTPException
from iodd_parser import IODDParser
import os
from dotenv import load_dotenv
from pathlib import Path

app = FastAPI()

env_path = Path(__file__).resolve().parent / ".env"

load_dotenv(env_path)

IODD_PATH = os.getenv("IODD_PATH")
parser = IODDParser()


def extract_variable(var):
    info = {
        "name": var.name,
        "index": var.index,
        "values": []
    }

    def extract_values(datatype):
        return [
            {"val": sv.value, "text": sv.name}
            for sv in getattr(datatype, "single_values", [])
        ]

    if hasattr(var.datatype, "items"):
        for item in var.datatype.items:
            info["values"].append({
                "subindex": item.subindex,
                "name": item.name,
                "mappings": extract_values(item.datatype)
            })
    else:
        info["values"].append({
            "subindex": 0,
            "name": var.name,
            "mappings": extract_values(var.datatype)
        })

    return info


@app.get("/iodd/{sensor_file}")
def get_iodd(sensor_file: str):
    if not IODD_PATH:
        raise HTTPException(status_code=500, detail="IODD_PATH is missing in .env")

    full_path = os.path.join(IODD_PATH, sensor_file)

    if not os.path.isfile(full_path):
        raise HTTPException(status_code=404, detail=f"File not found: {full_path}")

    try:
        result = parser.parse_and_resolve(full_path)

        output = []

        for var in result.variables.values():
            if var.index is not None:
                output.append(extract_variable(var))

        return output

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))