import streamlit as st
import requests
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px

# Set page layout to wide mode
st.set_page_config(layout="wide")

# Fetch data from the FastAPI endpoint
response = requests.get("http://localhost:3000//test2")


def determine_date_format(date_str):
    # Try 'mm/dd/yyyy' format first
    # Try 'mm/dd/yyyy' format first
    try:
        pd.to_datetime(date_str, format='%m/%d/%Y')
        return '%m/%d/%Y'
    except ValueError:
        pass

    # Try 'dd/mm/yyyy' format as a fallback
    try:
        pd.to_datetime(date_str, format='%d/%m/%Y')
        return '%d/%m/%Y'
    except ValueError:
        pass

    # Try 'yyyy-mm-dd HH:mm' format as another fallback
    try:
        pd.to_datetime(date_str, format='%Y-%m-%d %H:%M')
        return '%Y-%m-%d %H:%M'
    except ValueError:
        pass

    # Try 'dd/mm/yyyy H:mm' format as another fallback
    try:
        pd.to_datetime(date_str, format='%d/%m/%Y %H:%M')
        return '%d/%m/%Y %H:%M'
    except ValueError:
        pass

    # Try 'dd/mm/yyyy H:mm' format as another fallback
    try:
        pd.to_datetime(date_str, format='%d/%m/%Y %H:%M:%S')
        return '%d/%m/%Y %H:%M:%S'
    except ValueError:
        pass

    # If none of the formats match, return None
    return None

if response.status_code == 200:
    data = response.json()
      
    
    # Assuming your data is structured as "x" and "y" columns
    if  "data" in data:
       df = pd.DataFrame(data["data"])
        # Determine the format from the first row
       first_row_format = determine_date_format(df['x'][2])
 
        # Apply the format based on the first row to the entire column
       df['x'] = pd.to_datetime(df['x'], format=first_row_format)
       # Iterate through DataFrame rows and apply format detection and conversion
       for index, row in df.iterrows():
            detected_format = determine_date_format(row['x'])
            if detected_format:
                df.at[index, 'x'] = pd.to_datetime(row['x'], format=detected_format)

    else:
        # Handle the case where no file was uploaded
        # You can raise an error, provide a default DataFrame, or take other appropriate action
         df = pd.DataFrame({'x': ['01/01/1997'], 'y': [0]} ) 
    
    # Convert "x" column to datetime
    df['x'] = pd.to_datetime(df['x'], errors='coerce', format='%d/%m/%Y', infer_datetime_format=True)


    # Convert "y" column to numeric (float)
    df['y'] = pd.to_numeric(df['y'], errors='coerce')

    # Streamlit UI
    st.title("Data Visualization")

    # Display the DataFrame
    st.write("Data from :", df)

    # Create two columns for the graphs
    col1, col2 = st.columns(2)

    # Line Chart
    with col1:
        st.subheader("Line Chart")
        fig, ax = plt.subplots()
        sns.lineplot(data=df, x='x', y='y', ax=ax)
        
        ax.set_xlabel("X-axis")
        ax.set_ylabel("Y-axis")
        st.pyplot(fig)
     
    # Bar Chart
    with col2:
        st.subheader("Bar Chart")
        fig, ax = plt.subplots()
        sns.barplot(data=df, x='x', y='y', ax=ax)

        # Rotate the x-axis labels
        ax.set_xticklabels(ax.get_xticklabels(), rotation=90)  # Adjust the rotation angle as needed
        

        ax.set_xlabel("X-axis")
        ax.set_ylabel("Y-axis")
        st.pyplot(fig)

     # Create a dynamic scatter plot with Plotly Express
    st.subheader("Dynamic Scatter Plot")
    fig = px.scatter(df, x='x', y='y', labels={'x': 'X-axis', 'y': 'Y-axis'})
    
    # Enable zooming and panning
    fig.update_xaxes(type='date', rangeslider_visible=True)
    fig.update_layout(
        autosize=True,
        width=1200,  # Adjust the width as needed
        height=600,  # Adjust the height as needed
    )
    
    # st.plotly_chart(fig)
else:
    st.error("Error fetching data ")
