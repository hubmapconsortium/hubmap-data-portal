#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
$DIR/../manage.py loadtestdata dataportal.Gene:15 dataportal.Protein:10 dataportal.Institution:5 dataportal.DataType:5 dataportal.Tissue:5 dataportal.ScThsSeqStudy:10 dataportal.ScAtacSeqStudy:10 dataportal.ScRnaSeqStudyCDNA:10 dataportal.ScRnaSeqStudyBarcoded:10 dataportal.SpatialTranscriptomicStudy:10 dataportal.MassCytometryStudy:10 dataportal.SeqFishImagingStudy:10 dataportal.MicroscopyStudy:10
