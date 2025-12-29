const API_URL = 'http://your-iolink-master-api/sensors';

async function fetchSensorData() {
    const response = await fetch(API_URL);
    const data = await response.json();
    displaySensors(data);
}

function displaySensors(sensors) {
    const container = document.getElementById('sensorCards');
    container.innerHTML = '';
    
    sensors.forEach(sensor => {
        container.innerHTML += `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${sensor.name}</h5>
                        <p class="card-text">Value: ${sensor.value}</p>
                        <p class="card-text">Unit: ${sensor.unit}</p>
                    </div>
                </div>
            </div>
        `;
    });
}

fetchSensorData();
setInterval(fetchSensorData, 5000);