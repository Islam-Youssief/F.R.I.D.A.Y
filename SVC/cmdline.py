"""
Command-line interface to launch app and create application object.
"""
import os

import SVC.app as application


def start_app():
    _Bootstrapper().start_app()


_HOST = '127.0.0.1'
_PORT = os.environ.get('FRIDAY_PORT', '3333') 

class _Bootstrapper(object):

    def start_app(self):
        self._create_application()
        self._run_app()



    def get_app(self):
        self._create_application()
        return self._application
    

    def _create_application(self):
        self._create_configuration()
        self._create_application_object()


    def _create_configuration(self):
        self._configuration = {}


    def _create_application_object(self):
        self._application = application.create_app(self._configuration)


    def _run_app(self):
        self._application.run(
            host=_HOST,
            port=_PORT,
            debug=self._configuration.get('DEBUG', False),
            threaded=False,
            use_reloader=False
        )
