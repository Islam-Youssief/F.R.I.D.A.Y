import http

import flask as fl

import SVC.controllers.ai_drawer as drawer


bp = fl.Blueprint('draw', __name__)


@bp.route('/draw', methods=['POST'])
def index():
    user_command = fl.request.json.get('userCommand')
    return drawer.DrawerController().draw(user_command), http.HTTPStatus.OK


def register_blueprint(main_app):
    main_app.register_blueprint(bp, url_prefix='/ai')
