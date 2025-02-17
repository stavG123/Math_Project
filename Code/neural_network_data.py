import pandas as pd

# Creating the table data from the provided image
comparison_df = pd.DataFrame({
    "Training_Load": [70, 85, 100],  
    "Max_HR (BPM)": [160, 175, 190],  
    "Total_Distance": [5000, 6000, 7300],
    "Freestyle": [1000, 1200, 1400],  
    "Butterfly": [600, 800, 1000],
    "Backstroke": [400, 500, 600],
    "Breaststroke": [300, 400, 500],
    "Efficiency_Score": [5.0, 5.5, 70.00],  
    "Heart_Rate_Difference": [20, 25, 40],
    "Actual_Calories_Burned": [800, 950, 1100],
    "Predicted_Calories_Burned": [995.30756, 1197.0701, 1461.5353]
})

# Creating a DataFrame
comparison_df.to_excel("calories_comparison.xlsx", index=False)

print("Excel file 'calories_comparison.xlsx' has been created successfully!")
