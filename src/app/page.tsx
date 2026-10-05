"use client"

import { useMemo, useState } from "react"
import {
  Brain,
  Check,
  CreditCard,
  Heart,
  Layers,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sliders,
  Sparkles,
  Star,
  Truck,
} from "lucide-react"

type Product = {
  id: number
  name: string
  category: "Audio & Neural Hardware" | "Autonomous Workspace" | "Clinical Wearables" | "Luxury Travel"
  price: number
  rating: number
  reviews: number
  stock: number
  delivery: string
  description: string
  vector: [number, number, number, number] // [acoustic_precision, mobility, biometric_health, executive_craft]
}

const CATALOG: Product[] = [
  {
    id: 1,
    name: "Aurelia Acoustic Reference ANC-01",
    category: "Audio & Neural Hardware",
    price: 340,
    rating: 4.94,
    reviews: 1840,
    stock: 14,
    delivery: "24h Express",
    description: "Planar magnetic studio drivers with dual-DSP adaptive room cancellation and 42-hour battery.",
    vector: [0.98, 0.72, 0.15, 0.88],
  },
  {
    id: 2,
    name: "CardioPulse Holter-Lite Wearable Ring",
    category: "Clinical Wearables",
    price: 290,
    rating: 4.91,
    reviews: 940,
    stock: 9,
    delivery: "24h Express",
    description: "Continuous PPG + single-lead ECG RR interval telemetry with on-device TFLite anomaly alerts.",
    vector: [0.22, 0.88, 0.99, 0.79],
  },
  {
    id: 3,
    name: "Chronos Carbon Modular Carry System",
    category: "Luxury Travel",
    price: 265,
    rating: 4.88,
    reviews: 720,
    stock: 21,
    delivery: "48h Courier",
    description: "Weatherproof ballistic weave with magnetic workstation bay and RFID biometric vault.",
    vector: [0.18, 0.97, 0.25, 0.94],
  },
  {
    id: 4,
    name: "Luminaire Circadian Desk Array",
    category: "Autonomous Workspace",
    price: 410,
    rating: 4.92,
    reviews: 615,
    stock: 7,
    delivery: "48h Courier",
    description: "CRI-98 tunable spectrum optical bar synchronized to cognitive focus cycles.",
    vector: [0.45, 0.20, 0.78, 0.96],
  },
  {
    id: 5,
    name: "VoxMic Array Studio Condenser DSP",
    category: "Audio & Neural Hardware",
    price: 280,
    rating: 4.89,
    reviews: 530,
    stock: 16,
    delivery: "24h Express",
    description: "Cardioid beamforming array with hardware speech-to-text noise floor suppression.",
    vector: [0.96, 0.35, 0.18, 0.85],
  },
  {
    id: 6,
    name: "GlucoSense Non-Invasive Continuous Dock",
    category: "Clinical Wearables",
    price: 360,
    rating: 4.95,
    reviews: 1120,
    stock: 11,
    delivery: "24h Express",
    description: "Real-time interstitial glucose trend forecasting with physician threshold webhooks.",
    vector: [0.15, 0.82, 0.98, 0.80],
  },
]

function cosineSim(a: number[], b: number[]) {
  let dot = 0
  let na = 0
  let nb = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    na += a[i] * a[i]
    nb += b[i] * b[i]
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1)
}

export default function AureliaAiCommercePage() {
  const [userPref, setUserPref] = useState<[number, number, number, number]>([0.85, 0.70, 0.65, 0.90])
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [cart, setCart] = useState<{ id: number; qty: number }[]>([{ id: 1, qty: 1 }])
  const [search, setSearch] = useState<string>("")

  const rankedProducts = useMemo(() => {
    return CATALOG.filter(
      (p) =>
        (selectedCategory === "All" || p.category === selectedCategory) &&
        (p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()))
    )
      .map((p) => ({
        ...p,
        affinity: cosineSim(userPref, p.vector),
      }))
      .sort((a, b) => b.affinity - a.affinity)
  }, [userPref, selectedCategory, search])

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const p = CATALOG.find((x) => x.id === item.id)
      return sum + (p ? p.price * item.qty : 0)
    }, 0)
  }, [cart])

  const addToCart = (id: number) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === id)
      if (found) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
      return [...prev, { id, qty: 1 }]
    })
  }

  return (
    <main className="min-h-screen bg-[#07050d] text-zinc-100">
      <header className="border-b border-white/10 bg-[#0b0714]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/40 bg-violet-500/10 text-violet-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">AURELIA · Vector Affinity Commerce</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-xs tabular-nums">
            <span className="text-zinc-400">4D Cosine Preference Ranking</span>
            <span className="rounded-xl border border-violet-500/40 bg-violet-500/15 px-3.5 py-1.5 font-semibold text-violet-200">
              Bag ({cart.reduce((a, b) => a + b.qty, 0)}) · ${cartTotal}
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        <div className="grid gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#120b22]/95 via-[#0d0818]/95 to-[#170e2c]/90 p-7 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-7">
            <p className="text-xs font-medium text-violet-300">
              Real-Time 4D User Embedding Vector · Cosine Similarity Merchandising · Dynamic Bundle Synthesis
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Neural Personalization & Luxury Hardware Storefront
            </h1>
            <p className="text-sm leading-relaxed text-zinc-300">
              Adjust your live 4D latent preference vector on the right to watch the product catalog re-rank in real time via cosine similarity between user intent embeddings and item feature tensors.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {["All", "Audio & Neural Hardware", "Clinical Wearables", "Autonomous Workspace", "Luxury Travel"].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition ${
                      selectedCategory === cat
                        ? "border-violet-400 bg-violet-600 text-white"
                        : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/20"
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-white/10 bg-[#090612]/90 p-5 lg:col-span-5">
            <div className="flex items-center justify-between text-xs font-semibold text-violet-200">
              <span>Live User Preference Embedding u ∈ ℝ⁴</span>
              <Sliders className="h-4 w-4 text-violet-400" />
            </div>
            {(
              [
                ["Acoustic & DSP Precision", 0],
                ["Mobility & Travel Endurance", 1],
                ["Biometric & Clinical Telemetry", 2],
                ["Executive Industrial Craft", 3],
              ] as const
            ).map(([label, idx]) => (
              <div key={label}>
                <div className="flex justify-between text-xs text-zinc-300">
                  <span>{label}</span>
                  <span className="font-mono text-violet-300 tabular-nums">{userPref[idx].toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={0.05}
                  max={1}
                  step={0.05}
                  value={userPref[idx]}
                  onChange={(e) => {
                    const next = [...userPref] as [number, number, number, number]
                    next[idx] = Number(e.target.value)
                    setUserPref(next)
                  }}
                  className="mt-1 w-full accent-violet-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rankedProducts.map((product, rankIdx) => (
            <div
              key={product.id}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#100a1e]/90 p-6 transition hover:border-violet-500/40"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                  <span className="text-violet-300">
                    Rank #{rankIdx + 1} · {(product.affinity * 100).toFixed(1)}% Cosine Match
                  </span>
                  <span className="text-emerald-300">{product.delivery}</span>
                </div>

                <h2 className="mt-3 text-lg font-bold text-white">{product.name}</h2>
                <p className="mt-0.5 text-xs text-zinc-400">
                  {product.category} · ★ {product.rating} ({product.reviews} verified)
                </p>
                <p className="mt-3 text-xs leading-relaxed text-zinc-300">{product.description}</p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-xl font-bold text-white tabular-nums">${product.price}</div>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-xs font-semibold text-white hover:opacity-95"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
