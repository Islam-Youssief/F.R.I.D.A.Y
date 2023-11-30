import flask as fl


bp = fl.Blueprint('friday', __name__)


@bp.route('/')
def index():
    return fl.render_template('index.html')


def register_blueprint(main_app):
    main_app.register_blueprint(bp, url_prefix='')
