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
  MapPin
} from "lucide-react";
import { toast } from "sonner";

interface Pedido {
  id: string;
  numeroPedido: string;
  cliente: string;
  telefone: string;
  produtos: Array<{
    id: string;
    nome: string;
    categoria: 'caixa' | 'granel' | 'filetado';
    quantidade: number;
    unidade: string;
    preco: number;
  }>;
  status: 'pendente' | 'processando' | 'pronto' | 'entregue' | 'cancelado';
  dataEntrega: string;
  horaEntrega: string;
  endereco: string;
  observacoes: string;
  valorTotal: number;
  dataCriacao: string;
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
}

export function PedidosControl() {
  const [pedidos, setPedidos] = useState<Pedido[]>([
    {
      id: "1",
      numeroPedido: "PED-001",
      cliente: "Restaurante Mar Azul",
      telefone: "(11) 9999-9999",
      produtos: [
        { id: "1", nome: "Salmão", categoria: "filetado", quantidade: 5, unidade: "kg", preco: 45.00 },
        { id: "2", nome: "Camarão", categoria: "caixa", quantidade: 2, unidade: "kg", preco: 35.00 }
      ],
      status: "processando",
      dataEntrega: "2025-08-27",
      horaEntrega: "14:00",
      endereco: "Rua das Flores, 123 - Centro",
      observacoes: "Entregar na entrada dos fundos",
      valorTotal: 295.00,
      dataCriacao: "2025-08-26",
      prioridade: "alta"
    },
    {
      id: "2", 
      numeroPedido: "PED-002",
      cliente: "Peixaria Central",
      telefone: "(11) 8888-8888",
      produtos: [
        { id: "3", nome: "Tilápia", categoria: "granel", quantidade: 10, unidade: "kg", preco: 18.00 }
      ],
      status: "pronto",
      dataEntrega: "2025-08-26",
      horaEntrega: "16:30",
      endereco: "Av. Principal, 456 - Vila Nova",
      observacoes: "",
      valorTotal: 180.00,
      dataCriacao: "2025-08-25",
      prioridade: "media"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [showDialog, setShowDialog] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const statusColors = {
    pendente: "bg-yellow-100 text-yellow-800",
    processando: "bg-blue-100 text-blue-800", 
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
      case 'processando': return <AlertCircle className="h-4 w-4" />;
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
    setShowDialog(false);
    toast.success("Pedido criado com sucesso!");
  };

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setPedidos(prev => prev.map(pedido => 
      pedido.id === id ? { ...pedido, status: newStatus as any } : pedido
    ));
    toast.success("Status do pedido atualizado!");
  };

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
                <Input
                  id="cliente"
                  placeholder="Nome do cliente"
                  value={novoPedido.cliente}
                  onChange={(e) => setNovoPedido(prev => ({ ...prev, cliente: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  placeholder="(11) 99999-9999"
                  value={novoPedido.telefone}
                  onChange={(e) => setNovoPedido(prev => ({ ...prev, telefone: e.target.value }))}
                />
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
                />
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="text-xl font-semibold">
                  {pedidos.filter(p => p.status === 'pendente').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Processando</p>
                <p className="text-xl font-semibold">
                  {pedidos.filter(p => p.status === 'processando').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Prontos</p>
                <p className="text-xl font-semibold">
                  {pedidos.filter(p => p.status === 'pronto').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Package className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Entregues Hoje</p>
                <p className="text-xl font-semibold">
                  {pedidos.filter(p => p.status === 'entregue' && p.dataCriacao === new Date().toISOString().split('T')[0]).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por cliente ou número do pedido..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="processando">Processando</SelectItem>
                <SelectItem value="pronto">Pronto</SelectItem>
                <SelectItem value="entregue">Entregue</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pedido</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Entrega</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPedidos.map((pedido) => (
                  <TableRow key={pedido.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{pedido.numeroPedido}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(pedido.dataCriacao).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{pedido.cliente}</div>
                        <div className="text-sm text-muted-foreground">{pedido.telefone}</div>
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
                      <div>
                        <div className="font-medium">
                          {new Date(pedido.dataEntrega).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="text-sm text-muted-foreground">{pedido.horaEntrega}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        R$ {pedido.valorTotal.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedPedido(pedido)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Select
                          value={pedido.status}
                          onValueChange={(value) => handleUpdateStatus(pedido.id, value)}
                        >
                          <SelectTrigger className="w-[130px] h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pendente">Pendente</SelectItem>
                            <SelectItem value="processando">Processando</SelectItem>
                            <SelectItem value="pronto">Pronto</SelectItem>
                            <SelectItem value="entregue">Entregue</SelectItem>
                            <SelectItem value="cancelado">Cancelado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Detalhes do Pedido */}
      {selectedPedido && (
        <Dialog open={!!selectedPedido} onOpenChange={() => setSelectedPedido(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalhes do Pedido {selectedPedido.numeroPedido}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cliente</Label>
                  <p className="text-sm">{selectedPedido.cliente}</p>
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <p className="text-sm">{selectedPedido.telefone}</p>
                </div>
                <div className="space-y-2">
                  <Label>Data de Entrega</Label>
                  <p className="text-sm">
                    {new Date(selectedPedido.dataEntrega).toLocaleDateString('pt-BR')} às {selectedPedido.horaEntrega}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Badge className={`gap-1 w-fit ${statusColors[selectedPedido.status]}`}>
                    {getStatusIcon(selectedPedido.status)}
                    {selectedPedido.status.charAt(0).toUpperCase() + selectedPedido.status.slice(1)}
                  </Badge>
                </div>
              </div>
              
              {selectedPedido.endereco && (
                <div className="space-y-2">
                  <Label>Endereço de Entrega</Label>
                  <p className="text-sm">{selectedPedido.endereco}</p>
                </div>
              )}
              
              {selectedPedido.observacoes && (
                <div className="space-y-2">
                  <Label>Observações</Label>
                  <p className="text-sm">{selectedPedido.observacoes}</p>
                </div>
              )}
              
              <div className="space-y-2">
                <Label>Produtos</Label>
                <div className="border rounded-lg p-3 space-y-2">
                  {selectedPedido.produtos.map((produto) => (
                    <div key={produto.id} className="flex justify-between items-center text-sm">
                      <div>
                        <span className="font-medium">{produto.nome}</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {produto.categoria}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div>{produto.quantidade} {produto.unidade}</div>
                        <div className="text-muted-foreground">
                          R$ {(produto.quantidade * produto.preco).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-2 flex justify-between items-center font-medium">
                    <span>Total</span>
                    <span>R$ {selectedPedido.valorTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}