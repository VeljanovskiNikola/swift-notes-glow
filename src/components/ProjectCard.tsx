import { ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { getTagStyle } from "@/lib/tagColors";

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <div
    className="bg-card rounded-xl p-5 card-hover gradient-border opacity-0 animate-fade-up"
    style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
  >
    <h3 className="text-lg font-semibold text-foreground mb-2">{project.name}</h3>
    <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {project.tags.map((tag) => (
        <span key={tag} className="text-xs font-medium px-2.5 py-0.5 rounded-full" style={getTagStyle(tag)}>
          {tag}
        </span>
      ))}
    </div>
    <a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm text-purple-400 hover:underline"
    >
      <ExternalLink size={14} />
      View on GitHub
    </a>
  </div>
);

export default ProjectCard;
