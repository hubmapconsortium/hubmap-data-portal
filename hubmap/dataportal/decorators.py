from functools import wraps

from django.core.exceptions import PermissionDenied

ALLOWED_GROUPS = [
    'dataportal_admin',
    'dataportal_db_admin',
]


def user_has_view_permissions(function):
    """example code for group-based access control for the REST API calls."""
    @wraps(function)
    def wrap(request, *args, **kwargs):
        print(request)
        if hasattr(request, "user"):
            if any(
                    request.user.groups.filter(permissions__group__name__exact=group)
                    for group in ALLOWED_GROUPS
            ):
                return function(request, *args, **kwargs)
            else:
                print("user exists")
                raise PermissionDenied
        else:
            print("user does not exists", request)
            raise PermissionDenied

    return wrap
