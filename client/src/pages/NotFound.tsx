import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { Laugh, Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="bg-card border-border/50">
          <CardContent className="pt-12 pb-12 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-destructive to-destructive/50 rounded-3xl flex items-center justify-center shadow-2xl shadow-destructive/30 animate-pulse">
                <AlertCircle className="w-14 h-14 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-6xl font-extrabold">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  404
                </span>
              </h1>
              <h2 className="text-3xl font-bold text-foreground">Página Não Encontrada</h2>
            </div>

            <p className="text-xl text-muted-foreground max-w-md mx-auto">
              Ops! Parece que você se perdeu no mundo dos memes. Esta página não existe.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 rounded-full px-8"
                onClick={() => setLocation("/")}
              >
                <Home className="w-5 h-5 mr-2" />
                Voltar ao Início
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-8 border-primary/50"
                onClick={() => setLocation("/feed")}
              >
                <Laugh className="w-5 h-5 mr-2" />
                Ver Feed
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
