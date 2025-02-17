import pandas as pd  # type: ignore
import matplotlib.pyplot as plt  # type: ignore
import seaborn as sns  # type: ignore
from sklearn.model_selection import train_test_split  # type: ignore
from sklearn.tree import DecisionTreeRegressor, plot_tree  # type: ignore
from sklearn.metrics import mean_squared_error, r2_score  # type: ignore

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

# Convert 'Date' column to datetime format for proper visualization
full_df["Date"] = pd.to_datetime(full_df["Date"])

# Check if "Total_Distance" column exists
if "Total_Distance" in full_df.columns:
    # Plot Total Distance over Date
    plt.figure(figsize=(10, 5))

    # The sign of the the graph
    plt.plot(full_df["Date"], full_df["Total_Distance"], marker="o")

    # Formatting the graph
    plt.xlabel("Date")
    plt.ylabel("Total Distance (yards)")
    plt.title("Total Swim Distance Over Time")
    plt.xticks(rotation=45)  # Rotate x-axis labels for better visibility
    # plt.grid(True)
    # Show the plot
    plt.show()


# Scatter plot: Age vs. Total Distance
plt.figure(figsize=(10, 6))
plt.scatter(full_df["Age"], full_df["Total_Distance"], c="blue")
plt.xlabel("Age")
plt.ylabel("Total Distance (Yards)")
plt.title("Impact of Age on Swimming Distance")
plt.grid(True)
# plt.show()

# Calculate the Average Distance per Age Group
age_distance_avg = full_df.groupby("Age")["Total_Distance"].mean()
# print(age_distance_avg)

"""
Check Correlation Between Age and Total Distance
Close to +1: Strong positive correlation (older swimmers tend to swim longer distances).
Close to -1: Strong negative correlation (older swimmers tend to swim shorter distances).
Close to 0: No significant correlation.
"""

correlation_matrix = full_df[["Age", "Total_Distance"]].corr()

# Create a heatmap
plt.figure(figsize=(6, 4))
sns.heatmap(
    correlation_matrix,
    annot=True,
    cmap="coolwarm",
    fmt=".2f",
    linewidths=1,
    vmin=-1,
    vmax=1,
)

# Formatting the chart
plt.title("Correlation between Age and Total Distance")
# plt.show()
# Create a heatmap with other metrcies
plt.figure(figsize=(10, 6))
correlation_matrix = full_df[[
    "Age", "Total_Time", "Total_Distance", "Calories_Burned", 
    "Splash_Score", "Training_Load", "Average_HR (BPM)", "Max_HR (BPM)"
]].corr()

sns.heatmap(correlation_matrix, annot=True, cmap="coolwarm", fmt=".2f", linewidths=0.5)
plt.title("Correlation Heatmap of Performance Metrics")
plt.show()
