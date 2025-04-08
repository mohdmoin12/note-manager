import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const LOCAL_STORAGE_KEY = "focusflow_notes";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTag, setSelectedTag] = useState("all");

  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    tags: [],
  });

  // Load notes from localStorage on mount
  useEffect(() => {
    const storedNotes = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    } else {
      // Default initial notes if none stored
      setNotes([
        {
          id: 1,
          title: "Meeting Notes",
          content: "### Client Meeting\n- Discuss project scope\n- Set deadlines",
          tags: ["work", "meeting"],
        },
        {
          id: 2,
          title: "Daily Thoughts",
          content: "Feeling productive today 💪\n- Finished tasks\n- Planned tomorrow",
          tags: ["personal"],
        },
      ]);
    }
  }, []);

  // Save notes to localStorage when changed
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = () => {
    if (!newNote.title || !newNote.content) return;
    const noteToAdd = {
      id: Date.now(),
      ...newNote,
    };
    setNotes([noteToAdd, ...notes]);
    setNewNote({ title: "", content: "", tags: [] });
    setOpenDialog(false);
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    setSelectedNote(null);
  };

  const allTags = [...new Set(notes.flatMap((note) => note.tags))];
  const filteredNotes =
    selectedTag === "all"
      ? notes
      : notes.filter((note) => note.tags.includes(selectedTag));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📒 Notes</h1>

      {/* New Note Button + Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button className="mb-4 bg-brand-500 hover:bg-brand-600 text-white">+ New Note</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Note</DialogTitle>
          </DialogHeader>

          <input
            className="w-full px-3 py-2 border rounded text-sm"
            placeholder="Note title"
            value={newNote.title}
            onChange={(e) =>
              setNewNote({ ...newNote, title: e.target.value })
            }
          />

          <Textarea
            placeholder="Write your note in markdown..."
            rows={6}
            className="mt-2"
            value={newNote.content}
            onChange={(e) =>
              setNewNote({ ...newNote, content: e.target.value })
            }
          />

          <input
            className="w-full px-3 py-2 border rounded text-sm mt-2"
            placeholder="Tags (comma separated)"
            value={newNote.tags.join(", ")}
            onChange={(e) =>
              setNewNote({
                ...newNote,
                tags: e.target.value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter((tag) => tag),
              })
            }
          />

          <div className="flex flex-wrap gap-2 mt-2">
            {newNote.tags.map((tag, i) => (
              <Badge key={i} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <Button className="mt-4 w-full" onClick={handleSaveNote}>
            Save Note
          </Button>
        </DialogContent>
      </Dialog>

      {/* Tag Filter Dropdown */}
      <Select value={selectedTag} onValueChange={setSelectedTag}>
        <SelectTrigger className="w-48 mb-4">
          <SelectValue placeholder="Filter by tag" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {allTags.map((tag) => (
            <SelectItem key={tag} value={tag}>
              {tag}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Notes Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredNotes.map((note) => (
          <Dialog key={note.id}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="text-left h-auto py-4"
                onClick={() => setSelectedNote(note)}
              >
                <div className="w-full">
                  <h2 className="font-semibold text-lg">{note.title}</h2>
                  <div className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    <ReactMarkdown>{note.content}</ReactMarkdown>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {note.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Button>
            </DialogTrigger>

            {/* Note Preview Dialog */}
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex justify-between items-center">
                  {selectedNote?.title}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    Delete
                  </Button>
                </DialogTitle>
              </DialogHeader>
              <ReactMarkdown className="prose max-w-none mt-4">
                {selectedNote?.content}
              </ReactMarkdown>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
