import { Card } from '../components/ui/card';

const OverlayLegend = ({ regions }) => {
  return (
    <Card className="p-4 space-y-3">
      <h4 className="font-semibold text-sm text-muted-foreground">Detected Regions</h4>
      <div className="space-y-2">
        {regions.map((region) => (
          <div key={region.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: region.color }}
              />
              <span className="text-sm">{region.type}</span>
            </div>
            <span className="text-sm font-medium">{region.confidence > 1 ? region.confidence.toFixed(1) : (region.confidence * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default OverlayLegend;
