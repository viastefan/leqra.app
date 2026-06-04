export type SourceStatus =
  | "connected"
  | "not_connected"
  | "needs_update"
  | "error";

export type ReadinessStatus =
  | "Neu"
  | "Indexiert"
  | "Kontext fehlt"
  | "Duplikat"
  | "Veraltet"
  | "Prüfung"
  | "Bereit"
  | "Unvollständig"
  | "Dokumentiert"
  | "KI-ready";

export type Accent = "mono" | "mint" | "violet" | "blue" | "amber";

export type SymbolVariant =
  | "cell"
  | "cluster"
  | "map"
  | "signal"
  | "artifact"
  | "orbit"
  | "grid"
  | "pixel";

export type SymbolColor =
  | "mint"
  | "violet"
  | "blue"
  | "amber"
  | "rose"
  | "mono"
  | "cyan";

export type Source = {
  id: string;
  name: string;
  type: string;
  status: SourceStatus;
  imported: number;
  lastSync: string;
  description: string;
};

export type Signal = {
  id: string;
  title: string;
  detail: string;
  status: "Hinweis" | "Bereit" | "Prüfen" | "Kritisch";
};

export type KnowledgeArea = {
  id: string;
  name: string;
  type: string;
  sources: number;
  quality: number;
  freshness: string;
  readiness: number;
  gaps: string[];
  relations: string[];
};

export type DocumentItem = {
  id: string;
  title: string;
  source: string;
  type: string;
  status: ReadinessStatus;
  quality: number;
  updatedAt: string;
};

export type ProcessItem = {
  id: string;
  name: string;
  description: string;
  sources: number;
  status: ReadinessStatus;
  steps: string[];
  gaps: string[];
  roles: string[];
};

export type AssistantContext = {
  id: string;
  name: string;
  description: string;
  areas: string[];
  status: "Entwurf" | "Prüfung" | "Freigegeben";
  quality: number;
  sources: number;
  updatedAt: string;
};
