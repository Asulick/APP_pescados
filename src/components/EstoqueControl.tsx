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
  QrCode, 
  Edit, 
  Trash2, 
  Package,
  Thermometer,
  MapPin,
  Box,
  Scale,
  Utensils,
  AlertTriangle,
  CheckCircle,
  Clock,
  Snowflake
} from "lucide-react";
import { toast } from "sonner";

interface Produto {
  id: string;
  codigo: string;
  nome: string;
  categoria: 'caixa' | 'granel' | 'filetado';
  estado: 'com-gelizer' | 'sem-gelizer';
  quantidade: number;
  unidade: string;
  precoUnitario: number;
  dataEntrada: string;
  dataValidade: string;
  fornecedor: string;
  localizacao: {
    camara: 'A' | 'B' | 'C';
    prateleira: string;
    posicao: string;
  };
  temperatura: number;
  observacoes: string;
  qrCode: string;
}

export function EstoqueControl() {
  const [produtos, setProdutos] = useState<Produto[]>([
    {
      id: "1",
      codigo: "SAL001",
      nome: "Salmão Atlântico",
      categoria: "filetado",
      estado: "com-gelizer",
      quantidade: 15.5,
      unidade: "kg",
      precoUnitario: 45.00,
      dataEntrada: "2025-08-26",
      dataValidade: "2025-08-28",
      fornecedor: "Pescados do Norte",
      localizacao: {
        camara: "A",
        prateleira: "P1",
        posicao: "A1"
      },
      temperatura: 2,
      observacoes: "Produto premium para restaurantes",
      qrCode: "QR_SAL001_2025082"
    },
    {
      id: "2",
      codigo: "CAM002", 
      nome: "Camarão Rosa",
      categoria: "caixa",
      estado: "sem-gelizer",
      quantidade: 8.2,
      unidade: "kg",
      precoUnitario: 35.00,
      dataEntrada: "2025-08-25",
      dataValidade: "2025-08-27",
      fornecedor: "Mariscos Bahia",
      localizacao: {
        camara: "B",
        prateleira: "P2",
        posicao: "B3"
      },
      temperatura: 1,
      observacoes: "Camarão médio, ideal para pratos executivos",
      qrCode: "QR_CAM002_2025082"
    },
    {
      id: "3",
      codigo: "TIL003",
      nome: "Tilápia Inteira",
      categoria: "granel",
      estado: "com-gelizer",
      quantidade: 22.0,
      unidade: "kg",
      precoUnitario: 18.00,
      dataEntrada: "2025-08-26",
      dataValidade: "2025-08-29",
      fornecedor: "Aquicultura Vale",
      localizacao: {
        camara: "C",
        prateleira: "P1",
        posicao: "C2"
      },
      temperatura: 3,
      observacoes: "Peixe fresco de cativeiro",
      qrCode: "QR_TIL003_2025082"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("todas");
  const [estadoFilter, setEstadoFilter] = useState("todos");
  const [camaraFilter, setCamaraFilter] = useState("todas");
  const [showDialog, setShowDialog] = useState(false);
  const [editingProduto, setEditingProduto] = useState<Produto | null>(null);

  const [novoProduto, setNovoProduto] = useState<Partial<Produto>>({
    nome: "",
    categoria: "filetado",
    estado: "com-gelizer",
    quantidade: 0,
    unidade: "kg",
    precoUnitario: 0,
    dataEntrada: "",
    dataValidade: "",
    fornecedor: "",
    localizacao: {
      camara: "A",
      prateleira: "",
      posicao: ""
    },
    temperatura: 0,
    observacoes: ""
  });

  const categoriaIcons = {
    'caixa': Box,
    'granel': Scale,
    'filetado': Utensils
  };

  const categoriaColors = {
    'caixa': "bg-blue-100 text-blue-800",
    'granel': "bg-green-100 text-green-800", 
    'filetado': "bg-purple-100 text-purple-800"
  };

  const estadoColors = {
    'com-gelizer': "bg-cyan-100 text-cyan-800",
    'sem-gelizer': "bg-orange-100 text-orange-800"
  };

  const camaraColors = {
    'A': "bg-red-100 text-red-800",
    'B': "bg-blue-100 text-blue-800",
    'C': "bg-green-100 text-green-800"
  };

  const getValidadeStatus = (dataValidade: string) => {
    const hoje = new Date();
    const validade = new Date(dataValidade);
    const diffDays = Math.ceil((validade.getTime() - hoje.getTime()) / (1000 * 3600 * 24));
    
    if (diffDays < 0) {
      return { status: 'vencido', color: 'bg-red-100 text-red-800', icon: AlertTriangle };
    } else if (diffDays <= 1) {
      return { status: 'vencendo', color: 'bg-yellow-100 text-yellow-800', icon: Clock };
    } else {
      return { status: 'válido', color: 'bg-green-100 text-green-800', icon: CheckCircle };
    }
  };

  const filteredProdutos = produtos.filter(produto => {
    const matchesSearch = produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         produto.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = categoriaFilter === "todas" || produto.categoria === categoriaFilter;
    const matchesEstado = estadoFilter === "todos" || produto.estado === estadoFilter;
    const matchesCamara = camaraFilter === "todas" || produto.localizacao.camara === camaraFilter;
    return matchesSearch && matchesCategoria && matchesEstado && matchesCamara;
  });

  const handleCreateProduto = () => {
    if (!novoProduto.nome || !novoProduto.dataEntrada || !novoProduto.dataValidade) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const newProduto: Produto = {
      id: Date.now().toString(),
      codigo: `${novoProduto.nome?.substring(0, 3).toUpperCase()}${String(produtos.length + 1).padStart(3, '0')}`,
      nome: novoProduto.nome!,
      categoria: novoProduto.categoria!,
      estado: novoProduto.estado!,
      quantidade: novoProduto.quantidade!,
      unidade: novoProduto.unidade!,
      precoUnitario: novoProduto.precoUnitario!,
      dataEntrada: novoProduto.dataEntrada!,
      dataValidade: novoProduto.dataValidade!,
      fornecedor: novoProduto.fornecedor!,
      localizacao: novoProduto.localizacao!,
      temperatura: novoProduto.temperatura!,
      observacoes: novoProduto.observacoes || "",
      qrCode: `QR_${novoProduto.nome?.substring(0, 3).toUpperCase()}${Date.now()}`
    };

    setProdutos([newProduto, ...produtos]);
    setNovoProduto({
      nome: "", categoria: "filetado", estado: "com-gelizer", quantidade: 0,
      unidade: "kg", precoUnitario: 0, dataEntrada: "", dataValidade: "",
      fornecedor: "", localizacao: { camara: "A", prateleira: "", posicao: "" },
      temperatura: 0, observacoes: ""
    });
    setShowDialog(false);
    toast.success("Produto adicionado ao estoque!");
  };

  const handleDeleteProduto = (id: string) => {
    setProdutos(prev => prev.filter(produto => produto.id !== id));
    toast.success("Produto removido do estoque!");
  };

  const handleGenerateQR = (produto: Produto) => {
    toast.success(`QR Code gerado para ${produto.nome}: ${produto.qrCode}`);
  };

  // Estatísticas por câmara
  const getStatsByCamara = () => {
    const camaras = ['A', 'B', 'C'] as const;
    return camaras.map(camara => ({
      camara,
      total: produtos.filter(p => p.localizacao.camara === camara).length,
      ocupacao: Math.round((produtos.filter(p => p.localizacao.camara === camara).length / produtos.length) * 100) || 0
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold">Controle de Estoque</h2>
          <p className="text-muted-foreground">Gestão completa de produtos com QR Code e localização por câmaras</p>
        </div>
        
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Adicionar Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Adicionar Produto ao Estoque</DialogTitle>
              <DialogDescription>
                Preencha todas as informações do produto
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Produto *</Label>
                <Input
                  id="nome"
                  placeholder="Ex: Salmão Atlântico"
                  value={novoProduto.nome}
                  onChange={(e) => setNovoProduto(prev => ({ ...prev, nome: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fornecedor">Fornecedor *</Label>
                <Input
                  id="fornecedor"
                  placeholder="Nome do fornecedor"
                  value={novoProduto.fornecedor}
                  onChange={(e) => setNovoProduto(prev => ({ ...prev, fornecedor: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria *</Label>
                <Select
                  value={novoProduto.categoria}
                  onValueChange={(value) => setNovoProduto(prev => ({ ...prev, categoria: value as any }))}
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
                <Label htmlFor="estado">Estado do Produto *</Label>
                <Select
                  value={novoProduto.estado}
                  onValueChange={(value) => setNovoProduto(prev => ({ ...prev, estado: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="com-gelizer">Com Gelizer</SelectItem>
                    <SelectItem value="sem-gelizer">Sem Gelizer</SelectItem>
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
                  value={novoProduto.quantidade}
                  onChange={(e) => setNovoProduto(prev => ({ ...prev, quantidade: parseFloat(e.target.value) || 0 }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="unidade">Unidade *</Label>
                <Select
                  value={novoProduto.unidade}
                  onValueChange={(value) => setNovoProduto(prev => ({ ...prev, unidade: value }))}
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
                <Label htmlFor="preco">Preço Unitário (R$) *</Label>
                <Input
                  id="preco"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={novoProduto.precoUnitario}
                  onChange={(e) => setNovoProduto(prev => ({ ...prev, precoUnitario: parseFloat(e.target.value) || 0 }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="temperatura">Temperatura (°C)</Label>
                <Input
                  id="temperatura"
                  type="number"
                  placeholder="Ex: 2"
                  value={novoProduto.temperatura}
                  onChange={(e) => setNovoProduto(prev => ({ ...prev, temperatura: parseInt(e.target.value) || 0 }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dataEntrada">Data de Entrada *</Label>
                <Input
                  id="dataEntrada"
                  type="date"
                  value={novoProduto.dataEntrada}
                  onChange={(e) => setNovoProduto(prev => ({ ...prev, dataEntrada: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dataValidade">Data de Validade *</Label>
                <Input
                  id="dataValidade"
                  type="date"
                  value={novoProduto.dataValidade}
                  onChange={(e) => setNovoProduto(prev => ({ ...prev, dataValidade: e.target.value }))}
                />
              </div>
              
              {/* Localização por Câmaras */}
              <div className="space-y-2">
                <Label htmlFor="camara">Câmara Frigorífica *</Label>
                <Select
                  value={novoProduto.localizacao?.camara}
                  onValueChange={(value) => setNovoProduto(prev => ({ 
                    ...prev, 
                    localizacao: { ...prev.localizacao!, camara: value as any }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a câmara" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Câmara A</SelectItem>
                    <SelectItem value="B">Câmara B</SelectItem>
                    <SelectItem value="C">Câmara C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="prateleira">Prateleira</Label>
                <Input
                  id="prateleira"
                  placeholder="Ex: P1"
                  value={novoProduto.localizacao?.prateleira}
                  onChange={(e) => setNovoProduto(prev => ({ 
                    ...prev, 
                    localizacao: { ...prev.localizacao!, prateleira: e.target.value }
                  }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="posicao">Posição</Label>
                <Input
                  id="posicao"
                  placeholder="Ex: A1"
                  value={novoProduto.localizacao?.posicao}
                  onChange={(e) => setNovoProduto(prev => ({ 
                    ...prev, 
                    localizacao: { ...prev.localizacao!, posicao: e.target.value }
                  }))}
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  placeholder="Observações sobre o produto"
                  value={novoProduto.observacoes}
                  onChange={(e) => setNovoProduto(prev => ({ ...prev, observacoes: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateProduto}>
                Adicionar ao Estoque
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Itens</p>
                <p className="text-xl font-semibold">{produtos.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-100 rounded-lg">
                <Snowflake className="h-5 w-5 text-cyan-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Com Gelizer</p>
                <p className="text-xl font-semibold">
                  {produtos.filter(p => p.estado === 'com-gelizer').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Stats por Câmara */}
        {getStatsByCamara().map(({ camara, total, ocupacao }) => (
          <Card key={camara}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${camaraColors[camara].replace('text-', 'text-').replace('bg-', 'bg-')}`}>
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Câmara {camara}</p>
                  <p className="text-xl font-semibold">{total}</p>
                  <p className="text-xs text-muted-foreground">{ocupacao}% ocupação</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Table */}
      <Card>
        <CardHeader>
          <CardTitle>Produtos em Estoque</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
              <SelectTrigger className="w-full sm:w-[120px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="caixa">Caixa</SelectItem>
                <SelectItem value="granel">Granel</SelectItem>
                <SelectItem value="filetado">Filetado</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={estadoFilter} onValueChange={setEstadoFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="com-gelizer">Com Gelizer</SelectItem>
                <SelectItem value="sem-gelizer">Sem Gelizer</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={camaraFilter} onValueChange={setCamaraFilter}>
              <SelectTrigger className="w-full sm:w-[120px]">
                <SelectValue placeholder="Câmara" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="A">Câmara A</SelectItem>
                <SelectItem value="B">Câmara B</SelectItem>
                <SelectItem value="C">Câmara C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Validade</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProdutos.map((produto) => {
                  const validadeStatus = getValidadeStatus(produto.dataValidade);
                  const IconCategoria = categoriaIcons[produto.categoria];
                  
                  return (
                    <TableRow key={produto.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{produto.nome}</div>
                          <div className="text-sm text-muted-foreground">{produto.codigo}</div>
                          <div className="text-sm text-muted-foreground">{produto.fornecedor}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`gap-1 ${categoriaColors[produto.categoria]}`}>
                          <IconCategoria className="h-3 w-3" />
                          {produto.categoria.charAt(0).toUpperCase() + produto.categoria.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={estadoColors[produto.estado]}>
                          <Thermometer className="h-3 w-3 mr-1" />
                          {produto.estado === 'com-gelizer' ? 'Com Gelizer' : 'Sem Gelizer'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{produto.quantidade} {produto.unidade}</div>
                          <div className="text-sm text-muted-foreground">
                            R$ {produto.precoUnitario.toFixed(2)}/{produto.unidade}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge className={`gap-1 ${camaraColors[produto.localizacao.camara]}`}>
                            <MapPin className="h-3 w-3" />
                            Câmara {produto.localizacao.camara}
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            {produto.localizacao.prateleira} - {produto.localizacao.posicao}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Thermometer className="h-3 w-3" />
                            {produto.temperatura}°C
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <Badge className={`gap-1 ${validadeStatus.color}`}>
                            <validadeStatus.icon className="h-3 w-3" />
                            {validadeStatus.status}
                          </Badge>
                          <div className="text-sm text-muted-foreground mt-1">
                            {new Date(produto.dataValidade).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleGenerateQR(produto)}
                            title="Gerar QR Code"
                          >
                            <QrCode className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingProduto(produto)}
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProduto(produto.id)}
                            title="Remover"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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