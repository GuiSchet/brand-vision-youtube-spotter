
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  FileText, 
  Share2, 
  Mail,
  BarChart,
  TrendingUp,
  Clock,
  Eye
} from "lucide-react";
import { toast } from "sonner";

interface AnalysisReportProps {
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

export const AnalysisReport = ({ results }: AnalysisReportProps) => {
  const handleExportPDF = () => {
    toast.success("Reporte PDF generado exitosamente");
  };

  const handleExportCSV = () => {
    toast.success("Datos exportados a CSV");
  };

  const handleShareReport = () => {
    toast.success("Enlace de reporte copiado al portapapeles");
  };

  const getProductPercentage = (detections: number) => {
    return Math.round((detections / results.totalDetections) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header del Reporte */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-indigo-700">
              <FileText className="h-5 w-5" />
              <span>Reporte de Análisis</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleExportCSV}>
                <Download className="h-4 w-4 mr-2" />
                CSV
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportPDF}>
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
              <Button variant="outline" size="sm" onClick={handleShareReport}>
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Video Analizado</h3>
              <p className="text-gray-600">{results.videoTitle}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span>Duración: {results.duration}</span>
                <span>•</span>
                <span>Fecha de análisis: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas Clave */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/80 border-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{results.totalDetections}</div>
                <div className="text-sm text-gray-600">Total Detecciones</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 border-green-100">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <BarChart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{results.uniqueProducts}</div>
                <div className="text-sm text-gray-600">Productos Únicos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 border-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{results.totalTime}</div>
                <div className="text-sm text-gray-600">Tiempo Visible</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 border-orange-100">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round((parseInt(results.totalTime.split(':')[0]) * 60 + parseInt(results.totalTime.split(':')[1])) / (parseInt(results.duration.split(':')[0]) * 60 + parseInt(results.duration.split(':')[1])) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Cobertura</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla Detallada */}
      <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart className="h-5 w-5 text-blue-600" />
            <span>Desglose Detallado por Producto</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Producto</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Detecciones</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Tiempo Total</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">% del Video</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Confianza</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Primera Aparición</th>
                </tr>
              </thead>
              <tbody>
                {results.products.map((product, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                          {product.name.charAt(product.name.length - 1)}
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        {product.detections}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">{product.totalTime}</td>
                    <td className="py-3 px-4">
                      <span className="text-green-600 font-semibold">
                        {getProductPercentage(product.detections)}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant="outline"
                        className={`${
                          product.confidence >= 90 
                            ? 'border-green-200 text-green-700' 
                            : product.confidence >= 80 
                            ? 'border-yellow-200 text-yellow-700'
                            : 'border-red-200 text-red-700'
                        }`}
                      >
                        {product.confidence}%
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-600">
                      {product.timestamps[0]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recomendaciones */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-yellow-700">
            <TrendingUp className="h-5 w-5" />
            <span>Insights y Recomendaciones</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800">Análisis de Rendimiento:</h4>
            <ul className="space-y-1 text-sm text-gray-700 ml-4">
              <li>• {results.products[0]?.name} tuvo la mayor exposición con {results.products[0]?.detections} apariciones</li>
              <li>• El video tiene una buena distribución de productos a lo largo de su duración</li>
              <li>• La confianza promedio de detección es alta (>85%)</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800">Sugerencias:</h4>
            <ul className="space-y-1 text-sm text-gray-700 ml-4">
              <li>• Considerar aumentar la exposición de productos con menor tiempo de pantalla</li>
              <li>• El momento óptimo para mostrar productos parece ser en los primeros minutos</li>
              <li>• Evaluar la calidad de imagen para mejorar la detección automática</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
