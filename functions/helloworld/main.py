from flask import escape

def helloworld(request):
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
        <http://flask.pocoo.org/docs/1.0/api/#flask.Request>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>.
    """
    request_json = request.get_json()
    print(request_json)
    if request_json and 'name' in request_json:
        name = request_json['name']
    else:
        name = 'World'
    return 'Hello,c {}, from Convergent!\n'.format(name)

def function(request):
    return 'Hello from function. :('