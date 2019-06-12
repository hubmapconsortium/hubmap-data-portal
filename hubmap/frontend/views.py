from django.shortcuts import render
import matplotlib.cm
import numpy as np
import pandas as pd

def rgba_float_to_rgb_hex(floats):
    return '#' + ''.join('{:02x}'.format(int(c * 255)) for c in floats[:3])

def tissue_svg(request):
    # These match the Django template fields in `human_body.svg`
    organs = [
        'stomach',
        'liver',
        'lung',
        'small_intestine',
        'heart',
        'bladder',
        'large_intestine',
        'kidney',
    ]

    vec = pd.Series(np.random.random(len(organs)), index=organs)
    hex_values = {
        f'{tissue}_color': rgba_float_to_rgb_hex(matplotlib.cm.viridis(expr))
        for tissue, expr in vec.items()
    }
    return render(
        request,
        'human_body.svg',
        hex_values,
        content_type='image/svg+xml',
    )