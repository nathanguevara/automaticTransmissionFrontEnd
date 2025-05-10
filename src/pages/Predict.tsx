import React, { useState } from "react";
import { toast } from "sonner";
import PredictForm from "@/components/predict/PredictForm";
import PredictResult from "@/components/predict/PredictResult";
import { PredictionData, PredictionResult } from "@/types/media";
import { submitPrediction } from "@/api/predictApi";
import { Brain } from "lucide-react";

const Predict: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleSubmit = async (data: PredictionData) => {
    setIsSubmitting(true);
    
    try {
      const result = await submitPrediction(data);
      setResult(result);
      toast.success("Prediction completed successfully");
    } catch (error) {
      toast.error("Failed to process prediction");
      console.error("Error submitting prediction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Brain className="h-8 w-8" />
          Content Prediction
        </h1>
        <p className="text-muted-foreground">
          Use our AI model to predict content type based on metadata
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Input Parameters</h2>
          <PredictForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
        
        <div className="space-y-6">
          {result ? (
            <PredictResult result={result} />
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center h-full bg-card border rounded-lg">
              <Brain className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">No prediction data</h2>
              <p className="text-muted-foreground">
                Fill out the form and run a prediction to see results here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Predict;