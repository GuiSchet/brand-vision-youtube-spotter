
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, X, Plus, Image as ImageIcon, Save } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  image: string;
  confidence: number;
  isActive: boolean;
}

interface ProductManagerProps {
  onProductsChange: (products: Product[]) => void;
}

export const ProductManager = ({ onProductsChange }: ProductManagerProps) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Producto A",
      image: "/placeholder.svg",
      confidence: 85,
      isActive: true
    },
    {
      id: "2", 
      name: "Producto B",
      image: "/placeholder.svg",
      confidence: 90,
      isActive: true
    }
  ]);
  
  const [newProductName, setNewProductName] = useState("");
  const [newProductImage, setNewProductImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewProductImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Por favor selecciona una imagen válida");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const addProduct = () => {
    if (!newProductName || !newProductImage) {
      toast.error("Por favor completa el nombre y la imagen del producto");
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: newProductName,
      image: newProductImage,
      confidence: 85,
      isActive: true
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    onProductsChange(updatedProducts);
    
    setNewProductName("");
    setNewProductImage(null);
    toast.success("Producto agregado exitosamente");
  };

  const removeProduct = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    onProductsChange(updatedProducts);
    toast.success("Producto eliminado");
  };

  const toggleProduct = (id: string) => {
    const updatedProducts = products.map(p => 
      p.id === id ? { ...p, isActive: !p.isActive } : p
    );
    setProducts(updatedProducts);
    onProductsChange(updatedProducts);
  };

  const updateConfidence = (id: string, confidence: number) => {
    const updatedProducts = products.map(p => 
      p.id === id ? { ...p, confidence } : p
    );
    setProducts(updatedProducts);
    onProductsChange(updatedProducts);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ImageIcon className="h-5 w-5 text-blue-600" />
          <span>Gestión de Productos de Referencia</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="manage" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manage">Productos Activos</TabsTrigger>
            <TabsTrigger value="add">Agregar Producto</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manage" className="space-y-4">
            {products.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No hay productos configurados
              </div>
            ) : (
              <div className="grid gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`p-4 border rounded-lg transition-all ${
                      product.isActive 
                        ? 'border-blue-200 bg-blue-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{product.name}</h4>
                        <div className="flex items-center space-x-2 mt-2">
                          <Label className="text-xs">Confianza mínima:</Label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={product.confidence}
                            onChange={(e) => updateConfidence(product.id, parseInt(e.target.value))}
                            className="w-16 h-6 text-xs"
                          />
                          <span className="text-xs text-gray-500">%</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={product.isActive ? "default" : "secondary"}
                          className={product.isActive ? "bg-green-100 text-green-700" : ""}
                        >
                          {product.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleProduct(product.id)}
                        >
                          {product.isActive ? "Desactivar" : "Activar"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeProduct(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="add" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="productName">Nombre del Producto</Label>
                <Input
                  id="productName"
                  placeholder="Ej: iPhone 15, Coca Cola, etc."
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Imagen del Producto</Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  {newProductImage ? (
                    <div className="space-y-4">
                      <img
                        src={newProductImage}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg mx-auto border"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setNewProductImage(null)}
                      >
                        Cambiar imagen
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-gray-600">
                          Arrastra una imagen aquí o{" "}
                          <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
                            selecciona un archivo
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(file);
                              }}
                            />
                          </label>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          PNG, JPG hasta 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <Button
                onClick={addProduct}
                disabled={!newProductName || !newProductImage}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Producto
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
