import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CardSearchOutput from "./pages/CardSearchOutput";
import CardFrontPage from "./pages/CardFrontPage";
import CardBackPage from "./pages/CardBackPage";
import CardPage from "./pages/CardPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/card-overview" element={<CardSearchOutput />} />
          <Route path="/card-front" element={<CardFrontPage />} />
          <Route path="/card-back" element={<CardBackPage />} />
          <Route path="/card" element={<CardPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;