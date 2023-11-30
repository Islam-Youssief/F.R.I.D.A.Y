import http

import flask as fl

import SVC.controllers.ai_assistant as ai


bp = fl.Blueprint('answer', __name__)


@bp.route('/answer', methods=['POST'])
def index():
    user_command = fl.request.json.get('userCommand')
    return ai.AssistantController().execute(user_command), http.HTTPStatus.OK


def register_blueprint(main_app):
    main_app.register_blueprint(bp, url_prefix='/ai')
