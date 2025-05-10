import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import MediaForm from "@/components/media/MediaForm";
import { MediaFormData } from "@/types/media";
import { createMedia } from "@/api/mediaApi";
import { INITIAL_MEDIA_FORM } from "@/lib/constants";

const NewMedia: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: MediaFormData) => {
    setIsSubmitting(true);
    
    try {
      await createMedia(data);
      toast.success("Media created successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to create media");
      console.error("Error creating media:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Media</h1>
        <p className="text-muted-foreground">
          Add a new movie or TV show to your media library
        </p>
      </div>
      
      <div className="bg-card p-6 rounded-lg border">
        <MediaForm
          initialData={INITIAL_MEDIA_FORM}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          mode="create"
        />
      </div>
    </div>
  );
};

export default NewMedia;