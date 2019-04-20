import flask
import pytest

import main


# Create a fake "app" for generating test request contexts.
@pytest.fixture(scope="module")
def app():
    app = flask.Flask(__name__)
    app.config['TESTING'] = True
    return app


def test_predict_bayes_reg(app):
    with app.test_request_context(json={
        'LotArea': 8450,
        'OverallQual': 7,
        'OverallCond': 5,
        'MasVnrArea': 196,
        'BsmtFinSF1': 706,
        'BsmtUnfSF': 150,
        '1stFlrSF': 856,
        '2ndFlrSF': 854,
        'BsmtFullBath': 1,
        'BedroomAbvGr': 3,
        'KitchenAbvGr': 1,
        'TotRmsAbvGrd': 8,
        'Fire2laces': 0,
        'GarageYrBlt': 2003,
        'GarageCars': 2,
        'WoodDeckSF': 0,
        'ScreenPorch': 0
    }):
        res = main.predict_bayes_reg(flask.request)
        assert type(res) is str
        print('res: ', float(res))  