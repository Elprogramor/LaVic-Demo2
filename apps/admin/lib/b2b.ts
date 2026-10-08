import type { B2BClientStatus, B2BLeadStage, B2BOrderStatus } from "./types";

export const b2bPipelineStages: B2BLeadStage[] = ["new", "contact", "qualified", "proposal", "negotiation", "won"];

export const b2bStageLabels: Record<B2BLeadStage, string> = {
  new: "Novo lead",
  contact: "Em contato",
  qualified: "Qualificado",
  proposal: "Proposta",
  negotiation: "Negociação",
  won: "Cliente",
  lost: "Encerrado",
};

export const b2bClientStatusLabels: Record<B2BClientStatus, string> = {
  active: "Ativo",
  paused: "Pausado",
  inactive: "Inativo",
};

export const b2bOrderStatusLabels: Record<B2BOrderStatus, string> = {
  draft: "Rascunho",
  awaiting_approval: "Aguardando aprovação",
  confirmed: "Confirmado",
  separating: "Separação",
  ready: "Pronto",
  invoiced: "Faturado",
  delivered: "Entregue",
  cancelled: "Cancelado",
};
