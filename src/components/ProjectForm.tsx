
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface ProjectFormProps {
  initialValues?: {
    name: string;
    description: string;
  };
  onSubmit: (name: string, description: string) => void;
}

const ProjectForm = ({ initialValues, onSubmit }: ProjectFormProps) => {
  const [name, setName] = useState(initialValues?.name || "");
  const [description, setDescription] = useState(initialValues?.description || "");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && description.trim()) {
      onSubmit(name, description);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="project-name">Название проекта</Label>
        <Input
          id="project-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите название проекта"
          className="mt-1"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="project-description">Описание проекта</Label>
        <Textarea
          id="project-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Подробно опишите, какой сайт вы хотите создать..."
          className="mt-1 min-h-[150px]"
          required
        />
        <p className="text-sm text-gray-500 mt-1">
          Чем подробнее описание, тем лучше будет результат генерации
        </p>
      </div>
      
      <div className="flex flex-wrap gap-3 mt-2">
        <Button type="button" variant="outline" className="text-sm">
          <Icon name="Languages" className="mr-2" size={16} />
          JavaScript
        </Button>
        <Button type="button" variant="outline" className="text-sm">
          <Icon name="Languages" className="mr-2" size={16} />
          Python
        </Button>
        <Button type="button" variant="outline" className="text-sm">
          <Icon name="Languages" className="mr-2" size={16} />
          PHP
        </Button>
        <Button type="button" variant="outline" className="text-sm">
          <Icon name="Bot" className="mr-2" size={16} />
          GPT-4
        </Button>
        <Button type="button" variant="outline" className="text-sm">
          <Icon name="Bot" className="mr-2" size={16} />
          Claude
        </Button>
      </div>
      
      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
        {initialValues ? "Обновить проект" : "Создать проект"}
      </Button>
    </form>
  );
};

export default ProjectForm;
