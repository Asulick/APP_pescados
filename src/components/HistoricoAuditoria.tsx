import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { 
  History, 
  Download, 
  Filter, 
  Search, 
  Plus, 
  Minus, 
  Truck, 
  User, 
  Calendar as CalendarIcon,
  FileText,
  AlertTriangle
} from "lucide-react";

// Função simples para formatar data
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

const formatDateOnly = (date: Date) => {
  return date.toLocaleDateString('pt-BR');
};

interface RegistroAuditoria {
  id: string;
  timestamp: string;
  usuario: string;
  acao: 'entrada' | 'saida' | 'entrega' | 'alteracao' | 'cancelamento';
  entidade: string;
  detalhes: string;
  valorAnterior?: string;
  valorNovo?: string;
  observacoes?: string;
  setor: string;
}

export function HistoricoAuditoria() {
  const [registros] = useState<RegistroAuditoria[]>([
    {
      id: "001",
      timestamp: "2025-08-25T10:30:00",
      usuario: "João Silva",
      acao: "entrada",
      entidade: "Salmão Atlântico",
      detalhes: "Entrada de 50kg - Lote SAL001",
      setor: "Refrigerado",
      observacoes: "Recebimento da manhã"
    },
    {
      id: "002",
      timestamp: "2025-08-25T09:15:00",
      usuario: "Maria Santos",
      acao: "saida",
      entidade: "Camarão Grande", 
      detalhes: "Saída de 15kg para entrega ENT001",
      setor: "Congelado"
    },
    {
      id: "003",
      timestamp: "2025-08-25T08:45:00",
      usuario: "Pedro Costa",
      acao: "entrega",
      entidade: "Restaurante Mar & Terra",
      detalhes: "Entrega concluída - ENT001",
      setor: "Logística"
    },
    {
      id: "004",
      timestamp: "2025-08-24T16:20:00",
      usuario: "Ana Lima",
      acao: "alteracao",
      entidade: "Tilápia Filé",
      detalhes: "Atualização de validade",
      valorAnterior: "2025-08-26",
      valorNovo: "2025-08-29",
      setor: "Refrigerado"
    },
    {
      id: "005",
      timestamp: "2025-08-24T14:10:00",
      usuario: "Carlos Mendes",
      acao: "cancelamento",
      entidade: "Entrega ENT005",
      detalhes: "Cancelamento por solicitação do cliente",
      setor: "Logística",
      observacoes: "Cliente cancelou o pedido"
    }
  ]);

  const [filtros, setFiltros] = useState({
    busca: "",
    acao: "todas",
    usuario: "todos",
    setor: "todos",
    dataInicio: undefined as Date | undefined,
    dataFim: undefined as Date | undefined
  });

  const registrosFiltrados = registros.filter(registro => {
    const dataRegistro = new Date(registro.timestamp);
    const buscaMatch = registro.entidade.toLowerCase().includes(filtros.busca.toLowerCase()) ||
                      registro.detalhes.toLowerCase().includes(filtros.busca.toLowerCase());
    
    const acaoMatch = filtros.acao === "todas" || registro.acao === filtros.acao;
    const usuarioMatch = filtros.usuario === "todos" || registro.usuario === filtros.usuario;
    const setorMatch = filtros.setor === "todos" || registro.setor === filtros.setor;
    
    const dataInicioMatch = !filtros.dataInicio || dataRegistro >= filtros.dataInicio;
    const dataFimMatch = !filtros.dataFim || dataRegistro <= filtros.dataFim;
    
    return buscaMatch && acaoMatch && usuarioMatch && setorMatch && dataInicioMatch && dataFimMatch;
  });

  const usuarios = [...new Set(registros.map(r => r.usuario))];
  const setores = [...new Set(registros.map(r => r.setor))];

  const getAcaoIcon = (acao: string) => {
    switch (acao) {
      case 'entrada': return <Plus className="h-4 w-4 text-green-600" />;
      case 'saida': return <Minus className="h-4 w-4 text-red-600" />;
      case 'entrega': return <Truck className="h-4 w-4 text-blue-600" />;
      case 'alteracao': return <FileText className="h-4 w-4 text-yellow-600" />;
      case 'cancelamento': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <History className="h-4 w-4" />;
    }
  };

  const getAcaoColor = (acao: string) => {
    switch (acao) {
      case 'entrada': return 'bg-green-100 text-green-700';
      case 'saida': return 'bg-red-100 text-red-700';
      case 'entrega': return 'bg-blue-100 text-blue-700';
      case 'alteracao': return 'bg-yellow-100 text-yellow-700';
      case 'cancelamento': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const exportarRelatorio = () => {
    // Simula exportação de relatório
    const dados = registrosFiltrados.map(registro => ({
      Data: formatDate(registro.timestamp),
      Usuario: registro.usuario,
      Acao: registro.acao,
      Entidade: registro.entidade,
      Detalhes: registro.detalhes,
      Setor: registro.setor
    }));
    
    console.log("Exportando relatório:", dados);
    alert("Relatório exportado com sucesso!");
  };

  const estatisticas = {
    total: registrosFiltrados.length,
    entradas: registrosFiltrados.filter(r => r.acao === 'entrada').length,
    saidas: registrosFiltrados.filter(r => r.acao === 'saida').length,
    entregas: registrosFiltrados.filter(r => r.acao === 'entrega').length,
    alteracoes: registrosFiltrados.filter(r => r.acao === 'alteracao').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Histórico e Auditoria</h2>
        <Button onClick={exportarRelatorio} className="gap-2">
          <Download className="h-4 w-4" />
          Exportar Relatório
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
            <div className="text-2xl font-bold text-green-600">{estatisticas.entradas}</div>
            <p className="text-sm text-muted-foreground">Entradas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{estatisticas.saidas}</div>
            <p className="text-sm text-muted-foreground">Saídas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{estatisticas.entregas}</div>
            <p className="text-sm text-muted-foreground">Entregas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{estatisticas.alteracoes}</div>
            <p className="text-sm text-muted-foreground">Alterações</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="busca">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="busca"
                  placeholder="Buscar em entidade ou detalhes..."
                  className="pl-10"
                  value={filtros.busca}
                  onChange={(e) => setFiltros(prev => ({ ...prev, busca: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="acao">Ação</Label>
              <Select value={filtros.acao} onValueChange={(value) => setFiltros(prev => ({ ...prev, acao: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as ações" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="entrada">Entrada</SelectItem>
                  <SelectItem value="saida">Saída</SelectItem>
                  <SelectItem value="entrega">Entrega</SelectItem>
                  <SelectItem value="alteracao">Alteração</SelectItem>
                  <SelectItem value="cancelamento">Cancelamento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="usuario">Usuário</Label>
              <Select value={filtros.usuario} onValueChange={(value) => setFiltros(prev => ({ ...prev, usuario: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os usuários" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  {usuarios.map(usuario => (
                    <SelectItem key={usuario} value={usuario}>{usuario}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="setor">Setor</Label>
              <Select value={filtros.setor} onValueChange={(value) => setFiltros(prev => ({ ...prev, setor: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os setores" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  {setores.map(setor => (
                    <SelectItem key={setor} value={setor}>{setor}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Data Início</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filtros.dataInicio ? formatDateOnly(filtros.dataInicio) : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filtros.dataInicio}
                    onSelect={(date) => setFiltros(prev => ({ ...prev, dataInicio: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Data Fim</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filtros.dataFim ? formatDateOnly(filtros.dataFim) : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filtros.dataFim}
                    onSelect={(date) => setFiltros(prev => ({ ...prev, dataFim: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Registros */}
      <div className="space-y-3">
        {registrosFiltrados.map((registro) => (
          <Card key={registro.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getAcaoIcon(registro.acao)}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{registro.entidade}</h4>
                      <Badge className={getAcaoColor(registro.acao)}>
                        {registro.acao.charAt(0).toUpperCase() + registro.acao.slice(1)}
                      </Badge>
                      <Badge variant="outline">{registro.setor}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{registro.detalhes}</p>
                    
                    {registro.valorAnterior && registro.valorNovo && (
                      <div className="text-sm">
                        <span className="text-red-600">Antes: {registro.valorAnterior}</span>
                        <span className="mx-2">→</span>
                        <span className="text-green-600">Depois: {registro.valorNovo}</span>
                      </div>
                    )}
                    
                    {registro.observacoes && (
                      <p className="text-sm text-muted-foreground italic">
                        Obs: {registro.observacoes}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {registro.usuario}
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        {formatDateOnly(new Date(registro.timestamp))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {registrosFiltrados.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum registro encontrado com os filtros aplicados.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}