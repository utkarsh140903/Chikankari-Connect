import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, ArrowLeft, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageToggle } from "@/components/LanguageToggle";
import { cn } from "@/lib/utils";

const ProductUpload = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [step, setStep] = useState(1);
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    images: [] as File[]
  });

  const content = {
    en: {
      addProduct: "Add New Product",
      photos: "Product Photos",
      details: "Product Details",
      takePhoto: "Take Photo",
      uploadPhoto: "Upload from Gallery",
      productName: "Product Name",
      price: "Price (₹)",
      description: "Description",
      category: "Category",
      next: "Next",
      publish: "Publish Product",
      step: "Step"
    },
    hi: {
      addProduct: "नया उत्पाद जोड़ें",
      photos: "उत्पाद की तस्वीरें",
      details: "उत्पाद विवरण",
      takePhoto: "फोटो लें",
      uploadPhoto: "गैलरी से अपलोड करें",
      productName: "उत्पाद का नाम",
      price: "कीमत (₹)",
      description: "विवरण",
      category: "श्रेणी",
      next: "अगला",
      publish: "उत्पाद प्रकाशित करें",
      step: "चरण"
    }
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      // Publish product and navigate back
      window.location.href = '/artisan/products';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="flex items-center gap-4 max-w-md mx-auto">
          <Link to="/artisan/products" className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6 text-indigo-600" />
          </Link>
          <div className="flex-1">
            <h1 className={cn(
              "text-xl font-bold text-indigo-900",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {content[language].addProduct}
            </h1>
            <p className="text-sm text-gray-600">
              {content[language].step} {step} / 2
            </p>
          </div>
          <LanguageToggle language={language} onLanguageChange={setLanguage} />
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className={cn(
              "text-lg text-indigo-900",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              {step === 1 ? content[language].photos : content[language].details}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 1 && (
              <>
                {/* Photo Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className={cn(
                    "text-gray-600 mb-4",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    Add up to 5 photos of your product
                  </p>
                  <div className="space-y-2">
                    <Button className={cn(
                      "w-full bg-indigo-600 hover:bg-indigo-700",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      <Camera className="w-4 h-4 mr-2" />
                      {content[language].takePhoto}
                    </Button>
                    <Button variant="outline" className={cn(
                      "w-full",
                      language === 'hi' ? 'hindi-text' : ''
                    )}>
                      <Upload className="w-4 h-4 mr-2" />
                      {content[language].uploadPhoto}
                    </Button>
                  </div>
                </div>

                {/* Photo Tips */}
                <div className="bg-indigo-50 rounded-lg p-4">
                  <h4 className="font-semibold text-indigo-900 mb-2">Photography Tips:</h4>
                  <ul className="text-sm text-indigo-700 space-y-1">
                    <li>• Use natural lighting</li>
                    <li>• Show different angles</li>
                    <li>• Include close-up details</li>
                    <li>• Keep background clean</li>
                  </ul>
                </div>
              </>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className={cn(
                    "text-sm font-medium text-gray-700",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].productName}
                  </label>
                  <Input
                    value={productData.name}
                    onChange={(e) => setProductData({...productData, name: e.target.value})}
                    placeholder="Traditional White Kurta"
                  />
                </div>

                <div className="space-y-2">
                  <label className={cn(
                    "text-sm font-medium text-gray-700",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].price}
                  </label>
                  <Input
                    type="number"
                    value={productData.price}
                    onChange={(e) => setProductData({...productData, price: e.target.value})}
                    placeholder="2500"
                  />
                </div>

                <div className="space-y-2">
                  <label className={cn(
                    "text-sm font-medium text-gray-700",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].description}
                  </label>
                  <Textarea
                    value={productData.description}
                    onChange={(e) => setProductData({...productData, description: e.target.value})}
                    placeholder="Beautiful hand-embroidered kurta with traditional chikankari work..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <label className={cn(
                    "text-sm font-medium text-gray-700",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {content[language].category}
                  </label>
                  <Input
                    value={productData.category}
                    onChange={(e) => setProductData({...productData, category: e.target.value})}
                    placeholder="Kurta, Saree, Dupatta..."
                  />
                </div>
              </div>
            )}

            <Button 
              onClick={handleNext}
              className={cn(
                "w-full bg-indigo-600 hover:bg-indigo-700",
                language === 'hi' ? 'hindi-text' : ''
              )}
            >
              {step === 2 ? content[language].publish : content[language].next}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductUpload;
