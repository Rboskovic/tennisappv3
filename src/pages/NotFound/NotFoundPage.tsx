import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "../../shared/components/ui/Button";

export default function NotFoundPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="min-h-full flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-primary-600 mb-4">404</div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          Stranica nije pronađena
        </h1>
        <p className="text-neutral-600 mb-6">
          Stranica koju tražite ne postoji ili je promenjena.
        </p>
        <div className="space-y-3">
          <Button 
            onClick={() => navigate("/")}
            className="w-full"
          >
            <Home className="w-4 h-4 mr-2" />
            Idi na početnu
          </Button>
          <Button 
            variant="secondary"
            onClick={() => navigate(-1)}
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Vrati se nazad
          </Button>
        </div>
      </div>
    </div>
  );
}
