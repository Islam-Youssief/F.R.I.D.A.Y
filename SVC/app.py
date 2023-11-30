"""
Main application module.
"""
import logging
import os.path

from flask import Flask, request

import SVC.api.about as about
import SVC.api.index as index


_blueprints = [
    about,
    index
]


class Application(Flask):
    def __init__(self, config, **kwargs):
        super().__init__(__name__, **kwargs)
        self.config.from_mapping(config)
        self.service_config = config
        self._initialize_service_directories()
        self._register_application_handlers()


    def _initialize_service_directories(self):
        this_dir = os.path.abspath(os.path.dirname(__file__))
        self.service_root = this_dir
        self.working_dir = os.getcwd()


    def _register_application_handlers(self):
        self.before_request(before_request)
        self.after_request(after_request)


def create_app(config):
    app = Application(config)
    for bp in _blueprints:
        bp.register_blueprint(app)
    return app


def before_request():
    logging.info(f'{request.method} - {request.url}')


def after_request(response):
    logging.info(response.status)
    return response
