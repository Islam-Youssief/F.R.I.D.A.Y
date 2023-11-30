import http

import flask as fl

import SVC.about as about


bp = fl.Blueprint('about', __name__)


@bp.route('/about', methods=['GET'])
def get_about():
    return fl.jsonify(about.to_dict()), http.HTTPStatus.OK


def register_blueprint(main_app):
    main_app.register_blueprint(bp, url_prefix='')
