import pandas as pd  # type: ignore
import matplotlib.pyplot as plt  # type: ignore
import seaborn as sns  # type: ignore
from sklearn.model_selection import train_test_split  # type: ignore
from sklearn.tree import DecisionTreeRegressor, plot_tree  # type: ignore
from sklearn.metrics import mean_squared_error, r2_score  # type: ignore
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error  # type: ignore
import numpy as np # type: ignore
import matplotlib.pyplot as plt # type: ignore
from scipy import stats # type: ignoreimport matplotlib.pyplot as plt
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import train_test_split
#import pdb; pdb.set_trace()

# Load the Excel file
file_path = "../Excel/Data_Excel.xlsx"
data = pd.read_excel(file_path)


# Read the three tables
swimmers_df = pd.read_excel(file_path, sheet_name="Swimmer_ID")
performance_df = pd.read_excel(file_path, sheet_name="Bridge_table")
practice_df = pd.read_excel(
    file_path, sheet_name="PracticeDate", usecols=["Practice_ID", "Date"]
)

# Merge the data
merged_df = pd.merge(performance_df, swimmers_df, on="Swimmer_ID")
full_df = pd.merge(merged_df, practice_df, on="Practice_ID")



# See all data
# print("Columns in full_df:", full_df.columns)

# Load and Prepare
X = full_df[["Training_Load", "Max_HR (BPM)", "Calories_Burned"]]  
Y = full_df[["Total_Distance"]]

# split the data
X_train, X_test, y_train, y_test = train_test_split(
    X, Y, test_size=0.2, random_state=42
)

# Create and Train the Model:
model = LinearRegression()
model.fit(X_train, y_train)

# Make Predictions
predictions = model.predict(X_test) 
# Evaluate the Model:
mse = mean_squared_error(y_test, predictions)
# Mean Squared Error, This value represents the average squared difference between your predicted and actual
print(f"Mean Squared Error: {mse}")

rmse = np.sqrt(mse)  # Replace with your actual MSE
rmse_2dots = "{:.2f}".format(rmse)
print(f"Root Mean Squared Error (RMSE): {rmse_2dots} Yards for around 7000 yards")


y_test_flat = y_test.values.flatten()
predictions_flat = predictions.flatten()

# Perform linear regression
slope, intercept, r, p, std_err = stats.linregress(y_test_flat, predictions_flat)

# Define regression line function
def myfunc(x):
    return slope * x + intercept

mymodel = list(map(myfunc, y_test_flat))

# Scatter plot
plt.figure(figsize=(8, 5))
plt.scatter(y_test_flat, predictions_flat, alpha=0.7, edgecolors='k')
plt.plot(y_test_flat, mymodel, color='red',linestyle="--", label="Perfect Fit")

# Labels
plt.xlabel("Actual Total Distance", color='blue')
plt.ylabel("Predicted Total Distance", color='red')
plt.title("Actual vs. Predicted Total Distance")

# Show plot
plt.show()
breakpoint()
#################################################################################################
X = full_df[[
    "Training_Load", "Max_HR (BPM)", "Calories_Burned", 
    "Freestyle", "Butterfly", "Backstroke", "Breaststroke"
]]

# Target variable
Y = full_df[["Total_Distance"]]

X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

# Train a new model with additional features
model = LinearRegression()
model.fit(X_train, y_train)

# Make new predictions
predictions = model.predict(X_test)

# Evaluate model performance
mse = mean_squared_error(y_test, predictions)
rmse = np.sqrt(mse)

# Print new results
print(f"Updated Mean Squared Error: {mse}")
print(f"Updated Root Mean Squared Error (RMSE): {rmse:.2f} Yards for around 7000 yards")

# Plot actual vs predicted values with separate labels
plt.figure(figsize=(8, 6))
plt.scatter(y_test, predictions, alpha=0.7, label="Predicted vs Actual")
plt.plot(y_test, y_test, color="red", linestyle="--", label="Perfect Fit")
plt.xlabel("Actual Total Distance")
plt.ylabel("Predicted Total Distance")
plt.title("Actual vs Predicted Total Distance (Updated Model)")
plt.legend()
plt.show()

#############################################################################################


# Add new efficiency features
full_df["Efficiency_Score"] = full_df["Total_Distance"] / full_df["Total_Time"]
full_df["Heart_Rate_Difference"] = full_df["Max_HR (BPM)"] - full_df["Average_HR (BPM)"]

# Update feature selection to include efficiency metrics
X = full_df[[
    "Training_Load", "Max_HR (BPM)", "Calories_Burned", 
    "Freestyle", "Butterfly", "Backstroke", "Breaststroke",
    "Efficiency_Score", "Heart_Rate_Difference"
]]

# Target variable
Y = full_df[["Total_Distance"]]

# Split the data again
X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

# Train the updated model
model = LinearRegression()
model.fit(X_train, y_train)

# Make new predictions
predictions = model.predict(X_test)

# Evaluate new model performance
mse = mean_squared_error(y_test, predictions)
rmse = np.sqrt(mse)

# Print new results
print(f"Updated Mean Squared Error: {mse}")
print(f"Updated Root Mean Squared Error (RMSE): {rmse:.2f} Yards for around 7000 yards")

plt.figure(figsize=(8, 6))
plt.scatter(y_test, predictions, alpha=0.7, label="Predicted vs Actual")
plt.plot(y_test, y_test, color="red", linestyle="--", label="Perfect Fit")
plt.xlabel("Actual Total Distance")
plt.ylabel("Predicted Total Distance")
plt.title("Actual vs Predicted Total Distance (Most Updated Model)")
plt.legend()
plt.show()

##############################################################################################################



# RMSE values before and after improvements
rmse_values = [330.74, 260.95, 246.58]
labels = ["Baseline Model 95.92% accuracy ", "Added Strokes 96.3% accuracy", "Added Efficiency Metrics 96.48% accuracy "]

# Create a bar chart for RMSE reduction
plt.figure(figsize=(9, 10))
plt.bar(labels, rmse_values, color=['red', 'orange', 'green'], alpha=0.7)
plt.xlabel("Model Improvements")
plt.ylabel("Root Mean Squared Error (RMSE)")
plt.title("RMSE Comparison Across Model Improvements")
plt.ylim(200, 350)  # Keep y-axis within a readable range
plt.show()
#####################################################################################################

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
predicted_distances = model.predict(training_plans)

# Add predictions to the DataFrame
training_plans["Predicted_Total_Distance"] = predicted_distances

# Display the optimized training strategies
print(training_plans)





#####################################################################################################








