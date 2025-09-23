import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "./ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { 
  Plus, 
  Search, 
  Edit, 
  Eye, 
  Trash2, 
  User, 
  Phone, 
  MapPin, 
  Mail,
  Building,
  Calendar,
  Users
} from "lucide-react";
import { toast } from "sonner";

interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  endereco: string;
  cidade: string;
  bairro: string;
  cep?: string;
  tipo: 'pessoa-fisica' | 'pessoa-juridica';
  cpfCnpj?: string;
  observacoes?: string;
  dataCadastro: string;
  status: 'ativo' | 'inativo';
  totalPedidos: number;
  ultimoPedido?: string;
}

export function ClientesControl() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Mock data - clientes já cadastrados
  const [clientes, setClientes] = useState<Cliente[]>([
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
      cpfCnpj: "12.345.678/0001-90",
      observacoes: "Cliente preferencial - entregas prioritárias",
      dataCadastro: "2024-01-15",
      status: "ativo",
      totalPedidos: 45,
      ultimoPedido: "2024-12-20"
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
      cpfCnpj: "98.765.432/0001-10",
      observacoes: "Entrega sempre pela manhã",
      dataCadastro: "2024-02-10",
      status: "ativo",
      totalPedidos: 38,
      ultimoPedido: "2024-12-19"
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
      cpfCnpj: "11.222.333/0001-55",
      observacoes: "Pagamento à vista - desconto aplicado",
      dataCadastro: "2024-03-05",
      status: "ativo",
      totalPedidos: 52,
      ultimoPedido: "2024-12-21"
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
      cpfCnpj: "123.456.789-00",
      observacoes: "Cliente fiel - compra semanalmente",
      dataCadastro: "2024-04-12",
      status: "ativo",
      totalPedidos: 28,
      ultimoPedido: "2024-12-18"
    }
  ]);

  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    endereco: "",
    cidade: "",
    bairro: "",
    cep: "",
    tipo: "pessoa-fisica" as const,
    cpfCnpj: "",
    observacoes: ""
  });

  const filteredClientes = clientes.filter(cliente => 
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefone.includes(searchTerm) ||
    cliente.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.bairro.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && selectedCliente) {
      // Atualizar cliente existente
      setClientes(prev => prev.map(cliente => 
        cliente.id === selectedCliente.id 
          ? { ...cliente, ...formData }
          : cliente
      ));
      toast.success("Cliente atualizado com sucesso!");
    } else {
      // Criar novo cliente
      const novoCliente: Cliente = {
        ...formData,
        id: Date.now().toString(),
        dataCadastro: new Date().toISOString().split('T')[0],
        status: "ativo",
        totalPedidos: 0
      };
      setClientes(prev => [...prev, novoCliente]);
      toast.success("Cliente cadastrado com sucesso!");
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      telefone: "",
      email: "",
      endereco: "",
      cidade: "",
      bairro: "",
      cep: "",
      tipo: "pessoa-fisica",
      cpfCnpj: "",
      observacoes: ""
    });
    setShowForm(false);
    setIsEditing(false);
    setSelectedCliente(null);
  };

  const handleEdit = (cliente: Cliente) => {
    setFormData({
      nome: cliente.nome,
      telefone: cliente.telefone,
      email: cliente.email || "",
      endereco: cliente.endereco,
      cidade: cliente.cidade,
      bairro: cliente.bairro,
      cep: cliente.cep || "",
      tipo: cliente.tipo,
      cpfCnpj: cliente.cpfCnpj || "",
      observacoes: cliente.observacoes || ""
    });
    setSelectedCliente(cliente);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (clienteId: string) => {
    setClientes(prev => prev.filter(cliente => cliente.id !== clienteId));
    toast.success("Cliente removido com sucesso!");
  };

  const toggleStatus = (clienteId: string) => {
    setClientes(prev => prev.map(cliente => 
      cliente.id === clienteId 
        ? { ...cliente, status: cliente.status === 'ativo' ? 'inativo' : 'ativo' }
        : cliente
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            Cadastro de Clientes
          </h2>
          <p className="text-muted-foreground">Gerencie informações dos seus clientes</p>
        </div>
        
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Cadastrar Cliente
        </Button>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Clientes</p>
                <p className="font-semibold">{clientes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Pessoa Jurídica</p>
                <p className="font-semibold">{clientes.filter(c => c.tipo === 'pessoa-juridica').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Pessoa Física</p>
                <p className="font-semibold">{clientes.filter(c => c.tipo === 'pessoa-fisica').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Ativos</p>
                <p className="font-semibold">{clientes.filter(c => c.status === 'ativo').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Busca e filtros */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Pedidos</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClientes.map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{cliente.nome}</div>
                        <div className="text-sm text-muted-foreground">{cliente.cpfCnpj}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {cliente.telefone}
                        </div>
                        {cliente.email && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {cliente.email}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {cliente.cidade}
                        </div>
                        <div className="text-sm text-muted-foreground">{cliente.bairro}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={cliente.tipo === 'pessoa-juridica' ? 'default' : 'secondary'}>
                        {cliente.tipo === 'pessoa-juridica' ? 'PJ' : 'PF'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleStatus(cliente.id)}
                      >
                        <Badge variant={cliente.status === 'ativo' ? 'default' : 'secondary'}>
                          {cliente.status === 'ativo' ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{cliente.totalPedidos}</div>
                        {cliente.ultimoPedido && (
                          <div className="text-sm text-muted-foreground">
                            Último: {new Date(cliente.ultimoPedido).toLocaleDateString('pt-BR')}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedCliente(cliente)}
                          title="Ver detalhes"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(cliente)}
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(cliente.id)}
                          title="Excluir"
                          className="text-red-600 hover:text-red-700"
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

      {/* Modal de formulário */}
      {showForm && (
        <Dialog open={showForm} onOpenChange={() => resetForm()}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? 'Editar Cliente' : 'Cadastrar Novo Cliente'}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações do cliente
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => setFormData(prev => ({ ...prev, telefone: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo *</Label>
                  <select
                    id="tipo"
                    value={formData.tipo}
                    onChange={(e) => setFormData(prev => ({ ...prev, tipo: e.target.value as 'pessoa-fisica' | 'pessoa-juridica' }))}
                    className="w-full p-2 border border-border rounded-md"
                    required
                  >
                    <option value="pessoa-fisica">Pessoa Física</option>
                    <option value="pessoa-juridica">Pessoa Jurídica</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cpfCnpj">
                    {formData.tipo === 'pessoa-fisica' ? 'CPF' : 'CNPJ'}
                  </Label>
                  <Input
                    id="cpfCnpj"
                    value={formData.cpfCnpj}
                    onChange={(e) => setFormData(prev => ({ ...prev, cpfCnpj: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    value={formData.cep}
                    onChange={(e) => setFormData(prev => ({ ...prev, cep: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade *</Label>
                  <Input
                    id="cidade"
                    value={formData.cidade}
                    onChange={(e) => setFormData(prev => ({ ...prev, cidade: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bairro">Bairro *</Label>
                  <Input
                    id="bairro"
                    value={formData.bairro}
                    onChange={(e) => setFormData(prev => ({ ...prev, bairro: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço *</Label>
                <Input
                  id="endereco"
                  value={formData.endereco}
                  onChange={(e) => setFormData(prev => ({ ...prev, endereco: e.target.value }))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                  placeholder="Informações adicionais sobre o cliente..."
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {isEditing ? 'Atualizar' : 'Cadastrar'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal de detalhes */}
      {selectedCliente && !showForm && (
        <Dialog open={!!selectedCliente} onOpenChange={() => setSelectedCliente(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {selectedCliente.nome}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Telefone</Label>
                  <p className="text-sm">{selectedCliente.telefone}</p>
                </div>
                {selectedCliente.email && (
                  <div>
                    <Label>E-mail</Label>
                    <p className="text-sm">{selectedCliente.email}</p>
                  </div>
                )}
                <div>
                  <Label>Tipo</Label>
                  <Badge variant={selectedCliente.tipo === 'pessoa-juridica' ? 'default' : 'secondary'}>
                    {selectedCliente.tipo === 'pessoa-juridica' ? 'Pessoa Jurídica' : 'Pessoa Física'}
                  </Badge>
                </div>
                {selectedCliente.cpfCnpj && (
                  <div>
                    <Label>{selectedCliente.tipo === 'pessoa-fisica' ? 'CPF' : 'CNPJ'}</Label>
                    <p className="text-sm">{selectedCliente.cpfCnpj}</p>
                  </div>
                )}
              </div>
              
              <div>
                <Label>Endereço Completo</Label>
                <p className="text-sm">
                  {selectedCliente.endereco}, {selectedCliente.bairro} - {selectedCliente.cidade}
                  {selectedCliente.cep && ` - ${selectedCliente.cep}`}
                </p>
              </div>
              
              {selectedCliente.observacoes && (
                <div>
                  <Label>Observações</Label>
                  <p className="text-sm bg-muted p-3 rounded-md">{selectedCliente.observacoes}</p>
                </div>
              )}
              
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <Label>Data de Cadastro</Label>
                  <p className="text-sm">{new Date(selectedCliente.dataCadastro).toLocaleDateString('pt-BR')}</p>
                </div>
                <div>
                  <Label>Total de Pedidos</Label>
                  <p className="text-sm font-semibold">{selectedCliente.totalPedidos}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge variant={selectedCliente.status === 'ativo' ? 'default' : 'secondary'}>
                    {selectedCliente.status === 'ativo' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}