import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const Projects = () => (
  <>
    <Navbar />
    <main className="container mx-auto px-4 pt-24 pb-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Projects</h1>
        <p className="text-muted-foreground">Side projects and open-source work.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </main>
    <Footer />
  </>
);

export default Projects;
