import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Truck, Clock, CheckCircle, AlertCircle, MapPin, Phone, Package, Calendar } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface Entrega {
  id: string;
  cliente: string;
  endereco: string;
  telefone: string;
  produtos: Array<{
    nome: string;
    quantidade: number;
    unidade: string;
  }>;
  dataEntrega: string;
  horaEntrega: string;
  prioridade: 'baixa' | 'média' | 'alta' | 'urgente';
  status: 'pendente' | 'em_rota' | 'entregue' | 'cancelada';
  motorista?: string;
  observacoes: string;
  valorTotal: number;
}

export function EntregasControl() {
  const [entregas, setEntregas] = useState<Entrega[]>([
    {
      id: "ENT001",
      cliente: "Restaurante Mar & Terra",
      endereco: "Rua das Palmeiras, 123 - Centro",
      telefone: "(11) 99999-9999",
      produtos: [
        { nome: "Salmão Atlântico", quantidade: 5, unidade: "kg" },
        { nome: "Camarão Grande", quantidade: 2, unidade: "kg" }
      ],
      dataEntrega: "2025-08-25",
      horaEntrega: "08:00",
      prioridade: "urgente",
      status: "pendente",
      motorista: "João Silva",
      observacoes: "Entregar pela manhã. Cliente especial.",
      valorTotal: 850.00
    },
    {
      id: "ENT002",
      cliente: "Supermercado FreshMart",
      endereco: "Av. Principal, 456 - Bairro Novo",
      telefone: "(11) 88888-8888",
      produtos: [
        { nome: "Tilápia Filé", quantidade: 20, unidade: "kg" },
        { nome: "Polvo", quantidade: 3, unidade: "kg" }
      ],
      dataEntrega: "2025-08-25",
      horaEntrega: "14:00",
      prioridade: "alta",
      status: "em_rota",
      motorista: "Maria Santos",
      observacoes: "Entregar no depósito dos fundos.",
      valorTotal: 1200.00
    },
    {
      id: "ENT003",
      cliente: "Peixaria do Porto",
      endereco: "Rua do Mercado, 789 - Porto",
      telefone: "(11) 77777-7777",
      produtos: [
        { nome: "Corvina", quantidade: 10, unidade: "kg" },
        { nome: "Robalo", quantidade: 8, unidade: "kg" }
      ],
      dataEntrega: "2025-08-26",
      horaEntrega: "10:00",
      prioridade: "média",
      status: "pendente",
      observacoes: "",
      valorTotal: 950.00
    }
  ]);

  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [filtroPrioridade, setFiltroPrioridade] = useState("todas");

  const entregasFiltradas = entregas.filter(entrega => {
    return (
      (filtroStatus === "todos" || entrega.status === filtroStatus) &&
      (filtroPrioridade === "todas" || entrega.prioridade === filtroPrioridade)
    );
  });

  // Ordenar por prioridade e data
  const entregasOrdenadas = entregasFiltradas.sort((a, b) => {
    const prioridadeOrdem = { urgente: 4, alta: 3, média: 2, baixa: 1 };
    if (prioridadeOrdem[a.prioridade] !== prioridadeOrdem[b.prioridade]) {
      return prioridadeOrdem[b.prioridade] - prioridadeOrdem[a.prioridade];
    }
    return new Date(`${a.dataEntrega} ${a.horaEntrega}`).getTime() - new Date(`${b.dataEntrega} ${b.horaEntrega}`).getTime();
  });

  const atualizarStatus = (id: string, novoStatus: Entrega['status']) => {
    setEntregas(prev => prev.map(entrega => 
      entrega.id === id ? { ...entrega, status: novoStatus } : entrega
    ));
    
    const statusTexto = {
      pendente: "Pendente",
      em_rota: "Em Rota",
      entregue: "Entregue",
      cancelada: "Cancelada"
    };
    
    toast.success(`Status atualizado para: ${statusTexto[novoStatus]}`);
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'urgente': return 'bg-red-100 text-red-700';
      case 'alta': return 'bg-orange-100 text-orange-700';
      case 'média': return 'bg-yellow-100 text-yellow-700';
      case 'baixa': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente': return 'bg-gray-100 text-gray-700';
      case 'em_rota': return 'bg-blue-100 text-blue-700';
      case 'entregue': return 'bg-green-100 text-green-700';
      case 'cancelada': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const estatisticas = {
    total: entregas.length,
    pendentes: entregas.filter(e => e.status === 'pendente').length,
    em_rota: entregas.filter(e => e.status === 'em_rota').length,
    entregues: entregas.filter(e => e.status === 'entregue').length,
    valor_total: entregas.reduce((acc, e) => acc + e.valorTotal, 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Gestão de Entregas</h2>
        <Button className="gap-2">
          <Truck className="h-4 w-4" />
          Nova Entrega
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{estatisticas.total}</div>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{estatisticas.pendentes}</div>
            <p className="text-sm text-muted-foreground">Pendentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{estatisticas.em_rota}</div>
            <p className="text-sm text-muted-foreground">Em Rota</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{estatisticas.entregues}</div>
            <p className="text-sm text-muted-foreground">Entregues</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-lg font-bold text-blue-600">
              R$ {estatisticas.valor_total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-muted-foreground">Valor Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="em_rota">Em Rota</SelectItem>
                <SelectItem value="entregue">Entregue</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="prioridade">Prioridade</Label>
            <Select value={filtroPrioridade} onValueChange={setFiltroPrioridade}>
              <SelectTrigger>
                <SelectValue placeholder="Todas as prioridades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="urgente">Urgente</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="média">Média</SelectItem>
                <SelectItem value="baixa">Baixa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Entregas */}
      <div className="space-y-4">
        {entregasOrdenadas.map((entrega) => (
          <Card key={entrega.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">{entrega.cliente}</h3>
                    <p className="text-sm text-muted-foreground">#{entrega.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getPrioridadeColor(entrega.prioridade)}>
                    {entrega.prioridade.charAt(0).toUpperCase() + entrega.prioridade.slice(1)}
                  </Badge>
                  <Badge className={getStatusColor(entrega.status)}>
                    {entrega.status === 'em_rota' ? 'Em Rota' : 
                     entrega.status.charAt(0).toUpperCase() + entrega.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{entrega.endereco}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{entrega.telefone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {new Date(entrega.dataEntrega).toLocaleDateString('pt-BR')} às {entrega.horaEntrega}
                    </span>
                  </div>
                  {entrega.motorista && (
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Motorista: {entrega.motorista}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Produtos:</span>
                  </div>
                  {entrega.produtos.map((produto, index) => (
                    <div key={index} className="text-sm text-muted-foreground ml-6">
                      • {produto.nome} - {produto.quantidade} {produto.unidade}
                    </div>
                  ))}
                  <div className="text-sm font-medium">
                    Valor Total: R$ {entrega.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
              
              {entrega.observacoes && (
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm">
                    <strong>Observações:</strong> {entrega.observacoes}
                  </p>
                </div>
              )}
              
              <div className="flex gap-2">
                {entrega.status === 'pendente' && (
                  <Button 
                    size="sm" 
                    onClick={() => atualizarStatus(entrega.id, 'em_rota')}
                    className="gap-2"
                  >
                    <Truck className="h-4 w-4" />
                    Iniciar Entrega
                  </Button>
                )}
                {entrega.status === 'em_rota' && (
                  <Button 
                    size="sm" 
                    onClick={() => atualizarStatus(entrega.id, 'entregue')}
                    className="gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Confirmar Entrega
                  </Button>
                )}
                {(entrega.status === 'pendente' || entrega.status === 'em_rota') && (
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => atualizarStatus(entrega.id, 'cancelada')}
                    className="gap-2"
                  >
                    <AlertCircle className="h-4 w-4" />
                    Cancelar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}