import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Laugh, Upload, Users, Shield, TrendingUp, Sparkles } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
            {isAuthenticated ? (
              <>
                <Link href="/feed">
                  <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                    Feed
                  </Button>
                </Link>
                <Link href="/upload">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </Link>
                <Link href="/perfil">
                  <Button variant="outline" size="sm" className="rounded-full border-primary/50">
                    Perfil
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/feed">
                  <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                    Explorar
                  </Button>
                </Link>
                <a href={getLoginUrl()}>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full">
                    Entrar
                  </Button>
                </a>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Diagonal Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/20"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(165deg, 
              hsl(var(--background)) 0%, 
              hsl(var(--background)) 55%, 
              hsl(var(--primary)) 55%, 
              hsl(var(--primary)) 100%)`
          }}
        ></div>

        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Logo Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary via-secondary to-accent rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/30 animate-float">
                <Laugh className="w-14 h-14 text-white" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Compartilhe Memes,
              </span>
              <br />
              <span className="text-foreground">Espalhe Alegria</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              A plataforma definitiva para criar, compartilhar e descobrir os melhores memes da internet
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href="/feed">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all hover:scale-105">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Ver Feed
                </Button>
              </Link>
              {!isAuthenticated && (
                <a href={getLoginUrl()}>
                  <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg font-semibold border-2 border-primary/50 hover:bg-primary/10">
                    Começar Agora
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Recursos Incríveis
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Tudo que você precisa para uma experiência completa de memes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <Card className="bg-card border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/20 group">
              <CardContent className="pt-8 pb-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/50 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-primary/40 transition-all group-hover:scale-110">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Upload Fácil</h3>
                <p className="text-muted-foreground">
                  Faça upload dos seus memes favoritos em segundos e compartilhe com o mundo
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-card border-border/50 hover:border-secondary/50 transition-all hover:shadow-lg hover:shadow-secondary/20 group">
              <CardContent className="pt-8 pb-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/50 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-secondary/40 transition-all group-hover:scale-110">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Sistema de Votos</h3>
                <p className="text-muted-foreground">
                  Vote nos melhores memes e ajude a comunidade a descobrir conteúdo de qualidade
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-card border-border/50 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/20 group">
              <CardContent className="pt-8 pb-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/50 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-accent/40 transition-all group-hover:scale-110">
                  <Users className="w-8 h-8 text-background" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Grupos Privados</h3>
                <p className="text-muted-foreground">
                  Crie grupos privados e compartilhe memes exclusivos com seus amigos
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <Shield className="w-16 h-16 text-primary mx-auto" />
            <h2 className="text-4xl md:text-5xl font-bold">
              Pronto para se Divertir?
            </h2>
            <p className="text-xl text-muted-foreground">
              Junte-se a milhares de usuários que já estão compartilhando risadas
            </p>
            {!isAuthenticated && (
              <a href={getLoginUrl()}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 py-6 text-lg font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all hover:scale-105">
                  Criar Conta Grátis
                </Button>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Laugh className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-foreground">GONME</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 GONME - Aplicativo de Memes. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
