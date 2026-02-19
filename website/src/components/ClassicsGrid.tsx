import { classicsXX } from '@/data/content'

export function ClassicsGrid() {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-stone-400 mb-4">На страницах журнала в XX веке</p>
      <div className="grid grid-cols-3 gap-3">
        {classicsXX.map((author) => (
          <div key={author.name} className="text-center">
            <img
              src={author.image}
              alt={author.name}
              className="w-full aspect-[3/4] object-cover object-top grayscale mb-2"
            />
            <p className="text-xs font-medium text-stone-700">{author.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
