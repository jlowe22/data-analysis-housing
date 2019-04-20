import flask
import pytest

import main


# Create a fake "app" for generating test request contexts.
@pytest.fixture(scope="module")
def app():
    app = flask.Flask(__name__)
    app.config['TESTING'] = True
    return app


def test_predict_median_price(app):
    with app.test_request_context(query_string={
        'zip_code': '78705',
        'median_household_income': '75958',
        'unemployment': '6',
        'large_households': '6',
        'median_rent': '1012',
        'percent_transport': '33'
    }):
        res = main.predict_median_price(flask.request)
        assert type(res.item()) is float
        print('res: ',type(res.item()))  