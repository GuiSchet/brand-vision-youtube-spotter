
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  Clock, 
  TrendingUp, 
  Play, 
  BarChart3,
  Calendar,
  Award
} from "lucide-react";

interface ProductDetectionProps {
  results: {
    videoTitle: string;
    duration: string;
    totalDetections: number;
    uniqueProducts: number;
    totalTime: string;
    products: Array<{
      name: string;
      detections: number;
      totalTime: string;
      confidence: number;
      timestamps: string[];
    }>;
  };
}

export const ProductDetection = ({ results }: ProductDetectionProps) => {
  return (
    <div className="space-y-6">
      {/* Resumen General */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-700">
            <Award className="h-5 w-5" />
            <span>Resumen del Análisis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{results.totalDetections}</div>
              <div className="text-sm text-gray-600">Detecciones Totales</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{results.uniqueProducts}</div>
              <div className="text-sm text-gray-600">Productos Únicos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{results.totalTime}</div>
              <div className="text-sm text-gray-600">Tiempo Total</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">{results.duration}</div>
              <div className="text-sm text-gray-600">Duración Video</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detecciones por Producto */}
      <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span>Detecciones por Producto</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {results.products.map((product, index) => (
            <div key={index} className="space-y-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">
                    {product.name.charAt(product.name.length - 1)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{product.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {product.detections} detecciones
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {product.totalTime}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge 
                  variant="secondary" 
                  className={`${
                    product.confidence >= 90 
                      ? 'bg-green-100 text-green-700' 
                      : product.confidence >= 80 
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {product.confidence}% confianza
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Frecuencia de aparición</span>
                  <span>{Math.round((product.detections / results.totalDetections) * 100)}%</span>
                </div>
                <Progress 
                  value={(product.detections / results.totalDetections) * 100} 
                  className="h-2"
                />
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Momentos de aparición:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.timestamps.map((timestamp, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 text-xs hover:bg-blue-50"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      {timestamp}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Timeline Visual */}
      <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span>Timeline de Detecciones</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="h-8 bg-gray-200 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-30"></div>
              {/* Aquí irían las marcas de tiempo reales basadas en los timestamps */}
              <div className="absolute top-1 left-[20%] w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
              <div className="absolute top-1 left-[35%] w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
              <div className="absolute top-1 left-[55%] w-6 h-6 bg-purple-500 rounded-full border-2 border-white shadow-sm"></div>
              <div className="absolute top-1 left-[75%] w-6 h-6 bg-pink-500 rounded-full border-2 border-white shadow-sm"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0:00</span>
              <span>{results.duration}</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Cada punto representa una detección de producto en el timeline del video
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
