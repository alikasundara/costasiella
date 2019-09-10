from collections import namedtuple
from graphql_relay.node.node import from_global_id

from .messages import Messages

m = Messages()

# Auth
def require_login(user):
    if user.is_anonymous:
        raise Exception(m.user_not_logged_in)

def require_permission(user, permission):
    if not user.has_perm(permission):
        raise Exception(m.user_permission_denied)

def require_login_and_permission(user, permission):
    require_login(user)
    require_permission(user, permission)

def require_login_and_one_of_permissions(user, permissions):
    require_login(user)
    
    has_permission = False
    for p in permissions:
        if user.has_perm(p):
            has_permission = True
            break

    if not has_permission:
        raise Exception(m.user_permission_denied)


# To convert relay node id to real id
def get_rid(global_id):
    Rid = namedtuple('Rid', 'name id')
    return Rid(*from_global_id(global_id))


# Get file from base64 string
def get_content_file_from_base64_str(data_str, name=None):
    """
    Convert base64 encoded file to Django ContentFile
    """
    import base64
    from django.core.files.base import ContentFile

    _format, _file_str = data_str.split(';base64,')
    _name, ext = _format.split('/')

    if not name:
        name = _name.split(":")[-1]

    return ContentFile(base64.b64decode(_file_str), name='{}.{}'.format(name, ext))
