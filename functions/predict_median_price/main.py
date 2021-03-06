
import pickle
import numpy as np
import pandas as pd
from sklearn import linear_model

with open('saved_model.pkl','rb') as f:
    model = pickle.load(f)

def predict_median_price(request):
    zip_code = request.args.get('zip_code') or 1
    median_household_income = request.args.get('median_household_income') or 1
    uneployment = request.args.get('unemployment') or 1
    large_households = request.args.get('large_households') or 1
    median_rent = request.args.get('median_rent') or 1
    percent_transport = request.args.get('percent_transport') or 1

    print('input:',[
        zip_code,
        median_household_income,
        uneployment,
        large_households,
        median_rent,
        percent_transport
    ])

    in_data = np.array([[
        zip_code,
        median_household_income,
        uneployment,
        large_households,
        median_rent,
        percent_transport
        ]]).astype(np.float64)

    return str(model.predict(in_data).item())