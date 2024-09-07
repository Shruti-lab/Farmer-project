# pip install pandas
# pip install matplotlib
# pip install tensorflow
# pip install scikit-learn

import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('model_data.csv')

# drop the rows where Production is NaN
df = df.dropna(subset=['Production'])

# drop place column
df = df.drop("Place", axis=1)

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Embedding
from tensorflow.keras.utils import to_categorical

# Preprocess the data
label_encoder = LabelEncoder()
df['Season'] = label_encoder.fit_transform(df['Season'])
df['Soil_Type'] = label_encoder.fit_transform(df['Soil_Type'])

# Separate features and target variable
X = df[['Relative_humidity', 'Surface_net_solar_radiation', 'Temperature', 'Total_precipitation', 'Soil_Type', 'Season']]
y = df['Production']

# Standardize numerical features
scaler = StandardScaler()
X[['Relative_humidity', 'Surface_net_solar_radiation', 'Temperature', 'Total_precipitation']] = scaler.fit_transform(X[['Relative_humidity', 'Surface_net_solar_radiation', 'Temperature', 'Total_precipitation']])

# Convert categorical features to one-hot encoding
X = pd.get_dummies(X, columns=['Soil_Type', 'Season'])

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

X_train = X_train.astype('float32')
X_test = X_test.astype('float32')
y_train = y_train.astype('float32')
y_test = y_test.astype('float32')


# Build the CNN model
model = Sequential()
model.add(Dense(64, activation='relu', input_shape=(X_train.shape[1],)))
model.add(Dense(32, activation='relu'))
model.add(Dense(1, activation='linear'))

# Compile the model
model.compile(optimizer='adam', loss='mean_squared_error')

# Train the model
model.fit(X_train, y_train, epochs=10, batch_size=32, validation_data=(X_test, y_test))

# Evaluate the model
loss = model.evaluate(X_test, y_test)
print(f"Mean Squared Error on Test Set: {loss}")

# Make predictions
predictions = model.predict(X_test)

# make predictions data type as y_test
predictions = predictions.flatten()

# Calculate the RMSE score
rmse = np.sqrt(loss)
print(f"RMSE: {rmse}")

# Calculate the MAPE score
mape = np.mean(np.abs((y_test - predictions) / y_test)) * 100
print(f"MAPE: {mape}%")

# plot the predictions and actual values
plt.scatter(y_test, predictions)
plt.xlabel('Actual Production')
plt.ylabel('Predicted Production')
plt.title('Actual Production vs Predicted Production')
plt.show()

