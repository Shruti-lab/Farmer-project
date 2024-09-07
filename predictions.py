import numpy as np
import tensorflow as tf

# Load the saved model
model = tf.keras.models.load_model("potato_production_model.h5")

# Example user input
humidity = 50.0
solar_radiation = 200.0
temperature = 25.0
precipitation = 23
soil_type1 = 0
soil_type2 = 1
soil_type3 = 0
soil_type4 = 0
soil_type5 = 0
season1 = 0 
season2 = 1
season3 = 0
season4 = 0
season5 = 0


# Preprocess input (if needed)
new_data = np.array([[humidity, solar_radiation, temperature, precipitation, soil_type1, soil_type2, soil_type3, soil_type4, soil_type5, season1, season2, season3, season4, season5]])  # Reshape for the model

# Make prediction
prediction = model.predict(new_data)[0][0]  # Assuming single output value

# Print prediction
print("Predicted crop production:", prediction)
