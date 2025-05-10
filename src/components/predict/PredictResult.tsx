import React from "react";
import { PredictionResult } from "@/types/media";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Brain, Clock } from "lucide-react";

interface PredictResultProps {
  result: PredictionResult;
}

const PredictResult: React.FC<PredictResultProps> = ({ result }) => {
  // Prepare data for chart
  const chartData = [
    {
      name: result.prediction,
      value: result.confidence * 100,
    },
    ...(result.alternatives
      ? result.alternatives.map((alt) => ({
          name: alt.prediction,
          value: alt.confidence * 100,
        }))
      : []),
  ].sort((a, b) => b.value - a.value);

  // Format the confidence as percentage
  const formatConfidence = (confidence: number) => {
    return `${(confidence * 100).toFixed(1)}%`;
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Brain className="h-6 w-6" />
              Prediction Result
            </CardTitle>
            {result.processing_time && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {result.processing_time.toFixed(2)}s
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted p-6 mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">PREDICTED CONTENT TYPE</h3>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="text-4xl font-bold">
                {result.prediction}
              </div>
              <div className="flex flex-col gap-1 min-w-48">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Confidence</span>
                  <span className="text-sm font-medium">{formatConfidence(result.confidence)}</span>
                </div>
                <Progress value={result.confidence * 100} className="h-2" />
              </div>
            </div>
          </div>

          {result.alternatives && result.alternatives.length > 0 && (
            <>
              <Separator className="my-6" />
              
              <div>
                <h3 className="text-lg font-medium mb-4">Alternative Predictions</h3>
                <div className="space-y-4">
                  {result.alternatives.map((alt, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{alt.prediction}</span>
                      <div className="flex flex-col gap-1 w-48">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Confidence</span>
                          <span className="text-xs">{formatConfidence(alt.confidence)}</span>
                        </div>
                        <Progress value={alt.confidence * 100} className="h-1.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="text-lg font-medium mb-4">Prediction Comparison</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical">
                      <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                      <YAxis type="category" dataKey="name" width={80} />
                      <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Confidence']} />
                      <Bar 
                        dataKey="value" 
                        radius={[0, 4, 4, 0]}
                        className="fill-primary" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictResult;