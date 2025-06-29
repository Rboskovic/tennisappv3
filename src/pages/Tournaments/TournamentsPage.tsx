import React from "react";
import { Routes, Route } from "react-router-dom";
import { Construction } from "lucide-react";

function TournamentsLanding() {
  return (
    <div className="min-h-full flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Construction className="w-8 h-8 text-primary-600" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Turniri</h1>
        <p className="text-neutral-600 mb-6">Ovde ćete moći da se prijavite na turnire i lige.</p>
        <div className="bg-neutral-100 rounded-lg p-4">
          <p className="text-sm text-neutral-700">
            Ova stranica je u razvoju i biće dostupna uskoro.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TournamentsPage(): JSX.Element {
  return (
    <Routes>
      <Route index element={<TournamentsLanding />} />
    </Routes>
  );
}
