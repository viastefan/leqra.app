import { knowledgeAreas, sources } from "@/lib/mock-data";

export function mockImport(sourceName: string, sourceType: string) {
  return {
    sourceName,
    sourceType,
    importedCount: 128,
    duplicates: 24,
    detectedProcesses: 12,
    faqCandidates: 43,
    contextGaps: 7,
    steps: [
      "Dokumente werden gelesen",
      "Duplikate werden erkannt",
      "Begriffe werden vereinheitlicht",
      "Kontext wird aufgebaut",
    ],
  };
}

export function mockAnalyze(text: string, selectedSources: string[]) {
  const normalized = text.trim();
  return {
    summary:
      normalized.length > 0
        ? `Leqra kann daraus eine erste Struktur mit ${selectedSources.length || 4} relevanten Quellen aufbauen.`
        : "Leqra startet mit einem kontrollierten Datenumfang und erkennt zuerst Quellen, Begriffe und Kontextlücken.",
    recommendedSources: sources
      .filter((source) =>
        selectedSources.length === 0 ? source.status !== "error" : selectedSources.includes(source.id),
      )
      .slice(0, 5)
      .map((source) => source.name),
    knowledgeAreas: knowledgeAreas.slice(0, 4).map((area) => area.name),
    contextGaps: [
      "Preisinformationen widersprechen sich in 2 Quellen",
      "FAQ-Antworten sind mehrfach vorhanden",
      "Angebotsprozess ist nicht vollständig dokumentiert",
    ],
    nextSteps: [
      "Google Drive und Website als erste Quellen prüfen",
      "Support-Antworten deduplizieren",
      "Angebotsprozess für Assistant Context vorbereiten",
    ],
  };
}

export function mockSearch(query: string) {
  const lower = query.toLowerCase();
  const isProcess = lower.includes("prozess") || lower.includes("ablauf");
  const isPricing = lower.includes("preis") || lower.includes("angebot");

  return {
    answer: isProcess
      ? "Der Prozess ist teilweise dokumentiert. Leqra erkennt die Schritte Bedarfserfassung, Paketwahl, Preisprüfung, Freigabe und Versand."
      : isPricing
        ? "Ich habe dazu 4 Quellen gefunden. Zwei Quellen nutzen unterschiedliche Preislogiken, deshalb sollte der Kontext vor einer Freigabe geprüft werden."
        : "Ich habe passende Unternehmensinformationen gefunden und die verlässlichsten Quellen priorisiert. Einige Inhalte sind bereit für interne Suche.",
    confidence: isProcess ? 76 : isPricing ? 68 : 84,
    sources: [
      "Leistungsübersicht.pdf",
      "Angebotsvorlage.docx",
      "CRM Kundenfelder",
      "FAQ Website Export",
    ],
    relatedItems: ["Leistungen", "Angebotsprozess", "Support", "Preise"],
    gaps: isProcess
      ? ["Freigabe vor Versand ist nicht eindeutig dokumentiert"]
      : isPricing
        ? ["Preisinformationen widersprechen sich in 2 Quellen"]
        : ["Eine Quelle wurde seit 14 Tagen nicht aktualisiert"],
  };
}
