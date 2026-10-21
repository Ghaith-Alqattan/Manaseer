import type { WorldConfig } from "./scrub-engine";

/** Same device test the engine uses, so we preload exactly the variant it will play. */
export function isMobileViewport(): boolean {
  return (
    window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
    window.matchMedia("(max-width: 860px)").matches
  );
}

/** Every clip URL the engine will request for this device, in playback order. */
export function worldClipUrls(config: WorldConfig, mobile: boolean): string[] {
  const urls: string[] = [];
  config.sections.forEach((s, i) => {
    urls.push(mobile && s.clipMobile ? s.clipMobile : s.clip);
    const c = mobile && config.connectorsMobile?.[i] ? config.connectorsMobile[i] : config.connectors[i];
    if (i < config.sections.length - 1 && c) urls.push(c);
  });
  return urls;
}

/**
 * Fetches all clips up front with byte-level progress and returns them as Blobs keyed by
 * URL. The engine takes this map (config.preloaded) and skips its own fetch, so the first
 * scroll never waits on a 7 MB download mid-flight.
 */
export async function preloadClips(
  urls: string[],
  onProgress: (fraction: number) => void,
): Promise<Map<string, Blob>> {
  const map = new Map<string, Blob>();
  if (urls.length === 0) {
    onProgress(1);
    return map;
  }
  const totals = new Array<number>(urls.length).fill(0);
  const loaded = new Array<number>(urls.length).fill(0);
  const report = () => {
    const total = totals.reduce((a, b) => a + b, 0);
    if (total > 0) onProgress(Math.min(0.999, loaded.reduce((a, b) => a + b, 0) / total));
  };

  await Promise.all(
    urls.map(async (url, i) => {
      try {
        const res = await fetch(url);
        if (!res.ok || !res.body) return;
        totals[i] = Number(res.headers.get("content-length")) || 0;
        const reader = res.body.getReader();
        const chunks: Uint8Array[] = [];
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          loaded[i] += value.byteLength;
          report();
        }
        if (!totals[i]) totals[i] = loaded[i];
        map.set(url, new Blob(chunks as BlobPart[], { type: "video/mp4" }));
      } catch {
        // A failed clip falls back to the engine's own lazy fetch; the still stays as poster.
      }
    }),
  );
  onProgress(1);
  return map;
}
