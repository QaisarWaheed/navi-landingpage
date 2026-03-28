type VideoEmbedProps = {
  title: string;
  embedId: string;
  className?: string;
};

/** Responsive 16:9 YouTube embed via video ID (e.g. M7lc1UVf-VE). */
export function VideoEmbed({ title, embedId, className = "" }: VideoEmbedProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border bg-video-chrome shadow-lg ${className}`}
    >
      <div className="relative aspect-video w-full">
        <iframe
          title={title}
          src={`https://www.youtube.com/embed/${embedId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
}
