"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { AirportForm } from "@/components/forms/AirportForm";
import { BookingForm, type BookableCar } from "@/components/forms/BookingForm";
import { WeddingForm } from "@/components/forms/WeddingForm";
import { Tabs } from "@/components/ui/Tabs";

const TABS = [
  { id: "chauffeur", label: "Chauffeur-Driven" },
  { id: "airport", label: "Airport" },
  { id: "wedding", label: "Wedding" },
] as const;
type TabId = (typeof TABS)[number]["id"];

function BookInner({ cars, params }: { cars: BookableCar[]; params: URLSearchParams }) {
  const get = (k: string) => params.get(k) ?? undefined;
  const requested = get("service");
  const initialTab: TabId = TABS.some((t) => t.id === requested) ? (requested as TabId) : "chauffeur";
  const [tab, setTab] = useState<TabId>(initialTab);

  return (
    <>
      <Tabs tabs={TABS} value={tab} onChange={setTab} idBase="book" label="Choose a service" className="border-b border-line" />
      <div role="tabpanel" id={`book-panel-${tab}`} aria-labelledby={`book-tab-${tab}`} className="mt-6">
        {tab === "airport" && <AirportForm initial={{ direction: get("direction"), airport: get("airport"), datetime: get("datetime"), passengers: get("passengers") }} />}
        {tab === "wedding" && <WeddingForm />}
        {tab === "chauffeur" && <BookingForm key={tab} cars={cars} initial={{ car: get("car"), service: tab, from: get("from"), to: get("to"), pickup: get("pickup"), area: get("area"), purpose: get("purpose") }} />}
      </div>
    </>
  );
}

export function BookClient({ cars }: { cars: BookableCar[] }) {
  const sp = useSearchParams();
  // Keyed so a new link (another car, other dates) refreshes a form the router has kept alive.
  return <BookInner key={sp.toString()} cars={cars} params={new URLSearchParams(sp.toString())} />;
}
