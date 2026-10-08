import type { AdminAuditEvent, AdminCustomer, AdminOrder, AdminPreorder, AdminProduct, AdminReportDefinition, AdminRole, AdminSession, AdminTeamUser, B2BActivity, B2BClient, B2BLead, B2BOrder, B2BPriceTable, CatalogCategory, CatalogKit, CustomerInteraction, CustomerSegmentDefinition, DashboardAlert, FinanceDailyRevenue, FinanceReconciliation, FinanceRefund, FinanceTransaction, InventoryAlert, InventoryCountRow, InventoryLot, InventoryMovement, InventoryStockItem, MarketingCampaign, MarketingCoupon, MarketingPromotion, Permission, PermissionCatalogGroup, SalesPayment, SecurityPolicy, SecurityPosture, StoreBanner, StoreContentBlock, StoreFlavor, StoreSection, StoreSeoPage } from "../lib/types";

const baseItems = {
  lime: { id: "lime-1l", name: "LaVic Limão 1L", sku: "LAV-LIM-1L", unitPriceCents: 2800 },
  strawberry: { id: "strawberry-1l", name: "LaVic Morango 1L", sku: "LAV-MOR-1L", unitPriceCents: 2800 },
  sparkling: { id: "sparkling-750", name: "LaVic Espumante 750 ml", sku: "LAV-ESP-750", unitPriceCents: 5900 },
};

export const orders: AdminOrder[] = [
  {
    id: "order-0187", code: "LAV-0187", customerName: "Cliente LaVic 01", createdAt: "2026-09-25T10:24:00-03:00",
    status: "new", paymentStatus: "pending", paymentMethod: "PIX", channel: "storefront", deliveryMode: "delivery",
    totalCents: 7600, subtotalCents: 7000, shippingCents: 600, discountCents: 0, itemCount: 2,
    address: "Endereço de demonstração · Volta Redonda, RJ",
    items: [
      { ...baseItems.lime, quantity: 1 },
      { ...baseItems.strawberry, quantity: 1, unitPriceCents: 4200 },
    ],
  },
  {
    id: "order-0186", code: "LAV-0186", customerName: "Cliente LaVic 02", createdAt: "2026-09-25T09:18:00-03:00",
    status: "new", paymentStatus: "pending", paymentMethod: "PIX", channel: "whatsapp", deliveryMode: "delivery",
    totalCents: 4200, subtotalCents: 3600, shippingCents: 600, discountCents: 0, itemCount: 1,
    items: [{ ...baseItems.strawberry, quantity: 1, unitPriceCents: 3600 }],
  },
  {
    id: "order-0185", code: "LAV-0185", customerName: "Cliente LaVic 03", createdAt: "2026-09-25T08:47:00-03:00",
    status: "new", paymentStatus: "pending", paymentMethod: "Cartão", channel: "storefront", deliveryMode: "delivery",
    totalCents: 9800, subtotalCents: 9200, shippingCents: 600, discountCents: 0, itemCount: 3,
    items: [{ ...baseItems.lime, quantity: 2 }, { ...baseItems.strawberry, quantity: 1, unitPriceCents: 3600 }],
  },
  {
    id: "order-0184", code: "LAV-0184", customerName: "Cliente LaVic 04", createdAt: "2026-09-25T08:12:00-03:00",
    status: "new", paymentStatus: "pending", paymentMethod: "Cartão", channel: "manual", deliveryMode: "delivery",
    totalCents: 3600, subtotalCents: 3000, shippingCents: 600, discountCents: 0, itemCount: 1,
    items: [{ ...baseItems.lime, quantity: 1, unitPriceCents: 3000 }],
  },
  {
    id: "order-0183", code: "LAV-0183", customerName: "Cliente LaVic 05", createdAt: "2026-09-25T14:32:00-03:00",
    status: "confirmed", paymentStatus: "approved", paymentMethod: "PIX", channel: "storefront", deliveryMode: "delivery",
    totalCents: 8600, subtotalCents: 8000, shippingCents: 600, discountCents: 0, itemCount: 3,
    address: "Rua das Flores, 123 · Volta Redonda, RJ",
    notes: "Entregar na portaria.",
    items: [
      { ...baseItems.strawberry, quantity: 1 },
      { ...baseItems.lime, quantity: 1 },
      { id: "kit-demo", name: "LaVic Kit Degustação", sku: "LAV-KIT-01", quantity: 1, unitPriceCents: 2400 },
    ],
  },
  {
    id: "order-0182", code: "LAV-0182", customerName: "Cliente LaVic 06", createdAt: "2026-09-25T13:10:00-03:00",
    status: "confirmed", paymentStatus: "approved", paymentMethod: "Cartão", channel: "storefront", deliveryMode: "pickup",
    totalCents: 7200, subtotalCents: 7200, shippingCents: 0, discountCents: 0, itemCount: 2,
    items: [{ ...baseItems.lime, quantity: 1, unitPriceCents: 3600 }, { ...baseItems.strawberry, quantity: 1, unitPriceCents: 3600 }],
  },
  {
    id: "order-0181", code: "LAV-0181", customerName: "Cliente LaVic 07", createdAt: "2026-09-25T12:44:00-03:00",
    status: "confirmed", paymentStatus: "approved", paymentMethod: "PIX", channel: "b2b", deliveryMode: "delivery",
    totalCents: 12000, subtotalCents: 12000, shippingCents: 0, discountCents: 0, itemCount: 4,
    items: [{ ...baseItems.lime, quantity: 2, unitPriceCents: 3000 }, { ...baseItems.strawberry, quantity: 2, unitPriceCents: 3000 }],
  },
  {
    id: "order-0180", code: "LAV-0180", customerName: "Cliente LaVic 08", createdAt: "2026-09-25T11:20:00-03:00",
    status: "confirmed", paymentStatus: "approved", paymentMethod: "PIX", channel: "storefront", deliveryMode: "delivery",
    totalCents: 6800, subtotalCents: 6200, shippingCents: 600, discountCents: 0, itemCount: 2,
    items: [{ ...baseItems.lime, quantity: 1, unitPriceCents: 3100 }, { ...baseItems.strawberry, quantity: 1, unitPriceCents: 3100 }],
  },
  {
    id: "order-0179", code: "LAV-0179", customerName: "Cliente LaVic 09", createdAt: "2026-09-25T10:55:00-03:00",
    status: "separating", paymentStatus: "approved", paymentMethod: "PIX", channel: "storefront", deliveryMode: "delivery",
    totalCents: 6400, subtotalCents: 5800, shippingCents: 600, discountCents: 0, itemCount: 2,
    items: [{ ...baseItems.lime, quantity: 1, unitPriceCents: 2900 }, { ...baseItems.strawberry, quantity: 1, unitPriceCents: 2900 }],
  },
  {
    id: "order-0178", code: "LAV-0178", customerName: "Cliente LaVic 10", createdAt: "2026-09-25T10:21:00-03:00",
    status: "separating", paymentStatus: "approved", paymentMethod: "PIX", channel: "storefront", deliveryMode: "pickup",
    totalCents: 3800, subtotalCents: 3800, shippingCents: 0, discountCents: 0, itemCount: 1,
    items: [{ ...baseItems.strawberry, quantity: 1, unitPriceCents: 3800 }],
  },
  {
    id: "order-0177", code: "LAV-0177", customerName: "Cliente LaVic 11", createdAt: "2026-09-25T09:50:00-03:00",
    status: "separating", paymentStatus: "approved", paymentMethod: "Cartão", channel: "storefront", deliveryMode: "pickup",
    totalCents: 9200, subtotalCents: 9200, shippingCents: 0, discountCents: 0, itemCount: 3,
    items: [{ ...baseItems.sparkling, quantity: 1 }, { ...baseItems.lime, quantity: 1, unitPriceCents: 3300 }],
  },
  {
    id: "order-0176", code: "LAV-0176", customerName: "Cliente LaVic 12", createdAt: "2026-09-25T09:12:00-03:00",
    status: "separating", paymentStatus: "approved", paymentMethod: "PIX", channel: "storefront", deliveryMode: "delivery",
    totalCents: 7000, subtotalCents: 6400, shippingCents: 600, discountCents: 0, itemCount: 2,
    items: [{ ...baseItems.lime, quantity: 1, unitPriceCents: 3200 }, { ...baseItems.strawberry, quantity: 1, unitPriceCents: 3200 }],
  },
  {
    id: "order-0175", code: "LAV-0175", customerName: "Cliente LaVic 13", createdAt: "2026-09-25T08:33:00-03:00",
    status: "ready", paymentStatus: "approved", paymentMethod: "PIX", channel: "storefront", deliveryMode: "pickup",
    totalCents: 4200, subtotalCents: 4200, shippingCents: 0, discountCents: 0, itemCount: 1,
    items: [{ ...baseItems.lime, quantity: 1, unitPriceCents: 4200 }],
  },
  {
    id: "order-0174", code: "LAV-0174", customerName: "Cliente LaVic 14", createdAt: "2026-09-25T08:11:00-03:00",
    status: "ready", paymentStatus: "approved", paymentMethod: "Cartão", channel: "storefront", deliveryMode: "delivery",
    totalCents: 8800, subtotalCents: 8200, shippingCents: 600, discountCents: 0, itemCount: 3,
    items: [{ ...baseItems.lime, quantity: 2, unitPriceCents: 2700 }, { ...baseItems.strawberry, quantity: 1, unitPriceCents: 2800 }],
  },
  {
    id: "order-0173", code: "LAV-0173", customerName: "Cliente LaVic 15", createdAt: "2026-09-25T07:48:00-03:00",
    status: "ready", paymentStatus: "approved", paymentMethod: "PIX", channel: "storefront", deliveryMode: "delivery",
    totalCents: 6600, subtotalCents: 6000, shippingCents: 600, discountCents: 0, itemCount: 2,
    items: [{ ...baseItems.strawberry, quantity: 2, unitPriceCents: 3000 }],
  },
  {
    id: "order-0172", code: "LAV-0172", customerName: "Cliente LaVic 16", createdAt: "2026-09-24T18:22:00-03:00",
    status: "shipped", paymentStatus: "approved", paymentMethod: "PIX", channel: "storefront", deliveryMode: "delivery",
    totalCents: 5800, subtotalCents: 5200, shippingCents: 600, discountCents: 0, itemCount: 2,
    items: [{ ...baseItems.lime, quantity: 1, unitPriceCents: 2600 }, { ...baseItems.strawberry, quantity: 1, unitPriceCents: 2600 }],
  },
  {
    id: "order-0171", code: "LAV-0171", customerName: "Cliente LaVic 17", createdAt: "2026-09-24T17:40:00-03:00",
    status: "shipped", paymentStatus: "approved", paymentMethod: "PIX", channel: "storefront", deliveryMode: "delivery",
    totalCents: 3600, subtotalCents: 3000, shippingCents: 600, discountCents: 0, itemCount: 1,
    items: [{ ...baseItems.lime, quantity: 1, unitPriceCents: 3000 }],
  },
  {
    id: "order-0170", code: "LAV-0170", customerName: "Cliente LaVic 18", createdAt: "2026-09-24T16:30:00-03:00",
    status: "shipped", paymentStatus: "approved", paymentMethod: "PIX", channel: "storefront", deliveryMode: "delivery",
    totalCents: 10400, subtotalCents: 9800, shippingCents: 600, discountCents: 0, itemCount: 3,
    items: [{ ...baseItems.sparkling, quantity: 1 }, { ...baseItems.lime, quantity: 1, unitPriceCents: 3900 }],
  },
];

export const products: AdminProduct[] = [
  { id: "p1", name: "LaVic Morango 1L", sku: "LAV-MOR-1L", category: "Kombucha", variants: 1, priceCents: 2800, stock: 48, minimumStock: 12, channels: ["B2C", "B2B"], status: "active" },
  { id: "p2", name: "LaVic Limão 1L", sku: "LAV-LIM-1L", category: "Kombucha", variants: 1, priceCents: 2800, stock: 36, minimumStock: 12, channels: ["B2C", "B2B"], status: "active" },
  { id: "p3", name: "LaVic Espumante 750 ml", sku: "LAV-ESP-750", category: "Espumante", variants: 1, priceCents: 5900, stock: 7, minimumStock: 8, channels: ["B2C", "B2B"], status: "active" },
  { id: "p4", name: "LaVic Kit Degustação", sku: "LAV-KIT-01", category: "Kits", variants: 3, priceCents: 8400, stock: 18, minimumStock: 6, channels: ["B2C", "B2B"], status: "active" },
  { id: "p5", name: "LaVic Gengibre 1L", sku: "DEMO-GEN-1L", category: "Demonstração", variants: 1, priceCents: 2800, stock: 0, minimumStock: 0, channels: ["B2C"], status: "draft", demo: true },
  { id: "p6", name: "LaVic Hibisco 1L", sku: "DEMO-HIB-1L", category: "Demonstração", variants: 1, priceCents: 2800, stock: 0, minimumStock: 0, channels: ["B2C"], status: "draft", demo: true },
  { id: "p7", name: "LaVic Frutas Vermelhas 1L", sku: "DEMO-FRV-1L", category: "Demonstração", variants: 1, priceCents: 2800, stock: 0, minimumStock: 0, channels: ["B2C"], status: "draft", demo: true },
  { id: "p8", name: "LaVic Abacaxi com Hortelã 1L", sku: "DEMO-ABH-1L", category: "Demonstração", variants: 1, priceCents: 2800, stock: 0, minimumStock: 0, channels: ["B2C"], status: "draft", demo: true },
];

export const dashboardAlerts: DashboardAlert[] = [
  { id: "a1", label: "pedidos aguardando confirmação", count: 4, tone: "brand" },
  { id: "a2", label: "pagamentos pendentes", count: 2, tone: "warning" },
  { id: "a3", label: "lotes próximos da validade", count: 3, tone: "warning" },
  { id: "a4", label: "produto abaixo do estoque mínimo", count: 1, tone: "danger" },
  { id: "a5", label: "leads B2B sem retorno", count: 5, tone: "neutral" },
];

export const salesSeries = [
  { day: "19 set", sales: 58, orders: 24 },
  { day: "20 set", sales: 78, orders: 32 },
  { day: "21 set", sales: 62, orders: 28 },
  { day: "22 set", sales: 51, orders: 21 },
  { day: "23 set", sales: 68, orders: 30 },
  { day: "24 set", sales: 66, orders: 27 },
  { day: "25 set", sales: 84, orders: 36 },
];


export const inventoryStock: InventoryStockItem[] = [
  { id: "stock-morango", productId: "p1", productName: "LaVic Morango 1L", sku: "LAV-MOR-1L", available: 48, reserved: 7, minimumStock: 12, health: "healthy", activeLots: 2, nearestExpiry: "2026-10-03T23:59:00-03:00" },
  { id: "stock-limao", productId: "p2", productName: "LaVic Limão 1L", sku: "LAV-LIM-1L", available: 36, reserved: 6, minimumStock: 12, health: "attention", activeLots: 2, nearestExpiry: "2026-10-05T23:59:00-03:00" },
  { id: "stock-espumante", productId: "p3", productName: "LaVic Espumante 750 ml", sku: "LAV-ESP-750", available: 7, reserved: 1, minimumStock: 8, health: "critical", activeLots: 1, nearestExpiry: "2026-10-08T23:59:00-03:00" },
];

export const inventoryLots: InventoryLot[] = [
  { id: "lot-mor-01", code: "M260916", productId: "p1", productName: "LaVic Morango 1L", sku: "LAV-MOR-1L", producedAt: "2026-09-16T08:00:00-03:00", expiresAt: "2026-10-03T23:59:00-03:00", available: 10, reserved: 3, status: "attention", location: "Câmara fria A" },
  { id: "lot-mor-02", code: "M260922", productId: "p1", productName: "LaVic Morango 1L", sku: "LAV-MOR-1L", producedAt: "2026-09-22T08:00:00-03:00", expiresAt: "2026-10-15T23:59:00-03:00", available: 38, reserved: 4, status: "available", location: "Câmara fria A" },
  { id: "lot-lim-01", code: "L260918", productId: "p2", productName: "LaVic Limão 1L", sku: "LAV-LIM-1L", producedAt: "2026-09-18T08:00:00-03:00", expiresAt: "2026-10-05T23:59:00-03:00", available: 8, reserved: 2, status: "attention", location: "Câmara fria B" },
  { id: "lot-lim-02", code: "L260923", productId: "p2", productName: "LaVic Limão 1L", sku: "LAV-LIM-1L", producedAt: "2026-09-23T08:00:00-03:00", expiresAt: "2026-10-18T23:59:00-03:00", available: 28, reserved: 4, status: "available", location: "Câmara fria B" },
  { id: "lot-esp-01", code: "E260920", productId: "p3", productName: "LaVic Espumante 750 ml", sku: "LAV-ESP-750", producedAt: "2026-09-20T08:00:00-03:00", expiresAt: "2026-10-08T23:59:00-03:00", available: 7, reserved: 1, status: "attention", location: "Câmara fria C" },
  { id: "lot-mor-block", code: "M260910", productId: "p1", productName: "LaVic Morango 1L", sku: "LAV-MOR-1L", producedAt: "2026-09-10T08:00:00-03:00", expiresAt: "2026-09-28T23:59:00-03:00", available: 0, reserved: 0, status: "blocked", location: "Quarentena" },
  { id: "lot-lim-exp", code: "L260901", productId: "p2", productName: "LaVic Limão 1L", sku: "LAV-LIM-1L", producedAt: "2026-09-01T08:00:00-03:00", expiresAt: "2026-09-24T23:59:00-03:00", available: 0, reserved: 0, status: "expired", location: "Quarentena" },
];

export const inventoryMovements: InventoryMovement[] = [
  { id: "mov-001", createdAt: "2026-09-25T15:42:00-03:00", type: "sale", productId: "p1", productName: "LaVic Morango 1L", sku: "LAV-MOR-1L", lotCode: "M260916", quantity: 2, direction: "out", reason: "Venda concluída", actor: "Equipe LaVic", reference: "LAV-0183" },
  { id: "mov-002", createdAt: "2026-09-25T15:41:00-03:00", type: "sale", productId: "p2", productName: "LaVic Limão 1L", sku: "LAV-LIM-1L", lotCode: "L260918", quantity: 1, direction: "out", reason: "Venda concluída", actor: "Equipe LaVic", reference: "LAV-0183" },
  { id: "mov-003", createdAt: "2026-09-25T13:18:00-03:00", type: "sample", productId: "p1", productName: "LaVic Morango 1L", sku: "LAV-MOR-1L", lotCode: "M260916", quantity: 1, direction: "out", reason: "Degustação comercial", actor: "Equipe LaVic" },
  { id: "mov-004", createdAt: "2026-09-25T11:05:00-03:00", type: "adjustment", productId: "p3", productName: "LaVic Espumante 750 ml", sku: "LAV-ESP-750", lotCode: "E260920", quantity: 2, direction: "out", reason: "Ajuste após conferência", actor: "Equipe LaVic" },
  { id: "mov-005", createdAt: "2026-09-24T17:20:00-03:00", type: "damage", productId: "p2", productName: "LaVic Limão 1L", sku: "LAV-LIM-1L", lotCode: "L260918", quantity: 1, direction: "out", reason: "Avaria de embalagem", actor: "Equipe LaVic" },
  { id: "mov-006", createdAt: "2026-09-24T09:12:00-03:00", type: "production", productId: "p2", productName: "LaVic Limão 1L", sku: "LAV-LIM-1L", lotCode: "L260923", quantity: 32, direction: "in", reason: "Entrada de produção", actor: "Equipe LaVic" },
  { id: "mov-007", createdAt: "2026-09-23T16:34:00-03:00", type: "production", productId: "p1", productName: "LaVic Morango 1L", sku: "LAV-MOR-1L", lotCode: "M260922", quantity: 42, direction: "in", reason: "Entrada de produção", actor: "Equipe LaVic" },
  { id: "mov-008", createdAt: "2026-09-23T12:20:00-03:00", type: "release", productId: "p1", productName: "LaVic Morango 1L", sku: "LAV-MOR-1L", lotCode: "M260916", quantity: 2, direction: "in", reason: "Reserva liberada", actor: "Sistema", reference: "LAV-0169" },
  { id: "mov-009", createdAt: "2026-09-22T14:08:00-03:00", type: "sale", productId: "p3", productName: "LaVic Espumante 750 ml", sku: "LAV-ESP-750", lotCode: "E260920", quantity: 3, direction: "out", reason: "Venda concluída", actor: "Equipe LaVic", reference: "LAV-0158" },
  { id: "mov-010", createdAt: "2026-09-22T08:48:00-03:00", type: "production", productId: "p3", productName: "LaVic Espumante 750 ml", sku: "LAV-ESP-750", lotCode: "E260920", quantity: 14, direction: "in", reason: "Entrada de produção", actor: "Equipe LaVic" },
];

export const inventoryAlerts: InventoryAlert[] = [
  { id: "inv-alert-01", kind: "low_stock", severity: "critical", title: "Espumante abaixo do estoque mínimo", description: "7 unidades disponíveis para mínimo operacional de 8.", createdAt: "2026-09-25T11:06:00-03:00", productName: "LaVic Espumante 750 ml", lotCode: "E260920", href: "/inventory" },
  { id: "inv-alert-02", kind: "expiry", severity: "warning", title: "Lote M260916 próximo da validade", description: "10 unidades disponíveis. Priorize a saída deste lote.", createdAt: "2026-09-25T08:30:00-03:00", productName: "LaVic Morango 1L", lotCode: "M260916", href: "/inventory/lots" },
  { id: "inv-alert-03", kind: "expiry", severity: "warning", title: "Lote L260918 próximo da validade", description: "8 unidades disponíveis. Aplicar prioridade FEFO.", createdAt: "2026-09-25T08:30:00-03:00", productName: "LaVic Limão 1L", lotCode: "L260918", href: "/inventory/lots" },
  { id: "inv-alert-04", kind: "divergence", severity: "warning", title: "Divergência identificada na última conferência", description: "O Espumante apresentou diferença de 2 unidades em relação ao saldo esperado.", createdAt: "2026-09-25T11:05:00-03:00", productName: "LaVic Espumante 750 ml", lotCode: "E260920", href: "/inventory/count" },
  { id: "inv-alert-05", kind: "blocked", severity: "info", title: "Lote em quarentena", description: "M260910 permanece bloqueado e não participa do estoque vendável.", createdAt: "2026-09-24T17:00:00-03:00", productName: "LaVic Morango 1L", lotCode: "M260910", href: "/inventory/lots" },
  { id: "inv-alert-06", kind: "expired", severity: "critical", title: "Lote vencido aguardando encerramento", description: "L260901 está sem saldo vendável, mas ainda precisa ser encerrado no histórico.", createdAt: "2026-09-25T00:10:00-03:00", productName: "LaVic Limão 1L", lotCode: "L260901", href: "/inventory/lots" },
];

export const inventoryCountRows: InventoryCountRow[] = [
  { id: "count-01", productId: "p1", productName: "LaVic Morango 1L", sku: "LAV-MOR-1L", lotCode: "M260916", expected: 10, location: "Câmara fria A" },
  { id: "count-02", productId: "p1", productName: "LaVic Morango 1L", sku: "LAV-MOR-1L", lotCode: "M260922", expected: 38, location: "Câmara fria A" },
  { id: "count-03", productId: "p2", productName: "LaVic Limão 1L", sku: "LAV-LIM-1L", lotCode: "L260918", expected: 8, location: "Câmara fria B" },
  { id: "count-04", productId: "p2", productName: "LaVic Limão 1L", sku: "LAV-LIM-1L", lotCode: "L260923", expected: 28, location: "Câmara fria B" },
  { id: "count-05", productId: "p3", productName: "LaVic Espumante 750 ml", sku: "LAV-ESP-750", lotCode: "E260920", expected: 7, location: "Câmara fria C" },
];


export const customers: AdminCustomer[] = [
  { id: "customer-01", code: "CLI-0001", name: "Cliente LaVic 01", email: "cliente01@exemplo.com", phone: "(24) 99990-0101", origin: "storefront", createdAt: "2026-08-04T09:20:00-03:00", lastOrderAt: "2026-09-25T10:24:00-03:00", orderCount: 8, totalSpentCents: 61200, averageTicketCents: 7650, status: "active", segments: ["recurrent"], favoriteProduct: "LaVic Limão 1L", acceptsWhatsapp: true, acceptsEmail: true, addresses: [{ id: "addr-01", label: "Principal", address: "Endereço de demonstração 01", city: "Volta Redonda", state: "RJ", primary: true }] },
  { id: "customer-02", code: "CLI-0002", name: "Cliente LaVic 02", email: "cliente02@exemplo.com", phone: "(24) 99990-0102", origin: "whatsapp", createdAt: "2026-09-19T16:12:00-03:00", lastOrderAt: "2026-09-25T09:18:00-03:00", orderCount: 2, totalSpentCents: 8600, averageTicketCents: 4300, status: "active", segments: ["new"], favoriteProduct: "LaVic Morango 1L", acceptsWhatsapp: true, acceptsEmail: false, addresses: [{ id: "addr-02", label: "Principal", address: "Endereço de demonstração 02", city: "Volta Redonda", state: "RJ", primary: true }] },
  { id: "customer-03", code: "CLI-0003", name: "Cliente LaVic 03", email: "cliente03@exemplo.com", phone: "(24) 99990-0103", origin: "storefront", createdAt: "2026-07-14T11:08:00-03:00", lastOrderAt: "2026-09-25T08:47:00-03:00", orderCount: 12, totalSpentCents: 128400, averageTicketCents: 10700, status: "active", segments: ["vip", "recurrent"], favoriteProduct: "LaVic Kit Degustação", acceptsWhatsapp: true, acceptsEmail: true, addresses: [{ id: "addr-03", label: "Casa", address: "Endereço de demonstração 03", city: "Volta Redonda", state: "RJ", primary: true }, { id: "addr-03b", label: "Trabalho", address: "Endereço de demonstração 03B", city: "Volta Redonda", state: "RJ" }] },
  { id: "customer-04", code: "CLI-0004", name: "Cliente LaVic 04", email: "cliente04@exemplo.com", phone: "(24) 99990-0104", origin: "manual", createdAt: "2026-09-22T10:40:00-03:00", lastOrderAt: "2026-09-25T08:12:00-03:00", orderCount: 1, totalSpentCents: 3600, averageTicketCents: 3600, status: "active", segments: ["new"], favoriteProduct: "LaVic Limão 1L", acceptsWhatsapp: true, acceptsEmail: false, addresses: [{ id: "addr-04", label: "Principal", address: "Endereço de demonstração 04", city: "Volta Redonda", state: "RJ", primary: true }] },
  { id: "customer-05", code: "CLI-0005", name: "Cliente LaVic 05", email: "cliente05@exemplo.com", phone: "(24) 99990-0105", origin: "storefront", createdAt: "2026-05-03T14:30:00-03:00", lastOrderAt: "2026-09-25T14:32:00-03:00", orderCount: 18, totalSpentCents: 196800, averageTicketCents: 10933, status: "active", segments: ["vip", "recurrent"], favoriteProduct: "LaVic Morango 1L", acceptsWhatsapp: true, acceptsEmail: true, addresses: [{ id: "addr-05", label: "Principal", address: "Rua de demonstração, 123", city: "Volta Redonda", state: "RJ", primary: true }] },
  { id: "customer-06", code: "CLI-0006", name: "Cliente LaVic 06", email: "cliente06@exemplo.com", phone: "(24) 99990-0106", origin: "storefront", createdAt: "2026-06-18T12:10:00-03:00", lastOrderAt: "2026-09-25T13:10:00-03:00", orderCount: 9, totalSpentCents: 74400, averageTicketCents: 8267, status: "active", segments: ["recurrent"], favoriteProduct: "LaVic Limão 1L", acceptsWhatsapp: true, acceptsEmail: true, addresses: [{ id: "addr-06", label: "Principal", address: "Endereço de demonstração 06", city: "Volta Redonda", state: "RJ", primary: true }] },
  { id: "customer-07", code: "CLI-0007", name: "Cliente LaVic 07", email: "cliente07@exemplo.com", phone: "(24) 99990-0107", origin: "event", createdAt: "2026-09-12T10:05:00-03:00", lastOrderAt: "2026-09-25T12:44:00-03:00", orderCount: 3, totalSpentCents: 25400, averageTicketCents: 8467, status: "active", segments: ["new", "b2b_potential"], favoriteProduct: "LaVic Limão 1L", acceptsWhatsapp: true, acceptsEmail: true, addresses: [{ id: "addr-07", label: "Principal", address: "Endereço de demonstração 07", city: "Volta Redonda", state: "RJ", primary: true }] },
  { id: "customer-08", code: "CLI-0008", name: "Cliente LaVic 08", email: "cliente08@exemplo.com", phone: "(24) 99990-0108", origin: "storefront", createdAt: "2026-08-27T18:20:00-03:00", lastOrderAt: "2026-09-25T11:20:00-03:00", orderCount: 4, totalSpentCents: 28600, averageTicketCents: 7150, status: "active", segments: ["recurrent"], favoriteProduct: "LaVic Morango 1L", acceptsWhatsapp: true, acceptsEmail: true, addresses: [{ id: "addr-08", label: "Principal", address: "Endereço de demonstração 08", city: "Volta Redonda", state: "RJ", primary: true }] },
  { id: "customer-09", code: "CLI-0009", name: "Cliente LaVic 09", email: "cliente09@exemplo.com", phone: "(24) 99990-0109", origin: "storefront", createdAt: "2026-04-09T08:55:00-03:00", lastOrderAt: "2026-09-25T10:55:00-03:00", orderCount: 15, totalSpentCents: 146200, averageTicketCents: 9747, status: "active", segments: ["vip", "recurrent"], favoriteProduct: "LaVic Espumante 750 ml", acceptsWhatsapp: true, acceptsEmail: true, addresses: [{ id: "addr-09", label: "Principal", address: "Endereço de demonstração 09", city: "Volta Redonda", state: "RJ", primary: true }] },
  { id: "customer-10", code: "CLI-0010", name: "Cliente LaVic 10", email: "cliente10@exemplo.com", phone: "(24) 99990-0110", origin: "event", createdAt: "2026-09-12T09:35:00-03:00", lastOrderAt: "2026-09-25T10:21:00-03:00", orderCount: 2, totalSpentCents: 7600, averageTicketCents: 3800, status: "active", segments: ["new"], favoriteProduct: "LaVic Morango 1L", acceptsWhatsapp: true, acceptsEmail: false, addresses: [{ id: "addr-10", label: "Principal", address: "Endereço de demonstração 10", city: "Volta Redonda", state: "RJ", primary: true }] },
  { id: "customer-11", code: "CLI-0011", name: "Cliente LaVic 11", email: "cliente11@exemplo.com", phone: "(24) 99990-0111", origin: "storefront", createdAt: "2026-07-28T13:14:00-03:00", lastOrderAt: "2026-09-25T09:50:00-03:00", orderCount: 6, totalSpentCents: 63800, averageTicketCents: 10633, status: "active", segments: ["recurrent"], favoriteProduct: "LaVic Espumante 750 ml", acceptsWhatsapp: true, acceptsEmail: true, addresses: [{ id: "addr-11", label: "Principal", address: "Endereço de demonstração 11", city: "Volta Redonda", state: "RJ", primary: true }] },
  { id: "customer-12", code: "CLI-0012", name: "Cliente LaVic 12", email: "cliente12@exemplo.com", phone: "(24) 99990-0112", origin: "storefront", createdAt: "2026-08-30T15:45:00-03:00", lastOrderAt: "2026-09-25T09:12:00-03:00", orderCount: 4, totalSpentCents: 31200, averageTicketCents: 7800, status: "active", segments: ["recurrent"], favoriteProduct: "LaVic Limão 1L", acceptsWhatsapp: true, acceptsEmail: true, addresses: [{ id: "addr-12", label: "Principal", address: "Endereço de demonstração 12", city: "Volta Redonda", state: "RJ", primary: true }] },
  { id: "customer-13", code: "CLI-0013", name: "Cliente LaVic 13", email: "cliente13@exemplo.com", phone: "(24) 99990-0113", origin: "whatsapp", createdAt: "2026-02-21T17:18:00-03:00", lastOrderAt: "2026-09-25T08:33:00-03:00", orderCount: 11, totalSpentCents: 96800, averageTicketCents: 8800, status: "active", segments: ["recurrent", "b2b_potential"], favoriteProduct: "LaVic Limão 1L", acceptsWhatsapp: true, acceptsEmail: false, addresses: [{ id: "addr-13", label: "Principal", address: "Endereço de demonstração 13", city: "Volta Redonda", state: "RJ", primary: true }] },
  { id: "customer-14", code: "CLI-0014", name: "Cliente LaVic 14", email: "cliente14@exemplo.com", phone: "(24) 99990-0114", origin: "storefront", createdAt: "2026-09-02T12:02:00-03:00", lastOrderAt: "2026-09-25T08:11:00-03:00", orderCount: 3, totalSpentCents: 26400, averageTicketCents: 8800, status: "active", segments: ["new"], favoriteProduct: "LaVic Morango 1L", acceptsWhatsapp: true, acceptsEmail: true, addresses: [{ id: "addr-14", label: "Principal", address: "Endereço de demonstração 14", city: "Volta Redonda", state: "RJ", primary: true }] },
  { id: "customer-15", code: "CLI-0015", name: "Cliente LaVic 15", email: "cliente15@exemplo.com", phone: "(24) 99990-0115", origin: "storefront", createdAt: "2026-05-19T09:40:00-03:00", lastOrderAt: "2026-09-25T07:48:00-03:00", orderCount: 7, totalSpentCents: 58400, averageTicketCents: 8343, status: "active", segments: ["recurrent"], favoriteProduct: "LaVic Morango 1L", acceptsWhatsapp: true, acceptsEmail: true, addresses: [{ id: "addr-15", label: "Principal", address: "Endereço de demonstração 15", city: "Volta Redonda", state: "RJ", primary: true }] },
  { id: "customer-16", code: "CLI-0016", name: "Cliente LaVic 16", email: "cliente16@exemplo.com", phone: "(24) 99990-0116", origin: "whatsapp", createdAt: "2026-03-11T15:10:00-03:00", lastOrderAt: "2026-09-24T18:22:00-03:00", orderCount: 8, totalSpentCents: 67600, averageTicketCents: 8450, status: "active", segments: ["recurrent"], favoriteProduct: "LaVic Limão 1L", acceptsWhatsapp: true, acceptsEmail: false, addresses: [{ id: "addr-16", label: "Principal", address: "Endereço de demonstração 16", city: "Volta Redonda", state: "RJ", primary: true }] },
  { id: "customer-17", code: "CLI-0017", name: "Cliente LaVic 17", email: "cliente17@exemplo.com", phone: "(24) 99990-0117", origin: "storefront", createdAt: "2026-01-16T13:55:00-03:00", lastOrderAt: "2026-09-24T17:40:00-03:00", orderCount: 9, totalSpentCents: 73800, averageTicketCents: 8200, status: "active", segments: ["recurrent"], favoriteProduct: "LaVic Limão 1L", acceptsWhatsapp: true, acceptsEmail: true, addresses: [{ id: "addr-17", label: "Principal", address: "Endereço de demonstração 17", city: "Volta Redonda", state: "RJ", primary: true }] },
  { id: "customer-18", code: "CLI-0018", name: "Cliente LaVic 18", email: "cliente18@exemplo.com", phone: "(24) 99990-0118", origin: "storefront", createdAt: "2026-09-18T10:20:00-03:00", lastOrderAt: "2026-09-24T16:30:00-03:00", orderCount: 2, totalSpentCents: 14400, averageTicketCents: 7200, status: "active", segments: ["new"], favoriteProduct: "LaVic Espumante 750 ml", acceptsWhatsapp: true, acceptsEmail: true, addresses: [{ id: "addr-18", label: "Principal", address: "Endereço de demonstração 18", city: "Volta Redonda", state: "RJ", primary: true }] },
  { id: "customer-19", code: "CLI-0019", name: "Cliente LaVic 19", email: "cliente19@exemplo.com", phone: "(24) 99990-0119", origin: "whatsapp", createdAt: "2026-03-02T14:20:00-03:00", lastOrderAt: "2026-08-10T18:22:00-03:00", orderCount: 5, totalSpentCents: 41800, averageTicketCents: 8360, status: "active", segments: ["at_risk"], favoriteProduct: "LaVic Limão 1L", acceptsWhatsapp: true, acceptsEmail: false, addresses: [{ id: "addr-19", label: "Principal", address: "Endereço de demonstração 19", city: "Volta Redonda", state: "RJ", primary: true }] },
  { id: "customer-20", code: "CLI-0020", name: "Cliente LaVic 20", email: "cliente20@exemplo.com", phone: "(24) 99990-0120", origin: "storefront", createdAt: "2026-01-16T13:55:00-03:00", lastOrderAt: "2026-07-17T17:40:00-03:00", orderCount: 6, totalSpentCents: 50200, averageTicketCents: 8367, status: "active", segments: ["at_risk"], favoriteProduct: "LaVic Morango 1L", acceptsWhatsapp: true, acceptsEmail: true, addresses: [{ id: "addr-20", label: "Principal", address: "Endereço de demonstração 20", city: "Volta Redonda", state: "RJ", primary: true }] },
  { id: "customer-21", code: "CLI-0021", name: "Cliente LaVic 21", email: "cliente21@exemplo.com", phone: "(24) 99990-0121", origin: "manual", createdAt: "2026-01-03T10:20:00-03:00", lastOrderAt: "2026-04-12T16:30:00-03:00", orderCount: 2, totalSpentCents: 14400, averageTicketCents: 7200, status: "inactive", segments: ["inactive"], favoriteProduct: "LaVic Morango 1L", acceptsWhatsapp: false, acceptsEmail: false, addresses: [{ id: "addr-21", label: "Principal", address: "Endereço de demonstração 21", city: "Volta Redonda", state: "RJ", primary: true }] },
];

export const customerSegments: CustomerSegmentDefinition[] = [
  { key: "recurrent", label: "Recorrentes", description: "Clientes com frequência de compra consolidada.", rule: "4 ou mais pedidos nos últimos 120 dias", count: 12, tone: "green" },
  { key: "new", label: "Novos", description: "Clientes em fase inicial de relacionamento.", rule: "Cadastro ou primeira compra nos últimos 30 dias", count: 6, tone: "orange" },
  { key: "vip", label: "VIP", description: "Clientes com maior valor e recorrência.", rule: "12+ pedidos ou R$ 1.200+ em compras", count: 3, tone: "green" },
  { key: "at_risk", label: "Em risco", description: "Clientes recorrentes que reduziram a frequência.", rule: "Sem compra há mais de 30 dias", count: 2, tone: "danger" },
  { key: "b2b_potential", label: "Potencial B2B", description: "Clientes com sinais de interesse comercial.", rule: "Origem comercial, evento ou volume recorrente", count: 2, tone: "orange" },
  { key: "inactive", label: "Inativos", description: "Clientes fora da base ativa de relacionamento.", rule: "Inativação manual ou longo período sem compra", count: 1, tone: "neutral" },
];

export const customerInteractions: CustomerInteraction[] = [
  { id: "int-001", customerId: "customer-05", createdAt: "2026-09-25T14:32:00-03:00", type: "order", title: "Pedido LAV-0183 confirmado", description: "3 itens · pagamento PIX aprovado · entrega registrada.", actor: "Sistema", reference: "LAV-0183" },
  { id: "int-002", customerId: "customer-05", createdAt: "2026-09-20T11:18:00-03:00", type: "message", title: "Contato via WhatsApp", description: "Cliente pediu indicação de sabores para um encontro de fim de semana.", actor: "Equipe LaVic" },
  { id: "int-003", customerId: "customer-05", createdAt: "2026-09-12T08:40:00-03:00", type: "coupon", title: "Cupom EVENTO10 utilizado", description: "Campanha associada ao relacionamento pós-evento.", actor: "Sistema", reference: "EVENTO10" },
  { id: "int-004", customerId: "customer-05", createdAt: "2026-09-03T16:06:00-03:00", type: "note", title: "Preferência registrada", description: "Prefere entregas no fim da tarde e costuma alternar Morango e Limão.", actor: "Equipe LaVic", private: true },
  { id: "int-005", customerId: "customer-03", createdAt: "2026-09-25T08:47:00-03:00", type: "order", title: "Pedido LAV-0185 criado", description: "Nova compra registrada na loja online.", actor: "Sistema", reference: "LAV-0185" },
  { id: "int-006", customerId: "customer-19", createdAt: "2026-09-24T15:10:00-03:00", type: "note", title: "Reativação recomendada", description: "Cliente recorrente sem compra recente. Avaliar contato antes de campanha automática.", actor: "Equipe LaVic", private: true },
  { id: "int-007", customerId: "customer-07", createdAt: "2026-09-23T10:15:00-03:00", type: "message", title: "Interesse em compra recorrente", description: "Cliente comentou sobre consumo em estabelecimento. Sinalizado como potencial B2B.", actor: "Equipe LaVic" },
  { id: "int-008", customerId: "customer-13", createdAt: "2026-09-22T17:28:00-03:00", type: "message", title: "Contato comercial identificado", description: "Volume e frequência sugerem possível oportunidade de revenda.", actor: "Equipe LaVic" },
  { id: "int-009", customerId: "customer-02", createdAt: "2026-09-19T16:12:00-03:00", type: "profile", title: "Cliente criado pelo WhatsApp", description: "Cadastro manual vinculado ao primeiro atendimento.", actor: "Equipe LaVic" },
  { id: "int-010", customerId: "customer-09", createdAt: "2026-09-18T13:42:00-03:00", type: "coupon", title: "Benefício VIP aplicado", description: "Ação de relacionamento aplicada sem alterar a tabela-base de preços.", actor: "Equipe LaVic" },
];


export const b2bLeads: B2BLead[] = [
  { id: "b2b-lead-001", code: "B2B-0041", company: "Empório Modelo Centro", contactName: "Contato Comercial 01", phone: "(24) 9••••-4101", email: "contato41@example.com", city: "Volta Redonda", state: "RJ", businessType: "Empório", stage: "new", estimatedMonthlyUnits: 48, potentialCents: 134400, interestedProducts: ["LaVic Limão 1L", "LaVic Morango 1L"], source: "Formulário de revenda", owner: "Equipe Comercial", createdAt: "2026-09-25T09:12:00-03:00", nextActionAt: "2026-09-25T16:30:00-03:00", notes: "Lead demonstrativo recebido pelo formulário comercial." },
  { id: "b2b-lead-002", code: "B2B-0040", company: "Café Demonstração A", contactName: "Contato Comercial 02", phone: "(24) 9••••-4102", email: "contato40@example.com", city: "Barra Mansa", state: "RJ", businessType: "Cafeteria", stage: "contact", estimatedMonthlyUnits: 72, potentialCents: 201600, interestedProducts: ["LaVic Limão 1L", "LaVic Espumante 750 ml"], source: "Indicação", owner: "Equipe Comercial", createdAt: "2026-09-23T10:40:00-03:00", lastContactAt: "2026-09-24T15:18:00-03:00", nextActionAt: "2026-09-26T10:00:00-03:00" },
  { id: "b2b-lead-003", code: "B2B-0039", company: "Mercado Exemplo Sul", contactName: "Contato Comercial 03", phone: "(24) 9••••-4103", email: "contato39@example.com", city: "Volta Redonda", state: "RJ", businessType: "Mercado", stage: "qualified", estimatedMonthlyUnits: 120, potentialCents: 324000, interestedProducts: ["LaVic Limão 1L", "LaVic Morango 1L", "LaVic Espumante 750 ml"], source: "Prospecção manual", owner: "Equipe Comercial", createdAt: "2026-09-18T14:00:00-03:00", lastContactAt: "2026-09-24T11:22:00-03:00", nextActionAt: "2026-09-26T14:00:00-03:00", customerId: "customer-07" },
  { id: "b2b-lead-004", code: "B2B-0038", company: "Loja Teste Jardim", contactName: "Contato Comercial 04", phone: "(24) 9••••-4104", email: "contato38@example.com", city: "Resende", state: "RJ", businessType: "Loja natural", stage: "proposal", estimatedMonthlyUnits: 96, potentialCents: 268800, interestedProducts: ["LaVic Limão 1L", "LaVic Morango 1L"], source: "Evento", owner: "Equipe Comercial", createdAt: "2026-09-15T09:30:00-03:00", lastContactAt: "2026-09-24T16:40:00-03:00", nextActionAt: "2026-09-27T09:00:00-03:00" },
  { id: "b2b-lead-005", code: "B2B-0037", company: "Restaurante Modelo Vale", contactName: "Contato Comercial 05", phone: "(24) 9••••-4105", email: "contato37@example.com", city: "Volta Redonda", state: "RJ", businessType: "Restaurante", stage: "negotiation", estimatedMonthlyUnits: 160, potentialCents: 448000, interestedProducts: ["LaVic Limão 1L", "LaVic Morango 1L", "LaVic Espumante 750 ml"], source: "Indicação", owner: "Equipe Comercial", createdAt: "2026-09-08T12:10:00-03:00", lastContactAt: "2026-09-25T08:20:00-03:00", nextActionAt: "2026-09-25T17:00:00-03:00" },
  { id: "b2b-lead-006", code: "B2B-0036", company: "Empório Demonstração Norte", contactName: "Contato Comercial 06", phone: "(24) 9••••-4106", email: "contato36@example.com", city: "Barra do Piraí", state: "RJ", businessType: "Empório", stage: "won", estimatedMonthlyUnits: 88, potentialCents: 246400, interestedProducts: ["LaVic Limão 1L", "LaVic Morango 1L"], source: "Formulário de revenda", owner: "Equipe Comercial", createdAt: "2026-08-26T15:20:00-03:00", lastContactAt: "2026-09-20T10:10:00-03:00" },
  { id: "b2b-lead-007", code: "B2B-0035", company: "Café Modelo Estação", contactName: "Contato Comercial 07", phone: "(24) 9••••-4107", email: "contato35@example.com", city: "Volta Redonda", state: "RJ", businessType: "Cafeteria", stage: "contact", estimatedMonthlyUnits: 56, potentialCents: 156800, interestedProducts: ["LaVic Morango 1L"], source: "WhatsApp", owner: "Equipe Comercial", createdAt: "2026-09-21T11:05:00-03:00", lastContactAt: "2026-09-23T09:44:00-03:00", nextActionAt: "2026-09-26T11:00:00-03:00", customerId: "customer-13" },
  { id: "b2b-lead-008", code: "B2B-0034", company: "Loja Exemplo Orgânica", contactName: "Contato Comercial 08", phone: "(24) 9••••-4108", email: "contato34@example.com", city: "Piraí", state: "RJ", businessType: "Loja natural", stage: "lost", estimatedMonthlyUnits: 40, potentialCents: 112000, interestedProducts: ["LaVic Limão 1L"], source: "Prospecção manual", owner: "Equipe Comercial", createdAt: "2026-08-11T16:32:00-03:00", lastContactAt: "2026-09-10T14:10:00-03:00", notes: "Sem aderência ao pedido mínimo neste momento. Manter histórico para retomada futura." },
];

export const b2bActivities: B2BActivity[] = [
  { id: "b2b-act-001", leadId: "b2b-lead-005", createdAt: "2026-09-25T08:20:00-03:00", type: "contact", title: "Condição comercial revisada", description: "Contato confirmou interesse em volume recorrente e pediu revisão do prazo de pagamento.", actor: "Equipe Comercial" },
  { id: "b2b-act-002", leadId: "b2b-lead-005", createdAt: "2026-09-23T16:18:00-03:00", type: "proposal", title: "Proposta atualizada", description: "Tabela Parceiro e pedido mínimo demonstrativo enviados para avaliação.", actor: "Equipe Comercial" },
  { id: "b2b-act-003", leadId: "b2b-lead-005", createdAt: "2026-09-18T10:40:00-03:00", type: "stage", title: "Movido para negociação", description: "Lead avançou após validação de volume, mix e frequência de reposição.", actor: "Equipe Comercial" },
  { id: "b2b-act-004", leadId: "b2b-lead-004", createdAt: "2026-09-24T16:40:00-03:00", type: "proposal", title: "Proposta comercial apresentada", description: "Mix de Limão e Morango apresentado com condição de teste.", actor: "Equipe Comercial" },
  { id: "b2b-act-005", leadId: "b2b-lead-003", createdAt: "2026-09-24T11:22:00-03:00", type: "contact", title: "Qualificação concluída", description: "Estabelecimento, capacidade de giro e frequência de reposição confirmados.", actor: "Equipe Comercial" },
  { id: "b2b-act-006", leadId: "b2b-lead-001", createdAt: "2026-09-25T09:12:00-03:00", type: "created", title: "Lead recebido", description: "Novo interesse de revenda registrado pelo formulário do storefront.", actor: "Sistema" },
];

export const b2bPriceTables: B2BPriceTable[] = [
  { id: "price-essential", name: "Revenda Essencial", description: "Entrada comercial para parceiros com menor volume recorrente.", minimumOrderCents: 18000, paymentTerms: "PIX à vista", clientCount: 2, status: "active", entries: [
    { productId: "p1", productName: "LaVic Morango 1L", sku: "LAV-MOR-1L", retailPriceCents: 2800, b2bPriceCents: 2300 },
    { productId: "p2", productName: "LaVic Limão 1L", sku: "LAV-LIM-1L", retailPriceCents: 2800, b2bPriceCents: 2300 },
    { productId: "p3", productName: "LaVic Espumante 750 ml", sku: "LAV-ESP-750", retailPriceCents: 5900, b2bPriceCents: 5100 },
  ] },
  { id: "price-partner", name: "Parceiro", description: "Tabela para pontos de venda com reposição consolidada.", minimumOrderCents: 32000, paymentTerms: "PIX à vista ou 7 dias", clientCount: 2, status: "active", entries: [
    { productId: "p1", productName: "LaVic Morango 1L", sku: "LAV-MOR-1L", retailPriceCents: 2800, b2bPriceCents: 2150 },
    { productId: "p2", productName: "LaVic Limão 1L", sku: "LAV-LIM-1L", retailPriceCents: 2800, b2bPriceCents: 2150 },
    { productId: "p3", productName: "LaVic Espumante 750 ml", sku: "LAV-ESP-750", retailPriceCents: 5900, b2bPriceCents: 4850 },
  ] },
  { id: "price-volume", name: "Volume", description: "Condição demonstrativa reservada a operações de maior giro.", minimumOrderCents: 52000, paymentTerms: "Condição sob aprovação comercial", clientCount: 0, status: "active", entries: [
    { productId: "p1", productName: "LaVic Morango 1L", sku: "LAV-MOR-1L", retailPriceCents: 2800, b2bPriceCents: 2050 },
    { productId: "p2", productName: "LaVic Limão 1L", sku: "LAV-LIM-1L", retailPriceCents: 2800, b2bPriceCents: 2050 },
    { productId: "p3", productName: "LaVic Espumante 750 ml", sku: "LAV-ESP-750", retailPriceCents: 5900, b2bPriceCents: 4650 },
  ] },
];

export const b2bClients: B2BClient[] = [
  { id: "b2b-client-01", code: "PAR-0012", company: "Empório Demonstração Norte", contactName: "Contato Parceiro 01", phone: "(24) 9••••-5101", email: "parceiro12@example.com", city: "Barra do Piraí", state: "RJ", documentMasked: "••.•••.•••/••••-••", priceTableId: "price-essential", minimumOrderCents: 18000, paymentTerms: "PIX à vista", allowedProducts: ["LaVic Limão 1L", "LaVic Morango 1L"], orderCount: 8, revenueCents: 248600, lastOrderAt: "2026-09-22T09:30:00-03:00", status: "active", createdAt: "2026-06-14T10:00:00-03:00" },
  { id: "b2b-client-02", code: "PAR-0011", company: "Mercado Modelo A", contactName: "Contato Parceiro 02", phone: "(24) 9••••-5102", email: "parceiro11@example.com", city: "Volta Redonda", state: "RJ", documentMasked: "••.•••.•••/••••-••", priceTableId: "price-partner", minimumOrderCents: 32000, paymentTerms: "7 dias", allowedProducts: ["LaVic Limão 1L", "LaVic Morango 1L", "LaVic Espumante 750 ml"], orderCount: 14, revenueCents: 584400, lastOrderAt: "2026-09-24T13:40:00-03:00", status: "active", createdAt: "2026-03-08T11:20:00-03:00" },
  { id: "b2b-client-03", code: "PAR-0010", company: "Café Teste Central", contactName: "Contato Parceiro 03", phone: "(24) 9••••-5103", email: "parceiro10@example.com", city: "Volta Redonda", state: "RJ", documentMasked: "••.•••.•••/••••-••", priceTableId: "price-essential", minimumOrderCents: 18000, paymentTerms: "PIX à vista", allowedProducts: ["LaVic Limão 1L", "LaVic Morango 1L"], orderCount: 5, revenueCents: 143500, lastOrderAt: "2026-09-18T10:15:00-03:00", status: "active", createdAt: "2026-07-02T14:45:00-03:00" },
  { id: "b2b-client-04", code: "PAR-0009", company: "Loja Exemplo Natural", contactName: "Contato Parceiro 04", phone: "(24) 9••••-5104", email: "parceiro09@example.com", city: "Resende", state: "RJ", documentMasked: "••.•••.•••/••••-••", priceTableId: "price-partner", minimumOrderCents: 32000, paymentTerms: "7 dias", allowedProducts: ["LaVic Limão 1L", "LaVic Morango 1L", "LaVic Espumante 750 ml"], orderCount: 9, revenueCents: 327800, lastOrderAt: "2026-09-12T15:18:00-03:00", status: "paused", createdAt: "2026-04-20T09:15:00-03:00" },
];

export const b2bOrders: B2BOrder[] = [
  { id: "b2b-order-021", code: "B2B-P021", clientId: "b2b-client-02", company: "Mercado Modelo A", createdAt: "2026-09-25T10:05:00-03:00", status: "awaiting_approval", paymentTerms: "7 dias", totalCents: 51600, itemCount: 24, deliveryCity: "Volta Redonda, RJ", items: [
    { id: "bi-01", name: "LaVic Limão 1L", sku: "LAV-LIM-1L", quantity: 12, unitPriceCents: 2150 },
    { id: "bi-02", name: "LaVic Morango 1L", sku: "LAV-MOR-1L", quantity: 12, unitPriceCents: 2150 },
  ] },
  { id: "b2b-order-020", code: "B2B-P020", clientId: "b2b-client-01", company: "Empório Demonstração Norte", createdAt: "2026-09-24T15:26:00-03:00", status: "confirmed", paymentTerms: "PIX à vista", totalCents: 27600, itemCount: 12, deliveryCity: "Barra do Piraí, RJ", items: [
    { id: "bi-03", name: "LaVic Limão 1L", sku: "LAV-LIM-1L", quantity: 6, unitPriceCents: 2300 },
    { id: "bi-04", name: "LaVic Morango 1L", sku: "LAV-MOR-1L", quantity: 6, unitPriceCents: 2300 },
  ] },
  { id: "b2b-order-019", code: "B2B-P019", clientId: "b2b-client-03", company: "Café Teste Central", createdAt: "2026-09-23T11:12:00-03:00", status: "separating", paymentTerms: "PIX à vista", totalCents: 23000, itemCount: 10, deliveryCity: "Volta Redonda, RJ", items: [
    { id: "bi-05", name: "LaVic Limão 1L", sku: "LAV-LIM-1L", quantity: 5, unitPriceCents: 2300 },
    { id: "bi-06", name: "LaVic Morango 1L", sku: "LAV-MOR-1L", quantity: 5, unitPriceCents: 2300 },
  ] },
  { id: "b2b-order-018", code: "B2B-P018", clientId: "b2b-client-02", company: "Mercado Modelo A", createdAt: "2026-09-20T09:50:00-03:00", status: "invoiced", paymentTerms: "7 dias", totalCents: 64300, itemCount: 27, deliveryCity: "Volta Redonda, RJ", items: [
    { id: "bi-07", name: "LaVic Limão 1L", sku: "LAV-LIM-1L", quantity: 10, unitPriceCents: 2150 },
    { id: "bi-08", name: "LaVic Morango 1L", sku: "LAV-MOR-1L", quantity: 10, unitPriceCents: 2150 },
    { id: "bi-09", name: "LaVic Espumante 750 ml", sku: "LAV-ESP-750", quantity: 7, unitPriceCents: 4850 },
  ] },
  { id: "b2b-order-017", code: "B2B-P017", clientId: "b2b-client-04", company: "Loja Exemplo Natural", createdAt: "2026-09-12T15:18:00-03:00", status: "delivered", paymentTerms: "7 dias", totalCents: 43000, itemCount: 20, deliveryCity: "Resende, RJ", items: [
    { id: "bi-10", name: "LaVic Limão 1L", sku: "LAV-LIM-1L", quantity: 10, unitPriceCents: 2150 },
    { id: "bi-11", name: "LaVic Morango 1L", sku: "LAV-MOR-1L", quantity: 10, unitPriceCents: 2150 },
  ] },
  { id: "b2b-order-016", code: "B2B-P016", clientId: "b2b-client-01", company: "Empório Demonstração Norte", createdAt: "2026-09-08T14:20:00-03:00", status: "delivered", paymentTerms: "PIX à vista", totalCents: 27600, itemCount: 12, deliveryCity: "Barra do Piraí, RJ", items: [
    { id: "bi-12", name: "LaVic Limão 1L", sku: "LAV-LIM-1L", quantity: 6, unitPriceCents: 2300 },
    { id: "bi-13", name: "LaVic Morango 1L", sku: "LAV-MOR-1L", quantity: 6, unitPriceCents: 2300 },
  ] },
];


// Marketing + Storefront CMS · v0.5
export const marketingCoupons: MarketingCoupon[] = [
  { id: "coupon-01", code: "VIVACOMGAS10", name: "Primeira compra", kind: "percentage", value: 10, status: "active", startsAt: "2026-09-01T00:00:00-03:00", endsAt: "2026-10-15T23:59:00-03:00", minimumOrderCents: 5000, usageCount: 38, usageLimit: 120, perCustomerLimit: 1, revenueCents: 214600, channels: ["B2C"] },
  { id: "coupon-02", code: "KITLAVIC15", name: "Campanha de kits", kind: "percentage", value: 15, status: "scheduled", startsAt: "2026-10-01T00:00:00-03:00", endsAt: "2026-10-12T23:59:00-03:00", minimumOrderCents: 8000, usageCount: 0, usageLimit: 80, perCustomerLimit: 1, revenueCents: 0, channels: ["B2C"] },
  { id: "coupon-03", code: "FRETEGRATIS", name: "Frete promocional", kind: "shipping", value: 0, status: "draft", startsAt: "2026-10-10T00:00:00-03:00", minimumOrderCents: 12000, usageCount: 0, usageLimit: 40, perCustomerLimit: 1, revenueCents: 0, channels: ["B2C"] },
  { id: "coupon-04", code: "PARCEIRO5", name: "Ação comercial B2B", kind: "percentage", value: 5, status: "paused", startsAt: "2026-08-15T00:00:00-03:00", endsAt: "2026-09-30T23:59:00-03:00", minimumOrderCents: 32000, usageCount: 9, usageLimit: 30, perCustomerLimit: 1, revenueCents: 187400, channels: ["B2B"] },
  { id: "coupon-05", code: "LAVICSET", name: "Campanha de setembro", kind: "fixed", value: 1000, status: "expired", startsAt: "2026-09-01T00:00:00-03:00", endsAt: "2026-09-14T23:59:00-03:00", minimumOrderCents: 7000, usageCount: 52, usageLimit: 60, perCustomerLimit: 1, revenueCents: 298900, channels: ["B2C"] },
];

export const marketingPromotions: MarketingPromotion[] = [
  { id: "promo-01", name: "Kit Descoberta", kind: "bundle", status: "active", summary: "Condição especial ao combinar Limão + Morango em um único kit.", scope: "Kit Degustação · B2C", startsAt: "2026-09-18T00:00:00-03:00", endsAt: "2026-10-05T23:59:00-03:00", redemptions: 24, revenueCents: 201600 },
  { id: "promo-02", name: "Leve 4 para a semana", kind: "quantity", status: "scheduled", summary: "Regra demonstrativa de desconto por quantidade para garrafas de 1L.", scope: "Limão e Morango · B2C", startsAt: "2026-10-06T00:00:00-03:00", endsAt: "2026-10-20T23:59:00-03:00", redemptions: 0, revenueCents: 0 },
  { id: "promo-03", name: "Frete local", kind: "shipping", status: "draft", summary: "Campanha de frete condicionado a valor mínimo de pedido.", scope: "Entrega local · B2C", startsAt: "2026-10-10T00:00:00-03:00", redemptions: 0, revenueCents: 0 },
];

export const marketingCampaigns: MarketingCampaign[] = [
  { id: "campaign-01", name: "Viva com gás · Primavera", status: "active", channel: "instagram", startsAt: "2026-09-20T08:00:00-03:00", endsAt: "2026-10-10T23:59:00-03:00", couponCode: "VIVACOMGAS10", visits: 1840, orders: 74, revenueCents: 428600, conversionRate: 4.02 },
  { id: "campaign-02", name: "Descubra LaVic", status: "active", channel: "storefront", startsAt: "2026-09-15T00:00:00-03:00", endsAt: "2026-10-05T23:59:00-03:00", visits: 1120, orders: 49, revenueCents: 310800, conversionRate: 4.38 },
  { id: "campaign-03", name: "Reposição de parceiros", status: "scheduled", channel: "b2b", startsAt: "2026-10-01T08:00:00-03:00", endsAt: "2026-10-15T18:00:00-03:00", couponCode: "PARCEIRO5", visits: 0, orders: 0, revenueCents: 0, conversionRate: 0 },
  { id: "campaign-04", name: "Clientes recorrentes", status: "draft", channel: "whatsapp", startsAt: "2026-10-08T10:00:00-03:00", visits: 0, orders: 0, revenueCents: 0, conversionRate: 0 },
];

export const storeSections: StoreSection[] = [
  { id: "section-hero", label: "Hero principal", type: "hero", status: "published", position: 1, updatedAt: "2026-09-24T20:10:00-03:00", note: "Campanha principal com conteúdo e CTA controlados pelo Admin." },
  { id: "section-highlights", label: "Produtos em destaque", type: "highlights", status: "published", position: 2, updatedAt: "2026-09-24T18:30:00-03:00", note: "Seleção manual de produtos prioritários." },
  { id: "section-kits", label: "Kits e encomendas", type: "kits", status: "published", position: 3, updatedAt: "2026-09-22T11:44:00-03:00", note: "Bloco comercial com kits ativos." },
  { id: "section-flavors", label: "Sabores", type: "flavors", status: "published", position: 4, updatedAt: "2026-09-23T15:04:00-03:00", note: "Sabores reais publicados; conceitos permanecem como demonstração." },
  { id: "section-b2b", label: "LaVic no seu negócio", type: "b2b", status: "published", position: 5, updatedAt: "2026-09-21T09:12:00-03:00", note: "Entrada do funil de revenda/B2B." },
  { id: "section-cta", label: "CTA final", type: "cta", status: "published", position: 6, updatedAt: "2026-09-18T14:20:00-03:00", note: "Fechamento da home com ação de compra." },
];

export const storeBanners: StoreBanner[] = [
  { id: "banner-lime", name: "Hero · Limão", placement: "hero", status: "published", headline: "Viva com gás.", description: "Refrescante, cítrica e cheia de personalidade.", ctaLabel: "Conhecer LaVic Limão", ctaHref: "/sabores#limao", desktopAsset: "/hero/banners/lime-desktop.webp", mobileAsset: "/hero/banners/lime-mobile.webp", updatedAt: "2026-09-24T20:10:00-03:00" },
  { id: "banner-strawberry", name: "Hero · Morango", placement: "hero", status: "published", headline: "Viva com gás.", description: "Frutada, vibrante e feita para beber bem gelada.", ctaLabel: "Conhecer LaVic Morango", ctaHref: "/sabores#morango", desktopAsset: "/hero/banners/strawberry-desktop.webp", mobileAsset: "/hero/banners/strawberry-mobile.webp", updatedAt: "2026-09-24T20:10:00-03:00" },
  { id: "banner-sparkling", name: "Hero · Espumante", placement: "hero", status: "published", headline: "Viva com gás.", description: "Pitaya e uva verde em uma experiência borbulhante.", ctaLabel: "Conhecer o Espumante", ctaHref: "/sabores#espumante", desktopAsset: "/hero/banners/sparkling-desktop.webp", mobileAsset: "/hero/banners/sparkling-mobile.webp", updatedAt: "2026-09-24T20:10:00-03:00" },
  { id: "banner-b2b", name: "Revenda · institucional", placement: "b2b", status: "draft", headline: "Leve LaVic para o seu negócio", description: "Conteúdo comercial em revisão.", ctaLabel: "Quero revender", ctaHref: "/revenda", desktopAsset: "/demo/b2b-banner.webp", mobileAsset: "/demo/b2b-banner-mobile.webp", updatedAt: "2026-09-22T17:20:00-03:00" },
];

export const storeFlavors: StoreFlavor[] = [
  { id: "flavor-lime", name: "Limão", slug: "limao", status: "published", productId: "p2", featured: true, description: "Sabor real vinculado ao catálogo." },
  { id: "flavor-strawberry", name: "Morango", slug: "morango", status: "published", productId: "p1", featured: true, description: "Sabor real vinculado ao catálogo." },
  { id: "flavor-sparkling", name: "Espumante", slug: "espumante", status: "published", productId: "p3", featured: true, description: "Produto especial vinculado ao catálogo." },
  { id: "flavor-ginger", name: "Gengibre", slug: "gengibre", status: "draft", productId: "p5", featured: false, demo: true, description: "Conceito visual de demonstração; não publicado para venda." },
  { id: "flavor-hibiscus", name: "Hibisco", slug: "hibisco", status: "draft", productId: "p6", featured: false, demo: true, description: "Conceito visual de demonstração; não publicado para venda." },
];

export const storeContentBlocks: StoreContentBlock[] = [
  { id: "content-about", label: "Sobre a LaVic", route: "/sobre", status: "published", owner: "Marketing", updatedAt: "2026-09-20T10:20:00-03:00", summary: "História, posicionamento e proposta de marca." },
  { id: "content-process", label: "Como é feita", route: "/sobre#processo", status: "published", owner: "Marketing", updatedAt: "2026-09-18T14:40:00-03:00", summary: "Explicação editorial simplificada do processo." },
  { id: "content-b2b", label: "Revenda", route: "/revenda", status: "published", owner: "Comercial", updatedAt: "2026-09-21T09:12:00-03:00", summary: "Página de entrada para oportunidades B2B." },
  { id: "content-faq", label: "Perguntas frequentes", route: "/faq", status: "draft", owner: "Marketing", updatedAt: "2026-09-24T13:15:00-03:00", summary: "Conteúdo em revisão antes de publicação." },
];

export const storeSeoPages: StoreSeoPage[] = [
  { id: "seo-home", route: "/", title: "LaVic Kombucha · Viva com gás", description: "Kombucha LaVic: sabores, kits, encomendas e uma experiência naturalmente borbulhante.", indexable: true, status: "healthy" },
  { id: "seo-flavors", route: "/sabores", title: "Sabores LaVic", description: "Conheça os sabores e formatos disponíveis da LaVic Kombucha.", indexable: true, status: "healthy" },
  { id: "seo-b2b", route: "/revenda", title: "LaVic no seu negócio", description: "Converse com a LaVic sobre revenda e parcerias comerciais.", indexable: true, status: "healthy" },
  { id: "seo-faq", route: "/faq", title: "Perguntas frequentes · LaVic", description: "Página em preparação.", indexable: false, status: "draft" },
  { id: "seo-cart", route: "/carrinho", title: "Carrinho · LaVic", description: "", indexable: false, status: "attention" },
];

export const financeTransactions: FinanceTransaction[] = [
  { id: "fin-0183", code: "FIN-0183", orderCode: "LAV-0183", customer: "Cliente LaVic 05", createdAt: "2026-09-25T14:34:00-03:00", method: "pix", grossCents: 8600, discountCents: 0, shippingCents: 600, netCents: 8600, status: "approved", channel: "storefront", settlementAt: "2026-09-25T14:35:00-03:00" },
  { id: "fin-0182", code: "FIN-0182", orderCode: "LAV-0182", customer: "Cliente LaVic 06", createdAt: "2026-09-25T13:12:00-03:00", method: "credit_card", grossCents: 7200, discountCents: 0, shippingCents: 0, netCents: 7200, status: "approved", channel: "storefront", settlementAt: "2026-09-27T09:00:00-03:00" },
  { id: "fin-0181", code: "FIN-0181", orderCode: "LAV-0181", customer: "Cliente LaVic 07", createdAt: "2026-09-25T12:46:00-03:00", method: "manual", grossCents: 12000, discountCents: 0, shippingCents: 0, netCents: 12000, status: "approved", channel: "b2b" },
  { id: "fin-0180", code: "FIN-0180", orderCode: "LAV-0180", customer: "Cliente LaVic 08", createdAt: "2026-09-25T11:21:00-03:00", method: "pix", grossCents: 6800, discountCents: 0, shippingCents: 600, netCents: 6800, status: "approved", channel: "storefront", settlementAt: "2026-09-25T11:22:00-03:00" },
  { id: "fin-0179", code: "FIN-0179", orderCode: "LAV-0179", customer: "Cliente LaVic 09", createdAt: "2026-09-25T10:56:00-03:00", method: "pix", grossCents: 6400, discountCents: 0, shippingCents: 600, netCents: 6400, status: "approved", channel: "storefront", settlementAt: "2026-09-25T10:57:00-03:00" },
  { id: "fin-0178", code: "FIN-0178", orderCode: "LAV-0178", customer: "Cliente LaVic 10", createdAt: "2026-09-25T10:22:00-03:00", method: "cash", grossCents: 3800, discountCents: 0, shippingCents: 0, netCents: 3800, status: "approved", channel: "manual" },
  { id: "fin-0177", code: "FIN-0177", orderCode: "LAV-0177", customer: "Cliente LaVic 11", createdAt: "2026-09-25T09:51:00-03:00", method: "credit_card", grossCents: 9200, discountCents: 500, shippingCents: 0, netCents: 8700, status: "approved", channel: "storefront", settlementAt: "2026-09-27T09:00:00-03:00" },
  { id: "fin-0187", code: "FIN-0187", orderCode: "LAV-0187", customer: "Cliente LaVic 01", createdAt: "2026-09-25T10:24:00-03:00", method: "pix", grossCents: 7600, discountCents: 0, shippingCents: 600, netCents: 7600, status: "pending", channel: "storefront" },
  { id: "fin-0186", code: "FIN-0186", orderCode: "LAV-0186", customer: "Cliente LaVic 02", createdAt: "2026-09-25T09:18:00-03:00", method: "pix", grossCents: 4200, discountCents: 0, shippingCents: 600, netCents: 4200, status: "pending", channel: "whatsapp" },
  { id: "fin-0165", code: "FIN-0165", orderCode: "LAV-0165", customer: "Cliente LaVic 18", createdAt: "2026-09-23T16:20:00-03:00", method: "credit_card", grossCents: 11200, discountCents: 1200, shippingCents: 600, netCents: 10000, status: "refunded", channel: "storefront", settlementAt: "2026-09-24T09:00:00-03:00" },
];

export const financeRefunds: FinanceRefund[] = [
  { id: "ref-001", code: "REF-001", orderCode: "LAV-0165", customer: "Cliente LaVic 18", createdAt: "2026-09-24T10:14:00-03:00", amountCents: 10000, reason: "Cancelamento solicitado antes da expedição.", actor: "Equipe LaVic", status: "completed" },
  { id: "ref-002", code: "REF-002", orderCode: "LAV-0157", customer: "Cliente LaVic 22", createdAt: "2026-09-24T15:42:00-03:00", amountCents: 3600, reason: "Item indisponível após conferência operacional.", actor: "Equipe LaVic", status: "processing" },
  { id: "ref-003", code: "REF-003", orderCode: "LAV-0149", customer: "Cliente LaVic 27", createdAt: "2026-09-23T11:05:00-03:00", amountCents: 2800, reason: "Solicitação em análise pela operação.", actor: "Equipe LaVic", status: "requested" },
];

export const financeReconciliations: FinanceReconciliation[] = [
  { id: "rec-01", date: "2026-09-25T00:00:00-03:00", provider: "PIX", orders: 18, expectedCents: 84200, settledCents: 84200, differenceCents: 0, status: "matched" },
  { id: "rec-02", date: "2026-09-25T00:00:00-03:00", provider: "Cartão", orders: 9, expectedCents: 53600, settledCents: 52900, differenceCents: -700, status: "difference" },
  { id: "rec-03", date: "2026-09-25T00:00:00-03:00", provider: "Manual / B2B", orders: 3, expectedCents: 38600, settledCents: 38600, differenceCents: 0, status: "matched" },
  { id: "rec-04", date: "2026-09-24T00:00:00-03:00", provider: "PIX", orders: 14, expectedCents: 64800, settledCents: 64800, differenceCents: 0, status: "matched" },
  { id: "rec-05", date: "2026-09-24T00:00:00-03:00", provider: "Cartão", orders: 7, expectedCents: 41100, settledCents: 41100, differenceCents: 0, status: "review" },
];

export const financeDailyRevenue: FinanceDailyRevenue[] = [
  { date: "2026-09-19T00:00:00-03:00", grossCents: 103800, discountCents: 5200, shippingCents: 7200, netCents: 98600, orders: 24 },
  { date: "2026-09-20T00:00:00-03:00", grossCents: 121400, discountCents: 6100, shippingCents: 8400, netCents: 115300, orders: 28 },
  { date: "2026-09-21T00:00:00-03:00", grossCents: 94800, discountCents: 3900, shippingCents: 6600, netCents: 90900, orders: 21 },
  { date: "2026-09-22T00:00:00-03:00", grossCents: 134600, discountCents: 7300, shippingCents: 9000, netCents: 127300, orders: 31 },
  { date: "2026-09-23T00:00:00-03:00", grossCents: 119200, discountCents: 4800, shippingCents: 7800, netCents: 114400, orders: 27 },
  { date: "2026-09-24T00:00:00-03:00", grossCents: 146500, discountCents: 8200, shippingCents: 10200, netCents: 138300, orders: 34 },
  { date: "2026-09-25T00:00:00-03:00", grossCents: 157400, discountCents: 9700, shippingCents: 10800, netCents: 147700, orders: 37 },
];

export const reportDefinitions: AdminReportDefinition[] = [
  {
    key: "sales", title: "Vendas", description: "Receita, pedidos, descontos e ticket médio por período.", icon: "chart", tone: "green", period: "19/09/2026 → 25/09/2026", updatedAt: "2026-09-25T18:10:00-03:00",
    metrics: [
      { label: "Receita líquida", value: "R$ 832.500,00", detail: "7 dias demonstrativos", tone: "green" },
      { label: "Pedidos", value: "202", detail: "todos os canais", tone: "neutral" },
      { label: "Ticket médio", value: "R$ 4.121,29", detail: "receita / pedidos", tone: "green" },
      { label: "Descontos", value: "R$ 42.200,00", detail: "5,1% da receita bruta", tone: "orange" },
    ],
    insights: ["O maior volume do período está concentrado nos dois dias mais recentes.", "PIX permanece como principal meio de pagamento nos pedidos B2C demonstrativos.", "Descontos devem ser analisados junto de campanhas para evitar conclusões isoladas."],
    columns: ["Data", "Pedidos", "Receita bruta", "Descontos", "Frete", "Receita líquida", "Ticket médio"],
    rows: financeDailyRevenue.map((item, index) => ({ id: `sales-${index}`, cells: [item.date.slice(8, 10) + "/09/2026", String(item.orders), `R$ ${(item.grossCents / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, `R$ ${(item.discountCents / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, `R$ ${(item.shippingCents / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, `R$ ${(item.netCents / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, `R$ ${(item.netCents / item.orders / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`] })),
  },
  {
    key: "products", title: "Produtos", description: "Giro, unidades vendidas e participação dos produtos no faturamento.", icon: "box", tone: "orange", period: "Últimos 30 dias", updatedAt: "2026-09-25T18:10:00-03:00",
    metrics: [{ label: "Unidades vendidas", value: "486", detail: "produtos reais", tone: "green" }, { label: "Mais vendido", value: "Limão 1L", detail: "174 unidades", tone: "orange" }, { label: "Receita produtos", value: "R$ 18.462,00", detail: "sem frete", tone: "green" }, { label: "Mix ativo", value: "4", detail: "produtos publicados", tone: "neutral" }],
    insights: ["Limão 1L lidera em unidades, enquanto o Espumante eleva ticket por item.", "Sabores marcados como DEMO não entram nas métricas comerciais.", "Quando custo real estiver disponível, margem deve ser calculada somente no backend."],
    columns: ["Produto", "SKU", "Pedidos", "Unidades", "Receita", "Estoque", "Participação"],
    rows: [
      { id: "prod-1", cells: ["LaVic Limão 1L", "LAV-LIM-1L", "112", "174", "R$ 5.220,00", "86 un.", "28,3%"] },
      { id: "prod-2", cells: ["LaVic Morango 1L", "LAV-MOR-1L", "98", "151", "R$ 4.530,00", "64 un.", "24,5%"] },
      { id: "prod-3", cells: ["LaVic Espumante 750 ml", "LAV-ESP-750", "52", "67", "R$ 3.953,00", "31 un.", "21,4%"] },
      { id: "prod-4", cells: ["Kit Degustação", "LAV-KIT-01", "61", "94", "R$ 4.759,00", "componentes", "25,8%"] },
    ],
  },
  {
    key: "customers", title: "Clientes", description: "Recorrência, segmentos e comportamento comercial da base B2C.", icon: "users", tone: "green", period: "Últimos 90 dias", updatedAt: "2026-09-25T18:10:00-03:00",
    metrics: [{ label: "Clientes ativos", value: "148", detail: "compraram no período", tone: "green" }, { label: "Recorrentes", value: "61", detail: "2+ compras", tone: "green" }, { label: "Novos", value: "37", detail: "primeira compra", tone: "orange" }, { label: "Em risco", value: "12", detail: "sem compra recente", tone: "orange" }],
    insights: ["Recorrentes respondem pela maior parte da receita da base demonstrativa.", "Segmentação não substitui consentimento de WhatsApp ou e-mail.", "Clientes com potencial B2B devem migrar para o funil comercial sem perder o vínculo histórico B2C."],
    columns: ["Segmento", "Clientes", "Pedidos", "Receita", "Ticket médio", "Participação"],
    rows: [{ id: "cust-1", cells: ["Recorrentes", "61", "204", "R$ 12.844,00", "R$ 62,96", "55,2%"] }, { id: "cust-2", cells: ["Novos", "37", "37", "R$ 2.516,00", "R$ 68,00", "10,8%"] }, { id: "cust-3", cells: ["VIP", "18", "96", "R$ 6.378,00", "R$ 66,44", "27,4%"] }, { id: "cust-4", cells: ["Em risco", "12", "24", "R$ 1.520,00", "R$ 63,33", "6,6%"] }],
  },
  {
    key: "inventory", title: "Estoque", description: "Disponibilidade, reservas, lotes e pontos de atenção operacional.", icon: "boxes", tone: "orange", period: "Posição atual", updatedAt: "2026-09-25T18:10:00-03:00",
    metrics: [{ label: "Disponível", value: "196 un.", detail: "saldo vendável", tone: "green" }, { label: "Reservado", value: "29 un.", detail: "pedidos em andamento", tone: "neutral" }, { label: "Lotes ativos", value: "7", detail: "saída permitida", tone: "green" }, { label: "Alertas", value: "4", detail: "exigem análise", tone: "orange" }],
    insights: ["FEFO deve orientar separação sempre que a validade for relevante.", "Ajustes de inventário precisam gerar movimentação e auditoria.", "Estoque de kits deriva da disponibilidade dos componentes, não de um saldo independente."],
    columns: ["Produto", "Disponível", "Reservado", "Mínimo", "Lotes", "Validade próxima", "Status"],
    rows: inventoryStock.map((item) => ({ id: `rep-${item.id}`, cells: [item.productName, String(item.available), String(item.reserved), String(item.minimumStock), String(item.activeLots), item.nearestExpiry ? item.nearestExpiry.slice(8, 10) + "/" + item.nearestExpiry.slice(5, 7) : "—", item.health === "healthy" ? "Saudável" : item.health === "attention" ? "Atenção" : item.health === "critical" ? "Crítico" : "Sem estoque"] })),
  },
  {
    key: "marketing", title: "Marketing", description: "Campanhas, atribuição, pedidos e receita rastreada por iniciativa.", icon: "megaphone", tone: "orange", period: "Campanhas vigentes e recentes", updatedAt: "2026-09-25T18:10:00-03:00",
    metrics: [{ label: "Campanhas", value: "4", detail: "ativas + planejadas", tone: "neutral" }, { label: "Visitas", value: "2.960", detail: "origem rastreada", tone: "green" }, { label: "Pedidos atribuídos", value: "123", detail: "vínculo explícito", tone: "green" }, { label: "Receita atribuída", value: "R$ 7.394,00", detail: "não é contabilidade", tone: "orange" }],
    insights: ["Atribuição mede vínculo comercial e não substitui a receita consolidada do Financeiro.", "Campanhas com cupom permitem rastreamento mais explícito na fase inicial.", "Comparações futuras devem preservar janela e canal para não misturar populações diferentes."],
    columns: ["Campanha", "Canal", "Visitas", "Pedidos", "Conversão", "Receita"],
    rows: marketingCampaigns.map((item) => ({ id: `report-${item.id}`, cells: [item.name, item.channel, item.visits.toLocaleString("pt-BR"), String(item.orders), item.conversionRate.toFixed(2).replace(".", ",") + "%", `R$ ${(item.revenueCents / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`] })),
  },
  {
    key: "b2b", title: "B2B", description: "Pipeline, parceiros, pedidos e faturamento do canal de revenda.", icon: "handshake", tone: "green", period: "Últimos 90 dias", updatedAt: "2026-09-25T18:10:00-03:00",
    metrics: [{ label: "Leads abertos", value: "6", detail: "pipeline comercial", tone: "orange" }, { label: "Parceiros ativos", value: "4", detail: "clientes B2B", tone: "green" }, { label: "Pedidos B2B", value: "18", detail: "período demonstrativo", tone: "neutral" }, { label: "Faturamento", value: "R$ 12.840,00", detail: "pedidos B2B", tone: "green" }],
    insights: ["Pipeline e faturamento devem ser lidos separadamente: oportunidade não é receita.", "Tabela comercial precisa ser preservada no pedido para manter histórico.", "Condição de pagamento e pedido mínimo serão validados pela API antes da confirmação."],
    columns: ["Parceiro", "Cidade", "Pedidos", "Faturamento", "Ticket médio", "Último pedido", "Status"],
    rows: b2bClients.map((item) => ({ id: `report-${item.id}`, cells: [item.company, `${item.city}/${item.state}`, String(item.orderCount), `R$ ${(item.revenueCents / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, `R$ ${(item.orderCount ? item.revenueCents / item.orderCount / 100 : 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, item.lastOrderAt ? item.lastOrderAt.slice(8, 10) + "/" + item.lastOrderAt.slice(5, 7) + "/2026" : "—", item.status === "active" ? "Ativo" : "Pausado"] })),
  },
  {
    key: "channels", title: "Canais", description: "Compare storefront, WhatsApp, B2B e entradas manuais sem misturar origem.", icon: "orders", tone: "neutral", period: "Últimos 30 dias", updatedAt: "2026-09-25T18:10:00-03:00",
    metrics: [{ label: "Storefront", value: "68%", detail: "receita B2C", tone: "green" }, { label: "WhatsApp", value: "18%", detail: "pedidos assistidos", tone: "orange" }, { label: "B2B", value: "10%", detail: "revenda", tone: "green" }, { label: "Manual", value: "4%", detail: "eventos e operação", tone: "neutral" }],
    insights: ["Origem do pedido deve ser imutável depois da criação para preservar atribuição.", "Pedido manual mantém o CRM e financeiro completos mesmo fora da loja online.", "B2B possui regras comerciais próprias e não deve ser comparado ao B2C somente por ticket."],
    columns: ["Canal", "Pedidos", "Receita", "Ticket médio", "Participação", "Observação"],
    rows: [{ id: "channel-1", cells: ["Storefront", "218", "R$ 15.842,00", "R$ 72,67", "68%", "Compra direta"] }, { id: "channel-2", cells: ["WhatsApp", "74", "R$ 4.192,00", "R$ 56,65", "18%", "Venda assistida"] }, { id: "channel-3", cells: ["B2B", "18", "R$ 2.328,00", "R$ 129,33", "10%", "Revenda"] }, { id: "channel-4", cells: ["Manual", "21", "R$ 932,00", "R$ 44,38", "4%", "Eventos/operação"] }],
  },
];

// LaVic Admin v0.7 — governança, equipe, sessões, auditoria e segurança.
// Todos os dados abaixo são demonstrativos. Não representam contas, credenciais ou sessões reais.


export const preorders: AdminPreorder[] = [
  {
    id: "preorder-031", code: "ENC-0031", customerName: "Cliente LaVic 18", customerId: "customer-18", createdAt: "2026-09-25T09:12:00-03:00", scheduledFor: "2026-09-26T17:30:00-03:00",
    status: "awaiting_confirmation", paymentStatus: "pending", paymentMethod: "PIX", channel: "whatsapp", deliveryMode: "pickup", itemCount: 4, totalCents: 11200, depositCents: 0, assignedTo: "Operação LaVic",
    notes: "Retirada programada no fim da tarde.", items: [
      { id: "enc31-1", name: "LaVic Limão 1L", sku: "LAV-LIM-1L", quantity: 2, unitPriceCents: 2800 },
      { id: "enc31-2", name: "LaVic Morango 1L", sku: "LAV-MOR-1L", quantity: 2, unitPriceCents: 2800 },
    ],
  },
  {
    id: "preorder-030", code: "ENC-0030", customerName: "Cliente LaVic 07", customerId: "customer-07", createdAt: "2026-09-24T18:42:00-03:00", scheduledFor: "2026-09-26T11:00:00-03:00",
    status: "confirmed", paymentStatus: "partial", paymentMethod: "PIX", channel: "manual", deliveryMode: "delivery", itemCount: 6, totalCents: 16800, depositCents: 8400, assignedTo: "Operação LaVic",
    items: [
      { id: "enc30-1", name: "LaVic Limão 1L", sku: "LAV-LIM-1L", quantity: 3, unitPriceCents: 2800 },
      { id: "enc30-2", name: "LaVic Morango 1L", sku: "LAV-MOR-1L", quantity: 3, unitPriceCents: 2800 },
    ],
  },
  {
    id: "preorder-029", code: "ENC-0029", customerName: "Cliente LaVic 14", customerId: "customer-14", createdAt: "2026-09-24T15:08:00-03:00", scheduledFor: "2026-09-27T14:00:00-03:00",
    status: "scheduled", paymentStatus: "paid", paymentMethod: "Cartão", channel: "storefront", deliveryMode: "pickup", itemCount: 3, totalCents: 11500, depositCents: 11500, assignedTo: "Operação LaVic",
    items: [
      { id: "enc29-1", name: "LaVic Espumante 750 ml", sku: "LAV-ESP-750", quantity: 1, unitPriceCents: 5900 },
      { id: "enc29-2", name: "LaVic Limão 1L", sku: "LAV-LIM-1L", quantity: 2, unitPriceCents: 2800 },
    ],
  },
  {
    id: "preorder-028", code: "ENC-0028", customerName: "Cliente LaVic 03", customerId: "customer-03", createdAt: "2026-09-23T10:34:00-03:00", scheduledFor: "2026-09-25T16:30:00-03:00",
    status: "preparing", paymentStatus: "paid", paymentMethod: "PIX", channel: "whatsapp", deliveryMode: "delivery", itemCount: 8, totalCents: 22400, depositCents: 22400, assignedTo: "Operação LaVic",
    items: [
      { id: "enc28-1", name: "LaVic Limão 1L", sku: "LAV-LIM-1L", quantity: 4, unitPriceCents: 2800 },
      { id: "enc28-2", name: "LaVic Morango 1L", sku: "LAV-MOR-1L", quantity: 4, unitPriceCents: 2800 },
    ],
  },
  {
    id: "preorder-027", code: "ENC-0027", customerName: "Cliente LaVic 12", customerId: "customer-12", createdAt: "2026-09-22T13:20:00-03:00", scheduledFor: "2026-09-25T13:00:00-03:00",
    status: "ready", paymentStatus: "paid", paymentMethod: "PIX", channel: "manual", deliveryMode: "pickup", itemCount: 2, totalCents: 5600, depositCents: 5600, assignedTo: "Operação LaVic",
    items: [{ id: "enc27-1", name: "LaVic Morango 1L", sku: "LAV-MOR-1L", quantity: 2, unitPriceCents: 2800 }],
  },
  {
    id: "preorder-026", code: "ENC-0026", customerName: "Cliente LaVic 09", customerId: "customer-09", createdAt: "2026-09-20T16:22:00-03:00", scheduledFor: "2026-09-24T18:00:00-03:00",
    status: "completed", paymentStatus: "paid", paymentMethod: "PIX", channel: "whatsapp", deliveryMode: "delivery", itemCount: 4, totalCents: 11200, depositCents: 11200, assignedTo: "Operação LaVic",
    items: [
      { id: "enc26-1", name: "LaVic Limão 1L", sku: "LAV-LIM-1L", quantity: 2, unitPriceCents: 2800 },
      { id: "enc26-2", name: "LaVic Morango 1L", sku: "LAV-MOR-1L", quantity: 2, unitPriceCents: 2800 },
    ],
  },
];

export const salesPayments: SalesPayment[] = [
  { id: "pay-op-01", code: "PAY-0211", orderCode: "LAV-0187", customerName: "Cliente LaVic 01", createdAt: "2026-09-25T10:24:00-03:00", updatedAt: "2026-09-25T10:25:00-03:00", method: "pix", status: "pending", amountCents: 7600, attempts: 1, providerLabel: "PIX · demonstração", channel: "storefront", expiresAt: "2026-09-25T10:54:00-03:00" },
  { id: "pay-op-02", code: "PAY-0210", orderCode: "LAV-0186", customerName: "Cliente LaVic 02", createdAt: "2026-09-25T09:18:00-03:00", updatedAt: "2026-09-25T09:49:00-03:00", method: "pix", status: "expired", amountCents: 4200, attempts: 1, providerLabel: "PIX · demonstração", channel: "whatsapp", expiresAt: "2026-09-25T09:48:00-03:00" },
  { id: "pay-op-03", code: "PAY-0209", orderCode: "LAV-0185", customerName: "Cliente LaVic 03", createdAt: "2026-09-25T08:47:00-03:00", updatedAt: "2026-09-25T08:48:00-03:00", method: "credit_card", status: "failed", amountCents: 9800, attempts: 2, providerLabel: "Cartão · demonstração", channel: "storefront" },
  { id: "pay-op-04", code: "PAY-0208", orderCode: "LAV-0183", customerName: "Cliente LaVic 05", createdAt: "2026-09-25T14:32:00-03:00", updatedAt: "2026-09-25T14:34:00-03:00", method: "pix", status: "approved", amountCents: 8600, attempts: 1, providerLabel: "PIX · demonstração", channel: "storefront" },
  { id: "pay-op-05", code: "PAY-0207", orderCode: "LAV-0182", customerName: "Cliente LaVic 06", createdAt: "2026-09-25T13:10:00-03:00", updatedAt: "2026-09-25T13:11:00-03:00", method: "credit_card", status: "approved", amountCents: 7200, attempts: 1, providerLabel: "Cartão · demonstração", channel: "storefront" },
  { id: "pay-op-06", code: "PAY-0206", orderCode: "LAV-0175", customerName: "Cliente LaVic 13", createdAt: "2026-09-24T19:08:00-03:00", updatedAt: "2026-09-25T08:02:00-03:00", method: "manual", status: "refunded", amountCents: 5900, attempts: 1, providerLabel: "Registro manual", channel: "manual" },
];

export const catalogKits: CatalogKit[] = [
  {
    id: "kit-demo-01", name: "Kit Degustação", sku: "LAV-KIT-01", description: "Composição demonstrativa para testar venda combinada sem estoque independente.", priceCents: 5200, status: "active", channels: ["B2C"], demo: true,
    components: [
      { productId: "p1", productName: "LaVic Morango 1L", sku: "LAV-MOR-1L", quantity: 1, availableStock: 18 },
      { productId: "p2", productName: "LaVic Limão 1L", sku: "LAV-LIM-1L", quantity: 1, availableStock: 24 },
    ],
  },
  {
    id: "kit-demo-02", name: "Dupla Clássica", sku: "LAV-KIT-02", description: "Duas garrafas do mesmo sabor, criada apenas como exemplo de composição.", priceCents: 5000, status: "draft", channels: ["B2C"], demo: true,
    components: [{ productId: "p2", productName: "LaVic Limão 1L", sku: "LAV-LIM-1L", quantity: 2, availableStock: 24 }],
  },
  {
    id: "kit-demo-03", name: "Seleção LaVic", sku: "LAV-KIT-03", description: "Mix demonstrativo de três produtos para validar disponibilidade composta.", priceCents: 10400, status: "draft", channels: ["B2C", "B2B"], demo: true,
    components: [
      { productId: "p1", productName: "LaVic Morango 1L", sku: "LAV-MOR-1L", quantity: 1, availableStock: 18 },
      { productId: "p2", productName: "LaVic Limão 1L", sku: "LAV-LIM-1L", quantity: 1, availableStock: 24 },
      { productId: "p3", productName: "LaVic Espumante 750 ml", sku: "LAV-ESP-750", quantity: 1, availableStock: 7 },
    ],
  },
];

export const catalogCategories: CatalogCategory[] = [
  { id: "cat-kombucha", name: "Kombuchas", slug: "kombuchas", description: "Categoria principal para bebidas fermentadas da linha regular.", productCount: 2, sortOrder: 1, storefrontVisible: true, channels: ["B2C", "B2B"], status: "active" },
  { id: "cat-sparkling", name: "Espumantes", slug: "espumantes", description: "Linha especial com apresentação premium e regras próprias de disponibilidade.", productCount: 1, sortOrder: 2, storefrontVisible: true, channels: ["B2C", "B2B"], status: "active" },
  { id: "cat-kits", name: "Kits", slug: "kits", description: "Composições de produtos; disponibilidade deriva dos componentes.", productCount: 3, sortOrder: 3, storefrontVisible: true, channels: ["B2C"], status: "active", demo: true },
  { id: "cat-seasonal", name: "Edições sazonais", slug: "edicoes-sazonais", description: "Estrutura demonstrativa para futuras campanhas ou lotes especiais.", productCount: 0, sortOrder: 4, storefrontVisible: false, channels: ["B2C"], status: "draft", demo: true },
];

export const teamUsers: AdminTeamUser[] = [
  { id: "team-01", name: "Equipe LaVic", initials: "EL", email: "admin@lavic.example", roleId: "admin", roleName: "Administrador", status: "active", mfaEnabled: true, activeSessions: 1, createdAt: "2026-07-01T09:00:00-03:00", lastAccessAt: "2026-09-25T03:56:00-03:00" },
  { id: "team-02", name: "Gestão LaVic", initials: "GL", email: "gestao@lavic.example", roleId: "manager", roleName: "Gerente", status: "active", mfaEnabled: true, activeSessions: 2, createdAt: "2026-07-05T10:20:00-03:00", lastAccessAt: "2026-09-25T03:42:00-03:00" },
  { id: "team-03", name: "Operação LaVic", initials: "OL", email: "operacao@lavic.example", roleId: "operations", roleName: "Operação", status: "active", mfaEnabled: true, activeSessions: 1, createdAt: "2026-08-03T08:30:00-03:00", lastAccessAt: "2026-09-25T03:18:00-03:00" },
  { id: "team-04", name: "Comercial LaVic", initials: "CL", email: "comercial@lavic.example", roleId: "commercial", roleName: "Comercial", status: "active", mfaEnabled: false, activeSessions: 1, createdAt: "2026-08-10T13:15:00-03:00", lastAccessAt: "2026-09-24T18:52:00-03:00" },
  { id: "team-05", name: "Marketing LaVic", initials: "ML", email: "marketing@lavic.example", roleId: "marketing", roleName: "Marketing", status: "active", mfaEnabled: true, activeSessions: 1, createdAt: "2026-08-18T11:10:00-03:00", lastAccessAt: "2026-09-24T17:31:00-03:00" },
  { id: "team-06", name: "Financeiro LaVic", initials: "FL", email: "financeiro@lavic.example", roleId: "finance", roleName: "Financeiro", status: "invited", mfaEnabled: false, activeSessions: 0, createdAt: "2026-09-24T15:00:00-03:00" },
];

const adminPermissionSet: Permission[] = [
  "dashboard.read", "orders.read", "orders.write", "preorders.read", "preorders.write", "payments.read", "payments.write", "products.read", "products.write", "kits.read", "kits.write", "categories.read", "categories.write", "inventory.read", "inventory.write", "inventory.adjust", "inventory.lots.write", "customers.read", "customers.write", "b2b.read", "b2b.write", "b2b.orders.write", "b2b.pricing.read", "b2b.pricing.write", "marketing.read", "marketing.write", "content.read", "content.write", "finance.read", "finance.write", "reports.read", "reports.export", "team.read", "team.write", "roles.read", "roles.manage", "sessions.read", "sessions.revoke", "audit.read", "settings.read", "settings.write", "security.read", "security.write",
];

export const adminRoles: AdminRole[] = [
  { id: "admin", name: "Administrador", description: "Acesso integral à operação, governança e segurança.", userCount: 1, system: true, tone: "green", permissions: adminPermissionSet },
  { id: "manager", name: "Gerente", description: "Opera vendas, catálogo, estoque, clientes e análises sem administrar segurança.", userCount: 1, system: true, tone: "green", permissions: ["dashboard.read", "orders.read", "orders.write", "preorders.read", "preorders.write", "payments.read", "payments.write", "products.read", "products.write", "kits.read", "kits.write", "categories.read", "categories.write", "inventory.read", "inventory.write", "inventory.adjust", "inventory.lots.write", "customers.read", "customers.write", "b2b.read", "b2b.write", "b2b.orders.write", "b2b.pricing.read", "marketing.read", "content.read", "finance.read", "reports.read", "reports.export", "team.read"] },
  { id: "operations", name: "Operação", description: "Foco em pedidos, separação, estoque, lotes e inventário.", userCount: 1, system: true, tone: "orange", permissions: ["dashboard.read", "orders.read", "orders.write", "preorders.read", "preorders.write", "payments.read", "products.read", "kits.read", "categories.read", "inventory.read", "inventory.write", "inventory.adjust", "inventory.lots.write", "customers.read"] },
  { id: "commercial", name: "Comercial", description: "Relacionamento com clientes, CRM, revenda e pedidos B2B.", userCount: 1, system: true, tone: "orange", permissions: ["dashboard.read", "orders.read", "preorders.read", "payments.read", "products.read", "kits.read", "categories.read", "customers.read", "customers.write", "b2b.read", "b2b.write", "b2b.orders.write", "b2b.pricing.read", "reports.read"] },
  { id: "marketing", name: "Marketing", description: "Campanhas, cupons e conteúdo do storefront com leitura comercial.", userCount: 1, system: true, tone: "neutral", permissions: ["dashboard.read", "products.read", "kits.read", "categories.read", "customers.read", "marketing.read", "marketing.write", "content.read", "content.write", "reports.read", "reports.export"] },
  { id: "finance", name: "Financeiro", description: "Recebimentos, conciliação, reembolsos e relatórios financeiros.", userCount: 1, system: true, tone: "neutral", permissions: ["dashboard.read", "orders.read", "payments.read", "customers.read", "b2b.read", "finance.read", "finance.write", "reports.read", "reports.export"] },
];

export const permissionCatalog: PermissionCatalogGroup[] = [
  { group: "Operação", items: [
    { key: "dashboard.read", label: "Ver dashboard", description: "Acessar indicadores e pendências." },
    { key: "orders.read", label: "Ver pedidos", description: "Consultar pedidos B2C." },
    { key: "orders.write", label: "Operar pedidos", description: "Editar dados e status permitidos." },
    { key: "preorders.read", label: "Ver encomendas", description: "Consultar encomendas programadas e histórico." },
    { key: "preorders.write", label: "Operar encomendas", description: "Confirmar, programar e atualizar encomendas." },
    { key: "payments.read", label: "Ver pagamentos", description: "Acompanhar situação operacional dos pagamentos." },
    { key: "payments.write", label: "Operar pagamentos", description: "Executar ações permitidas sobre tentativas de pagamento." },
    { key: "products.read", label: "Ver produtos", description: "Consultar catálogo e variações." },
    { key: "products.write", label: "Editar produtos", description: "Alterar catálogo e disponibilidade." },
    { key: "kits.read", label: "Ver kits", description: "Consultar composições e disponibilidade derivada." },
    { key: "kits.write", label: "Editar kits", description: "Criar e alterar composições autorizadas." },
    { key: "categories.read", label: "Ver categorias", description: "Consultar organização comercial do catálogo." },
    { key: "categories.write", label: "Editar categorias", description: "Alterar ordem, visibilidade e estrutura das categorias." },
  ]},
  { group: "Estoque e clientes", items: [
    { key: "inventory.read", label: "Ver estoque", description: "Consultar saldos, lotes e alertas." },
    { key: "inventory.adjust", label: "Ajustar estoque", description: "Registrar divergências e ajustes autorizados." },
    { key: "customers.read", label: "Ver clientes", description: "Consultar CRM e histórico." },
    { key: "customers.write", label: "Editar CRM", description: "Registrar notas e atualizar dados permitidos." },
  ]},
  { group: "Comercial e crescimento", items: [
    { key: "b2b.read", label: "Ver B2B", description: "Consultar leads, clientes e pedidos comerciais." },
    { key: "b2b.write", label: "Operar pipeline B2B", description: "Atualizar oportunidades e relacionamento." },
    { key: "b2b.pricing.read", label: "Ver tabelas comerciais", description: "Consultar condições de revenda." },
    { key: "marketing.write", label: "Gerir marketing", description: "Criar e editar campanhas e cupons." },
    { key: "content.write", label: "Gerir loja", description: "Editar conteúdo publicado do storefront." },
  ]},
  { group: "Financeiro e dados", items: [
    { key: "finance.read", label: "Ver financeiro", description: "Consultar recebimentos e conciliações." },
    { key: "finance.write", label: "Operar financeiro", description: "Executar ações financeiras autorizadas." },
    { key: "reports.read", label: "Ver relatórios", description: "Consultar análises consolidadas." },
    { key: "reports.export", label: "Exportar relatórios", description: "Gerar arquivos a partir das análises." },
  ]},
  { group: "Governança", items: [
    { key: "team.read", label: "Ver equipe", description: "Consultar usuários e perfis." },
    { key: "team.write", label: "Gerir usuários", description: "Convidar, alterar ou desativar acessos." },
    { key: "roles.manage", label: "Gerir permissões", description: "Alterar perfis e matriz RBAC." },
    { key: "sessions.revoke", label: "Revogar sessões", description: "Encerrar sessões administrativas." },
    { key: "audit.read", label: "Ver auditoria", description: "Consultar eventos de segurança e operação." },
    { key: "security.write", label: "Gerir segurança", description: "Alterar políticas administrativas." },
  ]},
];

export const adminSessions: AdminSession[] = [
  { id: "session-01", userId: "team-01", userName: "Equipe LaVic", userEmail: "admin@lavic.example", device: "Desktop Windows", browser: "Chrome", locationLabel: "Volta Redonda, RJ", createdAt: "2026-09-25T02:58:00-03:00", lastSeenAt: "2026-09-25T04:06:00-03:00", current: true, status: "active" },
  { id: "session-02", userId: "team-02", userName: "Gestão LaVic", userEmail: "gestao@lavic.example", device: "Notebook Windows", browser: "Edge", locationLabel: "Volta Redonda, RJ", createdAt: "2026-09-25T01:40:00-03:00", lastSeenAt: "2026-09-25T03:42:00-03:00", current: false, status: "active" },
  { id: "session-03", userId: "team-02", userName: "Gestão LaVic", userEmail: "gestao@lavic.example", device: "Smartphone", browser: "Chrome Mobile", locationLabel: "Volta Redonda, RJ", createdAt: "2026-09-24T18:20:00-03:00", lastSeenAt: "2026-09-24T22:15:00-03:00", current: false, status: "active" },
  { id: "session-04", userId: "team-03", userName: "Operação LaVic", userEmail: "operacao@lavic.example", device: "Desktop operação", browser: "Chrome", locationLabel: "Volta Redonda, RJ", createdAt: "2026-09-25T02:10:00-03:00", lastSeenAt: "2026-09-25T03:18:00-03:00", current: false, status: "active" },
  { id: "session-05", userId: "team-04", userName: "Comercial LaVic", userEmail: "comercial@lavic.example", device: "Notebook comercial", browser: "Chrome", locationLabel: "Volta Redonda, RJ", createdAt: "2026-09-24T15:20:00-03:00", lastSeenAt: "2026-09-24T18:52:00-03:00", current: false, status: "active" },
  { id: "session-06", userId: "team-05", userName: "Marketing LaVic", userEmail: "marketing@lavic.example", device: "MacBook", browser: "Safari", locationLabel: "Volta Redonda, RJ", createdAt: "2026-09-24T14:08:00-03:00", lastSeenAt: "2026-09-24T17:31:00-03:00", current: false, status: "active" },
  { id: "session-07", userId: "team-03", userName: "Operação LaVic", userEmail: "operacao@lavic.example", device: "Desktop antigo", browser: "Chrome", locationLabel: "Volta Redonda, RJ", createdAt: "2026-09-23T09:10:00-03:00", lastSeenAt: "2026-09-23T17:20:00-03:00", current: false, status: "expired" },
  { id: "session-08", userId: "team-04", userName: "Comercial LaVic", userEmail: "comercial@lavic.example", device: "Smartphone anterior", browser: "Chrome Mobile", locationLabel: "Volta Redonda, RJ", createdAt: "2026-09-20T10:00:00-03:00", lastSeenAt: "2026-09-20T12:45:00-03:00", current: false, status: "revoked" },
];

export const auditEvents: AdminAuditEvent[] = [
  { id: "AUD-0098", createdAt: "2026-09-25T04:03:00-03:00", actor: "Equipe LaVic", actorRole: "Administrador", category: "security", action: "security.policy.view", target: "Segurança administrativa", summary: "Políticas de segurança foram consultadas no painel.", severity: "info", sourceLabel: "Painel administrativo", ipMasked: "192.0.2.xxx", changes: [] },
  { id: "AUD-0097", createdAt: "2026-09-25T03:51:00-03:00", actor: "Gestão LaVic", actorRole: "Gerente", category: "orders", action: "order.status.update", target: "LAV-0183", summary: "Pedido avançou de novo para confirmado.", severity: "info", sourceLabel: "Pedidos", ipMasked: "198.51.100.xxx", changes: [{ field: "status", before: "new", after: "confirmed" }] },
  { id: "AUD-0096", createdAt: "2026-09-25T03:22:00-03:00", actor: "Operação LaVic", actorRole: "Operação", category: "inventory", action: "inventory.adjustment.review", target: "Lote E260920", summary: "Divergência de inventário foi revisada antes do ajuste.", severity: "attention", sourceLabel: "Inventário", ipMasked: "203.0.113.xxx", changes: [{ field: "divergência", before: "-2", after: "revisada" }] },
  { id: "AUD-0095", createdAt: "2026-09-24T19:14:00-03:00", actor: "Marketing LaVic", actorRole: "Marketing", category: "marketing", action: "campaign.draft.update", target: "Campanha Primavera", summary: "Conteúdo de campanha em rascunho foi atualizado.", severity: "info", sourceLabel: "Marketing", ipMasked: "192.0.2.xxx", changes: [{ field: "status", before: "draft", after: "draft" }] },
  { id: "AUD-0094", createdAt: "2026-09-24T18:58:00-03:00", actor: "Comercial LaVic", actorRole: "Comercial", category: "b2b", action: "lead.stage.update", target: "B2B-004", summary: "Oportunidade comercial avançou no pipeline.", severity: "info", sourceLabel: "Revenda", ipMasked: "198.51.100.xxx", changes: [{ field: "stage", before: "contact", after: "qualified" }] },
  { id: "AUD-0093", createdAt: "2026-09-24T18:44:00-03:00", actor: "Equipe LaVic", actorRole: "Administrador", category: "team", action: "team.invitation.create", target: "financeiro@lavic.example", summary: "Convite demonstrativo de acesso foi registrado.", severity: "attention", sourceLabel: "Equipe", ipMasked: "192.0.2.xxx", changes: [{ field: "status", before: "none", after: "invited" }, { field: "role", before: "none", after: "Financeiro" }] },
  { id: "AUD-0092", createdAt: "2026-09-24T17:09:00-03:00", actor: "Gestão LaVic", actorRole: "Gerente", category: "products", action: "product.price.review", target: "LAV-LIM-1L", summary: "Preço foi aberto para revisão; nenhuma alteração persistida.", severity: "attention", sourceLabel: "Produtos", ipMasked: "198.51.100.xxx", changes: [] },
  { id: "AUD-0091", createdAt: "2026-09-24T16:35:00-03:00", actor: "Equipe LaVic", actorRole: "Administrador", category: "auth", action: "auth.session.revoke", target: "session-08", summary: "Sessão anterior foi marcada como revogada no histórico demonstrativo.", severity: "critical", sourceLabel: "Sessões", ipMasked: "192.0.2.xxx", changes: [{ field: "status", before: "active", after: "revoked" }] },
  { id: "AUD-0090", createdAt: "2026-09-24T15:26:00-03:00", actor: "Gestão LaVic", actorRole: "Gerente", category: "customers", action: "customer.note.create", target: "CLI-0007", summary: "Nota interna foi registrada no CRM.", severity: "info", sourceLabel: "Clientes", ipMasked: "198.51.100.xxx", changes: [] },
  { id: "AUD-0089", createdAt: "2026-09-24T14:02:00-03:00", actor: "Equipe LaVic", actorRole: "Administrador", category: "finance", action: "refund.review", target: "REF-0002", summary: "Solicitação de reembolso foi revisada antes de qualquer execução financeira.", severity: "critical", sourceLabel: "Financeiro", ipMasked: "192.0.2.xxx", changes: [] },
];

export const securityPolicies: SecurityPolicy[] = [
  { id: "sec-01", title: "MFA para administradores", description: "Exigir segundo fator para perfis com acesso de governança.", label: "Escopo", value: "Administrador", enabled: true, tone: "green", icon: "shield" },
  { id: "sec-02", title: "Bloqueio após tentativas", description: "Reduzir força bruta com bloqueio temporário e rate limit.", label: "Tentativas", value: "5", enabled: true, tone: "orange", icon: "lock" },
  { id: "sec-03", title: "Expiração por inatividade", description: "Encerrar sessões administrativas sem atividade prolongada.", label: "Tempo", value: "60 min", enabled: true, tone: "green", icon: "clock" },
  { id: "sec-04", title: "Sessões simultâneas", description: "Limitar a quantidade de sessões ativas por identidade.", label: "Máximo", value: "3", enabled: true, tone: "neutral", icon: "activity" },
  { id: "sec-05", title: "Senha mínima", description: "Política-base para credenciais locais, caso esse método seja utilizado.", label: "Comprimento", value: "12 caracteres", enabled: true, tone: "neutral", icon: "key" },
  { id: "sec-06", title: "Alertas de novo acesso", description: "Notificar eventos de autenticação em dispositivo não reconhecido.", label: "Notificação", value: "Ativa", enabled: true, tone: "orange", icon: "activity" },
];

export const securityPosture: SecurityPosture[] = [
  { id: "posture-01", title: "Cookie HttpOnly + Secure", description: "Tokens de sessão nunca devem ficar disponíveis em localStorage ou no bundle do frontend.", status: "required" },
  { id: "posture-02", title: "Autorização RBAC na API", description: "Toda leitura ou mutação protegida será revalidada no servidor, independentemente da interface.", status: "required" },
  { id: "posture-03", title: "Proteção CSRF", description: "Ações mutáveis baseadas em cookie deverão usar estratégia CSRF compatível com a arquitetura final.", status: "backend" },
  { id: "posture-04", title: "Rate limiting e lockout", description: "Login, recuperação de acesso e endpoints sensíveis precisam de proteção contra abuso.", status: "backend" },
  { id: "posture-05", title: "Hash de senha moderno", description: "Se credenciais locais forem adotadas, o servidor usará algoritmo apropriado e parâmetros revisados.", status: "backend" },
  { id: "posture-06", title: "Auditoria append-only", description: "Eventos sensíveis serão gravados no backend e não poderão ser alterados pela interface administrativa.", status: "required" },
  { id: "posture-07", title: "Segredos somente no servidor", description: "Chaves privadas, tokens e credenciais de integração não entram em NEXT_PUBLIC nem em mocks.", status: "required" },
];

