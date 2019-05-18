from rest_framework import serializers
from .models import *

class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
        )
        read_only_fields = (
            'id',
            'name',
        )
        model = Institution

class TissueSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
        )
        read_only_fields = (
            'id',
            'name',
        )
        model = Tissue

class DataTypeSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
        )
        read_only_fields = (
            'id',
            'name',
        )
        model = DataType

class StudySerializer(serializers.ModelSerializer):

    class Meta:
        fields = (
            'id',
            'subclass',
            'institution',
            'data_type',
            'tissue',
            'creation_time',
        )
        read_only_fields = (
            'id',
            'subclass',
            'data_type',
            'creation_time',
        )
        write_only_fields = (
            'tissue',
            'institution',)
        model = Study
        depth = 1

        def to_internal_value(self, data):
            if data.get('subclass') == "ScRnaSeqStudyCDNASerializer":
                self.Meta.model = ScRnaSeqStudyCDNA
                return ScRnaSeqStudyCDNASerializer(context=self.context).to_internal_value(data)
            elif data.get('subclass') == "ScRnaSeqStudyCDNASerializer":
                self.Meta.model = ScRnaSeqStudyBarcoded
                return ScRnaSeqStudyBarcodedSerializer(context=self.context).to_internal_value(data)

            self.Meta.model = Study
            return super(Study, self).to_internal.value(data)


class ScRnaSeqStudyCDNASerializer(StudySerializer):
    class Meta(StudySerializer.Meta):
        fields = StudySerializer.Meta.fields + (
            'read_count_aligned',
            'read_count_total',
            'cell_count',
        )
        read_only_fields = StudySerializer.Meta.read_only_fields + (
        )
        write_only_fields = (
            'read_count_aligned',
            'read_count_total',
            'cell_count',)
        model = ScRnaSeqStudyCDNA

    def create(self, validated_data):
        scrna_study = ScRnaSeqStudyCDNA.objects.create(**validated_data)
        return scrna_study

class ScRnaSeqStudyBarcodedSerializer(StudySerializer):
    class Meta(StudySerializer.Meta):
        fields = StudySerializer.Meta.fields + (
            'read_count_aligned',
            'unique_barcode_count',
            'genes',
            'read_count_total',
            'cell_count',
        )
        read_only_fields = StudySerializer.Meta.read_only_fields + (
            'unique_barcode_count',
            'genes',
        )
        write_only_fields = (
            'read_count_aligned',
            'unique_barcode_count',
            'read_count_total',
            'cell_count',)
        model = ScRnaSeqStudyBarcoded

class SpatialTranscriptomicStudySerializer(StudySerializer):
    class Meta(StudySerializer.Meta):
        fields = StudySerializer.Meta.fields + (
            'genes',
        )
        read_only_fields = StudySerializer.Meta.read_only_fields +(
            'genes',
        )
        write_only_fields = ('')
        model = SpatialTranscriptomicStudy

class MassCytometryStudySerializer(StudySerializer):
    class Meta(StudySerializer.Meta):
        fields = StudySerializer.Meta.fields + (
            'proteins',
            'preview_image',
        )
        read_only_fields = StudySerializer.Meta.read_only_fields + (
            'proteins',
        )
        write_only_fields = ('preview_image', )
        model = MassCytometryStudy

    def create(self, validated_data):
        mass_cytometry_study = MassCytometryStudy.objects.create(**validated_data)
        mass_cytometry_study.save()
        return mass_cytometry_study

class MicroscopyStudySerializer(StudySerializer):
    class Meta(StudySerializer.Meta):
        fields = StudySerializer.Meta.fields + (
            'image_count',
            'preview_image',
        )
        read_only_fields = StudySerializer.Meta.read_only_fields + (
            'image_count',
        )
        write_only_fields = ('preview_image', )
        model = MicroscopyStudy

class SeqFishImagingStudySerializer(StudySerializer):
    class Meta(StudySerializer.Meta):
        fields = StudySerializer.Meta.fields + (
            'image_count',
            'preview_image',
        )
        read_only_fields = StudySerializer.Meta.read_only_fields + (
            'image_count',
        )
        write_only_fields = ('preview_image', )
        model = SeqFishImagingStudy