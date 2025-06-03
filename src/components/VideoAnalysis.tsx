
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Zap, Shield, Brain } from "lucide-react";

export const VideoAnalysis = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-700">
            <Brain className="h-5 w-5" />
            <span>Configuración de Análisis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Productos a Detectar</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  Producto A
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  Producto B
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  Producto C
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Configuraciones</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-green-200 text-green-700">
                  <Zap className="h-3 w-3 mr-1" />
                  Análisis rápido
                </Badge>
                <Badge variant="outline" className="border-blue-200 text-blue-700">
                  <Shield className="h-3 w-3 mr-1" />
                  Alta precisión
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-white/80 border-blue-100">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Brain className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Google Gemini Vision</h3>
            <p className="text-sm text-gray-600">IA avanzada para reconocimiento visual</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 border-green-100">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Procesamiento Rápido</h3>
            <p className="text-sm text-gray-600">Análisis eficiente frame por frame</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 border-purple-100">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Settings className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Configuración Flexible</h3>
            <p className="text-sm text-gray-600">Ajusta parámetros según tus necesidades</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
