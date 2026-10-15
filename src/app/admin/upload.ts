"use client";

import type { MediaItem } from "@/components/Gallery";
import { supabase } from "@/lib/supabase/client";
import { createUpload } from "./actions";

const MEDIA_BUCKET = "site-media";
const MAX_BYTES = 50 * 1024 * 1024;

/** Uploads one file straight from the browser and returns its public URL. */
export async function uploadFile(file: Blob, fileName: string) {
  if (file.size > MAX_BYTES) {
    throw new Error(`${fileName} is over 50 MB — compress it first.`);
  }
  const ticket = await createUpload(fileName, file.type);
  if (!ticket.ok) throw new Error(ticket.error);
  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .uploadToSignedUrl(ticket.path, ticket.token, file, {
      contentType: file.type,
    });
  if (error) throw new Error(`Upload failed: ${error.message}`);
  return ticket.publicUrl;
}

/**
 * Grabs a frame from a video to use as its gallery thumbnail. Also doubles
 * as a format check: if this browser can't decode the video, visitors'
 * browsers likely can't either (e.g. iPhone HEVC .mov files in Chrome).
 */
function videoPoster(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    const fail = () => {
      URL.revokeObjectURL(url);
      reject(
        new Error(
          `${file.name} can't be played in this browser. Convert it to MP4 (H.264) and try again.`,
        ),
      );
    };
    video.onerror = fail;
    video.onloadeddata = () => {
      video.currentTime = Math.min(1, video.duration / 2 || 0);
    };
    video.onseeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      if (!canvas.width) return fail();
      canvas.getContext("2d")!.drawImage(video, 0, 0);
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          if (blob) resolve(blob);
          else fail();
        },
        "image/jpeg",
        0.85,
      );
    };
    video.src = url;
  });
}

/** Uploads a photo or video and returns a gallery item for it. */
export async function uploadMedia(file: File): Promise<MediaItem> {
  const alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
  if (file.type.startsWith("video/")) {
    const poster = await videoPoster(file);
    const [src, posterUrl] = await Promise.all([
      uploadFile(file, file.name),
      uploadFile(poster, `${file.name}-poster.jpg`),
    ]);
    return { type: "video", src, poster: posterUrl, alt };
  }
  if (file.type.startsWith("image/")) {
    return { type: "image", src: await uploadFile(file, file.name), alt };
  }
  throw new Error(`${file.name} isn't an image or video.`);
}
