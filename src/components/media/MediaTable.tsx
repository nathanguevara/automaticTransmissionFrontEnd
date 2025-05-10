import React, { useState } from "react";
import { Media } from "@/types/media";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  ChevronUp, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Star, 
  Search, 
  Film, 
  Tv
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface MediaTableProps {
  media: Media[];
  onDelete: (id: number) => void;
}

type SortField = 'title' | 'type' | 'release_year' | 'imdb_rating';
type SortOrder = 'asc' | 'desc';

const MediaTable: React.FC<MediaTableProps> = ({ media, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>('title');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  
  // Filtering
  const filteredMedia = media.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.release_year.toString().includes(searchTerm) ||
      item.genres.some(genre => 
        genre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  // Sorting
  const sortedMedia = [...filteredMedia].sort((a, b) => {
    // Handle null values
    if (a[sortField] === null || a[sortField] === undefined) return 1;
    if (b[sortField] === null || b[sortField] === undefined) return -1;
    
    let comparison = 0;
    
    if (sortField === 'title' || sortField === 'type') {
      comparison = String(a[sortField]).localeCompare(String(b[sortField]));
    } else {
      comparison = Number(a[sortField]) - Number(b[sortField]);
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? 
      <ChevronUp className="ml-1 h-4 w-4" /> : 
      <ChevronDown className="ml-1 h-4 w-4" />;
  };

  const renderRating = (rating?: number) => {
    if (!rating) return "N/A";
    
    return (
      <div className="flex items-center space-x-1">
        <Star className="h-4 w-4 text-yellow-500" />
        <span>{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search media..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      {sortedMedia.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="w-[300px] cursor-pointer"
                  onClick={() => handleSort('title')}
                >
                  <div className="flex items-center">
                    Title
                    {getSortIcon('title')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('type')}
                >
                  <div className="flex items-center">
                    Type
                    {getSortIcon('type')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('release_year')}
                >
                  <div className="flex items-center">
                    Year
                    {getSortIcon('release_year')}
                  </div>
                </TableHead>
                <TableHead>Genres</TableHead>
                <TableHead 
                  className="cursor-pointer text-right"
                  onClick={() => handleSort('imdb_rating')}
                >
                  <div className="flex items-center justify-end">
                    Rating
                    {getSortIcon('imdb_rating')}
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedMedia.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    {item.type === 'movie' ? (
                      <div className="flex items-center gap-1">
                        <Film className="h-4 w-4" />
                        <span>Movie</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Tv className="h-4 w-4" />
                        <span>TV Show</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{item.release_year}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {item.genres.slice(0, 2).map((genre, index) => (
                        <Badge key={index} variant="secondary">
                          {genre}
                        </Badge>
                      ))}
                      {item.genres.length > 2 && (
                        <Badge variant="outline">+{item.genres.length - 2}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {renderRating(item.imdb_rating)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link to={`/edit/${item.id}`}>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete 
                                <span className="font-semibold"> {item.title} </span> 
                                from the database.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => onDelete(item.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg">
          <Film className="h-10 w-10 text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium">No media found</h3>
          <p className="text-sm text-muted-foreground">
            {searchTerm ? 
              "Try adjusting your search query" : 
              "Add some media to get started"
            }
          </p>
          {!searchTerm && (
            <Link to="/new">
              <Button className="mt-4">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Media
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default MediaTable;