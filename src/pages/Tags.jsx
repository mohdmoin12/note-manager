import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const initialTags = ["Work", "Personal", "Important", "Urgent"];

function Tags() {
  const [tags, setTags] = useState(initialTags);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto mt-4 px-4">
      <h1 className="text-2xl font-semibold">🏷️ Tags</h1>

      <Card>
        <CardContent className="p-4 space-y-4">
          {/* Input + Button group */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="Enter a new tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAddTag} className="w-full sm:w-auto">
              Add Tag
            </Button>
          </div>

          {/* Tag list */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="cursor-pointer text-sm px-3 py-1"
                variant="secondary"
                onClick={() => handleRemoveTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Tags;
