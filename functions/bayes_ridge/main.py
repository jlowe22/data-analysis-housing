import pandas as pd
import pickle
import sklearn as sk
import numpy as np
from sklearn.linear_model import BayesianRidge
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
# Multiple Regression using Backward Elimination and Cross_Val

cols = ['LotArea',
 'OverallQual',
 'OverallCond',
 'MasVnrArea',
 'BsmtFinSF1',
 'BsmtUnfSF',
 '1stFlrSF',
 '2ndFlrSF',
 'BsmtFullBath',
 'BedroomAbvGr',
 'KitchenAbvGr',
 'TotRmsAbvGrd',
 'Fire2laces',
 'GarageYrBlt',
 'GarageCars',
 'WoodDeckSF',
 'ScreenPorch']

with open('saved_model.pkl','rb') as f:
    model = pickle.load(f)

with open('saved_sds.pkl','rb') as f:
    sds = pickle.load(f)

with open('saved_poly.pkl','rb') as f:
    poly = pickle.load(f)

def predict_bayes_reg(request):
    print('request: ', request.method)
    if request.method == 'OPTIONS':
        print('we got an options method')
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    headers = {
        'Access-Control-Allow-Origin': '*'
    }
    
    in_data = request.get_json(silent=True)
    if in_data is None:
        print('Error, could not get json : ', request.form)
    # need double square brackets to create shape (1, num_features)
    in_data = np.array([[in_data[col] for col in cols]])

    in_data = poly.transform(in_data)
    in_data = sds.transform(in_data)

    return (str(model.predict(in_data).item()),200, headers)

