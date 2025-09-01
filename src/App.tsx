import { useState, useEffect } from "react";
import { Dashboard } from "./components/Dashboard";
import { EstoqueControl } from "./components/EstoqueControl";
import { EntregasControl } from "./components/EntregasControl";
import { PedidosControl } from "./components/PedidosControl";
import { ProducaoControl } from "./components/ProducaoControl";
import { HistoricoAuditoria } from "./components/HistoricoAuditoria";
import { ComunicacaoIntegrada } from "./components/ComunicacaoIntegrada";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { 
  Fish, 
  Package, 
  Truck, 
  History, 
  MessageSquare, 
  Home,
  Menu,
  X,
  Bell,
  ShoppingCart,
  Factory
} from "lucide-react";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when clicking outside or pressing escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSidebarOpen(false);
      }
      
      // Atalhos de teclado para navegação rápida
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case '1':
            event.preventDefault();
            setCurrentSection('dashboard');
            setSidebarOpen(false);
            break;
          case '2':
            event.preventDefault();
            setCurrentSection('estoque');
            setSidebarOpen(false);
            break;
          case '3':
            event.preventDefault();
            setCurrentSection('pedidos');
            setSidebarOpen(false);
            break;
          case '4':
            event.preventDefault();
            setCurrentSection('producao');
            setSidebarOpen(false);
            break;
          case '5':
            event.preventDefault();
            setCurrentSection('entregas');
            setSidebarOpen(false);
            break;
          case '6':
            event.preventDefault();
            setCurrentSection('historico');
            setSidebarOpen(false);
            break;
          case '7':
            event.preventDefault();
            setCurrentSection('comunicacao');
            setSidebarOpen(false);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close sidebar on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navigation = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: Home,
      description: "Visão geral do sistema",
      shortcut: "Ctrl+1"
    },
    {
      id: "estoque",
      name: "Controle de Estoque",
      icon: Package,
      description: "Gestão de produtos e câmaras",
      shortcut: "Ctrl+2"
    },
    {
      id: "pedidos",
      name: "Gestão de Pedidos",
      icon: ShoppingCart,
      description: "Controle de pedidos e clientes",
      shortcut: "Ctrl+3"
    },
    {
      id: "producao",
      name: "Controle de Produção",
      icon: Factory,
      description: "Solicitações e processamento",
      shortcut: "Ctrl+4"
    },
    {
      id: "entregas",
      name: "Gestão de Entregas",
      icon: Truck,
      description: "Entregas e priorização",
      shortcut: "Ctrl+5"
    },
    {
      id: "historico",
      name: "Histórico & Auditoria",
      icon: History,
      description: "Relatórios e auditoria",
      shortcut: "Ctrl+6"
    },
    {
      id: "comunicacao",
      name: "Comunicação",
      icon: MessageSquare,
      description: "Mensagens e notificações",
      shortcut: "Ctrl+7"
    }
  ];

  const renderCurrentSection = () => {
    switch (currentSection) {
      case "dashboard":
        return <Dashboard onNavigate={setCurrentSection} />;
      case "estoque":
        return <EstoqueControl />;
      case "pedidos":
        return <PedidosControl />;
      case "producao":
        return <ProducaoControl />;
      case "entregas":
        return <EntregasControl />;
      case "historico":
        return <HistoricoAuditoria />;
      case "comunicacao":
        return <ComunicacaoIntegrada />;
      default:
        return <Dashboard onNavigate={setCurrentSection} />;
    }
  };

  const getCurrentSectionName = () => {
    const section = navigation.find(nav => nav.id === currentSection);
    return section ? section.name : "Dashboard";
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border px-4 py-3 lg:px-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden hover:bg-accent"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? "Fechar menu" : "Abrir menu"}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 p-2 bg-blue-100 rounded-lg">
                <Fish className="h-6 w-6 text-blue-600" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-semibold">FreshFish System</h1>
                <p className="text-sm text-muted-foreground">Gestão Inteligente de Pescados</p>
              </div>
              <div className="sm:hidden">
                <h1 className="font-semibold">FreshFish</h1>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-1 hidden sm:flex">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              Sistema Online
            </Badge>
            <Button variant="ghost" size="sm" className="gap-2 relative">
              <Bell className="h-4 w-4" />
              <Badge variant="destructive" className="h-5 w-5 text-xs absolute -top-1 -right-1">5</Badge>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static top-0 left-0 z-40 h-screen w-64 bg-white border-r border-border 
          transform transition-transform duration-300 ease-in-out lg:transform-none lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          shadow-lg lg:shadow-none
        `}>
          <div className="flex flex-col h-full">
            {/* Mobile header space */}
            <div className="h-16 lg:hidden border-b border-border flex items-center px-4">
              <div className="flex items-center gap-2">
                <Fish className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Menu</span>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <Button
                      key={item.id}
                      variant={currentSection === item.id ? "default" : "ghost"}
                      className="w-full justify-start gap-3 h-auto p-3 text-left hover:bg-accent transition-colors"
                      onClick={() => {
                        setCurrentSection(item.id);
                        setSidebarOpen(false);
                      }}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate">{item.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                      </div>
                    </Button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-30 bg-black/50 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
            aria-label="Fechar menu"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 lg:ml-0">
          <div className="h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="p-4 lg:p-6 space-y-6 min-h-full">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground sticky top-0 bg-background py-2 z-10">
                <Home className="h-4 w-4" />
                <span>/</span>
                <span className="text-foreground font-medium">{getCurrentSectionName()}</span>
              </div>

              {/* Current Section Content */}
              <div className="pb-6">
                {renderCurrentSection()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}