
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { useFavicon } from "@/hooks/useFavicon";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PhoneAuth from "./pages/auth/PhoneAuth";
import CustomerProfileSetup from "./pages/auth/CustomerProfileSetup";
import ArtisanProfileSetup from "./pages/auth/ArtisanProfileSetup";
import DesignerProfileSetup from "./pages/auth/DesignerProfileSetup";
import ArtisanDashboard from "./pages/artisan/Dashboard";
import ArtisanProfile from "./pages/artisan/Profile";
import DesignerDashboard from "./pages/designer/Dashboard";
import Products from "./pages/artisan/Products";
import ProductUpload from "./pages/artisan/ProductUpload";
import Orders from "./pages/artisan/Orders";
import Marketplace from "./pages/marketplace/Marketplace";
import ProductDetails from "./pages/marketplace/ProductDetails";
import LearningCenter from "./pages/learn/LearningCenter";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import CustomerDashboard from "./pages/customer/Dashboard";
import CustomerProfile from "./pages/customer/Profile";

const queryClient = new QueryClient();

const AppContent = () => {
  // Hook to update favicon based on theme
  useFavicon();

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/phone" element={<PhoneAuth />} />
          <Route path="/auth/setup/customer" element={<CustomerProfileSetup />} />
          <Route path="/auth/setup/artisan" element={<ArtisanProfileSetup />} />
          <Route path="/auth/setup/designer" element={<DesignerProfileSetup />} />
          <Route path="/artisan/dashboard" element={<ArtisanDashboard />} />
          <Route path="/artisan/profile" element={<ArtisanProfile />} />
          <Route path="/artisan/products" element={<Products />} />
          <Route path="/artisan/products/new" element={<ProductUpload />} />
          <Route path="/artisan/orders" element={<Orders />} />
          <Route path="/designer/dashboard" element={<DesignerDashboard />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/profile" element={<CustomerProfile />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/product/:id" element={<ProductDetails />} />
          <Route path="/learn" element={<LearningCenter />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AppContent />
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
