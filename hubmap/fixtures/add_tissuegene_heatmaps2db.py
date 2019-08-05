import matplotlib.cm

from dataportal.models import *


def rgba_float_to_rgb_hex(floats):
    return '#' + ''.join('{:02x}'.format(int(c * 255)) for c in floats[:3])


def setcolorheatmap(hugo_symbol, cd5l):
    tissue_colors = {
        f'{name}_color': rgba_float_to_rgb_hex(matplotlib.cm.viridis(expr))
        for name, expr in cd5l.items()
    }
    tem = TissueExpressionHeatmap(**tissue_colors)
    tem.save()
    print(tem)
    geneObj = Gene.objects.get_or_create(hugo_symbol=hugo_symbol)[0]
    geneObj.tissue_expression_heatmap = tem
    geneObj.save()

    print(tissue_colors)


LRRN4 = {
    'pancreas': 0.3,
    'abdomen': 0.02,
    'liver': 0.1,
    'lung': 1,
    'smallIntestine': 0,
    'heart': 0.2,
    'bladder': 0.07,
    'largeIntestine': 0.1,
    'kidney': 0.4,
    'spleen': 0.02,
}
setcolorheatmap('LRRN4', LRRN4)
