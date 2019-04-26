from django.http import HttpResponse


def export_to_csv(request):
    other_fields = [ 'genes', 'proteins', 'preview_image','read_count_total','cell_count',
                      'total_read_count', 'read_count_aligned', 'unique_barcode_count', ]
    from hiveportal.dataportal.models import Study
    study_model = Study
    meta = study_model._meta
    field_names = [field.name for field in meta.fields]
    for field in other_fields:
        field_names.append(field)
    response = HttpResponse(content_type="text/csv")
    response['Content-Distribution'] = 'attachment; filename=studies.csv'.format(meta)
    writer = csv.writer(response)

    writer.writerow(field_names)
    for study in study_model.objects.all().select_subclasses():
        row = writer.writerow([get_attribute(study, field) for field in field_names])

    #print(response.__getattribute__('Content-Distribution'))
    return response