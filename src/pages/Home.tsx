import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, Film, RefreshCw } from "lucide-react";
import MediaTable from "@/components/media/MediaTable";
import { Media } from "@/types/media";
import { getAllMedia, deleteMedia } from "@/api/mediaApi";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const Home: React.FC = () => {
  const [mediaData, setMediaData] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMedia = async () => {
    try {
      const data = await getAllMedia();
      setMediaData(data);
    } catch (error) {
      toast.error("Failed to fetch media data");
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchMedia();
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMedia(id);
      setMediaData(mediaData.filter(item => item.id !== id));
      toast.success("Media deleted successfully");
    } catch (error) {
      toast.error("Failed to delete media");
      console.error("Error deleting media:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground">
            View, edit, and manage your media collection
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleRefresh}
            disabled={refreshing}
            className="h-9 w-9"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh</span>
          </Button>
          <Link to="/new">
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>Add Media</span>
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="rounded-md border">
            <div className="p-4">
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : mediaData.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <Film className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">No media found</h2>
          <p className="text-muted-foreground mb-4">
            Your media library is empty. Add some media to get started.
          </p>
          <Link to="/new">
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>Add Your First Media</span>
            </Button>
          </Link>
        </div>
      ) : (
        <MediaTable media={mediaData} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Home;