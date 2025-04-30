
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

interface AIAssistantProps {
  code: string;
}

interface Suggestion {
  id: string;
  type: "warning" | "improvement";
  title: string;
  description: string;
  line: number;
  fix: string;
}

const AIAssistant = ({ code }: AIAssistantProps) => {
  // В реальном приложении эти данные приходили бы от АИ модели
  const [suggestions] = useState<Suggestion[]>([
    {
      id: "1",
      type: "warning",
      title: "Отсутствует метатег viewport",
      description: "Для корректного отображения на мобильных устройствах добавьте метатег viewport.",
      line: 4,
      fix: '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
    },
    {
      id: "2",
      type: "improvement",
      title: "Улучшение доступности",
      description: "Добавьте атрибуты ARIA для улучшения доступности сайта.",
      line: 12,
      fix: '<main role="main">'
    },
    {
      id: "3",
      type: "improvement",
      title: "Оптимизация CSS",
      description: "Рекомендуется выделить CSS в отдельный файл для лучшего кеширования.",
      line: 5,
      fix: '<link rel="stylesheet" href="styles.css">'
    }
  ]);

  const applyFix = (suggestionId: string) => {
    // В реальном приложении здесь бы обновлялся код с применением исправления
    console.log(`Применение исправления ${suggestionId}`);
  };

  return (
    <div className="bg-white rounded-lg border h-[600px] flex flex-col">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium flex items-center">
          <Icon name="Bot" className="mr-2" size={20} />
          АИ Ассистент
        </h3>
        <p className="text-sm text-gray-500">
          Анализирует ваш код и предлагает исправления и улучшения
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        {suggestions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Icon name="CheckCircle" className="text-green-500 mb-2" size={40} />
            <p className="text-gray-500">Код выглядит хорошо! Нет предложений по улучшению.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {suggestions.map((suggestion) => (
              <div 
                key={suggestion.id} 
                className={`border rounded-lg p-4 ${
                  suggestion.type === "warning" ? "border-orange-200 bg-orange-50" : "border-blue-200 bg-blue-50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <Icon 
                      name={suggestion.type === "warning" ? "AlertTriangle" : "Lightbulb"} 
                      className={suggestion.type === "warning" ? "text-orange-500" : "text-blue-500"}
                      size={20}
                    />
                    <div className="ml-3">
                      <h4 className="font-medium">{suggestion.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                      <div className="mt-2 p-2 bg-gray-800 text-gray-100 rounded text-sm overflow-x-auto">
                        <code>{suggestion.fix}</code>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Строка: {suggestion.line}</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => applyFix(suggestion.id)}
                    size="sm"
                    className={suggestion.type === "warning" ? "bg-orange-500 hover:bg-orange-600" : "bg-blue-500 hover:bg-blue-600"}
                  >
                    Применить
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <Separator />
      
      <div className="p-4 flex justify-between">
        <Button variant="outline" className="text-sm">
          <Icon name="RotateCcw" className="mr-2" size={16} />
          Повторный анализ
        </Button>
        <Button className="text-sm bg-purple-600 hover:bg-purple-700">
          <Icon name="Wand2" className="mr-2" size={16} />
          Оптимизировать весь код
        </Button>
      </div>
    </div>
  );
};

export default AIAssistant;
