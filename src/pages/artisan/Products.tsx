import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter, Grid, List, ArrowLeft } from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Products = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [gridView, setGridView] = useState(true);

  const content = {
    en: {
      products: "My Products",
      searchProducts: "Search products...",
      addNew: "Add New Product",
      filters: "Filters",
      gridView: "Grid View",
      listView: "List View",
      productName: "Product Name",
      price: "Price",
      status: "Status",
      actions: "Actions",
      noProducts: "No products found."
    },
    hi: {
      products: "मेरे उत्पाद",
      searchProducts: "उत्पादों को खोजें...",
      addNew: "नया उत्पाद जोड़ें",
      filters: "फिल्टर",
      gridView: "ग्रिड दृश्य",
      listView: "सूची दृश्य",
      productName: "उत्पाद का नाम",
      price: "कीमत",
      status: "स्थिति",
      actions: "कार्य",
      noProducts: "कोई उत्पाद नहीं मिला."
    }
  };

  const products = [
    {
      id: 1,
      name: "Hand Embroidered Kurta",
      price: "₹2,500",
      status: "Active"
    },
    {
      id: 2,
      name: "Chikankari Saree",
      price: "₹4,500",
      status: "Inactive"
    },
    {
      id: 3,
      name: "Lucknowi Dupatta",
      price: "₹1,200",
      status: "Active"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="flex items-center gap-4 max-w-md mx-auto">
          <Link to="/artisan/dashboard" className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6 text-indigo-600" />
          </Link>
          <h1 className={cn(
            "text-xl font-bold text-indigo-900",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            {content[language].products}
          </h1>
          <LanguageToggle language={language} onLanguageChange={setLanguage} />
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Search & Add New */}
        <div className="flex items-center justify-between">
          <Input
            className="w-full mr-4"
            placeholder={content[language].searchProducts}
          />
          <Link to="/artisan/products/new">
            <Button className={cn(
              "bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2",
              language === 'hi' ? 'hindi-text' : ''
            )}>
              <Plus className="w-4 h-4" />
              {content[language].addNew}
            </Button>
          </Link>
        </div>

        {/* Filters & View Toggle */}
        <div className="flex items-center justify-between">
          <Button variant="outline" className={cn(
            "flex items-center gap-2",
            language === 'hi' ? 'hindi-text' : ''
          )}>
            <Filter className="w-4 h-4" />
            {content[language].filters}
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              variant={gridView ? "default" : "outline"}
              onClick={() => setGridView(true)}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={!gridView ? "default" : "outline"}
              onClick={() => setGridView(false)}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Product List / Grid */}
        {gridView ? (
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <Card key={product.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-3">
                  <h3 className={cn(
                    "font-medium text-indigo-900 truncate",
                    language === 'hi' ? 'hindi-text' : ''
                  )}>
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600">{product.price}</p>
                  <p className="text-xs text-gray-500">{product.status}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-md overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="py-3 px-4">{content[language].productName}</th>
                  <th className="py-3 px-4">{content[language].price}</th>
                  <th className="py-3 px-4">{content[language].status}</th>
                  <th className="py-3 px-4">{content[language].actions}</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="bg-white border-b">
                    <td className="py-4 px-4 font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="py-4 px-4">{product.price}</td>
                    <td className="py-4 px-4">{product.status}</td>
                    <td className="py-4 px-4">
                      <Button variant="ghost">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {products.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="text-center py-8">
              <Search className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className={cn(
                "text-gray-600",
                language === 'hi' ? 'hindi-text' : ''
              )}>
                {content[language].noProducts}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <MobileNav language={language} />
    </div>
  );
};

export default Products;
