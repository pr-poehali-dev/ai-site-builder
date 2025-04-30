
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import Icon from "@/components/ui/icon";

interface Project {
  id: string;
  name: string;
  description: string;
  generatedCode: string;
}

interface NavbarProps {
  projects: Project[];
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
}

const Navbar = ({ projects, currentProject, setCurrentProject }: NavbarProps) => {
  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold">
            <Icon name="Code2" className="inline-block mr-2" />
            АИ Генератор Сайтов
          </div>
          
          {projects.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                  <Icon name="FolderOpen" className="mr-2" size={16} />
                  Проекты
                  <Icon name="ChevronDown" className="ml-2" size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Ваши проекты</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {projects.map(project => (
                  <DropdownMenuItem 
                    key={project.id}
                    onClick={() => setCurrentProject(project)}
                    className={currentProject?.id === project.id ? "bg-gray-100" : ""}
                  >
                    <Icon name="File" className="mr-2" size={16} />
                    {project.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {currentProject && (
            <Button 
              variant="ghost" 
              onClick={() => setCurrentProject(null)}
              className="text-gray-300 hover:text-white"
            >
              <Icon name="Plus" className="mr-2" size={16} />
              Новый проект
            </Button>
          )}
          
          <Button variant="outline" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
            <Icon name="CircleHelp" className="mr-2" size={16} />
            Помощь
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
