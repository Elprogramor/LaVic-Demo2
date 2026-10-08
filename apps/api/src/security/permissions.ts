import type { Permission } from "@lavic/domain";

export const rolePermissions: Record<string, Permission[]> = {
  OWNER: ["orders.read", "orders.write", "customers.read", "customers.export", "catalog.read", "catalog.write", "crm.read", "crm.write", "finance.read", "users.manage", "settings.manage"],
  MANAGER: ["orders.read", "orders.write", "customers.read", "catalog.read", "catalog.write", "crm.read", "crm.write"],
  SALES: ["orders.read", "customers.read", "crm.read", "crm.write"]
};
