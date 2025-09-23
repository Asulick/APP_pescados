import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Package,
  User,
  Calendar,
  MapPin,
  ShoppingBag,
  Users,
  Trash2
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

interface Pedido {
  id: string;
  numeroPedido: string;
  cliente: string;
  telefone: string;
  produtos: Produto[];
  status: 'pendente' | 'em-producao' | 'pronto' | 'entregue' | 'cancelado';
  dataEntrega: string;
  horaEntrega: string;
  endereco: string;
  observacoes: string;
  valorTotal: number;
  dataCriacao: string;
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
}

interface PedidosControlProps {
  onNavigate?: (section: string) => void;
}

export function PedidosControl({ onNavigate }: PedidosControlProps) {
  // Lista de clientes disponíveis
  const clientesDisponiveis = [
    {
      id: "1",
      nome: "Tabajara Soledade",
      telefone: "(85) 99123-4567",
      email: "contato@tabajarasoledade.com.br",
      endereco: "Rua Principal, 123",
      cidade: "Fortaleza",
      bairro: "Centro",
      cep: "60000-000",
      tipo: "pessoa-juridica",
      cpfCnpj: "12.345.678/0001-90"
    },
    {
      id: "2",
      nome: "Loja Hiper Couto",
      telefone: "(85) 98765-4321",
      email: "pedidos@hipercouto.com.br",
      endereco: "Av. Dom Luís, 856",
      cidade: "Fortaleza",
      bairro: "Aldeota",
      cep: "60160-230",
      tipo: "pessoa-juridica",
      cpfCnpj: "98.765.432/0001-10"
    },
    {
      id: "3",
      nome: "Supermercado São Miguel Siqueira",
      telefone: "(85) 97654-3210",
      email: "compras@saomiguel.com.br",
      endereco: "Rua São Miguel, 445",
      cidade: "Fortaleza",
      bairro: "Siqueira",
      cep: "60732-123",
      tipo: "pessoa-juridica",
      cpfCnpj: "11.222.333/0001-55"
    },
    {
      id: "4",
      nome: "Maria Silva Santos",
      telefone: "(85) 99887-6655",
      email: "maria.silva@email.com",
      endereco: "Rua das Flores, 78",
      cidade: "Fortaleza",
      bairro: "Montese",
      cep: "60425-580",
      tipo: "pessoa-fisica",
      cpfCnpj: "123.456.789-00"
    }
  ];

  const [pedidos, setPedidos] = useState<Pedido[]>([
    {
      id: "1",
      numeroPedido: "PED-001",
      cliente: "Tabajara Soledade",
      telefone: "(85) 99123-4567",
      produtos: [
        { id: "1", nome: "📦 Filé de surubim", categoria: "filetado", quantidade: 1, unidade: "pct", preco: 45.00 },
        { id: "2", nome: "📦 Pescada posta M", categoria: "caixa", quantidade: 1, unidade: "pct", preco: 28.00 },
        { id: "3", nome: "📦 Filé de pescadinhas", categoria: "filetado", quantidade: 5, unidade: "pct", preco: 17.20 },
        { id: "4", nome: "📦 Pescadinha eviscerada", categoria: "granel", quantidade: 2, unidade: "pct", preco: 22.00 },
        { id: "5", nome: "📦 Posta de atum", categoria: "caixa", quantidade: 1, unidade: "pct", preco: 65.00 },
        { id: "6", nome: "📦 Filé de pescada amarela", categoria: "filetado", quantidade: 1, unidade: "pct", preco: 41.60 },
        { id: "7", nome: "📦 Filé de dourada", categoria: "filetado", quantidade: 5, unidade: "pct", preco: 29.60 },
        { id: "8", nome: "📦 Pescada amarela posta", categoria: "caixa", quantidade: 1, unidade: "pct", preco: 35.00 },
        { id: "9", nome: "📦 Filé de pescada branca", categoria: "filetado", quantidade: 10, unidade: "pct", preco: 24.00 }
      ],
      status: "em-producao",
      dataEntrega: "2025-09-12",
      horaEntrega: "14:00",
      endereco: "Rua Principal, 123 - Centro, Fortaleza/CE",
      observacoes: "Entregar preferencialmente pela manhã",
      valorTotal: 625.20,
      dataCriacao: "2025-09-09",
      prioridade: "alta"
    },
    {
      id: "2", 
      numeroPedido: "PED-002",
      cliente: "Loja Hiper Couto",
      telefone: "(85) 98765-4321",
      produtos: [
        { id: "10", nome: "📦 Filé de pescada branca", categoria: "filetado", quantidade: 2, unidade: "pct", preco: 24.00 },
        { id: "11", nome: "📦 Posta de pescada branca", categoria: "caixa", quantidade: 1, unidade: "pct", preco: 31.60 },
        { id: "12", nome: "📦 Filé de amarela", categoria: "filetado", quantidade: 1, unidade: "pct", preco: 41.60 },
        { id: "13", nome: "📦 Filé de dourada", categoria: "filetado", quantidade: 1, unidade: "pct", preco: 29.60 },
        { id: "14", nome: "📦 Posta de dourada", categoria: "caixa", quantidade: 2, unidade: "pct", preco: 21.60 },
        { id: "15", nome: "📦 Filé salmão", categoria: "filetado", quantidade: 1, unidade: "kg", preco: 86.00 }
      ],
      status: "pronto",
      dataEntrega: "2025-09-11",
      horaEntrega: "09:00",
      endereco: "Av. Dom Luís, 856 - Aldeota, Fortaleza/CE",
      observacoes: "Produto refrigerado - manter cadeia do frio",
      valorTotal: 277.60,
      dataCriacao: "2025-09-08",
      prioridade: "media"
    },
    {
      id: "3",
      numeroPedido: "PED-003", 
      cliente: "Supermercado São Miguel Siqueira",
      telefone: "(85) 97654-3210",
      produtos: [
        { id: "16", nome: "📦 Filé de pescada branca", categoria: "filetado", quantidade: 1, unidade: "pct", preco: 24.00 },
        { id: "17", nome: "📦 Filé de tilápia", categoria: "filetado", quantidade: 1, unidade: "pct", preco: 35.20 },
        { id: "18", nome: "📦 Filé de amarela", categoria: "filetado", quantidade: 1, unidade: "pct", preco: 41.60 },
        { id: "19", nome: "📦 Posta de dourada", categoria: "caixa", quantidade: 1, unidade: "pct", preco: 21.60 },
        { id: "20", nome: "📦 Filé de pescadinha", categoria: "filetado", quantidade: 1, unidade: "pct", preco: 17.20 }
      ],
      status: "pendente",
      dataEntrega: "2025-09-13",
      horaEntrega: "07:30",
      endereco: "Rua São Miguel, 445 - Siqueira, Fortaleza/CE",
      observacoes: "Entrega matinal obrigatória",
      valorTotal: 139.60,
      dataCriacao: "2025-09-09",
      prioridade: "urgente"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [showDialog, setShowDialog] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [selectedPedidoItens, setSelectedPedidoItens] = useState<Pedido | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedClienteId, setSelectedClienteId] = useState("");

  const [novoPedido, setNovoPedido] = useState<Partial<Pedido>>({
    cliente: "",
    telefone: "",
    produtos: [],
    status: "pendente",
    dataEntrega: "",
    horaEntrega: "",
    endereco: "",
    observacoes: "",
    prioridade: "media"
  });

  // Lista de produtos disponíveis
  const produtosDisponiveis = [
    { id: "1", nome: "Filé de surubim", categoria: "filetado", preco: 45.00, unidade: "pct" },
    { id: "2", nome: "Pescada posta M", categoria: "caixa", preco: 28.00, unidade: "pct" },
    { id: "3", nome: "Filé de pescadinhas", categoria: "filetado", preco: 17.20, unidade: "pct" },
    { id: "4", nome: "Pescadinha eviscerada", categoria: "granel", preco: 22.00, unidade: "pct" },
    { id: "5", nome: "Posta de atum", categoria: "caixa", preco: 65.00, unidade: "pct" },
    { id: "6", nome: "Filé de pescada amarela", categoria: "filetado", preco: 41.60, unidade: "pct" },
    { id: "7", nome: "Filé de dourada", categoria: "filetado", preco: 29.60, unidade: "pct" },
    { id: "8", nome: "Pescada amarela posta", categoria: "caixa", preco: 35.00, unidade: "pct" },
    { id: "9", nome: "Filé de pescada branca", categoria: "filetado", preco: 24.00, unidade: "pct" },
    { id: "10", nome: "Camarão grande", categoria: "granel", preco: 38.00, unidade: "kg" },
    { id: "11", nome: "Pargo inteiro", categoria: "caixa", preco: 28.00, unidade: "kg" },
    { id: "12", nome: "Salmão fresco", categoria: "filetado", preco: 55.00, unidade: "kg" }
  ];

  const statusColors = {
    pendente: "bg-yellow-100 text-yellow-800",
    "em-producao": "bg-blue-100 text-blue-800", 
    pronto: "bg-green-100 text-green-800",
    entregue: "bg-gray-100 text-gray-800",
    cancelado: "bg-red-100 text-red-800"
  };

  const prioridadeColors = {
    baixa: "bg-gray-100 text-gray-600",
    media: "bg-blue-100 text-blue-600",
    alta: "bg-orange-100 text-orange-600", 
    urgente: "bg-red-100 text-red-600"
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pendente': return <Clock className="h-4 w-4" />;
      case 'em-producao': return <AlertCircle className="h-4 w-4" />;
      case 'pronto': return <CheckCircle className="h-4 w-4" />;
      case 'entregue': return <CheckCircle className="h-4 w-4" />;
      case 'cancelado': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredPedidos = pedidos.filter(pedido => {
    const matchesSearch = pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pedido.numeroPedido.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || pedido.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Função para selecionar cliente e preencher dados automaticamente
  const handleSelectCliente = (clienteId: string) => {
    setSelectedClienteId(clienteId);
    
    if (clienteId) {
      const cliente = clientesDisponiveis.find(c => c.id === clienteId);
      if (cliente) {
        setNovoPedido(prev => ({
          ...prev,
          cliente: cliente.nome,
          telefone: cliente.telefone,
          endereco: `${cliente.endereco}, ${cliente.bairro} - ${cliente.cidade}${cliente.cep ? ` - ${cliente.cep}` : ''}`
        }));
      }
    } else {
      setNovoPedido(prev => ({
        ...prev,
        cliente: "",
        telefone: "",
        endereco: ""
      }));
    }
  };

  const handleCreatePedido = () => {
    if (!novoPedido.cliente || !novoPedido.dataEntrega || !novoPedido.horaEntrega) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const newPedido: Pedido = {
      id: Date.now().toString(),
      numeroPedido: `PED-${String(pedidos.length + 1).padStart(3, '0')}`,
      cliente: novoPedido.cliente!,
      telefone: novoPedido.telefone || "",
      produtos: novoPedido.produtos || [],
      status: "pendente",
      dataEntrega: novoPedido.dataEntrega!,
      horaEntrega: novoPedido.horaEntrega!,
      endereco: novoPedido.endereco || "",
      observacoes: novoPedido.observacoes || "",
      valorTotal: 0,
      dataCriacao: new Date().toISOString().split('T')[0],
      prioridade: novoPedido.prioridade as any || "media"
    };

    setPedidos([newPedido, ...pedidos]);
    setNovoPedido({
      cliente: "", telefone: "", produtos: [], status: "pendente",
      dataEntrega: "", horaEntrega: "", endereco: "", observacoes: "", prioridade: "media"
    });
    setSelectedClienteId("");
    setShowDialog(false);
    toast.success("Pedido criado com sucesso!");
  };

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setPedidos(prev => prev.map(pedido => 
      pedido.id === id ? { ...pedido, status: newStatus as any } : pedido
    ));
    toast.success("Status do pedido atualizado!");
  };

  const handleDeletePedido = (id: string) => {
    setPedidos(prev => prev.filter(pedido => pedido.id !== id));
    toast.success("Pedido removido com sucesso!");
  };

  const getTotalPedidos = () => pedidos.length;
  const getPedidosPendentes = () => pedidos.filter(p => p.status === 'pendente').length;
  const getPedidosEmProducao = () => pedidos.filter(p => p.status === 'em-producao').length;
  const getPedidosProntos = () => pedidos.filter(p => p.status === 'pronto').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold">Gestão de Pedidos</h2>
          <p className="text-muted-foreground">Controle completo de pedidos e entregas</p>
        </div>
        
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Pedido
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Novo Pedido</DialogTitle>
              <DialogDescription>
                Preencha os dados do pedido abaixo
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cliente">Cliente *</Label>
                <Select
                  value={selectedClienteId}
                  onValueChange={handleSelectCliente}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cliente cadastrado" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientesDisponiveis.map((cliente) => (
                      <SelectItem key={cliente.id} value={cliente.id}>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <div>
                            <div className="font-medium">{cliente.nome}</div>
                            <div className="text-xs text-muted-foreground">
                              {cliente.tipo === 'pessoa-juridica' ? 'PJ' : 'PF'} • {cliente.cidade}
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {novoPedido.cliente && (
                  <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                    ✓ Cliente selecionado: <strong>{novoPedido.cliente}</strong>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  placeholder="(11) 99999-9999"
                  value={novoPedido.telefone}
                  onChange={(e) => setNovoPedido(prev => ({ ...prev, telefone: e.target.value }))}
                  className={selectedClienteId ? "bg-green-50 border-green-200" : ""}
                />
                {selectedClienteId && (
                  <div className="text-xs text-green-600">
                    ℹ️ Preenchido automaticamente - pode ser editado
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dataEntrega">Data de Entrega *</Label>
                <Input
                  id="dataEntrega"
                  type="date"
                  value={novoPedido.dataEntrega}
                  onChange={(e) => setNovoPedido(prev => ({ ...prev, dataEntrega: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="horaEntrega">Hora de Entrega *</Label>
                <Input
                  id="horaEntrega"
                  type="time"
                  value={novoPedido.horaEntrega}
                  onChange={(e) => setNovoPedido(prev => ({ ...prev, horaEntrega: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="endereco">Endereço de Entrega</Label>
                <Input
                  id="endereco"
                  placeholder="Endereço completo"
                  value={novoPedido.endereco}
                  onChange={(e) => setNovoPedido(prev => ({ ...prev, endereco: e.target.value }))}
                  className={selectedClienteId ? "bg-green-50 border-green-200" : ""}
                />
                {selectedClienteId && (
                  <div className="text-xs text-green-600">
                    ℹ️ Preenchido automaticamente - pode ser editado
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="prioridade">Prioridade</Label>
                <Select
                  value={novoPedido.prioridade}
                  onValueChange={(value) => setNovoPedido(prev => ({ ...prev, prioridade: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">Baixa</SelectItem>
                    <SelectItem value="media">Média</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="urgente">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  placeholder="Observações especiais para o pedido"
                  value={novoPedido.observacoes}
                  onChange={(e) => setNovoPedido(prev => ({ ...prev, observacoes: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreatePedido}>
                Criar Pedido
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalPedidos()}</div>
            <p className="text-xs text-muted-foreground">Pedidos registrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{getPedidosPendentes()}</div>
            <p className="text-xs text-muted-foreground">Aguardando produção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Produção</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{getPedidosEmProducao()}</div>
            <p className="text-xs text-muted-foreground">Sendo preparados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prontos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{getPedidosProntos()}</div>
            <p className="text-xs text-muted-foreground">Prontos para entrega</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtrar Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por cliente ou número do pedido..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="em-producao">Em Produção</SelectItem>
                <SelectItem value="pronto">Pronto</SelectItem>
                <SelectItem value="entregue">Entregue</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Pedidos */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Data Entrega</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPedidos.map((pedido) => (
                  <TableRow key={pedido.id}>
                    <TableCell className="font-medium">
                      {pedido.numeroPedido}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{pedido.cliente}</div>
                          <div className="text-sm text-muted-foreground">{pedido.telefone}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div>{new Date(pedido.dataEntrega).toLocaleDateString('pt-BR')}</div>
                          <div className="text-sm text-muted-foreground">{pedido.horaEntrega}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`gap-1 ${statusColors[pedido.status]}`}>
                        {getStatusIcon(pedido.status)}
                        {pedido.status.charAt(0).toUpperCase() + pedido.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={prioridadeColors[pedido.prioridade]}>
                        {pedido.prioridade.charAt(0).toUpperCase() + pedido.prioridade.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        R$ {pedido.valorTotal.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedPedidoItens(pedido)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Detalhes do Pedido {selectedPedidoItens?.numeroPedido}</DialogTitle>
                            </DialogHeader>
                            {selectedPedidoItens && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Cliente</Label>
                                    <p className="font-medium">{selectedPedidoItens.cliente}</p>
                                  </div>
                                  <div>
                                    <Label>Telefone</Label>
                                    <p className="font-medium">{selectedPedidoItens.telefone}</p>
                                  </div>
                                  <div>
                                    <Label>Data de Entrega</Label>
                                    <p className="font-medium">
                                      {new Date(selectedPedidoItens.dataEntrega).toLocaleDateString('pt-BR')} às {selectedPedidoItens.horaEntrega}
                                    </p>
                                  </div>
                                  <div>
                                    <Label>Status</Label>
                                    <Badge className={`gap-1 ${statusColors[selectedPedidoItens.status]}`}>
                                      {getStatusIcon(selectedPedidoItens.status)}
                                      {selectedPedidoItens.status.charAt(0).toUpperCase() + selectedPedidoItens.status.slice(1)}
                                    </Badge>
                                  </div>
                                </div>
                                
                                <div>
                                  <Label>Endereço</Label>
                                  <p className="font-medium">{selectedPedidoItens.endereco}</p>
                                </div>
                                
                                <div>
                                  <Label>Produtos</Label>
                                  <div className="border rounded-lg p-4 space-y-2">
                                    {selectedPedidoItens.produtos.map((produto) => (
                                      <div key={produto.id} className="flex justify-between items-center">
                                        <div>
                                          <span className="font-medium">{produto.nome}</span>
                                          <span className="text-sm text-muted-foreground ml-2">
                                            ({produto.quantidade} {produto.unidade})
                                          </span>
                                        </div>
                                        <span className="font-medium">
                                          R$ {(produto.quantidade * produto.preco).toFixed(2)}
                                        </span>
                                      </div>
                                    ))}
                                    <div className="border-t pt-2 flex justify-between font-semibold">
                                      <span>Total:</span>
                                      <span>R$ {selectedPedidoItens.valorTotal.toFixed(2)}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                {selectedPedidoItens.observacoes && (
                                  <div>
                                    <Label>Observações</Label>
                                    <p className="font-medium">{selectedPedidoItens.observacoes}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Select
                          value={pedido.status}
                          onValueChange={(value) => handleUpdateStatus(pedido.id, value)}
                        >
                          <SelectTrigger className="w-auto">
                            <Edit className="h-4 w-4" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pendente">Pendente</SelectItem>
                            <SelectItem value="em-producao">Em Produção</SelectItem>
                            <SelectItem value="pronto">Pronto</SelectItem>
                            <SelectItem value="entregue">Entregue</SelectItem>
                            <SelectItem value="cancelado">Cancelado</SelectItem>
                          </SelectContent>
                        </Select>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePedido(pedido.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
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
    </div>
  );
}