
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoAnalysis } from "@/components/VideoAnalysis";
import { ProductDetection } from "@/components/ProductDetection";
import { AnalysisReport } from "@/components/AnalysisReport";
import { Upload, Play, Search, BarChart3, Clock, Eye } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [activeTab, setActiveTab] = useState("analyze");

  const handleAnalyzeVideo = async () => {
    if (!videoUrl) {
      toast.error("Por favor ingresa una URL de YouTube válida");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simular progreso de análisis
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 1000);

    try {
      // Aquí iría la lógica real de análisis con Google Gemini
      setTimeout(() => {
        setAnalysisProgress(100);
        setAnalysisResults({
          videoTitle: "Video de muestra - Análisis completado",
          duration: "5:32",
          totalDetections: 23,
          uniqueProducts: 3,
          totalTime: "2:45",
          products: [
            {
              name: "Producto A",
              detections: 12,
              totalTime: "1:30",
              confidence: 95,
              timestamps: ["0:15", "1:22", "2:45", "3:10"]
            },
            {
              name: "Producto B", 
              detections: 8,
              totalTime: "0:55",
              confidence: 87,
              timestamps: ["0:45", "1:55", "3:20"]
            },
            {
              name: "Producto C",
              detections: 3,
              totalTime: "0:20",
              confidence: 92,
              timestamps: ["2:10"]
            }
          ]
        });
        setIsAnalyzing(false);
        setActiveTab("results");
        toast.success("¡Análisis completado exitosamente!");
      }, 5000);
    } catch (error) {
      toast.error("Error durante el análisis");
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Brand Vision AI
                </h1>
                <p className="text-sm text-gray-600">Detección inteligente de productos en videos</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Google AI Conectado
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="analyze" className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Analizar Video</span>
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Resultados</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Reportes</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyze" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-blue-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5 text-blue-600" />
                  <span>Análisis de Video de YouTube</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      URL del Video de YouTube
                    </label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className="flex-1"
                        disabled={isAnalyzing}
                      />
                      <Button 
                        onClick={handleAnalyzeVideo}
                        disabled={isAnalyzing || !videoUrl}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Analizando...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Analizar
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {isAnalyzing && (
                    <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-700">
                          Procesando video con Google Gemini AI...
                        </span>
                        <span className="text-sm text-blue-600">
                          {Math.round(analysisProgress)}%
                        </span>
                      </div>
                      <Progress value={analysisProgress} className="h-2" />
                      <div className="text-xs text-blue-600">
                        {analysisProgress < 30 && "Extrayendo frames del video..."}
                        {analysisProgress >= 30 && analysisProgress < 60 && "Analizando imágenes con IA..."}
                        {analysisProgress >= 60 && analysisProgress < 90 && "Detectando productos..."}
                        {analysisProgress >= 90 && "Generando reporte final..."}
                      </div>
                    </div>
                  )}
                </div>

                <VideoAnalysis />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            {analysisResults ? (
              <ProductDetection results={analysisResults} />
            ) : (
              <Card className="bg-white/60 backdrop-blur-sm border-blue-100 shadow-lg">
                <CardContent className="py-12 text-center">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No hay resultados disponibles. Analiza un video primero.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            {analysisResults ? (
              <AnalysisReport results={analysisResults} />
            ) : (
              <Card className="bg-white/60 backdrop-blur-sm border-blue-100 shadow-lg">
                <CardContent className="py-12 text-center">
                  <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No hay reportes disponibles. Analiza un video primero.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
