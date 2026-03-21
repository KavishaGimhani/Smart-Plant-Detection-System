from flask import Blueprint, request, jsonify
from datetime import datetime
from firebase_config import initialize_firebase, get_db_ref

sensor_bp = Blueprint('sensor_bp', __name__)

# Initialize Firebase
firebase_ready = initialize_firebase()

@sensor_bp.route('/sensor-data', methods=['POST'])
def post_data():
    print("Received POST data:", request.json)
    if not firebase_ready:
        print("ERROR: Firebase not initialized in POST")
        return jsonify({'error': 'Firebase not initialized. Check serviceAccountKey.json'}), 500
    
    try:
        data = request.json
        data['timestamp'] = datetime.utcnow().isoformat()
        
        db_ref = get_db_ref()
        db_ref.push(data)
        print("Successfully stored data in Firebase")
        return jsonify({'message': 'stored in Firebase'})
    except Exception as e:
        print(f"CRASH in POST: {str(e)}")
        return jsonify({'error': str(e)}), 500

@sensor_bp.route('/sensor-data', methods=['GET'])
def get_data():
    print("GET request received for sensor data")
    if not firebase_ready:
        print("ERROR: Firebase not initialized in GET")
        return jsonify({'error': 'Firebase not initialized'}), 500

    try:
        db_ref = get_db_ref()
        data_snapshot = db_ref.get()

        if not data_snapshot:
            print("No data found in Firebase")
            return jsonify([])

        # The 'plant' node is a single flat object with live sensor values
        # e.g. {"temperature": 31.7, "humidity": 64.2, "soil": 3029, "ldr": 0}
        # Map field names to match what the frontend expects
        if isinstance(data_snapshot, dict):
            # Check if it's a single live reading (flat fields like temperature, humidity)
            if 'temperature' in data_snapshot or 'humidity' in data_snapshot:
                mapped = {
                    'air_temperature': data_snapshot.get('temperature'),
                    'air_humidity':    data_snapshot.get('humidity'),
                    'soil_moisture':   data_snapshot.get('soil'),
                    'ldr_light':       data_snapshot.get('ldr'),
                    'soil_temperature': data_snapshot.get('soil_temperature'),
                    'timestamp':       data_snapshot.get('timestamp', datetime.utcnow().isoformat())
                }
                result = [mapped]
            else:
                # It's a dict of entries keyed by push ID
                result = []
                for key, value in data_snapshot.items():
                    if isinstance(value, dict):
                        # Map field names if needed
                        entry = {
                            'air_temperature': value.get('air_temperature') or value.get('temperature'),
                            'air_humidity':    value.get('air_humidity') or value.get('humidity'),
                            'soil_moisture':   value.get('soil_moisture') or value.get('soil'),
                            'ldr_light':       value.get('ldr_light') or value.get('ldr'),
                            'soil_temperature': value.get('soil_temperature'),
                            'timestamp':       value.get('timestamp', '')
                        }
                        result.append(entry)
                result = result[-20:]  # Last 20 entries
        else:
            result = []

        print(f"Successfully retrieved {len(result)} entries")
        return jsonify(result)
    except Exception as e:
        print(f"CRASH in GET: {str(e)}")
        return jsonify({'error': str(e)}), 500

