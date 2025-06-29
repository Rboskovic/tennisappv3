import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="text-6xl font-bold text-red-600 mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">
              Došlo je do greške
            </h1>
            <p className="text-neutral-600 mb-6">
              Nešto je pošlo po zlu. Pokušajte da osvežite stranicu.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Osveži stranicu
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
