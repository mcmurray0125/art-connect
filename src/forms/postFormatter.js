import { uid } from "uid";

export function formatPost( title, date, description, images ) {
    return {
      title: title,
      date: date,
      id: uid(16),
      description,
      images: images.filter(image => image.trim() !== ''), // Remove empty photo URLs,
      coverPhoto: images.length > 0 ? images[0] : ''
    };
}
  