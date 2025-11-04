import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Laugh, Home, Construction } from "lucide-react";

export default function Perfil() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary/50 transition-all">
                <Laugh className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                GONME
              </h1>
            </div>
          </Link>
          <nav className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                <Home className="w-4 h-4 mr-2" />
                Início
              </Button>
            </Link>
            <Link href="/feed">
              <Button variant="ghost" size="sm">Feed</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="bg-card border-border/50">
          <CardContent className="pt-12 pb-12 text-center space-y-4">
            <Construction className="w-16 h-16 text-accent mx-auto" />
            <h2 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Perfil de Usuário
              </span>
            </h2>
            <p className="text-muted-foreground">Funcionalidade em desenvolvimento</p>
            <Link href="/feed">
              <Button className="bg-primary hover:bg-primary/90 rounded-full mt-4">
                Voltar ao Feed
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
