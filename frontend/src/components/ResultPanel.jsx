import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { AlertCircle, CheckCircle2, Clock, Activity, Tag, AlertTriangle } from 'lucide-react';
import { formatDateTime, formatPercentage, formatDuration } from '../utils/format';
import OverlayLegend from './OverlayLegend';
import DownloadReportButton from './DownloadReportButton';

const ResultPanel = ({ result, slideName }) => {
  const getConfidenceBadge = (confidence) => {
    // Normalize confidence to 0-100 scale
    const normalizedConfidence = confidence > 1 ? confidence : confidence * 100;
    
    if (normalizedConfidence >= 90) return <Badge className="bg-green-500 text-white">High Confidence</Badge>;
    if (normalizedConfidence >= 75) return <Badge className="bg-yellow-400 text-black">Moderate Confidence</Badge>;
    return <Badge className="bg-red-500 text-white">Low Confidence</Badge>;
  };

  const getCategoryBadge = (category) => {
    if (category === "Malignant") {
      return <Badge className="bg-red-500 text-white">Malignant</Badge>;
    }
    return <Badge className="bg-green-500 text-white">Benign</Badge>;
  };

  return (
    <div className="space-y-4">
      <Card className="p-6 shadow-lg">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{result.diagnosis}</h2>
            <div className="flex gap-2">
              {getCategoryBadge(result.category)}
              {getConfidenceBadge(result.confidence)}
            </div>
          </div>
          <DownloadReportButton result={result} slideName={slideName} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Confidence Score</span>
              <span className="text-sm font-bold">{formatPercentage(result.confidence)}</span>
            </div>
            <Progress 
              value={result.confidence > 1 ? result.confidence : result.confidence * 100} 
              className={`h-2 ${result.category === "Malignant" ? "bg-red-100" : "bg-green-100"}`}
            />
          </div>

          <div className="flex items-center gap-2">
            <AlertCircle className={`h-5 w-5 ${result.category === "Malignant" ? "text-red-500" : "text-yellow-500"}`} />
            <div>
              <p className="text-sm font-medium">Severity Level</p>
              <p className="text-2xl font-bold">{result.abnormalitiesDetected}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-purple-500" />
            <div>
              <p className="text-gray-500">Detected Class</p>
              <p className="font-medium">{result.predictedClassName}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 text-sm">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-gray-500">Analysis Status</p>
                <p className="font-medium">{result.cached ? "Cached Result" : "Fresh Analysis"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-gray-500">Processing Time</p>
                <p className="font-medium">{formatDuration(result.processingTime)}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-gray-500">Analysis Date</p>
              <p className="font-medium">{formatDateTime(result.timestamp)}</p>
            </div>
          </div>
        </div>
      </Card>

      <OverlayLegend regions={result.regions} />

      <Card className="p-6 bg-gray-50">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
          <div>
            <h3 className="mb-2 font-semibold">Clinical Notes</h3>
            <p className="text-sm text-gray-500 mb-2">
              This AI analysis is provided as a diagnostic aid. Results should be reviewed
              by qualified medical professionals. The confidence score indicates the model's
              certainty in its analysis based on the provided tissue sample.
            </p>
            <p className="text-sm text-gray-500">
              <strong>Detected Class:</strong> {result.predictedClassName} - 
              This classification is based on a machine learning model trained on histopathological images.
              {result.category === "Malignant" && 
                " The malignant classification suggests further investigation is strongly recommended."}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResultPanel;
// Note: This component assumes you have a ResultContext that provides the current result and slide name.