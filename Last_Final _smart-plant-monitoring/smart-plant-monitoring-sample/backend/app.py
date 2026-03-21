from flask import Flask
from flask_cors import CORS
from routes.sensor_routes import sensor_bp

app = Flask(__name__)
# Enable CORS for all routes and all origins more explicitly
CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(sensor_bp, url_prefix='/api')

@app.route('/')
def home():
    print("Health check requested")
    return {'message': 'Backend running'}

if __name__ == '__main__':
    app.run(debug=True)
