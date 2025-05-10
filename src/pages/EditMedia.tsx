import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import MediaForm from "@/components/media/MediaForm";
import { Media, MediaFormData } from "@/types/media";
import { getMediaById, updateMedia } from "@/api/mediaApi";
import { Skeleton } from "@/components/ui/skeleton";

const EditMedia: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [media, setMedia] = useState<Media | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        if (!id) return;
        const data = await getMediaById(parseInt(id));
        setMedia(data);
      } catch (error) {
        toast.error("Failed to fetch media data");
        console.error("Error fetching media:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMedia();
  }, [id]);
  
  const handleSubmit = async (data: MediaFormData) => {
    if (!id) return;
    
    setIsSubmitting(true);
    try {
      await updateMedia(parseInt(id), data);
      toast.success("Media updated successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update media");
      console.error("Error updating media:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-4 w-full" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!media) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Media not found</h2>
        <p className="text-muted-foreground mt-2">
          The media you are looking for does not exist or has been deleted.
        </p>
      </div>
    );
  }
  
  const { id: mediaId, created_at, updated_at, ...formData } = media;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Media</h1>
        <p className="text-muted-foreground">
          Update the details for {media.title}
        </p>
      </div>
      
      <div className="bg-card p-6 rounded-lg border">
        <MediaForm
          initialData={formData}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          mode="edit"
        />
      </div>
    </div>
  );
};

export default EditMedia;