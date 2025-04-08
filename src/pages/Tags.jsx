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
    if (newTag.trim() && !tags.includes(newTag)) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Tags</h1>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter a new tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <Button onClick={handleAddTag}>Add Tag</Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="cursor-pointer"
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
