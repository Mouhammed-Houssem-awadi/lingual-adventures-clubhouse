
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WordWizardGame from "./pages/games/WordWizardGame";
import SentenceBuilderGame from "./pages/games/SentenceBuilderGame";
import GrammarCastleGame from "./pages/games/GrammarCastleGame";
import PronunciationPalaceGame from "./pages/games/PronunciationPalaceGame";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/games/word-wizard" element={<WordWizardGame />} />
          <Route path="/games/sentence-builder" element={<SentenceBuilderGame />} />
          <Route path="/games/grammar-castle" element={<GrammarCastleGame />} />
          <Route path="/games/pronunciation-palace" element={<PronunciationPalaceGame />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
