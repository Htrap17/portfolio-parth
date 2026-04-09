import { youtubeEmbedUrl } from '@/lib/utils'

type Props = { youtubeId: string; title: string }

export default function VideoEmbed({ youtubeId, title }: Props) {
  return (
    <div className="relative w-full overflow-hidden border border-border" style={{ aspectRatio: '16/9' }}>
      <iframe
        src={youtubeEmbedUrl(youtubeId)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}
