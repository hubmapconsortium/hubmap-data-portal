from rest_framework import serializers
from rest_framework.serializers import ListSerializer

from .models import *
#TODO : add create and update and delete, put for all serializers
# (all update/add/delete requests for scripts to write metadata to models)
#TODO: add tests for django restframework

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

class GeneSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'hugo_symbol',
            'entrez_id',
            'ensembl_id',
        )
        read_only_fields = (
            'id',
            'hugo_symbol',
            'entrez_id',
            'ensembl_id',
        )
        model = Gene
        depth = 3

class ProteinSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
            'gene',
            'pdb_id',
        )
        read_only_fields = (
            'id',
            'name',
            'pdb_id',
            'gene',
        )
        expandable_fields = {'genes' : (GeneSerializer, {'hugo_symbol', 'entrez_id', 'ensembl_id'})}
        model = Protein
        depth = 3

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
        depth = 3

        def to_internal_value(self, data):
            if data.get('subclass') == "ScRnaSeqStudyCDNASerializer":
                self.Meta.model = ScRnaSeqStudyCDNA
                return ScRnaSeqStudyCDNASerializer(context=self.context).to_internal_value(data)
            elif data.get('subclass') == "ScRnaSeqStudyCDNASerializer":
                self.Meta.model = ScRnaSeqStudyBarcoded
                return ScRnaSeqStudyBarcodedSerializer(context=self.context).to_internal_value(data)

            else :
                self.Meta.model = Study
            return super(Study, self).to_internal_value(data)


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
        depth = 3

    def create(self, validated_data):
        scrna_study = ScRnaSeqStudyCDNA.objects.create(**validated_data)
        return scrna_study

class ScRnaSeqStudyBarcodedSerializer(StudySerializer):
    StudySerializer(many=True)
    genes = GeneSerializer(many=True, read_only=True)
    class Meta(StudySerializer.Meta):
        fields = StudySerializer.Meta.fields + (
            'unique_barcode_count',
            'genes',
            'read_count_total',
            'cell_count',
        )
        read_only_fields = StudySerializer.Meta.read_only_fields + (
            'unique_barcode_count',
            'genes',
        )
        expandable_fields = {'genes' : (GeneSerializer, {'hugo_symbol', 'entrez_id', 'ensembl_id'})}
        write_only_fields = (
            'unique_barcode_count',
            'read_count_total',
            'cell_count',)
        model = ScRnaSeqStudyBarcoded

    def create(self, validated_data):
        scrna_seq_barcoded = ScRnaSeqStudyBarcoded.objects.create(**validated_data)
        scrna_seq_barcoded.save()
        return scrna_seq_barcoded

class ScAtacSeqStudySerializer(StudySerializer):
    StudySerializer(many=True)
    class Meta(StudySerializer.Meta):
        fields = StudySerializer.Meta.fields + (
            'read_count_total',
            'cell_count',
        )
        read_only_fields = StudySerializer.Meta.read_only_fields
        write_only_fields = (
            'read_count_total',
            'cell_count',)
        model = ScAtacSeqStudy

    def create(self, validated_data):
        sc_atac = ScAtacSeqStudy.objects.create(**validated_data)
        sc_atac.save()
        return sc_atac

class SpatialTranscriptomicStudySerializer(StudySerializer):
    genes = GeneSerializer(many=True, read_only=True)
    class Meta(StudySerializer.Meta):
        #list_serializer_class = StudyListSerializer
        fields = StudySerializer.Meta.fields + (
            'genes',
        )
        expandable_fields = {'genes' : (GeneSerializer, {'hugo_symbol', 'entrez_id', 'ensembl_id'})}
        read_only_fields = StudySerializer.Meta.read_only_fields +(
            'genes',
        )
        write_only_fields = ('')
        model = SpatialTranscriptomicStudy

    def create(self, validated_data):
        spatial_transcrptomic = SpatialTranscriptomicStudy.objects.create(**validated_data)
        spatial_transcrptomic.save()
        return spatial_transcrptomic

class MassCytometryStudySerializer(StudySerializer):
    proteins = ProteinSerializer(many=True, read_only=True)
    class Meta(StudySerializer.Meta):
        fields = StudySerializer.Meta.fields + (
            'proteins',
            'preview_image',
        )
        read_only_fields = StudySerializer.Meta.read_only_fields + (
            'proteins',
        )
        expandable_fields = {'proteins' : (GeneSerializer, {'id','name','pdb_id','gene',})}
        model = MassCytometryStudy
        depth = 3

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

    def create(self, validated_data):
        microscopy = MicroscopyStudy.objects.create(**validated_data)
        microscopy.save()
        return microscopy

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

    def create(self, validated_data):
        seq_fish_imaging = SeqFishImagingStudy.objects.create(**validated_data)
        seq_fish_imaging.save()
        return seq_fish_imaging

class StudyListSerializer(serializers.ModelSerializer):
    scrna_atac = ScAtacSeqStudySerializer()
    scrna_cdna = ScRnaSeqStudyCDNASerializer()
    scrna_barcoded = ScRnaSeqStudyBarcodedSerializer()
    spatial = SpatialTranscriptomicStudySerializer()
    masscytometry = MassCytometryStudySerializer()
    microscopy = MicroscopyStudySerializer

    class Meta:
        model = Study
        fields = '__all__'
            #{'study', 'scrna_atac', 'scrna_cdna', 'scrna_barcoded', 'spatial', 'masscytometry', 'microscopy'}
