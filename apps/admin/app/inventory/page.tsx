import Link from "next/link";
import { InventorySubnav } from "../../components/inventory-subnav";
import { Icon } from "../../components/icon";
import { PageHeader } from "../../components/page-header";
import { StatCard } from "../../components/stat-card";
import { StatusBadge } from "../../components/status-badge";
import { ButtonLink, Panel } from "../../components/ui";
import { inventoryAlerts, inventoryLots, inventoryMovements, inventoryStock } from "../../data/mock-admin";
import { formatDateOnly, formatDateTime, formatDayMonth } from "../../lib/format";

export default function InventoryPage() {
  const available = inventoryStock.reduce((sum, item) => sum + item.available, 0);
  const reserved = inventoryStock.reduce((sum, item) => sum + item.reserved, 0);
  const critical = inventoryStock.filter((item) => item.health === "critical" || item.health === "out").length;
  const activeLots = inventoryLots.filter((lot) => lot.status === "available" || lot.status === "attention").length;
  const expiringLots = inventoryLots.filter((lot) => lot.status === "attention");
  const openAlerts = inventoryAlerts.length;

  return (
    <div className="page-stack inventory-page">
      <PageHeader
        eyebrow="Estoque / Visão geral"
        title="Estoque"
        description="Controle disponibilidade, reservas, lotes, validade e movimentações em uma única operação."
        actions={<><ButtonLink href="/inventory/count" icon="clipboard" variant="secondary">Iniciar inventário</ButtonLink><ButtonLink href="/inventory/movements" icon="plus">Registrar movimentação</ButtonLink></>}
      />
      <InventorySubnav/>

      <section className="stats-grid inventory-stats" aria-label="Indicadores de estoque">
        <StatCard label="Disponível" value={`${available} un.`} detail="saldo vendável" icon="boxes" tone="green" />
        <StatCard label="Reservado" value={`${reserved} un.`} detail="pedidos em andamento" icon="orders" tone="neutral" />
        <StatCard label="Estoque crítico" value={String(critical)} detail="produto requer ação" icon="alert" tone="orange" />
        <StatCard label="Lotes ativos" value={String(activeLots)} detail="disponíveis para saída" icon="box" tone="green" />
        <StatCard label="Validade próxima" value={String(expiringLots.length)} detail="prioridade FEFO" icon="calendar" tone="orange" />
        <StatCard label="Alertas abertos" value={String(openAlerts)} detail="todos os níveis" icon="bell" tone="orange" />
      </section>

      <div className="inventory-fefo-note">
        <span className="inventory-fefo-icon"><Icon name="alert" size={15}/></span>
        <div><strong>Prioridade FEFO ativa</strong><p>Os lotes com vencimento mais próximo aparecem primeiro para reduzir perdas e orientar a separação.</p></div>
        <Link href="/inventory/lots">Ver lotes <Icon name="chevronRight" size={13}/></Link>
      </div>

      <section className="dashboard-grid inventory-grid-main">
        <Panel title="Produtos em atenção" action={<Link className="text-link" href="/inventory/alerts">Ver alertas</Link>}>
          <div className="inventory-attention-list">
            {inventoryStock.filter((item) => item.health !== "healthy").map((item) => (
              <Link href="/inventory/lots" className="inventory-attention-row" key={item.id}>
                <span className="inventory-product-icon"><Icon name="box" size={16}/></span>
                <div><strong>{item.productName}</strong><small>{item.sku}</small></div>
                <div className="inventory-attention-metric"><strong>{item.available}</strong><small>disponíveis</small></div>
                <StatusBadge status={item.health}/>
                <Icon name="chevronRight" size={15}/>
              </Link>
            ))}
          </div>
        </Panel>

        <Panel title="Próximos vencimentos" action={<Link className="text-link" href="/inventory/lots">Todos os lotes</Link>}>
          <div className="expiry-list">
            {expiringLots.map((lot) => (
              <Link href="/inventory/lots" className="expiry-row" key={lot.id}>
                <span className="expiry-date"><strong>{formatDayMonth(lot.expiresAt)}</strong></span>
                <div><strong>{lot.code}</strong><small>{lot.productName}</small></div>
                <span className="expiry-stock">{lot.available} un.</span>
                <StatusBadge status={lot.status}/>
              </Link>
            ))}
          </div>
        </Panel>
      </section>

      <Panel title="Posição de estoque" action={<Link className="text-link" href="/inventory/lots">Detalhar por lote</Link>}>
        <div className="table-shell inventory-table-shell">
          <table className="data-table inventory-table">
            <thead><tr><th>Produto</th><th>Disponível</th><th>Reservado</th><th>Mínimo</th><th>Lotes ativos</th><th>Validade mais próxima</th><th>Status</th><th><span className="sr-only">Ações</span></th></tr></thead>
            <tbody>
              {inventoryStock.map((item) => (
                <tr key={item.id}>
                  <td><div className="product-cell"><span className="product-thumb"><Icon name="box" size={17}/></span><div><strong>{item.productName}</strong><small>{item.sku}</small></div></div></td>
                  <td><strong className="inventory-number">{item.available}</strong></td>
                  <td>{item.reserved}</td>
                  <td>{item.minimumStock}</td>
                  <td>{item.activeLots}</td>
                  <td>{item.nearestExpiry ? formatDateOnly(item.nearestExpiry) : "—"}</td>
                  <td><StatusBadge status={item.health}/></td>
                  <td><Link className="row-action" href="/inventory/lots" aria-label={`Abrir lotes de ${item.productName}`}><Icon name="chevronRight" size={15}/></Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Movimentações recentes" action={<Link className="text-link" href="/inventory/movements">Ver histórico</Link>}>
        <div className="inventory-activity-list">
          {inventoryMovements.slice(0, 5).map((movement) => (
            <div className="inventory-activity-row" key={movement.id}>
              <span className={`movement-direction movement-${movement.direction}`}><Icon name={movement.direction === "in" ? "plus" : "swap"} size={14}/></span>
              <div><strong>{movement.reason}</strong><small>{movement.productName} · Lote {movement.lotCode}</small></div>
              <span className={`movement-qty qty-${movement.direction}`}>{movement.direction === "in" ? "+" : "−"}{movement.quantity}</span>
              <time>{formatDateTime(movement.createdAt)}</time>
            </div>
          ))}
        </div>
      </Panel>

      <p className="demo-note">Dados de estoque, lotes e datas são demonstrativos para validação do fluxo operacional.</p>
    </div>
  );
}
