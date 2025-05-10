import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PredictionData } from "@/types/media";
import { GENRES, LANGUAGES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { X, Check, ChevronsUpDown, Brain } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface PredictFormProps {
  onSubmit: (data: PredictionData) => void;
  isSubmitting: boolean;
}

// Define the form validation schema
const formSchema = z.object({
  hash: z.string().min(1, "Hash is required"),
  release_year: z
    .number()
    .int()
    .min(1900, "Year must be 1900 or later")
    .max(new Date().getFullYear() + 5, "Year cannot be more than 5 years in the future"),
  genres: z.array(z.string()).min(1, "Select at least one genre"),
  languages: z.array(z.string()).min(1, "Select at least one language"),
  metascore: z.number().min(0).max(100).optional().nullable(),
  rt_score: z.number().min(0).max(100).optional().nullable(),
  imdb_rating: z.number().min(0).max(10).optional().nullable(),
  imdb_votes: z.number().min(0).optional().nullable(),
});

const PredictForm: React.FC<PredictFormProps> = ({
  onSubmit,
  isSubmitting,
}) => {
  const form = useForm<PredictionData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hash: "",
      release_year: new Date().getFullYear(),
      genres: [],
      languages: [],
      metascore: undefined,
      rt_score: undefined,
      imdb_rating: undefined,
      imdb_votes: undefined,
    },
  });

  const handleFormSubmit = (data: PredictionData) => {
    onSubmit(data);
  };

  const generateRandomHash = () => {
    const chars = "abcdef0123456789";
    let hash = "";
    for (let i = 0; i < 10; i++) {
      hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    form.setValue("hash", hash);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="hash"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Hash</FormLabel>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Input placeholder="Enter content hash" {...field} />
                  </FormControl>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={generateRandomHash}
                  >
                    Generate
                  </Button>
                </div>
                <FormDescription>
                  A unique content identifier
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="release_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Release Year</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1900}
                    max={new Date().getFullYear() + 5}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="hidden md:block">
            {/* Spacer for grid alignment */}
          </div>

          <FormField
            control={form.control}
            name="genres"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genres</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value.length && "text-muted-foreground"
                        )}
                      >
                        {field.value.length > 0
                          ? `${field.value.length} selected`
                          : "Select genres"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search genres..." />
                      <CommandList>
                        <CommandEmpty>No genres found.</CommandEmpty>
                        <CommandGroup>
                          {GENRES.map((genre) => {
                            const isSelected = field.value.includes(genre);
                            return (
                              <CommandItem
                                key={genre}
                                onSelect={() => {
                                  if (isSelected) {
                                    form.setValue(
                                      "genres",
                                      field.value.filter((value) => value !== genre)
                                    );
                                  } else {
                                    form.setValue(
                                      "genres",
                                      [...field.value, genre]
                                    );
                                  }
                                }}
                              >
                                <div
                                  className={cn(
                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                    isSelected
                                      ? "bg-primary text-primary-foreground"
                                      : "opacity-50 [&_svg]:invisible"
                                  )}
                                >
                                  <Check className="h-4 w-4" />
                                </div>
                                <span>{genre}</span>
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                
                {field.value.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {field.value.map((genre) => (
                      <Badge
                        key={genre}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {genre}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => {
                            form.setValue(
                              "genres",
                              field.value.filter((value) => value !== genre)
                            );
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="languages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Languages</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value.length && "text-muted-foreground"
                        )}
                      >
                        {field.value.length > 0
                          ? `${field.value.length} selected`
                          : "Select languages"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search languages..." />
                      <CommandList>
                        <CommandEmpty>No languages found.</CommandEmpty>
                        <CommandGroup>
                          {LANGUAGES.map((language) => {
                            const isSelected = field.value.includes(language);
                            return (
                              <CommandItem
                                key={language}
                                onSelect={() => {
                                  if (isSelected) {
                                    form.setValue(
                                      "languages",
                                      field.value.filter((value) => value !== language)
                                    );
                                  } else {
                                    form.setValue(
                                      "languages",
                                      [...field.value, language]
                                    );
                                  }
                                }}
                              >
                                <div
                                  className={cn(
                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                    isSelected
                                      ? "bg-primary text-primary-foreground"
                                      : "opacity-50 [&_svg]:invisible"
                                  )}
                                >
                                  <Check className="h-4 w-4" />
                                </div>
                                <span>{language}</span>
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                
                {field.value.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {field.value.map((language) => (
                      <Badge
                        key={language}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {language}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => {
                            form.setValue(
                              "languages",
                              field.value.filter((value) => value !== language)
                            );
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium mb-4">Ratings</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="imdb_rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IMDb Rating (0-10)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      placeholder="Enter IMDb rating"
                      {...field}
                      value={field.value === undefined ? "" : field.value}
                      onChange={(e) => 
                        field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Rating out of 10
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imdb_votes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IMDb Votes</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      placeholder="Enter number of votes"
                      {...field}
                      value={field.value === undefined ? "" : field.value}
                      onChange={(e) => 
                        field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metascore"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Metascore (0-100)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Enter Metascore"
                      {...field}
                      value={field.value === undefined ? "" : field.value}
                      onChange={(e) => 
                        field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Score out of 100
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rt_score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rotten Tomatoes Score (0-100)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Enter Rotten Tomatoes score"
                      {...field}
                      value={field.value === undefined ? "" : field.value}
                      onChange={(e) => 
                        field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Score out of 100
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <Brain className="h-4 w-4" />
            {isSubmitting ? "Processing..." : "Run Prediction"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PredictForm;