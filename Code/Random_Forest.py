import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score

# Load the Excel file
file_path = "../Excel/Data_Excel.xlsx"
data = pd.read_excel(file_path)

# Read the three tables
swimmers_df = pd.read_excel(file_path, sheet_name="Swimmer_ID")
performance_df = pd.read_excel(file_path, sheet_name="Bridge_table")
practice_df = pd.read_excel(file_path, sheet_name="PracticeDate", usecols=["Practice_ID", "Date"])

# Merge the data
merged_df = pd.merge(performance_df, swimmers_df, on="Swimmer_ID")
full_df = pd.merge(merged_df, practice_df, on="Practice_ID")

# Add new efficiency features
full_df["Efficiency_Score"] = full_df["Total_Distance"] / full_df["Total_Time"]
full_df["Heart_Rate_Difference"] = full_df["Max_HR (BPM)"] - full_df["Average_HR (BPM)"]

# Select features and target variable
X = full_df[[
    "Training_Load", "Max_HR (BPM)", "Calories_Burned", 
    "Freestyle", "Butterfly", "Backstroke", "Breaststroke", 
    "Efficiency_Score", "Heart_Rate_Difference"
]]
Y = full_df[["Total_Distance"]]

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

# Create and train the Random Forest model
rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train.values.ravel())  # ravel() flattens y_train

# Make predictions
predictions = rf_model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, predictions)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, predictions)

print(f"Random Forest Mean Squared Error: {mse:.2f}")
print(f"Random Forest Root Mean Squared Error (RMSE): {rmse:.2f} Yards")
print(f"Random Forest R-squared Score: {r2:.4f}")

# Plot actual vs predicted values
plt.figure(figsize=(8, 6))
plt.scatter(y_test, predictions, alpha=0.7, label="Predicted vs Actual")
plt.plot(y_test, y_test, color="red", linestyle="--", label="Perfect Fit")
plt.xlabel("Actual Total Distance")
plt.ylabel("Predicted Total Distance")
plt.title("Actual vs Predicted Total Distance (Random Forest Model)")
plt.legend()
plt.show()


# New swimmer details
training_plans = pd.DataFrame({
    "Training_Load": [25, 30, 27],  
    "Max_HR (BPM)": [160, 175, 190],  
    "Calories_Burned": [800, 950, 1100],  
    "Freestyle": [1000, 1200, 1400],  
    "Butterfly": [600, 800, 1000],
    "Backstroke": [400, 500, 600],
    "Breaststroke": [300, 400, 500],
    "Efficiency_Score": [5.0, 5.5, 70.00],  
    "Heart_Rate_Difference": [20, 25, 30]  
})


# Ensure column names match those used in training
training_plans = training_plans[X.columns]  

# Predict total distance for different training strategies
predicted_distances = rf_model.predict(training_plans)

# Add predictions to the DataFrame
training_plans["Predicted_Total_Distance"] = predicted_distances

# Display the optimized training strategies
print(training_plans)
