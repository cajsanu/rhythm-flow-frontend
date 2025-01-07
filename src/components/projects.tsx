import { Project } from "@/types/project"

type SingleProjProps = {
  name: string
  endDate: string
  id: string
}

const SingleProject = ({ name, endDate, id }: SingleProjProps) => {
  return (
    <div className="relative border rounded-xl p-6 flex flex-col bg-rose-100 hover:bg-rose-300">
      <a href={`/project/${id}`}>
        <ul className="font-bold text-xl text-rose-800 pb-2">{name}</ul>
        <ul className="text-rose-800 text-sm">Due: {endDate}</ul>
      </a>
    </div>
  )
}

type ProjectsProps = {
    projects: Project[]
}

export const Projects = ({ projects }: ProjectsProps) => {
  return (
    <div className="flex flex-wrap justify-center py-10 gap-10">
      {projects.map((p) => (
        <SingleProject key={p.id} name={p.name} endDate={p.endDate} id={p.id} />
      ))}
    </div>
  )
}
