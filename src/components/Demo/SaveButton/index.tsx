import { useEditor } from "@craftjs/core";
import lz from "lzutf8";

export default function SaveButton() {
  const { query } = useEditor();

  const handleSave = async () => {
    const json = query.serialize();
    const encoded = (lz.encodeBase64(lz.compress(json)) );
    try {
      const res = await fetch('https://67f7183e42d6c71cca6403bd.mockapi.io/v1/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: encoded }),
      });
      const data = await res.json() ;
      localStorage.setItem('PageId', data.id);
      if (!res.ok) throw new Error('Save failed');

    } catch (err) {
      console.error('❌ Save Error:', err);
    }
  };

  return (
    <button
      className="bg-green-500/60 text-white px-4 py-2 rounded mr-2"
      onClick={handleSave}
    >
      Save
    </button>
  );
}
