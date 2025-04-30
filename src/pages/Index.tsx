
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import Navbar from "@/components/Navbar";
import ProjectForm from "@/components/ProjectForm";
import CodePreview from "@/components/CodePreview";
import AIAssistant from "@/components/AIAssistant";

interface Project {
  id: string;
  name: string;
  description: string;
  generatedCode: string;
}

const Index = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState("editor");

  const createNewProject = (name: string, description: string) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name,
      description,
      generatedCode: "// Здесь будет сгенерированный код"
    };
    
    setProjects([...projects, newProject]);
    setCurrentProject(newProject);
  };

  const generateSiteCode = (projectId: string, description: string) => {
    // В реальном приложении здесь был бы запрос к API ИИ
    const mockGeneratedCode = `
<!DOCTYPE html>
<html>
<head>
  <title>Сгенерированный сайт</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
    .container { max-width: 1200px; margin: 0 auto; }
    header { background: #f0f0f0; padding: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Сайт на основе вашего описания</h1>
    </header>
    <main>
      <p>Контент сайта будет здесь</p>
    </main>
  </div>
</body>
</html>
    `;

    setProjects(projects.map(project => 
      project.id === projectId 
        ? { ...project, generatedCode: mockGeneratedCode } 
        : project
    ));
    
    if (currentProject && currentProject.id === projectId) {
      setCurrentProject({ ...currentProject, generatedCode: mockGeneratedCode });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        projects={projects} 
        currentProject={currentProject} 
        setCurrentProject={setCurrentProject} 
      />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
          <h1 className="text-3xl font-bold mb-6 text-purple-700">АИ Генератор Сайтов</h1>
          
          {!currentProject ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">Добро пожаловать в платформу генерации сайтов!</h2>
              <p className="text-lg text-gray-600 mb-8">Создайте новый проект, чтобы начать работу с ИИ</p>
              <ProjectForm onSubmit={createNewProject} />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Проект: {currentProject.name}</h2>
                <Button 
                  onClick={() => generateSiteCode(currentProject.id, currentProject.description)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Icon name="Wand2" className="mr-2" size={18} />
                  Сгенерировать код
                </Button>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <Tabs 
                  defaultValue={activeTab} 
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="w-full bg-gray-100 p-0">
                    <TabsTrigger 
                      value="editor" 
                      className="flex-1 py-3 data-[state=active]:bg-white"
                    >
                      <Icon name="Edit3" className="mr-2" size={16} />
                      Редактор
                    </TabsTrigger>
                    <TabsTrigger 
                      value="preview" 
                      className="flex-1 py-3 data-[state=active]:bg-white"
                    >
                      <Icon name="Eye" className="mr-2" size={16} />
                      Предпросмотр
                    </TabsTrigger>
                    <TabsTrigger 
                      value="code" 
                      className="flex-1 py-3 data-[state=active]:bg-white"
                    >
                      <Icon name="Code" className="mr-2" size={16} />
                      Код
                    </TabsTrigger>
                    <TabsTrigger 
                      value="assistant" 
                      className="flex-1 py-3 data-[state=active]:bg-white"
                    >
                      <Icon name="Bot" className="mr-2" size={16} />
                      АИ Ассистент
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="editor" className="p-4">
                    <ProjectForm 
                      initialValues={{
                        name: currentProject.name,
                        description: currentProject.description,
                      }}
                      onSubmit={(name, description) => {
                        const updatedProject = { ...currentProject, name, description };
                        setProjects(projects.map(p => 
                          p.id === currentProject.id ? updatedProject : p
                        ));
                        setCurrentProject(updatedProject);
                      }}
                    />
                  </TabsContent>
                  
                  <TabsContent value="preview" className="border-t">
                    <CodePreview code={currentProject.generatedCode} />
                  </TabsContent>
                  
                  <TabsContent value="code" className="p-4">
                    <div className="bg-gray-900 text-gray-100 rounded-md p-4 overflow-auto max-h-[600px]">
                      <pre className="whitespace-pre-wrap">
                        <code>{currentProject.generatedCode}</code>
                      </pre>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="assistant" className="p-4">
                    <AIAssistant code={currentProject.generatedCode} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-gray-800 text-gray-200 py-4 text-center">
        <p>ИИ Генератор Сайтов © 2025</p>
      </footer>
    </div>
  );
};

export default Index;
