# middleware/timeout.py
from flask import current_app
import signal

class TimeoutException(Exception):
    pass

def timeout_handler(signum, frame):
    raise TimeoutException()

def init_timeout_middleware(app):
    @app.before_request
    def before_request():
        signal.signal(signal.SIGALRM, timeout_handler)
        signal.alarm(300)  # 5 minutos

    @app.teardown_request
    def teardown_request(exception=None):
        signal.alarm(0)

    @app.errorhandler(TimeoutException)
    def handle_timeout_exception(error):
        return {'error': 'Request timeout'}, 504