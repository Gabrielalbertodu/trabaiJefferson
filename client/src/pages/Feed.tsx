import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "wouter";
import { Laugh, Home, Upload, User, Heart, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { mockMemes, getComentariosByMemeId } from "@/lib/mockData";

export default function Feed() {
  const { user } = useAuth();
  const [comentarioTexto, setComentarioTexto] = useState<Record<number, string>>({});
  const [memeExpandido, setMemeExpandido] = useState<number | null>(null);
  const [memes, setMemes] = useState(mockMemes);

  const handleVotar = (memeId: number) => {
    setMemes(prev => prev.map(m => 
      m.id === memeId ? { ...m, curtidasCount: m.curtidasCount + 1 } : m
    ));
    toast.success("Curtida adicionada!");
  };

  const handleComentar = (memeId: number) => {
    const texto = comentarioTexto[memeId]?.trim();
    if (!texto) {
      toast.error("Digite um comentário");
      return;
    }
    
    setMemes(prev => prev.map(m => 
      m.id === memeId ? { ...m, comentariosCount: m.comentariosCount + 1 } : m
    ));
    setComentarioTexto({ ...comentarioTexto, [memeId]: "" });
    toast.success("Comentário adicionado!");
  };

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
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                <Home className="w-4 h-4 mr-2" />
                Início
              </Button>
            </Link>
            <Link href="/upload">
              <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </Link>
            <Link href="/perfil">
              <Button variant="ghost" size="sm" className="rounded-full">
                <User className="w-4 h-4" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Feed */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Feed de Memes
            </span>
          </h2>
          <p className="text-muted-foreground">Descubra os melhores memes da comunidade</p>
        </div>

        <div className="space-y-6">
          {memes.map((meme) => (
            <Card key={meme.id} className="bg-card border-border/50 overflow-hidden hover:border-primary/30 transition-all">
              {/* Header do Card */}
              <div className="p-4 flex items-center justify-between border-b border-border/50">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border-2 border-primary/30">
                    <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                      {user?.username?.[0]?.toUpperCase() || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">
                      @{user?.username || "Anônimo"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {meme.criadoEm.toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Imagem do Meme */}
              <div className="relative bg-background/50">
                <img
                  src={meme.imagemUrl}
                  alt={meme.titulo || "Meme"}
                  className="w-full max-h-[600px] object-contain"
                />
              </div>

              {/* Conteúdo */}
              <div className="p-4 space-y-4">
                {meme.titulo && (
                  <h3 className="text-lg font-bold text-foreground">{meme.titulo}</h3>
                )}
                {meme.descricao && (
                  <p className="text-muted-foreground">{meme.descricao}</p>
                )}

                {/* Ações */}
                <div className="flex items-center gap-4 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVotar(meme.id)}
                    className="text-muted-foreground hover:text-primary gap-2"
                  >
                    <Heart className="w-5 h-5" />
                    <span className="font-semibold">{meme.curtidasCount}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMemeExpandido(memeExpandido === meme.id ? null : meme.id)}
                    className="text-muted-foreground hover:text-secondary gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-semibold">{meme.comentariosCount}</span>
                  </Button>
                </div>

                {/* Seção de Comentários */}
                {memeExpandido === meme.id && (
                  <div className="pt-4 border-t border-border/50 space-y-4">
                    {/* Comentários Existentes */}
                    {getComentariosByMemeId(meme.id).length > 0 && (
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {getComentariosByMemeId(meme.id).map((comentario) => (
                          <div key={comentario.id} className="flex gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-secondary/20 text-secondary text-xs">
                                {user?.username?.[0]?.toUpperCase() || "?"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-foreground">
                                @{user?.username || "Anônimo"}
                              </p>
                              <p className="text-sm text-muted-foreground">{comentario.texto}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Adicionar Comentário */}
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Adicione um comentário..."
                        value={comentarioTexto[meme.id] || ""}
                        onChange={(e) =>
                          setComentarioTexto({ ...comentarioTexto, [meme.id]: e.target.value })
                        }
                        className="min-h-[60px] bg-background border-border/50 focus:border-primary"
                        rows={2}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleComentar(meme.id)}
                        className="bg-primary hover:bg-primary/90 rounded-full"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
