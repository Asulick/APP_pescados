import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarContent, AvatarFallback } from "./ui/avatar";
import { 
  MessageSquare, 
  Send, 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Clock,
  User,
  Users,
  Filter
} from "lucide-react";
import { toast } from "sonner@2.0.3";

// Função simples para formatar data
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

interface Mensagem {
  id: string;
  remetente: string;
  destinatario: string | "todos";
  setor: string;
  assunto: string;
  conteudo: string;
  timestamp: string;
  prioridade: 'baixa' | 'normal' | 'alta' | 'urgente';
  tipo: 'mensagem' | 'alerta' | 'notificacao';
  lida: boolean;
  respondida?: boolean;
}

interface Notificacao {
  id: string;
  titulo: string;
  conteudo: string;
  tipo: 'info' | 'alerta' | 'sucesso' | 'erro';
  timestamp: string;
  lida: boolean;
  setor: string;
}

export function ComunicacaoIntegrada() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    {
      id: "MSG001",
      remetente: "João Silva",
      destinatario: "todos",
      setor: "Operações",
      assunto: "Alerta: Produto próximo ao vencimento",
      conteudo: "Temos 8 produtos que vencem hoje. Verificar setor refrigerado urgentemente.",
      timestamp: "2025-08-25T10:30:00",
      prioridade: "urgente",
      tipo: "alerta",
      lida: false
    },
    {
      id: "MSG002",
      remetente: "Maria Santos",
      destinatario: "Pedro Costa",
      setor: "Logística",
      assunto: "Entrega ENT001 confirmada",
      conteudo: "A entrega para o Restaurante Mar & Terra foi concluída com sucesso às 08:45.",
      timestamp: "2025-08-25T08:50:00",
      prioridade: "normal",
      tipo: "notificacao",
      lida: true,
      respondida: false
    },
    {
      id: "MSG003",
      remetente: "Ana Lima",
      destinatario: "todos",
      setor: "Qualidade",
      assunto: "Nova remessa de Salmão aprovada",
      conteudo: "Lote SAL001 passou por todas as verificações de qualidade. Liberado para estoque.",
      timestamp: "2025-08-25T07:15:00",
      prioridade: "normal",
      tipo: "mensagem",
      lida: true
    }
  ]);

  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([
    {
      id: "NOT001",
      titulo: "Sistema sincronizado",
      conteudo: "Dados sincronizados com sucesso às 10:00",
      tipo: "sucesso",
      timestamp: "2025-08-25T10:00:00",
      lida: false,
      setor: "Sistema"
    },
    {
      id: "NOT002",
      titulo: "Temperatura baixa detectada",
      conteudo: "Setor refrigerado com temperatura de 1°C - dentro do normal",
      tipo: "info",
      timestamp: "2025-08-25T09:30:00",
      lida: true,
      setor: "Refrigerado"
    },
    {
      id: "NOT003",
      titulo: "Estoque crítico",
      conteudo: "Camarão Grande com apenas 89kg em estoque",
      tipo: "alerta",
      timestamp: "2025-08-25T08:00:00",
      lida: false,
      setor: "Estoque"
    }
  ]);

  const [novaMensagem, setNovaMensagem] = useState({
    destinatario: "",
    assunto: "",
    conteudo: "",
    prioridade: "normal" as const,
    tipo: "mensagem" as const
  });

  const [filtroMensagens, setFiltroMensagens] = useState({
    prioridade: "todas",
    tipo: "todos", 
    lida: "todas"
  });

  const usuarios = ["João Silva", "Maria Santos", "Pedro Costa", "Ana Lima", "Carlos Mendes"];
  
  const mensagensFiltradas = mensagens.filter(msg => {
    return (
      (filtroMensagens.prioridade === "todas" || msg.prioridade === filtroMensagens.prioridade) &&
      (filtroMensagens.tipo === "todos" || msg.tipo === filtroMensagens.tipo) &&
      (filtroMensagens.lida === "todas" || (filtroMensagens.lida === "lida" ? msg.lida : !msg.lida))
    );
  });

  const notificacoesNaoLidas = notificacoes.filter(n => !n.lida).length;
  const mensagensNaoLidas = mensagens.filter(m => !m.lida).length;

  const enviarMensagem = () => {
    if (!novaMensagem.destinatario || !novaMensagem.assunto || !novaMensagem.conteudo) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const mensagem: Mensagem = {
      id: `MSG${String(mensagens.length + 1).padStart(3, '0')}`,
      remetente: "Você",
      destinatario: novaMensagem.destinatario,
      setor: "Seu Setor",
      assunto: novaMensagem.assunto,
      conteudo: novaMensagem.conteudo,
      timestamp: new Date().toISOString(),
      prioridade: novaMensagem.prioridade,
      tipo: novaMensagem.tipo,
      lida: false
    };

    setMensagens(prev => [mensagem, ...prev]);
    setNovaMensagem({
      destinatario: "",
      assunto: "",
      conteudo: "",
      prioridade: "normal",
      tipo: "mensagem"
    });

    toast.success("Mensagem enviada com sucesso!");
  };

  const marcarComoLida = (id: string, tipo: 'mensagem' | 'notificacao') => {
    if (tipo === 'mensagem') {
      setMensagens(prev => prev.map(msg => 
        msg.id === id ? { ...msg, lida: true } : msg
      ));
    } else {
      setNotificacoes(prev => prev.map(not => 
        not.id === id ? { ...not, lida: true } : not
      ));
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'urgente': return 'bg-red-100 text-red-700 border-red-200';
      case 'alta': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'normal': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'baixa': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'alerta': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'notificacao': return <Bell className="h-4 w-4 text-blue-600" />;
      case 'mensagem': return <MessageSquare className="h-4 w-4 text-green-600" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getNotificacaoIcon = (tipo: string) => {
    switch (tipo) {
      case 'sucesso': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'alerta': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'erro': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'info': return <Info className="h-4 w-4 text-blue-600" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Comunicação Integrada</h2>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <MessageSquare className="h-3 w-3" />
            {mensagensNaoLidas} não lidas
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Bell className="h-3 w-3" />
            {notificacoesNaoLidas} notificações
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="mensagens" className="space-y-4">
        <TabsList>
          <TabsTrigger value="mensagens" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Mensagens
            {mensagensNaoLidas > 0 && (
              <Badge variant="destructive" className="ml-1 h-5 w-5 text-xs">
                {mensagensNaoLidas}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="gap-2">
            <Bell className="h-4 w-4" />
            Notificações
            {notificacoesNaoLidas > 0 && (
              <Badge variant="destructive" className="ml-1 h-5 w-5 text-xs">
                {notificacoesNaoLidas}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="nova" className="gap-2">
            <Send className="h-4 w-4" />
            Nova Mensagem
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mensagens" className="space-y-4">
          {/* Filtros */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Prioridade</Label>
                <Select value={filtroMensagens.prioridade} onValueChange={(value) => setFiltroMensagens(prev => ({ ...prev, prioridade: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    <SelectItem value="urgente">Urgente</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="baixa">Baixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Tipo</Label>
                <Select value={filtroMensagens.tipo} onValueChange={(value) => setFiltroMensagens(prev => ({ ...prev, tipo: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="mensagem">Mensagem</SelectItem>
                    <SelectItem value="alerta">Alerta</SelectItem>
                    <SelectItem value="notificacao">Notificação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Status</Label>
                <Select value={filtroMensagens.lida} onValueChange={(value) => setFiltroMensagens(prev => ({ ...prev, lida: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    <SelectItem value="lida">Lidas</SelectItem>
                    <SelectItem value="nao-lida">Não lidas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Mensagens */}
          <div className="space-y-3">
            {mensagensFiltradas.map((mensagem) => (
              <Card 
                key={mensagem.id} 
                className={`cursor-pointer transition-all ${!mensagem.lida ? 'border-l-4 border-l-blue-500 bg-blue-50/50' : ''}`}
                onClick={() => marcarComoLida(mensagem.id, 'mensagem')}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getTipoIcon(mensagem.tipo)}
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className={`font-medium ${!mensagem.lida ? 'font-semibold' : ''}`}>
                            {mensagem.assunto}
                          </h4>
                          <Badge className={getPrioridadeColor(mensagem.prioridade)}>
                            {mensagem.prioridade.charAt(0).toUpperCase() + mensagem.prioridade.slice(1)}
                          </Badge>
                          {!mensagem.lida && (
                            <Badge variant="secondary">Nova</Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{mensagem.conteudo}</p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            De: {mensagem.remetente}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            Para: {mensagem.destinatario === "todos" ? "Todos" : mensagem.destinatario}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(mensagem.timestamp)}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {mensagem.setor}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notificacoes" className="space-y-4">
          <div className="space-y-3">
            {notificacoes.map((notificacao) => (
              <Card 
                key={notificacao.id}
                className={`cursor-pointer transition-all ${!notificacao.lida ? 'border-l-4 border-l-yellow-500 bg-yellow-50/50' : ''}`}
                onClick={() => marcarComoLida(notificacao.id, 'notificacao')}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {getNotificacaoIcon(notificacao.tipo)}
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-medium ${!notificacao.lida ? 'font-semibold' : ''}`}>
                          {notificacao.titulo}
                        </h4>
                        {!notificacao.lida && (
                          <Badge variant="secondary">Nova</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{notificacao.conteudo}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(notificacao.timestamp)}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {notificacao.setor}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="nova" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Enviar Nova Mensagem
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="destinatario">Destinatário</Label>
                  <Select value={novaMensagem.destinatario} onValueChange={(value) => setNovaMensagem(prev => ({ ...prev, destinatario: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o destinatário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os usuários</SelectItem>
                      {usuarios.map(usuario => (
                        <SelectItem key={usuario} value={usuario}>{usuario}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="prioridade">Prioridade</Label>
                  <Select value={novaMensagem.prioridade} onValueChange={(value) => setNovaMensagem(prev => ({ ...prev, prioridade: value as any }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixa">Baixa</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="urgente">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="assunto">Assunto</Label>
                <Input
                  id="assunto"
                  placeholder="Digite o assunto da mensagem"
                  value={novaMensagem.assunto}
                  onChange={(e) => setNovaMensagem(prev => ({ ...prev, assunto: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="conteudo">Mensagem</Label>
                <Textarea
                  id="conteudo"
                  placeholder="Digite sua mensagem aqui..."
                  rows={5}
                  value={novaMensagem.conteudo}
                  onChange={(e) => setNovaMensagem(prev => ({ ...prev, conteudo: e.target.value }))}
                />
              </div>

              <Button onClick={enviarMensagem} className="w-full gap-2">
                <Send className="h-4 w-4" />
                Enviar Mensagem
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}