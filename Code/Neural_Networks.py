import tensorflow as tf
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error


# Load the Excel file
file_path = "../Excel/Data_Excel.xlsx"

# Read the three tables
swimmers_df = pd.read_excel(file_path, sheet_name="Swimmer_ID")
performance_df = pd.read_excel(file_path, sheet_name="Bridge_table")
practice_df = pd.read_excel(
    file_path, sheet_name="PracticeDate", usecols=["Practice_ID", "Date"]
)

# Merge the data
merged_df = pd.merge(performance_df, swimmers_df, on="Swimmer_ID")
full_df = pd.merge(merged_df, practice_df, on="Practice_ID")

# Feature Engineering
full_df["Efficiency_Score"] = full_df["Total_Distance"] / (
    full_df["Total_Time"] + 1e-6
)  # Avoid division by zero
full_df["Heart_Rate_Difference"] = full_df["Max_HR (BPM)"] - full_df["Average_HR (BPM)"]

# Select Features and Target Variable
X = full_df[
    [
        "Training_Load",
        "Max_HR (BPM)",
        "Total_Distance",
        "Freestyle",
        "Butterfly",
        "Backstroke",
        "Breaststroke",
        "Efficiency_Score",
        "Heart_Rate_Difference",
    ]
]

Y = full_df[["Calories_Burned"]]

# Normalize the Data convert 0 and 1
scaler_X = MinMaxScaler()
X_scaled = scaler_X.fit_transform(X)

scaler_Y = MinMaxScaler()
Y_scaled = scaler_Y.fit_transform(Y)

# Define a Proper Regression Neural Network Model
model = tf.keras.Sequential(
    [
        tf.keras.layers.Dense(
            128, activation="relu", input_shape=(X.shape[1],)
        ),  # Input layer
        tf.keras.layers.Dense(64, activation="relu"),  # Hidden layer
        tf.keras.layers.Dense(
            1, activation="linear"
        ),  # Output layer with linear activation for regression
    ]
)

# Compile the Model with MSE Loss
model.compile(
    optimizer="adam", loss="mean_squared_error", metrics=["mae"]
)  # Correct loss function for regression

# Train the Model
model.fit(X_scaled, Y_scaled, epochs=1, batch_size=16, verbose=1)

# Make Predictions
predictions_scaled = model.predict(X_scaled)

# Convert Predictions Back to Original Scale
predictions = scaler_Y.inverse_transform(predictions_scaled)

# Print First 10 Predictions
print("\nPredicted Calories Burned:")
print(predictions[:10])

print("\nThe actual values:")
print(Y[:10])
# actual_values = np.array([800, 950, 1100])
new_input = pd.DataFrame(
    {
        "Training_Load": [70, 85, 100],
        "Max_HR (BPM)": [160, 175, 190],
        "Total_Distance": [5000, 6000, 7300],
        "Freestyle": [1000, 1200, 1400],
        "Butterfly": [600, 800, 1000],
        "Backstroke": [400, 500, 600],
        "Breaststroke": [300, 400, 500],
        "Efficiency_Score": [5.0, 5.5, 70.00],
        "Heart_Rate_Difference": [20, 25, 40],
    }
)

# "Calories_Burned": [800, 950, 1100],
# Normalize the new input using the same scaler fitted on X
new_input_scaled = scaler_X.transform(new_input)

# Predict Calories Burned for the new input
predicted_calories_scaled = model.predict(new_input_scaled)

# Convert prediction back to original scale
predicted_calories = scaler_Y.inverse_transform(predicted_calories_scaled)

print(predicted_calories)
# Print the predicted Calories Burned

mse = mean_squared_error(Y, predictions)  # Compare actual vs predicted Calories_Burned
rmse = np.sqrt(mse)  # Compute RMSE

# Print the results
print(f"\nMean Squared Error (MSE): {mse:.2f}")
print(f"Root Mean Squared Error (RMSE): {rmse:.2f}")

print("github check")
print("github check2")


