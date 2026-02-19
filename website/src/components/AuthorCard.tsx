interface AuthorCardProps {
  name: string
  role: string
  bio: string
  image: string | null
  grayscale?: boolean
}

export function AuthorCard({ name, role, bio, image, grayscale = false }: AuthorCardProps) {
  return (
    <div className="flex gap-6 items-start py-6 border-b border-stone-200 last:border-0">
      {image && (
        <img
          src={image}
          alt={name}
          className={`w-24 h-28 object-cover object-top flex-shrink-0 ${grayscale ? 'grayscale' : ''}`}
        />
      )}
      {!image && (
        <div className="w-24 h-28 flex-shrink-0 bg-stone-100 flex items-center justify-center text-stone-300 text-4xl">
          ✦
        </div>
      )}
      <div>
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-1">{name}</h3>
        <p className="text-sm text-stone-500 italic mb-2">{role}</p>
        <p className="text-sm text-stone-700 leading-relaxed">{bio}</p>
      </div>
    </div>
  )
}
