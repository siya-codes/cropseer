from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Initialize the Flask application
app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Load and preprocess the dataset
df = pd.read_csv('Crop_recommendation.csv')

# Label Encoding
encoder = LabelEncoder()
df['label'] = encoder.fit_transform(df['label'])

# Splitting to x and y
x = df.drop(['label'], axis=1)
y = df['label']

# Splitting into training and testing data
xtrain, xtest, ytrain, ytest = train_test_split(x, y, test_size=0.3, random_state=21)

# Train the Random Forest model
model_rf = RandomForestClassifier(random_state=42)
model_rf.fit(xtrain, ytrain)

@app.route('/')
def home():
    return "Welcome to the Crop Recommendation API!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the data from the POST request
        data = request.get_json()
        
        # Extract features from the JSON
        N = data['N']
        P = data['P']
        K = data['K']
        temperature = data['temperature']
        humidity = data['humidity']
        ph = data['ph']
        rainfall = data['rainfall']
        
        # Create a numpy array for the input data
        input_data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
        
        # Make prediction using the trained model
        prediction = model_rf.predict(input_data)
        predicted_crop = encoder.inverse_transform(prediction)
        
        # Return the prediction as a JSON response
        return jsonify({'predicted_crop': predicted_crop[0]})
    
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
