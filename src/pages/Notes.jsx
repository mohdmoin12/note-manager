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
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Tag, Trash2, Edit, BookOpen, Search } from "lucide-react";

const LOCAL_STORAGE_KEY = "focusflow_notes";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [selectedTag, setSelectedTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    tags: [],
  });

  useEffect(() => {
    const storedNotes = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    } else {
      setNotes([
        {
          id: 1,
          title: "Meeting Notes",
          content: "### Client Meeting\n- Discuss project scope\n- Set deadlines",
          tags: ["work", "meeting"],
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          title: "Daily Thoughts",
          content: "Feeling productive today 💪\n- Finished tasks\n- Planned tomorrow",
          tags: ["personal"],
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = () => {
    if (!newNote.title || !newNote.content) return;
    const noteToAdd = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...newNote,
    };
    setNotes([noteToAdd, ...notes]);
    setNewNote({ title: "", content: "", tags: [] });
    setOpenCreateDialog(false);
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    setSelectedNote(null);
    setOpenDialog(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const allTags = [...new Set(notes.flatMap((note) => note.tags))];
  
  const filteredNotes = notes
    .filter(note => 
      selectedTag === "all" || note.tags.includes(selectedTag)
    )
    .filter(note => 
      searchQuery === "" || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Notes & Ideas
        </h1>
        <p className="text-muted-foreground">
          Capture your thoughts, organize your ideas
        </p>
      </div>

      {/* Search and Actions Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9 w-full"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select value={selectedTag} onValueChange={setSelectedTag}>
          <SelectTrigger className="w-full sm:w-48 border-dashed">
            <div className="flex items-center">
              <Tag className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by tag" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tags</SelectItem>
            {allTags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Note
            </Button>
          </DialogTrigger>
          <DialogContent className="space-y-4 max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-xl">Create New Note</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  placeholder="Note title"
                  value={newNote.title}
                  onChange={(e) =>
                    setNewNote({ ...newNote, title: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Content (Markdown supported)</label>
                <Textarea
                  placeholder="Write your note in markdown..."
                  className="min-h-32"
                  value={newNote.content}
                  onChange={(e) =>
                    setNewNote({ ...newNote, content: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                <Input
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
              </div>

              <div className="flex flex-wrap gap-2">
                {newNote.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenCreateDialog(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                onClick={handleSaveNote}
              >
                Save Note
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium">No notes found</h3>
          <p className="text-muted-foreground mt-2 max-w-md">
            {searchQuery ? 
              "Try adjusting your search or filters to find what you're looking for." : 
              "Get started by creating your first note."}
          </p>
          {!searchQuery && (
            <Button 
              className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              onClick={() => setOpenCreateDialog(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create your first note
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filteredNotes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card 
                  className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer border-0 shadow-md"
                  onClick={() => {
                    setSelectedNote(note);
                    setOpenDialog(true);
                  }}
                >
                  <CardContent className="p-0">
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <h2 className="font-bold text-lg line-clamp-1">{note.title}</h2>
                        <Badge variant="outline" className="text-xs">
                          {formatDate(note.createdAt)}
                        </Badge>
                      </div>
                      
                      <div className="mt-3 text-sm text-muted-foreground line-clamp-3 prose-sm prose">
                        <ReactMarkdown>{note.content}</ReactMarkdown>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        {note.tags.map((tag, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary"
                            className="px-2 py-1 text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Note Detail Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-3xl h-auto max-h-[85vh] overflow-y-auto">
          {selectedNote && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl font-bold">
                    {selectedNote.title}
                  </DialogTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-blue-500"
                      onClick={() => {
                        setNewNote({
                          title: selectedNote.title,
                          content: selectedNote.content,
                          tags: [...selectedNote.tags],
                        });
                        setOpenDialog(false);
                        setOpenCreateDialog(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteNote(selectedNote.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedNote.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                  <Badge variant="outline">
                    {formatDate(selectedNote.createdAt)}
                  </Badge>
                </div>
              </DialogHeader>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mt-4">
                <ReactMarkdown className="prose dark:prose-invert max-w-none">
                  {selectedNote.content}
                </ReactMarkdown>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}