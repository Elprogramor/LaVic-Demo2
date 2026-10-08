export type OrderStatus = "new" | "confirmed" | "separating" | "ready" | "shipped" | "delivered" | "cancelled";
export type PaymentStatus = "approved" | "pending" | "refunded";
export type SalesChannel = "storefront" | "whatsapp" | "b2b" | "manual";
export type DeliveryMode = "delivery" | "pickup";

export type AdminOrderItem = {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  unitPriceCents: number;
};

export type AdminOrder = {
  id: string;
  code: string;
  customerName: string;
  createdAt: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  channel: SalesChannel;
  deliveryMode: DeliveryMode;
  totalCents: number;
  subtotalCents: number;
  shippingCents: number;
  discountCents: number;
  itemCount: number;
  address?: string;
  notes?: string;
  items: AdminOrderItem[];
};

export type ProductStatus = "active" | "draft" | "inactive";

export type AdminProduct = {
  id: string;
  name: string;
  sku: string;
  category: string;
  variants: number;
  priceCents: number;
  stock: number;
  minimumStock: number;
  channels: Array<"B2C" | "B2B">;
  status: ProductStatus;
  demo?: boolean;
};

export type DashboardAlert = {
  id: string;
  label: string;
  count: number;
  tone: "brand" | "warning" | "danger" | "neutral";
};

export type InventoryHealth = "healthy" | "attention" | "critical" | "out";
export type InventoryLotStatus = "available" | "attention" | "blocked" | "expired";
export type InventoryMovementType = "production" | "sale" | "damage" | "sample" | "adjustment" | "release";
export type InventoryAlertSeverity = "info" | "warning" | "critical";
export type InventoryAlertKind = "low_stock" | "expiry" | "expired" | "divergence" | "blocked";

export type InventoryStockItem = {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  available: number;
  reserved: number;
  minimumStock: number;
  health: InventoryHealth;
  activeLots: number;
  nearestExpiry?: string;
};

export type InventoryLot = {
  id: string;
  code: string;
  productId: string;
  productName: string;
  sku: string;
  producedAt: string;
  expiresAt: string;
  available: number;
  reserved: number;
  status: InventoryLotStatus;
  location: string;
};

export type InventoryMovement = {
  id: string;
  createdAt: string;
  type: InventoryMovementType;
  productId: string;
  productName: string;
  sku: string;
  lotCode: string;
  quantity: number;
  direction: "in" | "out";
  reason: string;
  actor: string;
  reference?: string;
};

export type InventoryAlert = {
  id: string;
  kind: InventoryAlertKind;
  severity: InventoryAlertSeverity;
  title: string;
  description: string;
  createdAt: string;
  productName: string;
  lotCode?: string;
  href: string;
};

export type InventoryCountRow = {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  lotCode: string;
  expected: number;
  counted?: number;
  location: string;
};


export type CustomerStatus = "active" | "inactive";
export type CustomerOrigin = "storefront" | "whatsapp" | "event" | "manual";
export type CustomerSegmentKey = "new" | "recurrent" | "vip" | "at_risk" | "inactive" | "b2b_potential";
export type CustomerInteractionType = "order" | "message" | "coupon" | "note" | "profile";

export type CustomerAddress = {
  id: string;
  label: string;
  address: string;
  city: string;
  state: string;
  primary?: boolean;
};

export type AdminCustomer = {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  origin: CustomerOrigin;
  createdAt: string;
  lastOrderAt?: string;
  orderCount: number;
  totalSpentCents: number;
  averageTicketCents: number;
  status: CustomerStatus;
  segments: CustomerSegmentKey[];
  favoriteProduct?: string;
  acceptsWhatsapp: boolean;
  acceptsEmail: boolean;
  addresses: CustomerAddress[];
};

export type CustomerInteraction = {
  id: string;
  customerId: string;
  createdAt: string;
  type: CustomerInteractionType;
  title: string;
  description: string;
  actor: string;
  reference?: string;
  private?: boolean;
};

export type CustomerSegmentDefinition = {
  key: CustomerSegmentKey;
  label: string;
  description: string;
  rule: string;
  count: number;
  tone: "green" | "orange" | "neutral" | "danger";
};


export type B2BLeadStage = "new" | "contact" | "qualified" | "proposal" | "negotiation" | "won" | "lost";
export type B2BClientStatus = "active" | "paused" | "inactive";
export type B2BOrderStatus = "draft" | "awaiting_approval" | "confirmed" | "separating" | "ready" | "invoiced" | "delivered" | "cancelled";
export type B2BActivityType = "created" | "contact" | "note" | "proposal" | "stage" | "order";

export type B2BLead = {
  id: string;
  code: string;
  company: string;
  contactName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  businessType: string;
  stage: B2BLeadStage;
  estimatedMonthlyUnits: number;
  potentialCents: number;
  interestedProducts: string[];
  source: string;
  owner: string;
  createdAt: string;
  lastContactAt?: string;
  nextActionAt?: string;
  notes?: string;
  customerId?: string;
};

export type B2BActivity = {
  id: string;
  leadId: string;
  createdAt: string;
  type: B2BActivityType;
  title: string;
  description: string;
  actor: string;
};

export type B2BClient = {
  id: string;
  code: string;
  company: string;
  contactName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  documentMasked: string;
  priceTableId: string;
  minimumOrderCents: number;
  paymentTerms: string;
  allowedProducts: string[];
  orderCount: number;
  revenueCents: number;
  lastOrderAt?: string;
  status: B2BClientStatus;
  createdAt: string;
};

export type B2BOrderItem = {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  unitPriceCents: number;
};

export type B2BOrder = {
  id: string;
  code: string;
  clientId: string;
  company: string;
  createdAt: string;
  status: B2BOrderStatus;
  paymentTerms: string;
  totalCents: number;
  itemCount: number;
  deliveryCity: string;
  items: B2BOrderItem[];
};

export type B2BPriceTableEntry = {
  productId: string;
  productName: string;
  sku: string;
  retailPriceCents: number;
  b2bPriceCents: number;
};

export type B2BPriceTable = {
  id: string;
  name: string;
  description: string;
  minimumOrderCents: number;
  paymentTerms: string;
  clientCount: number;
  status: "active" | "inactive";
  entries: B2BPriceTableEntry[];
};



export type MarketingStatus = "active" | "scheduled" | "draft" | "expired" | "paused";
export type CouponKind = "percentage" | "fixed" | "shipping";
export type PromotionKind = "price" | "quantity" | "bundle" | "shipping";
export type MarketingChannel = "storefront" | "whatsapp" | "instagram" | "email" | "b2b";

export type MarketingCoupon = {
  id: string;
  code: string;
  name: string;
  kind: CouponKind;
  value: number;
  status: MarketingStatus;
  startsAt: string;
  endsAt?: string;
  minimumOrderCents?: number;
  usageCount: number;
  usageLimit?: number;
  perCustomerLimit?: number;
  revenueCents: number;
  channels: Array<"B2C" | "B2B">;
};

export type MarketingPromotion = {
  id: string;
  name: string;
  kind: PromotionKind;
  status: MarketingStatus;
  summary: string;
  scope: string;
  startsAt: string;
  endsAt?: string;
  redemptions: number;
  revenueCents: number;
};

export type MarketingCampaign = {
  id: string;
  name: string;
  status: MarketingStatus;
  channel: MarketingChannel;
  startsAt: string;
  endsAt?: string;
  couponCode?: string;
  visits: number;
  orders: number;
  revenueCents: number;
  conversionRate: number;
};

export type StorePublishStatus = "published" | "draft" | "scheduled" | "hidden";
export type StoreSectionType = "hero" | "highlights" | "kits" | "flavors" | "b2b" | "cta";

export type StoreSection = {
  id: string;
  label: string;
  type: StoreSectionType;
  status: StorePublishStatus;
  position: number;
  updatedAt: string;
  note: string;
};

export type StoreBanner = {
  id: string;
  name: string;
  placement: "hero" | "campaign" | "b2b";
  status: StorePublishStatus;
  headline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  desktopAsset: string;
  mobileAsset: string;
  startsAt?: string;
  endsAt?: string;
  updatedAt: string;
};

export type StoreFlavor = {
  id: string;
  name: string;
  slug: string;
  status: StorePublishStatus;
  productId?: string;
  featured: boolean;
  demo?: boolean;
  description: string;
};

export type StoreContentBlock = {
  id: string;
  label: string;
  route: string;
  status: StorePublishStatus;
  owner: string;
  updatedAt: string;
  summary: string;
};

export type StoreSeoPage = {
  id: string;
  route: string;
  title: string;
  description: string;
  indexable: boolean;
  status: "healthy" | "attention" | "draft";
};


export type FinanceMethod = "pix" | "credit_card" | "cash" | "manual";
export type FinanceTransactionStatus = "approved" | "pending" | "refunded" | "cancelled";
export type FinanceRefundStatus = "requested" | "processing" | "completed" | "rejected";
export type ReconciliationStatus = "matched" | "difference" | "review";

export type FinanceTransaction = {
  id: string;
  code: string;
  orderCode: string;
  customer: string;
  createdAt: string;
  method: FinanceMethod;
  grossCents: number;
  discountCents: number;
  shippingCents: number;
  netCents: number;
  status: FinanceTransactionStatus;
  channel: SalesChannel;
  settlementAt?: string;
};

export type FinanceRefund = {
  id: string;
  code: string;
  orderCode: string;
  customer: string;
  createdAt: string;
  amountCents: number;
  reason: string;
  actor: string;
  status: FinanceRefundStatus;
};

export type FinanceReconciliation = {
  id: string;
  date: string;
  provider: string;
  orders: number;
  expectedCents: number;
  settledCents: number;
  differenceCents: number;
  status: ReconciliationStatus;
};

export type FinanceDailyRevenue = {
  date: string;
  grossCents: number;
  discountCents: number;
  shippingCents: number;
  netCents: number;
  orders: number;
};

export type ReportKind = "sales" | "products" | "customers" | "inventory" | "marketing" | "b2b" | "channels";
export type ReportTone = "green" | "orange" | "neutral";
export type ReportIconName = "chart" | "box" | "users" | "boxes" | "megaphone" | "handshake" | "orders";

export type AdminReportMetric = {
  label: string;
  value: string;
  detail: string;
  tone: ReportTone;
};

export type AdminReportDefinition = {
  key: ReportKind;
  title: string;
  description: string;
  icon: ReportIconName;
  tone: ReportTone;
  period: string;
  updatedAt: string;
  metrics: AdminReportMetric[];
  insights: string[];
  columns: string[];
  rows: Array<{ id: string; cells: string[] }>;
};



export type PreorderStatus = "requested" | "awaiting_confirmation" | "confirmed" | "scheduled" | "preparing" | "ready" | "completed" | "cancelled";
export type PreorderPaymentStatus = "pending" | "partial" | "paid" | "refunded";
export type SalesPaymentStatus = "approved" | "pending" | "failed" | "expired" | "refunded";
export type CatalogKitStatus = "active" | "draft" | "inactive";
export type CatalogCategoryStatus = "active" | "hidden" | "draft";

export type PreorderItem = {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  unitPriceCents: number;
};

export type AdminPreorder = {
  id: string;
  code: string;
  customerName: string;
  customerId?: string;
  createdAt: string;
  scheduledFor: string;
  status: PreorderStatus;
  paymentStatus: PreorderPaymentStatus;
  paymentMethod: string;
  channel: "whatsapp" | "manual" | "storefront";
  deliveryMode: DeliveryMode;
  itemCount: number;
  totalCents: number;
  depositCents: number;
  assignedTo: string;
  notes?: string;
  items: PreorderItem[];
};

export type SalesPayment = {
  id: string;
  code: string;
  orderCode: string;
  customerName: string;
  createdAt: string;
  updatedAt: string;
  method: FinanceMethod;
  status: SalesPaymentStatus;
  amountCents: number;
  attempts: number;
  providerLabel: string;
  channel: SalesChannel;
  expiresAt?: string;
};

export type CatalogKitComponent = {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  availableStock: number;
};

export type CatalogKit = {
  id: string;
  name: string;
  sku: string;
  description: string;
  priceCents: number;
  status: CatalogKitStatus;
  channels: Array<"B2C" | "B2B">;
  demo: boolean;
  components: CatalogKitComponent[];
};

export type CatalogCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  sortOrder: number;
  storefrontVisible: boolean;
  channels: Array<"B2C" | "B2B">;
  status: CatalogCategoryStatus;
  demo?: boolean;
};

export type AdminUserStatus = "active" | "invited" | "disabled";
export type AdminSessionStatus = "active" | "revoked" | "expired";
export type AdminAuditSeverity = "info" | "attention" | "critical";
export type AdminAuditCategory = "auth" | "orders" | "inventory" | "products" | "customers" | "b2b" | "marketing" | "finance" | "team" | "security";

export type AdminTeamUser = {
  id: string;
  name: string;
  initials: string;
  email: string;
  roleId: string;
  roleName: string;
  status: AdminUserStatus;
  mfaEnabled: boolean;
  activeSessions: number;
  createdAt: string;
  lastAccessAt?: string;
};

export type AdminRole = {
  id: string;
  name: string;
  description: string;
  userCount: number;
  system: boolean;
  tone: "green" | "orange" | "neutral";
  permissions: Permission[];
};

export type PermissionCatalogGroup = {
  group: string;
  items: Array<{ key: Permission; label: string; description: string }>;
};

export type AdminSession = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  device: string;
  browser: string;
  locationLabel: string;
  createdAt: string;
  lastSeenAt: string;
  current: boolean;
  status: AdminSessionStatus;
};

export type AdminAuditChange = { field: string; before: string; after: string };
export type AdminAuditEvent = {
  id: string;
  createdAt: string;
  actor: string;
  actorRole: string;
  category: AdminAuditCategory;
  action: string;
  target: string;
  summary: string;
  severity: AdminAuditSeverity;
  sourceLabel: string;
  ipMasked: string;
  changes: AdminAuditChange[];
};

export type SecurityPolicy = {
  id: string;
  title: string;
  description: string;
  label: string;
  value: string;
  enabled: boolean;
  tone: "green" | "orange" | "neutral";
  icon: "shield" | "lock" | "clock" | "key" | "activity";
};

export type SecurityPosture = {
  id: string;
  title: string;
  description: string;
  status: "required" | "backend";
};

export type Permission =
  | "dashboard.read"
  | "orders.read"
  | "orders.write"
  | "products.read"
  | "products.write"
  | "inventory.read"
  | "inventory.write"
  | "inventory.adjust"
  | "inventory.lots.write"
  | "customers.read"
  | "customers.write"
  | "b2b.read"
  | "b2b.write"
  | "b2b.orders.write"
  | "b2b.pricing.read"
  | "b2b.pricing.write"
  | "marketing.read"
  | "marketing.write"
  | "content.read"
  | "content.write"
  | "finance.read"
  | "finance.write"
  | "reports.read"
  | "reports.export"
  | "preorders.read"
  | "preorders.write"
  | "payments.read"
  | "payments.write"
  | "kits.read"
  | "kits.write"
  | "categories.read"
  | "categories.write"
  | "team.read"
  | "team.write"
  | "roles.read"
  | "roles.manage"
  | "sessions.read"
  | "sessions.revoke"
  | "audit.read"
  | "settings.read"
  | "settings.write"
  | "security.read"
  | "security.write";
