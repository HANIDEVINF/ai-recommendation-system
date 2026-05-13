"use client"

import { useMemo, useState } from "react"
import {
  BadgeCheck,
  Brain,
  Car,
  Check,
  ChevronRight,
  CreditCard,
  Gift,
  Heart,
  Home as HomeIcon,
  Layers3,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  Truck,
  User,
  Wand2,
  X,
  Zap,
} from "lucide-react"

type Product = {
  id: number
  name: string
  category: string
  price: number
  compareAt: number
  rating: number
  reviews: number
  image: string
  colors: string[]
  tags: string[]
  description: string
  stock: number
  sustainability: number
  delivery: string
}

type CartLine = {
  id: number
  qty: number
}

type Panel = "cart" | "account" | "checkout" | "support" | null

const products: Product[] = [
  {
    id: 1,
    name: "Aura Noise Studio Headphones",
    category: "Audio",
    price: 249,
    compareAt: 319,
    rating: 4.9,
    reviews: 1840,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
    colors: ["#111827", "#d9c7ad", "#f8fafc"],
    tags: ["focus", "travel", "premium", "gift", "audio"],
    description: "Adaptive silence, studio-grade drivers, and a 38-hour battery for travel and deep work.",
    stock: 18,
    sustainability: 82,
    delivery: "Tomorrow",
  },
  {
    id: 2,
    name: "Nomad Pro Carry Pack",
    category: "Travel",
    price: 168,
    compareAt: 220,
    rating: 4.8,
    reviews: 912,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
    colors: ["#0f172a", "#475569", "#b45309"],
    tags: ["travel", "work", "durable", "waterproof", "minimal"],
    description: "A structured work and weekend backpack with laptop protection and weatherproof finish.",
    stock: 27,
    sustainability: 88,
    delivery: "2 days",
  },
  {
    id: 3,
    name: "Pulse Ceramic Smart Watch",
    category: "Wearables",
    price: 399,
    compareAt: 459,
    rating: 4.7,
    reviews: 2260,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
    colors: ["#111827", "#f5f5f4", "#a1a1aa"],
    tags: ["fitness", "health", "premium", "gift", "wearable"],
    description: "Health tracking, sleep intelligence, and a bright ceramic body built for everyday style.",
    stock: 12,
    sustainability: 76,
    delivery: "Tomorrow",
  },
  {
    id: 4,
    name: "Cloudstep Knit Runner",
    category: "Footwear",
    price: 139,
    compareAt: 180,
    rating: 4.8,
    reviews: 1488,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
    colors: ["#ef4444", "#111827", "#f8fafc"],
    tags: ["fitness", "commute", "lightweight", "recycled", "comfort"],
    description: "A responsive daily runner with a breathable knit upper and recycled foam midsole.",
    stock: 33,
    sustainability: 91,
    delivery: "2 days",
  },
  {
    id: 5,
    name: "Arc Modular Lounge Chair",
    category: "Home",
    price: 620,
    compareAt: 760,
    rating: 4.9,
    reviews: 520,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
    colors: ["#d6d3d1", "#334155", "#92400e"],
    tags: ["home", "premium", "design", "comfort", "sustainable"],
    description: "A sculptural lounge chair with modular cushions, oak legs, and replaceable upholstery.",
    stock: 7,
    sustainability: 94,
    delivery: "5 days",
  },
  {
    id: 6,
    name: "Ritual Pour-Over Station",
    category: "Kitchen",
    price: 128,
    compareAt: 165,
    rating: 4.6,
    reviews: 730,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80",
    colors: ["#111827", "#f5f5f4", "#854d0e"],
    tags: ["home", "gift", "coffee", "morning", "minimal"],
    description: "Precision dripper, thermal carafe, and smart brew timer for cafe-level mornings.",
    stock: 41,
    sustainability: 85,
    delivery: "Tomorrow",
  },
  {
    id: 7,
    name: "Glow Lab Recovery Set",
    category: "Beauty",
    price: 96,
    compareAt: 124,
    rating: 4.7,
    reviews: 1094,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1000&q=80",
    colors: ["#f9a8d4", "#f8fafc", "#99f6e4"],
    tags: ["selfcare", "gift", "travel", "clean", "routine"],
    description: "A clean skincare ritual with barrier serum, overnight mask, and travel minis.",
    stock: 56,
    sustainability: 89,
    delivery: "2 days",
  },
  {
    id: 8,
    name: "Beam Ambient Table Lamp",
    category: "Home",
    price: 184,
    compareAt: 240,
    rating: 4.8,
    reviews: 604,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
    colors: ["#facc15", "#111827", "#e5e7eb"],
    tags: ["home", "design", "work", "warm", "gift"],
    description: "A dimmable ambient lamp with touch control, warm presets, and sculptural metal shade.",
    stock: 22,
    sustainability: 80,
    delivery: "Tomorrow",
  },
  {
    id: 9,
    name: "Chef's Market Dinner Box",
    category: "Food",
    price: 74,
    compareAt: 96,
    rating: 4.8,
    reviews: 2680,
    image: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=1000&q=80",
    colors: ["#16a34a", "#f97316", "#fde68a"],
    tags: ["food", "fresh", "family", "gift", "fast"],
    description: "A chef-designed dinner kit with seasonal produce, premium proteins, and 25-minute recipes.",
    stock: 64,
    sustainability: 93,
    delivery: "Today",
  },
  {
    id: 10,
    name: "Botanical Cold Press Pack",
    category: "Food",
    price: 42,
    compareAt: 58,
    rating: 4.6,
    reviews: 1210,
    image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=1000&q=80",
    colors: ["#22c55e", "#fb7185", "#facc15"],
    tags: ["food", "health", "fresh", "routine", "gift"],
    description: "Six cold-pressed juices balanced for energy, recovery, and clean morning routines.",
    stock: 38,
    sustainability: 87,
    delivery: "Today",
  },
  {
    id: 11,
    name: "Aurelia GT Electric Coupe",
    category: "Cars",
    price: 58900,
    compareAt: 64200,
    rating: 4.9,
    reviews: 420,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80",
    colors: ["#111827", "#dc2626", "#f8fafc"],
    tags: ["cars", "premium", "electric", "performance", "travel"],
    description: "A performance EV coupe with 410-mile range, panoramic cockpit, and assisted highway driving.",
    stock: 5,
    sustainability: 96,
    delivery: "Reserve",
  },
  {
    id: 12,
    name: "Terra X Hybrid SUV",
    category: "Cars",
    price: 43800,
    compareAt: 47900,
    rating: 4.8,
    reviews: 690,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80",
    colors: ["#064e3b", "#0f172a", "#e5e7eb"],
    tags: ["cars", "family", "hybrid", "travel", "safe"],
    description: "A family SUV with hybrid range, intelligent cargo planning, and advanced driver assistance.",
    stock: 9,
    sustainability: 89,
    delivery: "Reserve",
  },
]

const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))]
const moods = ["gift", "travel", "work", "home", "fitness", "food", "cars", "premium", "sustainable"]
const paymentMethods = [
  { id: "card", label: "Visa ending 4242", detail: "Instant confirmation", icon: CreditCard },
  { id: "paypal", label: "PayPal", detail: "Buyer protection enabled", icon: ShieldCheck },
  { id: "apple", label: "Apple Pay", detail: "Fast biometric checkout", icon: Zap },
  { id: "installments", label: "4 interest-free payments", detail: "Split with Shop Pay style flow", icon: Layers3 },
]

function currency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value)
}

function scoreProduct(product: Product, query: string, selectedMood: string) {
  const text = `${product.name} ${product.category} ${product.tags.join(" ")} ${product.description}`.toLowerCase()
  const tokens = query
    .toLowerCase()
    .split(/\W+/)
    .filter((token) => token.length > 2)
  const queryScore = tokens.reduce((sum, token) => sum + (text.includes(token) ? 18 : 0), 0)
  const moodScore = selectedMood === "all" || product.tags.includes(selectedMood) ? 22 : 0
  const valueScore = Math.max(0, 18 - product.price / 55)
  const trustScore = product.rating * 4 + product.sustainability / 8
  return Math.round(queryScore + moodScore + valueScore + trustScore)
}

export default function Home() {
  const [query, setQuery] = useState("Find premium travel gear under $300 for work trips")
  const [category, setCategory] = useState("All")
  const [mood, setMood] = useState("travel")
  const [sort, setSort] = useState("AI Match")
  const [cart, setCart] = useState<CartLine[]>([{ id: 1, qty: 1 }])
  const [wishlist, setWishlist] = useState<number[]>([3])
  const [compare, setCompare] = useState<number[]>([1, 2])
  const [selectedProductId, setSelectedProductId] = useState(1)
  const [panel, setPanel] = useState<Panel>(null)
  const [selectedPayment, setSelectedPayment] = useState("card")
  const [accountTier, setAccountTier] = useState("Gold")
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [toast, setToast] = useState("AI concierge is ready")

  const scoredProducts = useMemo(() => {
    const filtered = products
      .filter((product) => category === "All" || product.category === category)
      .map((product) => ({ ...product, aiScore: scoreProduct(product, query, mood) }))

    return filtered.sort((a, b) => {
      if (sort === "Price Low") return a.price - b.price
      if (sort === "Rating") return b.rating - a.rating
      if (sort === "Sustainable") return b.sustainability - a.sustainability
      return b.aiScore - a.aiScore
    })
  }, [category, mood, query, sort])

  const selectedProduct = products.find((product) => product.id === selectedProductId) || products[0]
  const cartProducts = cart.map((line) => ({ ...products.find((product) => product.id === line.id)!, qty: line.qty }))
  const subtotal = cartProducts.reduce((sum, item) => sum + item.price * item.qty, 0)
  const savings = cartProducts.reduce((sum, item) => sum + (item.compareAt - item.price) * item.qty, 0)
  const recommendedBundle = scoredProducts.slice(0, 3)
  const activeCategoryProducts = category === "All" ? products : products.filter((product) => product.category === category)
  const foodProducts = products.filter((product) => product.category === "Food")
  const carProducts = products.filter((product) => product.category === "Cars")

  function addToCart(id: number) {
    setCart((current) => {
      const existing = current.find((line) => line.id === id)
      if (existing) return current.map((line) => (line.id === id ? { ...line, qty: line.qty + 1 } : line))
      return [...current, { id, qty: 1 }]
    })
    setToast(`${products.find((product) => product.id === id)?.name} added to Smart Cart`)
  }

  function updateQty(id: number, delta: number) {
    setCart((current) =>
      current
        .map((line) => (line.id === id ? { ...line, qty: Math.max(0, line.qty + delta) } : line))
        .filter((line) => line.qty > 0),
    )
  }

  function toggleCompare(id: number) {
    setCompare((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id)
      return [...current.slice(-2), id]
    })
  }

  function toggleWishlist(id: number) {
    setWishlist((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  function applyAiPersonalization() {
    const lower = query.toLowerCase()
    if (lower.includes("car") || lower.includes("electric") || lower.includes("suv")) {
      setCategory("Cars")
      setMood("cars")
    } else if (lower.includes("food") || lower.includes("dinner") || lower.includes("juice")) {
      setCategory("Food")
      setMood("food")
    } else if (lower.includes("home") || lower.includes("lamp") || lower.includes("chair")) {
      setCategory("Home")
      setMood("home")
    } else if (lower.includes("gift")) {
      setMood("gift")
    } else if (lower.includes("travel")) {
      setMood("travel")
    }
    setSort("AI Match")
    setToast("AI personalized the catalog from your shopping brief")
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })
  }

  function buildBundle() {
    recommendedBundle.forEach((product) => addToCart(product.id))
    setPanel("cart")
    setToast("Smart bundle added with AI bundle credit")
  }

  function placeOrder() {
    setOrderPlaced(true)
    setToast("Order confirmed. Demo checkout flow completed")
  }

  return (
    <main className="min-h-screen bg-[#0a0d12] text-slate-50">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0d12]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-300 text-slate-950">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-bold">Aurelia Market</div>
              <div className="text-xs text-slate-400">AI commerce experience</div>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#shop" className="hover:text-white">
              Shop
            </a>
            <a href="#ai" className="hover:text-white">
              AI Concierge
            </a>
            <a href="#compare" className="hover:text-white">
              Compare
            </a>
            <a href="#checkout" className="hover:text-white">
              Checkout
            </a>
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={() => setPanel("account")}
              className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm transition hover:border-cyan-300/60"
            >
              <User className="h-4 w-4" />
              {accountTier}
            </button>
          </div>
          <button
            onClick={() => setPanel("cart")}
            className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm transition hover:border-emerald-300/60"
          >
            <ShoppingBag className="h-4 w-4" />
            {cart.reduce((sum, line) => sum + line.qty, 0)}
          </button>
        </div>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-74px)] max-w-7xl items-center gap-8 px-5 py-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-100">
            <Brain className="h-4 w-4" />
            Intent-aware shopping assistant
          </div>
          <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
            Shop like the store already knows your taste.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            A premium ecommerce interface with AI discovery, adaptive merchandising, smart bundles, comparison,
            loyalty perks, and a checkout panel built for conversion.
          </p>
          <div id="ai" className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-emerald-950/30">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-200">
              <Wand2 className="h-4 w-4" />
              AI shopper brief
            </div>
            <div className="flex flex-col gap-3 md:flex-row">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-h-12 flex-1 rounded-md border border-white/10 bg-slate-950 px-4 text-slate-100 outline-none transition focus:border-emerald-300"
                placeholder="Tell the AI what you want..."
              />
              <button
                onClick={applyAiPersonalization}
                className="flex items-center justify-center gap-2 rounded-md bg-emerald-300 px-5 py-3 font-bold text-slate-950 transition hover:bg-emerald-200"
              >
                <Search className="h-4 w-4" />
                Personalize
              </button>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              ["32%", "higher bundle attach"],
              ["1.8s", "AI match refresh"],
              ["4.8", "avg catalog rating"],
            ].map(([metric, label]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <div className="text-2xl font-black text-amber-200">{metric}</div>
                <div className="mt-1 text-xs text-slate-400">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_0.72fr]">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
            <img className="h-[520px] w-full object-cover" src={selectedProduct.image} alt={selectedProduct.name} />
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-bold text-slate-950">
                  AI pick
                </span>
                <div className="flex items-center gap-1 text-amber-200">
                  <Star className="h-4 w-4 fill-current" />
                  {selectedProduct.rating}
                </div>
              </div>
              <h2 className="mt-5 text-2xl font-bold">{selectedProduct.name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{selectedProduct.description}</p>
              <div className="mt-5 flex items-end gap-3">
                <span className="text-4xl font-black">{currency(selectedProduct.price)}</span>
                <span className="pb-1 text-sm text-slate-500 line-through">{currency(selectedProduct.compareAt)}</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  onClick={() => addToCart(selectedProduct.id)}
                  className="flex items-center justify-center gap-2 rounded-md bg-white px-4 py-3 font-bold text-slate-950 transition hover:bg-emerald-200"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add
                </button>
                <button
                  onClick={() => {
                    addToCart(selectedProduct.id)
                    setPanel("checkout")
                  }}
                  className="flex items-center justify-center gap-2 rounded-md bg-emerald-300 px-4 py-3 font-bold text-slate-950 transition hover:bg-emerald-200"
                >
                  Buy now
                </button>
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#f5f2ea] p-5 text-slate-950">
              <div className="flex items-center gap-2 font-bold">
                <Zap className="h-5 w-5" />
                Smart bundle
              </div>
              <p className="mt-2 text-sm text-slate-700">AI combines products with matching intent and delivery speed.</p>
              <div className="mt-4 flex -space-x-4">
                {recommendedBundle.map((product) => (
                  <img
                    key={product.id}
                    src={product.image}
                    alt={product.name}
                    className="h-14 w-14 rounded-full border-2 border-[#f5f2ea] object-cover"
                  />
                ))}
              </div>
              <button onClick={buildBundle} className="mt-4 w-full rounded-md bg-slate-950 px-4 py-2 text-sm font-bold text-white">
                Add bundle
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0a0d12] px-5 py-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {[
            ["Food Market", `${foodProducts.length} fresh drops`, Gift, "Food"],
            ["Car Showroom", `${carProducts.length} vehicles`, Car, "Cars"],
            ["Home Studio", "Design-led living", HomeIcon, "Home"],
            ["Member Deals", `${wishlist.length} saved items`, User, "All"],
          ].map(([title, copy, Icon, target]) => (
            <button
              key={String(title)}
              onClick={() => {
                setCategory(String(target))
                setMood(String(target).toLowerCase() === "all" ? "gift" : String(target).toLowerCase())
                document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="group rounded-lg border border-white/10 bg-white/[0.04] p-5 text-left transition hover:border-emerald-300/50"
            >
              <Icon className="h-7 w-7 text-emerald-200" />
              <div className="mt-4 text-xl font-black">{title}</div>
              <div className="mt-1 text-sm text-slate-400">{copy}</div>
            </button>
          ))}
        </div>
      </section>

      <section id="shop" className="border-t border-white/10 bg-[#111820] px-5 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-cyan-200">
                <SlidersHorizontal className="h-4 w-4" />
                Adaptive merchandising
              </div>
              <h2 className="mt-2 text-4xl font-black">Recommended for this shopper</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`rounded-md border px-3 py-2 text-sm transition ${
                    category === item ? "border-cyan-300 bg-cyan-300 text-slate-950" : "border-white/10 bg-slate-950 text-slate-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {moods.map((item) => (
                <button
                  key={item}
                  onClick={() => setMood(item)}
                  className={`rounded-full border px-3 py-2 text-sm capitalize transition ${
                    mood === item
                      ? "border-emerald-300 bg-emerald-300/15 text-emerald-100"
                      : "border-white/10 bg-white/[0.03] text-slate-400"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-100"
            >
              <option>AI Match</option>
              <option>Price Low</option>
              <option>Rating</option>
              <option>Sustainable</option>
            </select>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {scoredProducts.map((product) => (
              <article key={product.id} className="group overflow-hidden rounded-lg border border-white/10 bg-[#0a0d12]">
                <button
                  onClick={() => setSelectedProductId(product.id)}
                  className="relative block h-72 w-full overflow-hidden text-left"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-bold backdrop-blur">
                    {product.aiScore}% AI match
                  </div>
                </button>
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                    <span>{product.category}</span>
                    <span>{product.delivery}</span>
                  </div>
                  <h3 className="min-h-12 text-lg font-bold">{product.name}</h3>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black">{currency(product.price)}</span>
                      <span className="ml-2 text-sm text-slate-500 line-through">{currency(product.compareAt)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-amber-200">
                      <Star className="h-4 w-4 fill-current" />
                      {product.rating}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => addToCart(product.id)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-bold text-slate-950 transition hover:bg-emerald-200"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Add
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`rounded-md border p-2 transition ${
                        wishlist.includes(product.id) ? "border-pink-300 bg-pink-300 text-slate-950" : "border-white/10 text-slate-300"
                      }`}
                      aria-label="Wishlist"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => toggleCompare(product.id)}
                      className={`rounded-md border p-2 transition ${
                        compare.includes(product.id) ? "border-cyan-300 bg-cyan-300 text-slate-950" : "border-white/10 text-slate-300"
                      }`}
                      aria-label="Compare"
                    >
                      <Layers3 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="compare" className="border-t border-white/10 bg-[#0a0d12] px-5 py-12">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-200">
              <BadgeCheck className="h-4 w-4" />
              Decision support
            </div>
            <h2 className="mt-2 text-4xl font-black">Compare without opening ten tabs.</h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-300">
              Shoppers can compare price, trust, sustainability, stock, delivery, and AI match in one focused surface.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {compare.map((id) => {
              const product = products.find((item) => item.id === id)!
              return (
                <div key={id} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <img src={product.image} alt={product.name} className="h-36 w-full rounded-md object-cover" />
                  <h3 className="mt-4 font-bold">{product.name}</h3>
                  <div className="mt-3 space-y-2 text-sm text-slate-300">
                    <div className="flex justify-between">
                      <span>Price</span>
                      <strong>{currency(product.price)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating</span>
                      <strong>{product.rating}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Sustainability</span>
                      <strong>{product.sustainability}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Stock</span>
                      <strong>{product.stock}</strong>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="checkout" className="border-t border-white/10 bg-[#f5f2ea] px-5 py-12 text-slate-950">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
            {[
              ["Fast checkout", "One-tap cart summary, delivery promise, and savings visibility.", Truck, "checkout"],
              ["Trust layer", "Returns, warranty, verified reviews, and secure payment signals.", ShieldCheck, "support"],
              ["Loyalty engine", "Personalized rewards, bundle credits, and post-purchase suggestions.", Sparkles, "account"],
            ].map(([title, copy, Icon, nextPanel]) => (
            <div key={String(title)} className="rounded-lg border border-slate-950/10 bg-white p-6">
              <Icon className="h-7 w-7" />
              <h3 className="mt-4 text-2xl font-black">{title}</h3>
              <p className="mt-2 leading-7 text-slate-700">{copy}</p>
              <button onClick={() => setPanel(nextPanel as Panel)} className="mt-5 flex items-center gap-2 font-bold">
                Explore <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/10 bg-slate-950/90 px-4 py-2 text-sm text-slate-200 shadow-2xl backdrop-blur">
        {toast}
      </div>

      {panel && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <div className="ml-auto flex h-full w-full max-w-md flex-col bg-[#101720] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <h2 className="text-2xl font-black">
                  {panel === "cart" && "Smart Cart"}
                  {panel === "checkout" && "Checkout"}
                  {panel === "account" && "Account"}
                  {panel === "support" && "Trust Center"}
                </h2>
                <p className="text-sm text-slate-400">
                  {panel === "cart" && `Savings: ${currency(savings)}`}
                  {panel === "checkout" && "Payment, delivery, and order confirmation"}
                  {panel === "account" && "Profile, loyalty, and personalization"}
                  {panel === "support" && "Returns, warranties, and buyer protection"}
                </p>
              </div>
              <button onClick={() => setPanel(null)} className="rounded-md border border-white/10 p-2">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 space-y-4 overflow-auto p-5">
              {(panel === "cart" || panel === "checkout") && (
                <>
                  {cartProducts.length === 0 && (
                    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 text-slate-300">
                      Your cart is empty. Add a product or smart bundle to start checkout.
                    </div>
                  )}
                  {cartProducts.map((item) => (
                    <div key={item.id} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
                      <img src={item.image} alt={item.name} className="h-20 w-20 rounded-md object-cover" />
                      <div className="flex-1">
                        <div className="font-bold">{item.name}</div>
                        <div className="text-sm text-slate-400">{currency(item.price)}</div>
                        <div className="mt-3 flex items-center gap-2">
                          <button onClick={() => updateQty(item.id, -1)} className="rounded border border-white/10 p-1">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="rounded border border-white/10 p-1">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {panel === "checkout" && (
                <div className="space-y-4">
                  <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                    <div className="mb-3 font-bold">Payment method</div>
                    <div className="space-y-2">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id)}
                          className={`flex w-full items-center gap-3 rounded-md border p-3 text-left transition ${
                            selectedPayment === method.id ? "border-emerald-300 bg-emerald-300/10" : "border-white/10"
                          }`}
                        >
                          <method.icon className="h-5 w-5 text-emerald-200" />
                          <span className="flex-1">
                            <span className="block font-semibold">{method.label}</span>
                            <span className="text-xs text-slate-400">{method.detail}</span>
                          </span>
                          {selectedPayment === method.id && <Check className="h-4 w-4 text-emerald-200" />}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                    <div className="font-bold">Delivery address</div>
                    <div className="mt-2 text-sm leading-6 text-slate-300">
                      Hani Ghena, Algiers workspace. Fastest mixed delivery selected automatically.
                    </div>
                  </div>
                  {orderPlaced && (
                    <div className="rounded-lg border border-emerald-300/30 bg-emerald-300/10 p-4 text-emerald-100">
                      <PackageCheck className="mb-2 h-6 w-6" />
                      Order confirmed. Confirmation #AUR-2048 has been generated.
                    </div>
                  )}
                </div>
              )}

              {panel === "account" && (
                <div className="space-y-4">
                  <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-300 font-black text-slate-950">
                        HG
                      </div>
                      <div>
                        <div className="text-xl font-black">Hani Ghena</div>
                        <div className="text-sm text-slate-400">{accountTier} member · 12,480 points</div>
                      </div>
                    </div>
                    <div className="mt-5 grid grid-cols-3 gap-2 text-center text-sm">
                      <div className="rounded-md bg-white/[0.04] p-3">
                        <div className="font-black">{wishlist.length}</div>
                        <div className="text-slate-400">Saved</div>
                      </div>
                      <div className="rounded-md bg-white/[0.04] p-3">
                        <div className="font-black">8</div>
                        <div className="text-slate-400">Orders</div>
                      </div>
                      <div className="rounded-md bg-white/[0.04] p-3">
                        <div className="font-black">VIP</div>
                        <div className="text-slate-400">Perks</div>
                      </div>
                    </div>
                  </div>
                  {["Gold", "Platinum", "Founder"].map((tier) => (
                    <button
                      key={tier}
                      onClick={() => {
                        setAccountTier(tier)
                        setToast(`Account tier switched to ${tier}`)
                      }}
                      className={`w-full rounded-md border p-3 text-left ${
                        accountTier === tier ? "border-cyan-300 bg-cyan-300/10" : "border-white/10 bg-white/[0.04]"
                      }`}
                    >
                      {tier} personalization profile
                    </button>
                  ))}
                </div>
              )}

              {panel === "support" && (
                <div className="space-y-4">
                  {[
                    ["30-day returns", "Prepaid returns for most categories with instant exchange recommendations."],
                    ["Car reservations", "Refundable reservations, virtual showroom, and advisor follow-up."],
                    ["Fresh food guarantee", "Same-day replacement credit if cold-chain delivery misses quality checks."],
                    ["Secure payments", "Tokenized cards, PayPal, Apple Pay, and installment options."],
                  ].map(([title, copy]) => (
                    <div key={title} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                      <div className="font-bold">{title}</div>
                      <div className="mt-1 text-sm leading-6 text-slate-300">{copy}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t border-white/10 p-5">
              {(panel === "cart" || panel === "checkout") && (
                <div className="mb-4 space-y-2 text-sm">
                  <div className="flex justify-between text-slate-300">
                    <span>Subtotal</span>
                    <span>{currency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-200">
                    <span>AI bundle credit</span>
                    <span>-{currency(Math.round(subtotal * 0.08))}</span>
                  </div>
                  <div className="flex justify-between text-xl font-black">
                    <span>Total</span>
                    <span>{currency(Math.max(0, subtotal - Math.round(subtotal * 0.08)))}</span>
                  </div>
                </div>
              )}
              {panel === "cart" && (
                <button onClick={() => setPanel("checkout")} className="flex w-full items-center justify-center gap-2 rounded-md bg-emerald-300 px-4 py-3 font-black text-slate-950">
                  Checkout Securely
                </button>
              )}
              {panel === "checkout" && (
                <button onClick={placeOrder} className="flex w-full items-center justify-center gap-2 rounded-md bg-emerald-300 px-4 py-3 font-black text-slate-950">
                  <Check className="h-4 w-4" />
                  Place Demo Order
                </button>
              )}
              {(panel === "account" || panel === "support") && (
                <button onClick={() => setPanel(null)} className="flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-3 font-black text-slate-950">
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
