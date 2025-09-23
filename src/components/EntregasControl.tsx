import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "./ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "./ui/table";
import { 
  Truck, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  MapPin, 
  Phone, 
  Package, 
  Calendar,
  Route,
  Navigation,
  Eye,
  Edit,
  AlertTriangle,
  Search,
  Users,
  ArrowRight,
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";

interface Produto {
  id: string;
  nome: string;
  categoria: 'caixa' | 'granel' | 'filetado';
  quantidade: number;
  unidade: string;
  preco: number;
}

interface Entrega {
  id: string;
  numeroPedido: string;
  cliente: string;
  endereco: string;
  telefone: string;
  rota: string;
  produtos: Produto[];
  dataEntrega: string;
  horaEntrega: string;
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
  status: 'pendente' | 'a-caminho' | 'entregue' | 'problema';
  motorista?: string;
  observacoes: string;
  observacoesEntrega?: string;
  valorTotal: number;
  dataCriacao: string;
  horaInicio?: string;
  horaEntregaRealizada?: string;
  ordemEntrega?: number; // Nova propriedade para indicar a ordem na rota
  totalEntregasRota?: number; // Total de entregas na mesma rota
}

export function EntregasControl() {
  const [entregas, setEntregas] = useState<Entrega[]>([
    {
      id: "1",
      numeroPedido: "PED-001",
      cliente: "Tabajara Soledade",
      endereco: "Rua Principal, 123 - Centro, Fortaleza",
      telefone: "(85) 99123-4567",
      rota: "Rota Centro - Zona 1",
      produtos: [
        { id: "1", nome: "Filé de surubim", categoria: "filetado", quantidade: 1, unidade: "pct", preco: 45.00 },
        { id: "2", nome: "Camarão grande", categoria: "granel", quantidade: 2, unidade: "kg", preco: 38.00 }
      ],
      dataEntrega: "2024-12-25",
      horaEntrega: "08:00",
      prioridade: "urgente",
      status: "pendente",
      motorista: "João Silva",
      observacoes: "Entregar pela manhã. Cliente preferencial.",
      valorTotal: 121.00,
      dataCriacao: "2024-12-20",
      ordemEntrega: 1,
      totalEntregasRota: 3
    },
    {
      id: "2",
      numeroPedido: "PED-002",
      cliente: "Loja Hiper Couto",
      endereco: "Av. Dom Luís, 856 - Aldeota, Fortaleza",
      telefone: "(85) 98765-4321",
      rota: "Rota Centro - Zona 1",
      produtos: [
        { id: "3", nome: "Pargo inteiro", categoria: "caixa", quantidade: 3, unidade: "kg", preco: 28.00 },
        { id: "4", nome: "Filé de pescada", categoria: "filetado", quantidade: 5, unidade: "kg", preco: 32.00 }
      ],
      dataEntrega: "2024-12-25",
      horaEntrega: "10:30",
      prioridade: "alta",
      status: "a-caminho",
      motorista: "João Silva",
      observacoes: "Entrega sempre pela manhã",
      horaInicio: "09:45",
      valorTotal: 244.00,
      dataCriacao: "2024-12-19",
      ordemEntrega: 2,
      totalEntregasRota: 3
    },
    {
      id: "3",
      numeroPedido: "PED-003",
      cliente: "Supermercado São Miguel Siqueira",
      endereco: "Rua São Miguel, 445 - Siqueira, Fortaleza",
      telefone: "(85) 97654-3210",
      rota: "Rota Centro - Zona 1",
      produtos: [
        { id: "5", nome: "Salmão fresco", categoria: "filetado", quantidade: 4, unidade: "kg", preco: 55.00 },
        { id: "6", nome: "Robalo inteiro", categoria: "caixa", quantidade: 2, unidade: "kg", preco: 42.00 }
      ],
      dataEntrega: "2024-12-25",
      horaEntrega: "15:00",
      prioridade: "media",
      status: "entregue",
      motorista: "João Silva",
      observacoes: "Pagamento à vista - desconto aplicado",
      horaInicio: "14:20",
      horaEntregaRealizada: "15:15",
      observacoesEntrega: "Entrega realizada com sucesso. Cliente satisfeito.",
      valorTotal: 304.00,
      dataCriacao: "2024-12-21",
      ordemEntrega: 3,
      totalEntregasRota: 3
    },
    {
      id: "4",
      numeroPedido: "PED-004",
      cliente: "Restaurante Mar Azul",
      endereco: "Rua das Flores, 78 - Meireles, Fortaleza",
      telefone: "(85) 97777-8888",
      rota: "Rota Aldeota - Zona 2",
      produtos: [
        { id: "7", nome: "Camarão VG", categoria: "granel", quantidade: 3, unidade: "kg", preco: 45.00 },
        { id: "8", nome: "Lagosta pequena", categoria: "caixa", quantidade: 2, unidade: "kg", preco: 80.00 }
      ],
      dataEntrega: "2024-12-25",
      horaEntrega: "09:00",
      prioridade: "alta",
      status: "pendente",
      motorista: "Maria Santos",
      observacoes: "Entrega para evento especial - importante não atrasar",
      valorTotal: 295.00,
      dataCriacao: "2024-12-22",
      ordemEntrega: 1,
      totalEntregasRota: 2
    },
    {
      id: "5",
      numeroPedido: "PED-005",
      cliente: "Mercado do Pescado",
      endereco: "Av. Beira Mar, 1200 - Iracema, Fortaleza",
      telefone: "(85) 98888-9999",
      rota: "Rota Aldeota - Zona 2",
      produtos: [
        { id: "9", nome: "Dourado inteiro", categoria: "caixa", quantidade: 5, unidade: "kg", preco: 35.00 },
        { id: "10", nome: "Filé de tilápia", categoria: "filetado", quantidade: 8, unidade: "kg", preco: 25.00 }
      ],
      dataEntrega: "2024-12-25",
      horaEntrega: "11:30",
      prioridade: "media",
      status: "a-caminho",
      motorista: "Maria Santos",
      observacoes: "Cliente VIP - verificar qualidade dos produtos",
      horaInicio: "10:15",
      valorTotal: 375.00,
      dataCriacao: "2024-12-20",
      ordemEntrega: 2,
      totalEntregasRota: 2
    }
  ]);

  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [filtroPrioridade, setFiltroPrioridade] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEntrega, setSelectedEntrega] = useState<Entrega | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Função para obter entregas de uma rota específica
  const getEntregasPorRota = (rota: string) => {
    return entregas
      .filter(e => e.rota === rota)
      .sort((a, b) => (a.ordemEntrega || 0) - (b.ordemEntrega || 0));
  };

  // Função para avançar para próxima entrega na rota
  const avancarParaProximaEntrega = (rotaAtual: string, ordemAtual: number) => {
    const entregasRota = getEntregasPorRota(rotaAtual);
    const proximaEntrega = entregasRota.find(e => (e.ordemEntrega || 0) === ordemAtual + 1);
    
    if (proximaEntrega) {
      // Marcar a atual como entregue e a próxima como a-caminho
      setEntregas(prev => prev.map(entrega => {
        if (entrega.rota === rotaAtual) {
          if ((entrega.ordemEntrega || 0) === ordemAtual) {
            return {
              ...entrega,
              status: 'entregue' as const,
              horaEntregaRealizada: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
            };
          }
          if ((entrega.ordemEntrega || 0) === ordemAtual + 1) {
            return {
              ...entrega,
              status: 'a-caminho' as const,
              horaInicio: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
            };
          }
        }
        return entrega;
      }));
      
      toast.success(`Avançado para ${getOrdemEntregaLabel(ordemAtual + 1)} da rota ${rotaAtual}`);
    } else {
      // Última entrega da rota - marcar como entregue
      setEntregas(prev => prev.map(entrega => {
        if (entrega.rota === rotaAtual && (entrega.ordemEntrega || 0) === ordemAtual) {
          return {
            ...entrega,
            status: 'entregue' as const,
            horaEntregaRealizada: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
          };
        }
        return entrega;
      }));
      
      toast.success(`Rota ${rotaAtual} concluída com sucesso!`);
    }
  };

  // Função para obter rotas ativas (com entregas pendentes ou a-caminho)
  const getRotasAtivas = () => {
    const rotasAtivas = new Map<string, {
      nome: string;
      motorista: string;
      entregaAtual: number;
      totalEntregas: number;
      proximaEntrega?: Entrega;
      status: 'pendente' | 'a-caminho' | 'entregue';
    }>();

    entregas.forEach(entrega => {
      if (!rotasAtivas.has(entrega.rota)) {
        const entregasRota = getEntregasPorRota(entrega.rota);
        const entregaAtiva = entregasRota.find(e => e.status === 'a-caminho') || 
                           entregasRota.find(e => e.status === 'pendente');
        
        const todasEntregues = entregasRota.every(e => e.status === 'entregue');
        const algumPendente = entregasRota.some(e => e.status === 'pendente');
        const algumACaminho = entregasRota.some(e => e.status === 'a-caminho');

        rotasAtivas.set(entrega.rota, {
          nome: entrega.rota,
          motorista: entrega.motorista || 'Não definido',
          entregaAtual: entregaAtiva?.ordemEntrega || 1,
          totalEntregas: entrega.totalEntregasRota || entregasRota.length,
          proximaEntrega: entregaAtiva,
          status: todasEntregues ? 'entregue' : (algumACaminho ? 'a-caminho' : 'pendente')
        });
      }
    });

    return Array.from(rotasAtivas.values());
  };

  const entregasFiltradas = entregas.filter(entrega => {
    const matchesSearch = entrega.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entrega.numeroPedido.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entrega.rota.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filtroStatus === "todos" || entrega.status === filtroStatus;
    const matchesPrioridade = filtroPrioridade === "todas" || entrega.prioridade === filtroPrioridade;
    
    return matchesSearch && matchesStatus && matchesPrioridade;
  });

  // Ordenar por prioridade e data
  const entregasOrdenadas = entregasFiltradas.sort((a, b) => {
    const prioridadeOrdem = { urgente: 4, alta: 3, media: 2, baixa: 1 };
    if (prioridadeOrdem[a.prioridade] !== prioridadeOrdem[b.prioridade]) {
      return prioridadeOrdem[b.prioridade] - prioridadeOrdem[a.prioridade];
    }
    return new Date(a.dataEntrega + ' ' + a.horaEntrega).getTime() - 
           new Date(b.dataEntrega + ' ' + b.horaEntrega).getTime();
  });

  const handleUpdateStatus = (entregaId: string, novoStatus: string, observacoes?: string) => {
    setEntregas(prev => prev.map(entrega => {
      if (entrega.id === entregaId) {
        const updates: Partial<Entrega> = { status: novoStatus as any };
        
        if (novoStatus === 'a-caminho' && !entrega.horaInicio) {
          updates.horaInicio = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        }
        
        if (novoStatus === 'entregue') {
          updates.horaEntregaRealizada = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
          if (observacoes) {
            updates.observacoesEntrega = observacoes;
          }
        }
        
        if (novoStatus === 'problema' && observacoes) {
          updates.observacoesEntrega = observacoes;
        }
        
        return { ...entrega, ...updates };
      }
      return entrega;
    }));
    
    let message = "Status da entrega atualizado!";
    if (novoStatus === 'a-caminho') message = "Entrega iniciada! Motorista a caminho.";
    if (novoStatus === 'entregue') message = "Entrega concluída com sucesso!";
    if (novoStatus === 'problema') message = "Problema registrado na entrega.";
    
    toast.success(message);
    setSelectedEntrega(null);
    setIsEditing(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pendente': return <Clock className="h-4 w-4" />;
      case 'a-caminho': return <Truck className="h-4 w-4" />;
      case 'entregue': return <CheckCircle className="h-4 w-4" />;
      case 'problema': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'a-caminho': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'entregue': return 'bg-green-100 text-green-800 border-green-300';
      case 'problema': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'baixa': return 'bg-gray-100 text-gray-600';
      case 'media': return 'bg-blue-100 text-blue-600';
      case 'alta': return 'bg-orange-100 text-orange-600';
      case 'urgente': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pendente': return 'Pendente';
      case 'a-caminho': return 'A Caminho';
      case 'entregue': return 'Entregue';
      case 'problema': return 'Problema';
      default: return status;
    }
  };

  const getOrdemEntregaLabel = (ordem?: number) => {
    if (!ordem) return "";
    const ordinalMap: { [key: number]: string } = {
      1: "1ª Entrega",
      2: "2ª Entrega", 
      3: "3ª Entrega",
      4: "4ª Entrega",
      5: "5ª Entrega"
    };
    return ordinalMap[ordem] || `${ordem}ª Entrega`;
  };

  // Estatísticas
  const stats = {
    total: entregas.length,
    pendentes: entregas.filter(e => e.status === 'pendente').length,
    emRota: entregas.filter(e => e.status === 'a-caminho').length,
    entregues: entregas.filter(e => e.status === 'entregue').length,
    problemas: entregas.filter(e => e.status === 'problema').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="flex items-center gap-2">
            <Truck className="h-6 w-6" />
            Gestão de Entregas
          </h2>
          <p className="text-muted-foreground">Controle de entregas, rotas e status</p>
        </div>
      </div>

      {/* Controle de Rotas Ativas */}
      {getRotasAtivas().length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              Controle de Rotas Ativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getRotasAtivas().map((rota) => (
                <div key={rota.nome} className="p-4 border rounded-lg bg-muted/20">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Truck className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium">{rota.nome}</div>
                          <div className="text-sm text-muted-foreground">
                            Motorista: {rota.motorista}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge className={`gap-1 ${getStatusColor(rota.status)}`}>
                      {getStatusIcon(rota.status)}
                      {getStatusLabel(rota.status)}
                    </Badge>
                  </div>
                  
                  {/* Barra de progresso das entregas */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progresso da Rota</span>
                      <span className="text-sm text-muted-foreground">
                        {rota.entregaAtual} de {rota.totalEntregas}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: rota.totalEntregas }, (_, index) => {
                        const ordem = index + 1;
                        const entregaRota = getEntregasPorRota(rota.nome).find(e => e.ordemEntrega === ordem);
                        const isAtual = ordem === rota.entregaAtual;
                        const isCompleta = entregaRota?.status === 'entregue';
                        const isProblema = entregaRota?.status === 'problema';
                        
                        return (
                          <div
                            key={ordem}
                            className={`flex-1 h-3 rounded-full flex items-center justify-center text-xs ${
                              isProblema 
                                ? 'bg-red-200 text-red-800' 
                                : isCompleta 
                                ? 'bg-green-200 text-green-800' 
                                : isAtual 
                                ? 'bg-blue-200 text-blue-800' 
                                : 'bg-gray-200 text-gray-600'
                            }`}
                            title={entregaRota?.cliente || `Entrega ${ordem}`}
                          >
                            {ordem}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Informações da entrega atual */}
                  {rota.proximaEntrega && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Navigation className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800">
                          {getOrdemEntregaLabel(rota.proximaEntrega.ordemEntrega)} - {rota.proximaEntrega.cliente}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-blue-600 font-medium">Endereço:</span>
                          <div className="text-blue-800">{rota.proximaEntrega.endereco}</div>
                        </div>
                        <div>
                          <span className="text-blue-600 font-medium">Horário:</span>
                          <div className="text-blue-800">{rota.proximaEntrega.horaEntrega}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Controles de navegação */}
                  <div className="flex gap-2 flex-wrap">
                    {rota.proximaEntrega && rota.status !== 'entregue' && (
                      <>
                        {rota.proximaEntrega.status === 'pendente' && (
                          <Button
                            onClick={() => {
                              if (rota.proximaEntrega) {
                                handleUpdateStatus(rota.proximaEntrega.id, 'a-caminho');
                              }
                            }}
                            className="gap-2"
                            size="sm"
                          >
                            <Play className="h-4 w-4" />
                            Iniciar Rota
                          </Button>
                        )}
                        
                        {rota.proximaEntrega.status === 'a-caminho' && (
                          <Button
                            onClick={() => {
                              if (rota.proximaEntrega?.ordemEntrega) {
                                avancarParaProximaEntrega(rota.nome, rota.proximaEntrega.ordemEntrega);
                              }
                            }}
                            className="gap-2"
                            size="sm"
                          >
                            <SkipForward className="h-4 w-4" />
                            Concluir e Avançar
                          </Button>
                        )}
                      </>
                    )}
                    
                    <Button
                      onClick={() => {
                        const entregaParaVer = rota.proximaEntrega || getEntregasPorRota(rota.nome)[0];
                        if (entregaParaVer) {
                          setSelectedEntrega(entregaParaVer);
                        }
                      }}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Ver Detalhes
                    </Button>

                    {rota.status === 'entregue' && (
                      <Button
                        onClick={() => {
                          // Reiniciar toda a rota
                          setEntregas(prev => prev.map(entrega => {
                            if (entrega.rota === rota.nome) {
                              return {
                                ...entrega,
                                status: 'pendente' as const,
                                horaInicio: undefined,
                                horaEntregaRealizada: undefined,
                                observacoesEntrega: undefined
                              };
                            }
                            return entrega;
                          }));
                          toast.success(`Rota ${rota.nome} reiniciada`);
                        }}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Reiniciar Rota
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="font-semibold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="font-semibold">{stats.pendentes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Truck className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Em Rota</p>
                <p className="font-semibold">{stats.emRota}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Entregues</p>
                <p className="font-semibold">{stats.entregues}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Problemas</p>
                <p className="font-semibold">{stats.problemas}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e busca */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros e Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por cliente, pedido ou rota..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="a-caminho">A Caminho</SelectItem>
                <SelectItem value="entregue">Entregue</SelectItem>
                <SelectItem value="problema">Problema</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filtroPrioridade} onValueChange={setFiltroPrioridade}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="urgente">Urgente</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="media">Média</SelectItem>
                <SelectItem value="baixa">Baixa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de entregas */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Entregas ({entregasOrdenadas.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pedido</TableHead>
                  <TableHead>Cliente & Rota</TableHead>
                  <TableHead>Produtos</TableHead>
                  <TableHead>Entrega</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entregasOrdenadas.map((entrega) => (
                  <TableRow key={entrega.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{entrega.numeroPedido}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(entrega.dataCriacao).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {entrega.cliente}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Route className="h-3 w-3" />
                          {entrega.rota}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {entrega.endereco.substring(0, 30)}...
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {entrega.produtos.slice(0, 2).map((produto, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-medium">{produto.nome}</span>
                            <span className="text-muted-foreground ml-1">
                              ({produto.quantidade} {produto.unidade})
                            </span>
                          </div>
                        ))}
                        {entrega.produtos.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{entrega.produtos.length - 2} item(s)
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(entrega.dataEntrega).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {entrega.horaEntrega}
                        </div>
                        {entrega.motorista && (
                          <div className="text-xs text-muted-foreground">
                            Motorista: {entrega.motorista}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`gap-1 ${getStatusColor(entrega.status)}`}>
                        {getStatusIcon(entrega.status)}
                        {getStatusLabel(entrega.status)}
                      </Badge>
                      {entrega.horaInicio && entrega.status === 'a-caminho' && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Saiu às {entrega.horaInicio}
                        </div>
                      )}
                      {entrega.horaEntregaRealizada && entrega.status === 'entregue' && (
                        <div className="text-xs text-green-600 mt-1">
                          Entregue às {entrega.horaEntregaRealizada}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPrioridadeColor(entrega.prioridade)}>
                        {entrega.prioridade.charAt(0).toUpperCase() + entrega.prioridade.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        R$ {entrega.valorTotal.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedEntrega(entrega)}
                          title="Ver detalhes"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedEntrega(entrega);
                            setIsEditing(true);
                          }}
                          title="Atualizar status"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal de detalhes */}
      {selectedEntrega && !isEditing && (
        <Dialog open={!!selectedEntrega} onOpenChange={() => setSelectedEntrega(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Detalhes da Entrega {selectedEntrega.numeroPedido}
              </DialogTitle>
              <DialogDescription>
                Cliente: {selectedEntrega.cliente} • {selectedEntrega.rota}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Status e informações gerais */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                <div>
                  <Label>Status Atual</Label>
                  <Badge className={`gap-1 ${getStatusColor(selectedEntrega.status)} mt-1`}>
                    {getStatusIcon(selectedEntrega.status)}
                    {getStatusLabel(selectedEntrega.status)}
                  </Badge>
                </div>
                <div>
                  <Label>Prioridade</Label>
                  <Badge variant="outline" className={`${getPrioridadeColor(selectedEntrega.prioridade)} mt-1`}>
                    {selectedEntrega.prioridade.charAt(0).toUpperCase() + selectedEntrega.prioridade.slice(1)}
                  </Badge>
                </div>
                <div>
                  <Label>Valor Total</Label>
                  <div className="font-semibold text-lg">R$ {selectedEntrega.valorTotal.toFixed(2)}</div>
                </div>
              </div>

              {/* Informações do cliente */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Informações do Cliente
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Cliente</Label>
                    <p className="text-sm">{selectedEntrega.cliente}</p>
                  </div>
                  <div>
                    <Label>Telefone</Label>
                    <p className="text-sm">{selectedEntrega.telefone}</p>
                  </div>
                  <div className="md:col-span-2">
                    <Label>Endereço de Entrega</Label>
                    <p className="text-sm">{selectedEntrega.endereco}</p>
                  </div>
                </div>
              </div>

              {/* Informações da rota */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Route className="h-4 w-4" />
                  Informações da Rota
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Rota</Label>
                    <p className="text-sm">{selectedEntrega.rota}</p>
                  </div>
                  <div>
                    <Label>Data de Entrega</Label>
                    <p className="text-sm">{new Date(selectedEntrega.dataEntrega).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <Label>Hora Programada</Label>
                    <p className="text-sm">{selectedEntrega.horaEntrega}</p>
                  </div>
                  {selectedEntrega.motorista && (
                    <div>
                      <Label>Motorista</Label>
                      <p className="text-sm">{selectedEntrega.motorista}</p>
                    </div>
                  )}
                  {selectedEntrega.horaInicio && (
                    <div>
                      <Label>Hora de Saída</Label>
                      <p className="text-sm">{selectedEntrega.horaInicio}</p>
                    </div>
                  )}
                  {selectedEntrega.horaEntregaRealizada && (
                    <div>
                      <Label>Hora da Entrega</Label>
                      <p className="text-sm font-semibold text-green-600">{selectedEntrega.horaEntregaRealizada}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Lista de produtos com informações de rota e sequência */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Produtos da Entrega
                  </h3>
                  {selectedEntrega.ordemEntrega && selectedEntrega.totalEntregasRota && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="gap-1">
                        <Navigation className="h-3 w-3" />
                        {getOrdemEntregaLabel(selectedEntrega.ordemEntrega)}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {selectedEntrega.ordemEntrega} de {selectedEntrega.totalEntregasRota}
                      </Badge>
                    </div>
                  )}
                </div>
                
                {/* Informações contextuais da rota */}
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Route className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Contexto da Rota</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-blue-600 font-medium">Cliente:</span>
                      <div className="text-blue-800">{selectedEntrega.cliente}</div>
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">Rota:</span>
                      <div className="text-blue-800">{selectedEntrega.rota}</div>
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">Sequência:</span>
                      <div className="text-blue-800 flex items-center gap-1">
                        {selectedEntrega.ordemEntrega && selectedEntrega.totalEntregasRota ? (
                          <>
                            <Navigation className="h-3 w-3" />
                            {getOrdemEntregaLabel(selectedEntrega.ordemEntrega)} 
                            <span className="text-blue-500">({selectedEntrega.ordemEntrega}/{selectedEntrega.totalEntregasRota})</span>
                          </>
                        ) : (
                          "Não definida"
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Navegação entre entregas da mesma rota */}
                  {selectedEntrega.ordemEntrega && selectedEntrega.totalEntregasRota && (
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-blue-300">
                      <Button
                        onClick={() => {
                          const entregasRota = getEntregasPorRota(selectedEntrega.rota);
                          const entregaAnterior = entregasRota.find(e => (e.ordemEntrega || 0) === (selectedEntrega.ordemEntrega || 0) - 1);
                          if (entregaAnterior) {
                            setSelectedEntrega(entregaAnterior);
                          }
                        }}
                        disabled={selectedEntrega.ordemEntrega <= 1}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Anterior
                      </Button>
                      
                      <div className="text-center">
                        <div className="text-xs text-blue-600 font-medium">Navegar na Rota</div>
                        <div className="flex items-center gap-1 mt-1">
                          {Array.from({ length: selectedEntrega.totalEntregasRota }, (_, index) => {
                            const ordem = index + 1;
                            const isAtual = ordem === selectedEntrega.ordemEntrega;
                            const entregaRota = getEntregasPorRota(selectedEntrega.rota).find(e => e.ordemEntrega === ordem);
                            const isCompleta = entregaRota?.status === 'entregue';
                            
                            return (
                              <button
                                key={ordem}
                                onClick={() => {
                                  if (entregaRota) {
                                    setSelectedEntrega(entregaRota);
                                  }
                                }}
                                className={`w-6 h-6 rounded-full text-xs flex items-center justify-center transition-colors ${
                                  isAtual 
                                    ? 'bg-blue-600 text-white' 
                                    : isCompleta 
                                    ? 'bg-green-200 text-green-800 hover:bg-green-300' 
                                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }`}
                                title={entregaRota?.cliente || `Entrega ${ordem}`}
                              >
                                {ordem}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => {
                          const entregasRota = getEntregasPorRota(selectedEntrega.rota);
                          const proximaEntrega = entregasRota.find(e => (e.ordemEntrega || 0) === (selectedEntrega.ordemEntrega || 0) + 1);
                          if (proximaEntrega) {
                            setSelectedEntrega(proximaEntrega);
                          }
                        }}
                        disabled={(selectedEntrega.ordemEntrega || 0) >= (selectedEntrega.totalEntregasRota || 0)}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        Próxima
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {selectedEntrega.produtos.map((produto, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{produto.nome}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {produto.categoria}
                          </Badge>
                          {selectedEntrega.ordemEntrega && (
                            <Badge variant="secondary" className="text-xs gap-1">
                              <ArrowRight className="h-2 w-2" />
                              Para: {selectedEntrega.cliente}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {produto.quantidade} {produto.unidade}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          R$ {(produto.quantidade * produto.preco).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Observações */}
              {selectedEntrega.observacoes && (
                <div className="space-y-2">
                  <Label>Observações do Pedido</Label>
                  <p className="text-sm bg-muted p-3 rounded-md">{selectedEntrega.observacoes}</p>
                </div>
              )}

              {selectedEntrega.observacoesEntrega && (
                <div className="space-y-2">
                  <Label>Observações da Entrega</Label>
                  <p className="text-sm bg-blue-50 p-3 rounded-md border border-blue-200">{selectedEntrega.observacoesEntrega}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal de edição de status */}
      {selectedEntrega && isEditing && (
        <Dialog open={isEditing} onOpenChange={() => setIsEditing(false)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Atualizar Status da Entrega</DialogTitle>
              <DialogDescription>
                {selectedEntrega.numeroPedido} - {selectedEntrega.cliente}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label>Status Atual</Label>
                <Badge className={`gap-1 ${getStatusColor(selectedEntrega.status)} mt-1`}>
                  {getStatusIcon(selectedEntrega.status)}
                  {getStatusLabel(selectedEntrega.status)}
                </Badge>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => handleUpdateStatus(selectedEntrega.id, 'a-caminho')}
                  disabled={selectedEntrega.status !== 'pendente'}
                  className="w-full justify-start"
                  variant={selectedEntrega.status === 'pendente' ? 'default' : 'secondary'}
                >
                  <Truck className="h-4 w-4 mr-2" />
                  Marcar como "A Caminho"
                </Button>

                <Button
                  onClick={() => {
                    const observacoes = prompt('Observações da entrega (opcional):');
                    handleUpdateStatus(selectedEntrega.id, 'entregue', observacoes || undefined);
                  }}
                  disabled={selectedEntrega.status === 'pendente'}
                  className="w-full justify-start"
                  variant={selectedEntrega.status === 'a-caminho' ? 'default' : 'secondary'}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Marcar como "Entregue"
                </Button>

                <Button
                  onClick={() => {
                    const problema = prompt('Descreva o problema encontrado:');
                    if (problema) {
                      handleUpdateStatus(selectedEntrega.id, 'problema', problema);
                    }
                  }}
                  className="w-full justify-start"
                  variant="destructive"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Reportar Problema
                </Button>
              </div>

              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
                className="w-full"
              >
                Cancelar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}