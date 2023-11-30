"""
"""

project = 'F.R.I.D.A.Y'
package = 'friday'
description = 'Virtual Assistant'
author = 'Islam Youssief'
copyright = f'2023 {author}'
release = '1.0'
version = f'{release}.0'

classifiers = [
    'Programming Language :: Python :: 3.11',
    'Framework :: Flask',
]

def to_dict(**_ignore):
    return {
        'project': project,
        'package': package,
        'description': description,
        'author': author,
        'copyright': copyright,
        'release': release,
        'version': version,
    }
