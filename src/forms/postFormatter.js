import { uid } from "uid";

export function formatPost( title, date, description, authorId ) {
    return {
      authorId: authorId,
      title: title || null,
      date: date,
      id: uid(16),
      description,
      images: [], // Remove empty photo URLs,
    };
}
  