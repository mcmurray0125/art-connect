import { uid } from "uid";

export function formatPost( title, date, description ) {
    return {
      title: title || null,
      date: date,
      id: uid(16),
      description,
      images: [], // Remove empty photo URLs,
    };
}
  