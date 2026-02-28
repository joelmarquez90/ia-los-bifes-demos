const API_KEY = process.env.GOOGLE_PLACES_API_KEY!;

export interface PlacePhoto {
  photoReference: string;
  width: number;
  height: number;
}

export interface PlaceReview {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
}

export async function getPlacePhotos(placeId: string): Promise<PlacePhoto[]> {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${API_KEY}`,
      { next: { revalidate: 86400 } }
    );
    const data = await res.json();
    return (data.result?.photos || []).slice(0, 6).map((p: { photo_reference: string; width: number; height: number }) => ({
      photoReference: p.photo_reference,
      width: p.width,
      height: p.height,
    }));
  } catch {
    return [];
  }
}

export async function getPlaceReviews(placeId: string): Promise<PlaceReview[]> {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${API_KEY}&language=es`,
      { next: { revalidate: 86400 } }
    );
    const data = await res.json();
    return (data.result?.reviews || [])
      .filter((r: { text: string }) => r.text && r.text.length > 20)
      .slice(0, 3)
      .map((r: { author_name: string; rating: number; text: string; relative_time_description: string }) => ({
        authorName: r.author_name,
        rating: r.rating,
        text: r.text,
        relativeTime: r.relative_time_description,
      }));
  } catch {
    return [];
  }
}

export function photoUrl(photoReference: string, maxWidth = 800): string {
  return `/api/photo?ref=${encodeURIComponent(photoReference)}&w=${maxWidth}`;
}
