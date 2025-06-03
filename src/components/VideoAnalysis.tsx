
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductManager } from "@/components/ProductManager";
import { Settings, Zap, Shield, Brain, ChevronDown, ChevronUp } from "lucide-react";

interface Product {
  id: string;
  name: string;
  image: string;
  confidence: number;
  isActive: boolean;
}

export const VideoAnalysis = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [analysisSettings, setAnalysisSettings] = useState({
    frameRate: 1, // frames por segundo a analizar
    sensitivity: "medium", // low, medium, high
    skipSimilar: true, // evitar detecciones duplicadas consecutivas
  });

  const handleProductsChange = (newProducts: Product[]) => {
    setProducts(newProducts);
  };

  const activeProducts = products.filter(p => p.isActive);

  return (
    <div className="space-y-6">
      <ProductManager onProductsChange={handleProductsChange} />
      
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
              <h4 className="font-medium text-gray-700">Productos a Detectar ({activeProducts.length})</h4>
              {activeProducts.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {activeProducts.map((product) => (
                    <Badge key={product.id} variant="secondary" className="bg-blue-100 text-blue-700">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-4 h-4 rounded mr-1"
                      />
                      {product.name}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No hay productos activos. Agrega productos para comenzar.</p>
              )}
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Configuraciones</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-green-200 text-green-700">
                  <Zap className="h-3 w-3 mr-1" />
                  Análisis {analysisSettings.sensitivity === "high" ? "profundo" : analysisSettings.sensitivity === "medium" ? "balanceado" : "rápido"}
                </Badge>
                <Badge variant="outline" className="border-blue-200 text-blue-700">
                  <Shield className="h-3 w-3 mr-1" />
                  {analysisSettings.frameRate} FPS
                </Badge>
              </div>
            </div>
          </div>

          {/* Configuraciones avanzadas */}
          <div className="border-t pt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="mb-3"
            >
              {showAdvanced ? <ChevronUp className="h-4 w-4 mr-1" /> : <ChevronDown className="h-4 w-4 mr-1" />}
              Configuraciones Avanzadas
            </Button>

            {showAdvanced && (
              <div className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Frecuencia de análisis</label>
                  <select
                    value={analysisSettings.frameRate}
                    onChange={(e) => setAnalysisSettings(prev => ({...prev, frameRate: parseInt(e.target.value)}))}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value={0.5}>0.5 FPS (Muy rápido)</option>
                    <option value={1}>1 FPS (Rápido)</option>
                    <option value={2}>2 FPS (Balanceado)</option>
                    <option value={4}>4 FPS (Detallado)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Sensibilidad</label>
                  <select
                    value={analysisSettings.sensitivity}
                    onChange={(e) => setAnalysisSettings(prev => ({...prev, sensitivity: e.target.value}))}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="low">Baja (Más rápido)</option>
                    <option value="medium">Media (Balanceado)</option>
                    <option value="high">Alta (Más preciso)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Filtros</label>
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={analysisSettings.skipSimilar}
                      onChange={(e) => setAnalysisSettings(prev => ({...prev, skipSimilar: e.target.checked}))}
                      className="rounded"
                    />
                    <span>Evitar detecciones consecutivas</span>
                  </label>
                </div>
              </div>
            )}
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
            <p className="text-sm text-gray-600">IA avanzada para reconocimiento visual personalizado</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 border-green-100">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Detección Personalizada</h3>
            <p className="text-sm text-gray-600">Busca productos específicos usando tus imágenes de referencia</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 border-purple-100">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Settings className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Configuración Avanzada</h3>
            <p className="text-sm text-gray-600">Ajusta precisión y velocidad según tus necesidades</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
