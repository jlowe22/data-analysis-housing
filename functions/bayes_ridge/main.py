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
    
    in_data = request.get_json(silent=True)
    # need double square brackets to create shape (1, num_features)
    in_data = np.array([[in_data[col] for col in cols]])

    in_data = poly.transform(in_data)
    in_data = sds.transform(in_data)

    return str(model.predict(in_data).item())

