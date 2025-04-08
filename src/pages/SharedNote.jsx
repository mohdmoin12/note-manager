import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SharedNote() {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    async function fetchNote() {
      const res = await axios.get(`/api/notes/${noteId}`);
      setNote(res.data);
    }
    fetchNote();
  }, [noteId]);

  if (!note) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{note.title}</h1>
      <p>{note.content}</p>
    </div>
  );
}
