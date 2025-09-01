import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Fish, Package, Clock, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

interface DashboardProps {
  onNavigate: (section: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const metrics = {
    totalEstoque: 1250,
    entradasHoje: 45,
    saidasHoje: 32,
    vencendoHoje: 8,
    pendentesEntrega: 12,
    valorTotal: 45670.50
  };

  const produtos = [
    { nome: "Salmão Atlântico", quantidade: 150, validade: "2025-08-26", status: "crítico" },
    { nome: "Camarão Grande", quantidade: 89, validade: "2025-08-27", status: "atenção" },
    { nome: "Tilápia Filé", quantidade: 200, validade: "2025-08-29", status: "normal" },
    { nome: "Polvo", quantidade: 45, validade: "2025-08-28", status: "atenção" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Dashboard - Gestão de Pescados</h1>
        <Badge variant="outline" className="bg-green-50 text-green-700">
          Sistema Online
        </Badge>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('estoque')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total em Estoque</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalEstoque} kg</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('estoque')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entradas Hoje</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{metrics.entradasHoje}</div>
            <p className="text-xs text-muted-foreground">+8 vs ontem</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('estoque')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saídas Hoje</CardTitle>
            <TrendingDown className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{metrics.saidasHoje}</div>
            <p className="text-xs text-muted-foreground">-3 vs ontem</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('estoque')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencendo Hoje</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{metrics.vencendoHoje}</div>
            <p className="text-xs text-muted-foreground">Ação necessária</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('entregas')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entregas Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{metrics.pendentesEntrega}</div>
            <p className="text-xs text-muted-foreground">Para hoje</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <Fish className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {metrics.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">Estoque atual</p>
          </CardContent>
        </Card>
      </div>

      {/* Alertas de Validade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Alertas de Validade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {produtos.map((produto, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Fish className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">{produto.nome}</p>
                    <p className="text-sm text-muted-foreground">{produto.quantidade} kg</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm">Validade: {new Date(produto.validade).toLocaleDateString('pt-BR')}</p>
                    <Badge 
                      variant={produto.status === 'crítico' ? 'destructive' : produto.status === 'atenção' ? 'default' : 'secondary'}
                      className={produto.status === 'atenção' ? 'bg-yellow-100 text-yellow-700' : ''}
                    >
                      {produto.status === 'crítico' ? 'Crítico' : produto.status === 'atenção' ? 'Atenção' : 'Normal'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}