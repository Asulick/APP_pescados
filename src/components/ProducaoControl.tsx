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
  Clock, 
  CheckCircle, 
  AlertCircle,
  Play,
  Package,
  Chef,
  Timer,
  ArrowRight,
  Box,
  Scale,
  Utensils
} from "lucide-react";
import { toast } from "sonner";

interface SolicitacaoProducao {
  id: string;
  codigo: string;
  produto: string;
  categoria: 'caixa' | 'granel' | 'filetado';
  quantidadeSolicitada: number;
  unidade: string;
  dataEntrada: string;
  dataSolicitacao: string;
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
  status: 'solicitado' | 'em-producao' | 'pronto' | 'transferido';
  responsavel: string;
  observacoes: string;
  tempoEstimado: number; // em horas
  materiasPrimas: Array<{
    id: string;
    nome: string;
    quantidadeNecessaria: number;
    unidade: string;
  }>;
}

export function ProducaoControl() {
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoProducao[]>([
    {
      id: "1",
      codigo: "PROD-001",
      produto: "Salmão Atlântico Filetado",
      categoria: "filetado",
      quantidadeSolicitada: 10,
      unidade: "kg",
      dataEntrada: "2025-08-26",
      dataSolicitacao: "2025-08-26",
      prioridade: "alta",
      status: "em-producao",
      responsavel: "João Silva",
      observacoes: "Corte especial para restaurante premium",
      tempoEstimado: 2,
      materiasPrimas: [
        { id: "1", nome: "Salmão Inteiro", quantidadeNecessaria: 12, unidade: "kg" }
      ]
    },
    {
      id: "2",
      codigo: "PROD-002", 
      produto: "Camarão Descascado",
      categoria: "caixa",
      quantidadeSolicitada: 5,
      unidade: "kg",
      dataEntrada: "2025-08-26",
      dataSolicitacao: "2025-08-25",
      prioridade: "media",
      status: "pronto",
      responsavel: "Maria Santos",
      observacoes: "Embalagem individual de 250g",
      tempoEstimado: 1.5,
      materiasPrimas: [
        { id: "2", nome: "Camarão Inteiro", quantidadeNecessaria: 6, unidade: "kg" }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [showDialog, setShowDialog] = useState(false);

  const [novaSolicitacao, setNovaSolicitacao] = useState<Partial<SolicitacaoProducao>>({
    produto: "",
    categoria: "filetado",
    quantidadeSolicitada: 0,
    unidade: "kg",
    prioridade: "media",
    responsavel: "",
    observacoes: "",
    tempoEstimado: 0,
    materiasPrimas: []
  });

  const statusColors = {
    'solicitado': "bg-gray-100 text-gray-800",
    'em-producao': "bg-blue-100 text-blue-800",
    'pronto': "bg-green-100 text-green-800",
    'transferido': "bg-purple-100 text-purple-800"
  };

  const prioridadeColors = {
    'baixa': "bg-gray-100 text-gray-600",
    'media': "bg-blue-100 text-blue-600", 
    'alta': "bg-orange-100 text-orange-600",
    'urgente': "bg-red-100 text-red-600"
  };

  const categoriaIcons = {
    'caixa': Box,
    'granel': Scale,
    'filetado': Utensils
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'solicitado': return <Clock className="h-4 w-4" />;
      case 'em-producao': return <Play className="h-4 w-4" />;
      case 'pronto': return <CheckCircle className="h-4 w-4" />;
      case 'transferido': return <Package className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredSolicitacoes = solicitacoes.filter(solicitacao => {
    const matchesSearch = solicitacao.produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         solicitacao.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || solicitacao.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateSolicitacao = () => {
    if (!novaSolicitacao.produto || !novaSolicitacao.quantidadeSolicitada || !novaSolicitacao.responsavel) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const newSolicitacao: SolicitacaoProducao = {
      id: Date.now().toString(),
      codigo: `PROD-${String(solicitacoes.length + 1).padStart(3, '0')}`,
      produto: novaSolicitacao.produto!,
      categoria: novaSolicitacao.categoria!,
      quantidadeSolicitada: novaSolicitacao.quantidadeSolicitada!,
      unidade: novaSolicitacao.unidade!,
      dataEntrada: new Date().toISOString().split('T')[0],
      dataSolicitacao: new Date().toISOString().split('T')[0],
      prioridade: novaSolicitacao.prioridade as any,
      status: "solicitado",
      responsavel: novaSolicitacao.responsavel!,
      observacoes: novaSolicitacao.observacoes || "",
      tempoEstimado: novaSolicitacao.tempoEstimado || 1,
      materiasPrimas: novaSolicitacao.materiasPrimas || []
    };

    setSolicitacoes([newSolicitacao, ...solicitacoes]);
    setNovaSolicitacao({
      produto: "", categoria: "filetado", quantidadeSolicitada: 0,
      unidade: "kg", prioridade: "media", responsavel: "", observacoes: "",
      tempoEstimado: 0, materiasPrimas: []
    });
    setShowDialog(false);
    toast.success("Solicitação de produção criada!");
  };

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setSolicitacoes(prev => prev.map(solicitacao => 
      solicitacao.id === id ? { ...solicitacao, status: newStatus as any } : solicitacao
    ));
    
    if (newStatus === 'em-producao') {
      toast.success("Produção iniciada!");
    } else if (newStatus === 'pronto') {
      toast.success("Produto pronto para transferência!");
    }
  };

  const handleTransferirParaEstoque = (solicitacao: SolicitacaoProducao) => {
    if (solicitacao.status !== 'pronto') {
      toast.error("Produto deve estar pronto para ser transferido");
      return;
    }

    // Simular transferência para estoque
    setSolicitacoes(prev => prev.map(s => 
      s.id === solicitacao.id ? { ...s, status: 'transferido' } : s
    ));

    toast.success(`${solicitacao.produto} transferido para o estoque!`, {
      description: `${solicitacao.quantidadeSolicitada} ${solicitacao.unidade} adicionados ao estoque`,
      action: {
        label: "Ver Estoque",
        onClick: () => {
          // Aqui poderia navegar para o estoque
          console.log("Navegar para estoque");
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold">Controle de Produção</h2>
          <p className="text-muted-foreground">Gerenciamento de solicitações e processamento</p>
        </div>
        
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Solicitação
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nova Solicitação de Produção</DialogTitle>
              <DialogDescription>
                Crie uma nova solicitação de processamento de produto
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="produto">Produto *</Label>
                <Input
                  id="produto"
                  placeholder="Ex: Salmão Atlântico Filetado"
                  value={novaSolicitacao.produto}
                  onChange={(e) => setNovaSolicitacao(prev => ({ ...prev, produto: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="responsavel">Responsável *</Label>
                <Input
                  id="responsavel"
                  placeholder="Nome do responsável"
                  value={novaSolicitacao.responsavel}
                  onChange={(e) => setNovaSolicitacao(prev => ({ ...prev, responsavel: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria *</Label>
                <Select
                  value={novaSolicitacao.categoria}
                  onValueChange={(value) => setNovaSolicitacao(prev => ({ ...prev, categoria: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="caixa">Caixa</SelectItem>
                    <SelectItem value="granel">Granel</SelectItem>
                    <SelectItem value="filetado">Filetado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="prioridade">Prioridade</Label>
                <Select
                  value={novaSolicitacao.prioridade}
                  onValueChange={(value) => setNovaSolicitacao(prev => ({ ...prev, prioridade: value as any }))}
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
              
              <div className="space-y-2">
                <Label htmlFor="quantidade">Quantidade *</Label>
                <Input
                  id="quantidade"
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  value={novaSolicitacao.quantidadeSolicitada}
                  onChange={(e) => setNovaSolicitacao(prev => ({ ...prev, quantidadeSolicitada: parseFloat(e.target.value) || 0 }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="unidade">Unidade</Label>
                <Select
                  value={novaSolicitacao.unidade}
                  onValueChange={(value) => setNovaSolicitacao(prev => ({ ...prev, unidade: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kg</SelectItem>
                    <SelectItem value="g">Gramas</SelectItem>
                    <SelectItem value="un">Unidades</SelectItem>
                    <SelectItem value="cx">Caixas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tempoEstimado">Tempo Estimado (horas)</Label>
                <Input
                  id="tempoEstimado"
                  type="number"
                  step="0.5"
                  placeholder="Ex: 2.5"
                  value={novaSolicitacao.tempoEstimado}
                  onChange={(e) => setNovaSolicitacao(prev => ({ ...prev, tempoEstimado: parseFloat(e.target.value) || 0 }))}
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  placeholder="Instruções especiais para o processamento"
                  value={novaSolicitacao.observacoes}
                  onChange={(e) => setNovaSolicitacao(prev => ({ ...prev, observacoes: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateSolicitacao}>
                Criar Solicitação
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
              <div className="p-2 bg-gray-100 rounded-lg">
                <Clock className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Solicitados</p>
                <p className="text-xl font-semibold">
                  {solicitacoes.filter(s => s.status === 'solicitado').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Play className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Em Produção</p>
                <p className="text-xl font-semibold">
                  {solicitacoes.filter(s => s.status === 'em-producao').length}
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
                  {solicitacoes.filter(s => s.status === 'pronto').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Transferidos Hoje</p>
                <p className="text-xl font-semibold">
                  {solicitacoes.filter(s => s.status === 'transferido' && s.dataEntrada === new Date().toISOString().split('T')[0]).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card>
        <CardHeader>
          <CardTitle>Solicitações de Produção</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por produto ou código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="solicitado">Solicitado</SelectItem>
                <SelectItem value="em-producao">Em Produção</SelectItem>
                <SelectItem value="pronto">Pronto</SelectItem>
                <SelectItem value="transferido">Transferido</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSolicitacoes.map((solicitacao) => {
                  const IconCategoria = categoriaIcons[solicitacao.categoria];
                  
                  return (
                    <TableRow key={solicitacao.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{solicitacao.codigo}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(solicitacao.dataSolicitacao).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{solicitacao.produto}</div>
                        {solicitacao.observacoes && (
                          <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {solicitacao.observacoes}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="gap-1">
                          <IconCategoria className="h-3 w-3" />
                          {solicitacao.categoria.charAt(0).toUpperCase() + solicitacao.categoria.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {solicitacao.quantidadeSolicitada} {solicitacao.unidade}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Timer className="h-3 w-3" />
                            {solicitacao.tempoEstimado}h
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`gap-1 ${statusColors[solicitacao.status]}`}>
                          {getStatusIcon(solicitacao.status)}
                          {solicitacao.status === 'em-producao' ? 'Em Produção' :
                           solicitacao.status.charAt(0).toUpperCase() + solicitacao.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={prioridadeColors[solicitacao.prioridade]}>
                          {solicitacao.prioridade.charAt(0).toUpperCase() + solicitacao.prioridade.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{solicitacao.responsavel}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {solicitacao.status === 'solicitado' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateStatus(solicitacao.id, 'em-producao')}
                              className="gap-1"
                            >
                              <Play className="h-3 w-3" />
                              Iniciar
                            </Button>
                          )}
                          
                          {solicitacao.status === 'em-producao' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateStatus(solicitacao.id, 'pronto')}
                              className="gap-1"
                            >
                              <CheckCircle className="h-3 w-3" />
                              Finalizar
                            </Button>
                          )}
                          
                          {solicitacao.status === 'pronto' && (
                            <Button
                              size="sm"
                              onClick={() => handleTransferirParaEstoque(solicitacao)}
                              className="gap-1"
                            >
                              <ArrowRight className="h-3 w-3" />
                              Transferir
                            </Button>
                          )}
                          
                          {solicitacao.status === 'transferido' && (
                            <Badge variant="outline" className="gap-1">
                              <Package className="h-3 w-3" />
                              No Estoque
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}