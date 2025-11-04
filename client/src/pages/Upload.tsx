import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Link, useLocation } from "wouter";
import { Laugh, Home, Upload as UploadIcon, ImagePlus, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";

export default function Upload() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const { data: perfil } = trpc.perfil.obter.useQuery(undefined, { enabled: isAuthenticated });

  const uploadMutation = trpc.memes.criar.useMutation({
    onSuccess: () => {
      toast.success("Meme publicado com sucesso!");
      setTitulo("");
      setDescricao("");
      setArquivo(null);
      setPreview(null);
      setLocation("/feed");
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao publicar meme");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecione uma imagem");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Imagem muito grande (máx 10MB)");
      return;
    }

    setArquivo(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Faça login para publicar");
      return;
    }

    if (!perfil) {
      toast.error("Crie um perfil primeiro");
      setLocation("/perfil");
      return;
    }

    if (!arquivo) {
      toast.error("Selecione uma imagem");
      return;
    }

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        uploadMutation.mutate({
          titulo: titulo || undefined,
          descricao: descricao || undefined,
          imagemBase64: base64,
          visibilidade: "publico",
        });
        setUploading(false);
      };
      reader.readAsDataURL(arquivo);
    } catch (error) {
      setUploading(false);
      toast.error("Erro ao processar imagem");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md bg-card border-border/50">
          <CardContent className="pt-8 pb-8 text-center space-y-4">
            <UploadIcon className="w-16 h-16 text-primary mx-auto" />
            <h2 className="text-2xl font-bold">Acesso Restrito</h2>
            <p className="text-muted-foreground">Faça login para publicar memes</p>
            <a href={getLoginUrl()}>
              <Button className="bg-primary hover:bg-primary/90 rounded-full">Entrar</Button>
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <Link href="/feed">
              <Button variant="ghost" size="sm">Feed</Button>
            </Link>
            <Link href="/perfil">
              <Button variant="outline" size="sm" className="rounded-full border-primary/50">
                Perfil
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Upload Form */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="bg-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <UploadIcon className="w-6 h-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Publicar Meme
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Preview da Imagem */}
              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full max-h-96 object-contain rounded-lg border-2 border-border/50"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 rounded-full"
                    onClick={() => {
                      setArquivo(null);
                      setPreview(null);
                    }}
                  >
                    Remover
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border/50 rounded-lg p-12 text-center hover:border-primary/50 transition-all cursor-pointer bg-background/50">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <ImagePlus className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-semibold text-foreground mb-2">
                      Clique para selecionar uma imagem
                    </p>
                    <p className="text-sm text-muted-foreground">
                      PNG, JPG, GIF até 10MB
                    </p>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {/* Título */}
              <div>
                <Label htmlFor="titulo" className="text-foreground">
                  Título (opcional)
                </Label>
                <Input
                  id="titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Dê um título ao seu meme"
                  maxLength={200}
                  className="bg-background border-border/50 focus:border-primary"
                />
              </div>

              {/* Descrição */}
              <div>
                <Label htmlFor="descricao" className="text-foreground">
                  Descrição (opcional)
                </Label>
                <Textarea
                  id="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Adicione uma descrição ou contexto"
                  rows={4}
                  className="bg-background border-border/50 focus:border-primary"
                />
              </div>

              {/* Botões */}
              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={!arquivo || uploading || uploadMutation.isPending}
                  className="flex-1 bg-primary hover:bg-primary/90 rounded-full py-6 text-lg font-semibold"
                >
                  {uploading || uploadMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Publicando...
                    </>
                  ) : (
                    <>
                      <UploadIcon className="w-5 h-5 mr-2" />
                      Publicar Meme
                    </>
                  )}
                </Button>
                <Link href="/feed">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full border-border/50"
                  >
                    Cancelar
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Dicas */}
        <Card className="mt-6 bg-card/50 border-border/30">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Laugh className="w-5 h-5 text-secondary" />
              Dicas para um meme de sucesso
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Use imagens de alta qualidade e bem iluminadas</li>
              <li>• Adicione um título criativo e chamativo</li>
              <li>• Seja original e autêntico</li>
              <li>• Respeite as regras da comunidade</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
