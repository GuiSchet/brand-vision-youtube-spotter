
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductManager } from "@/components/ProductManager";
import { Settings, Zap, Shield, Brain, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

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
    frameRate: 1,
    sensitivity: "medium",
    skipSimilar: true,
  });

  const handleProductsChange = (newProducts: Product[]) => {
    setProducts(newProducts);
  };

  const activeProducts = products.filter(p => p.isActive);

  return (
    <div className="space-y-8">
      <ProductManager onProductsChange={handleProductsChange} />
      
      <Card className="flockit-gradient shadow-2xl border-blue-900/20 rounded-3xl card-hover">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center space-x-3 text-white text-xl">
            <div className="w-8 h-8 flockit-orange-gradient rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span>Configuración de Análisis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-100 flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-accent" />
                <span>Productos a Detectar ({activeProducts.length})</span>
              </h4>
              {activeProducts.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {activeProducts.map((product) => (
                    <Badge key={product.id} variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm rounded-xl px-3 py-2">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-4 h-4 rounded mr-2 object-cover"
                      />
                      {product.name}
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
                  <p className="text-sm text-blue-100">No hay productos activos. Agrega productos para comenzar el análisis.</p>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-100 flex items-center space-x-2">
                <Settings className="h-4 w-4 text-accent" />
                <span>Configuraciones Activas</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-green-500/20 text-green-100 border-green-400/30 rounded-xl">
                  <Zap className="h-3 w-3 mr-1" />
                  Análisis {analysisSettings.sensitivity === "high" ? "profundo" : analysisSettings.sensitivity === "medium" ? "balanceado" : "rápido"}
                </Badge>
                <Badge variant="outline" className="bg-blue-500/20 text-blue-100 border-blue-400/30 rounded-xl">
                  <Shield className="h-3 w-3 mr-1" />
                  {analysisSettings.frameRate} FPS
                </Badge>
              </div>
            </div>
          </div>

          {/* Configuraciones avanzadas */}
          <div className="border-t border-white/20 pt-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="mb-4 text-blue-100 hover:text-white hover:bg-white/10 rounded-xl"
            >
              {showAdvanced ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
              Configuraciones Avanzadas
            </Button>

            {showAdvanced && (
              <div className="grid md:grid-cols-3 gap-6 p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-blue-100">Frecuencia de análisis</label>
                  <select
                    value={analysisSettings.frameRate}
                    onChange={(e) => setAnalysisSettings(prev => ({...prev, frameRate: parseInt(e.target.value)}))}
                    className="w-full p-3 border border-white/30 rounded-xl text-sm bg-white/20 text-white placeholder-blue-200 backdrop-blur-sm focus:border-accent focus:ring-1 focus:ring-accent"
                  >
                    <option value={0.5} className="text-slate-800">0.5 FPS (Muy rápido)</option>
                    <option value={1} className="text-slate-800">1 FPS (Rápido)</option>
                    <option value={2} className="text-slate-800">2 FPS (Balanceado)</option>
                    <option value={4} className="text-slate-800">4 FPS (Detallado)</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-blue-100">Sensibilidad</label>
                  <select
                    value={analysisSettings.sensitivity}
                    onChange={(e) => setAnalysisSettings(prev => ({...prev, sensitivity: e.target.value}))}
                    className="w-full p-3 border border-white/30 rounded-xl text-sm bg-white/20 text-white placeholder-blue-200 backdrop-blur-sm focus:border-accent focus:ring-1 focus:ring-accent"
                  >
                    <option value="low" className="text-slate-800">Baja (Más rápido)</option>
                    <option value="medium" className="text-slate-800">Media (Balanceado)</option>
                    <option value="high" className="text-slate-800">Alta (Más preciso)</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-blue-100">Filtros</label>
                  <label className="flex items-center space-x-3 text-sm text-blue-100 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analysisSettings.skipSimilar}
                      onChange={(e) => setAnalysisSettings(prev => ({...prev, skipSimilar: e.target.checked}))}
                      className="rounded-md border-white/30 bg-white/20 text-accent focus:ring-accent focus:ring-offset-0"
                    />
                    <span>Evitar detecciones consecutivas</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-white/90 backdrop-blur-sm border-slate-200/50 shadow-xl rounded-2xl card-hover">
          <CardContent className="p-6 text-center">
            <div className="w-14 h-14 flockit-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Brain className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2 text-lg">Google Gemini Vision</h3>
            <p className="text-sm text-slate-600 leading-relaxed">IA avanzada para reconocimiento visual personalizado con alta precisión</p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-slate-200/50 shadow-xl rounded-2xl card-hover">
          <CardContent className="p-6 text-center">
            <div className="w-14 h-14 flockit-orange-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2 text-lg">Detección Personalizada</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Busca productos específicos usando tus imágenes de referencia</p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-slate-200/50 shadow-xl rounded-2xl card-hover">
          <CardContent className="p-6 text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Settings className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2 text-lg">Configuración Avanzada</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Ajusta precisión y velocidad según tus necesidades específicas</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
