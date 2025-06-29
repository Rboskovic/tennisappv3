import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppLayout } from "./shared/components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import { Users, MapPin, Settings } from "lucide-react";

const queryClient = new QueryClient();

// Match page with custom header
function MatchPage() {
  return (
    <div className="p-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
        <h3 className="font-semibold text-blue-900 mb-2">Pronađi Meč</h3>
        <p className="text-blue-700">Ovde ćete moći da pronađete protivnike za tenis.</p>
      </div>
    </div>
  );
}

// Courts page
function CourtsPage() {
  return (
    <div className="p-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <MapPin className="w-12 h-12 mx-auto mb-4 text-green-600" />
        <h3 className="font-semibold text-green-900 mb-2">Rezerviši Teren</h3>
        <p className="text-green-700">Ovde ćete moći da rezervišete terene.</p>
      </div>
    </div>
  );
}

// Profile page with custom right content
function ProfilePage() {
  const rightContent = (
    <button className="p-2 hover:bg-gray-100 rounded-lg">
      <Settings className="w-5 h-5 text-gray-600" />
    </button>
  );

  return (
    <AppLayout headerRightContent={rightContent}>
      <div className="p-6">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-xl font-bold">MP</span>
          </div>
          <h3 className="font-semibold text-purple-900 mb-2">Marko Petrović</h3>
          <p className="text-purple-700">Vaš korisnički profil i statistike.</p>
        </div>
      </div>
    </AppLayout>
  );
}

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Home route with special header */}
          <Route 
            path="/" 
            element={
              <AppLayout>
                <HomePage />
              </AppLayout>
            } 
          />
          
          {/* Standard pages with auto header */}
          <Route 
            path="/match" 
            element={
              <AppLayout>
                <MatchPage />
              </AppLayout>
            } 
          />
          
          <Route 
            path="/courts" 
            element={
              <AppLayout>
                <CourtsPage />
              </AppLayout>
            } 
          />
          
          {/* Profile with custom header content */}
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
