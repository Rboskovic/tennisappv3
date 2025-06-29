// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppLayout } from "./shared/components/layout/AppLayout";
import { HomePage } from "./pages/HomePage";
import { MatchPage } from "./pages/MatchPage";
import { CourtsPage } from "./pages/CourtsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CourtReservationPage } from "./features/courts/pages/CourtReservationPage";

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/match" element={<MatchPage />} />
            <Route path="/courts" element={<CourtsPage />} />
            <Route path="/courts/reserve" element={<CourtReservationPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
