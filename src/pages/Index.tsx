
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
import { Upload, Play, Search, BarChart3, Clock, Eye, LogOut, Zap } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, logout } = useAuth();
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header con estilo FlockIT */}
      <div className="flockit-gradient shadow-xl border-b border-blue-900/20 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 flockit-orange-gradient rounded-2xl flex items-center justify-center shadow-lg">
                <Eye className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Brand Vision AI
                </h1>
                <p className="text-blue-100 font-medium">Detección inteligente de productos en videos</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <Badge variant="outline" className="bg-green-500/20 text-green-100 border-green-400/30 px-4 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Google AI Conectado
              </Badge>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-white font-medium">Bienvenido</p>
                  <p className="text-blue-100 text-sm">{user}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="text-blue-100 hover:text-white hover:bg-white/10 rounded-xl"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm shadow-lg border border-slate-200/50 rounded-2xl p-2">
            <TabsTrigger value="analyze" className="flex items-center space-x-3 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white">
              <Search className="h-4 w-4" />
              <span className="font-medium">Analizar Video</span>
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center space-x-3 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4" />
              <span className="font-medium">Resultados</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-3 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white">
              <Clock className="h-4 w-4" />
              <span className="font-medium">Reportes</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyze" className="space-y-8">
            <Card className="bg-white/90 backdrop-blur-sm border-slate-200/50 shadow-2xl rounded-3xl card-hover">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <div className="w-8 h-8 flockit-orange-gradient rounded-lg flex items-center justify-center">
                    <Upload className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-slate-800">Análisis de Video de YouTube</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700 flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-accent" />
                      <span>URL del Video de YouTube</span>
                    </label>
                    <div className="flex space-x-3">
                      <Input
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className="flex-1 h-12 rounded-xl border-slate-200 focus:border-primary focus:ring-primary"
                        disabled={isAnalyzing}
                      />
                      <Button 
                        onClick={handleAnalyzeVideo}
                        disabled={isAnalyzing || !videoUrl}
                        className="flockit-orange-gradient hover:opacity-90 h-12 px-8 rounded-xl font-semibold shadow-lg"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Analizando...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Analizar Video
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {isAnalyzing && (
                    <div className="space-y-4 p-6 flockit-gradient rounded-2xl border border-blue-900/20">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white flex items-center space-x-2">
                          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                          <span>Procesando video con Google Gemini AI...</span>
                        </span>
                        <span className="text-sm font-bold text-accent">
                          {Math.round(analysisProgress)}%
                        </span>
                      </div>
                      <Progress value={analysisProgress} className="h-3 bg-blue-900/30" />
                      <div className="text-xs text-blue-100 font-medium">
                        {analysisProgress < 30 && "🎬 Extrayendo frames del video..."}
                        {analysisProgress >= 30 && analysisProgress < 60 && "🤖 Analizando imágenes con IA..."}
                        {analysisProgress >= 60 && analysisProgress < 90 && "🔍 Detectando productos..."}
                        {analysisProgress >= 90 && "📊 Generando reporte final..."}
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
              <Card className="bg-white/90 backdrop-blur-sm border-slate-200/50 shadow-2xl rounded-3xl">
                <CardContent className="py-16 text-center">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BarChart3 className="h-10 w-10 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">No hay resultados disponibles</h3>
                  <p className="text-slate-500">Analiza un video primero para ver los resultados aquí.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            {analysisResults ? (
              <AnalysisReport results={analysisResults} />
            ) : (
              <Card className="bg-white/90 backdrop-blur-sm border-slate-200/50 shadow-2xl rounded-3xl">
                <CardContent className="py-16 text-center">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="h-10 w-10 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">No hay reportes disponibles</h3>
                  <p className="text-slate-500">Analiza un video primero para generar reportes detallados.</p>
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
