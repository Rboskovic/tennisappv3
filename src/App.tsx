import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppLayout } from "./shared/components/layout/AppLayout";
import { HomePage } from "./components/HomePage/HomePage";
import { Users, MapPin } from "lucide-react";

const queryClient = new QueryClient();

function MatchPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Pronađi Meč</h2>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
        <h3 className="font-semibold text-blue-900 mb-2">Pronađi protivnike</h3>
        <p className="text-blue-700 mb-4">Ovde ćete moći da pronađete protivnike za tenis.</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Započni pretragu
        </button>
      </div>
    </div>
  );
}

function CourtsPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Tereni</h2>
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <MapPin className="w-12 h-12 mx-auto mb-4 text-green-600" />
        <h3 className="font-semibold text-green-900 mb-2">Rezerviši teren</h3>
        <p className="text-green-700 mb-4">Ovde ćete moći da rezervišete terene.</p>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Vidi dostupne terene
        </button>
      </div>
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Profil</h2>
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-white text-xl font-bold">MP</span>
        </div>
        <h3 className="font-semibold text-purple-900 mb-2">Marko Petrović</h3>
        <p className="text-purple-700 mb-4">Vaš korisnički profil i statistike.</p>
        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          Uredi profil
        </button>
      </div>
    </div>
  );
}

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/match" element={<MatchPage />} />
            <Route path="/courts" element={<CourtsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
