import flask
import pytest

import main


# Create a fake "app" for generating test request contexts.
@pytest.fixture(scope="module")
def app():
    app = flask.Flask(__name__)
    app.config['TESTING'] = True
    return app


def test_hello_get(app):
    with app.test_request_context():
        res = main.hello_get(flask.request)
        assert type(float(res)) == 'float'




request_json
