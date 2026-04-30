import { useState, useEffect } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const holdings = [
  { sym: "BTC", name: "Bitcoin",   price: 95240,      change: 3.21,  value: 12840, alloc: 51.7, icon: "₿", color: "#f7931a" },
  { sym: "ETH", name: "Ethereum",  price: 1821,       change: 1.87,  value: 5460,  alloc: 22.0, icon: "Ξ", color: "#627eea" },
  { sym: "SOL", name: "Solana",    price: 148.3,      change: 5.44,  value: 3112,  alloc: 12.5, icon: "◎", color: "#06b6d4" },
  { sym: "AVAX",name: "Avalanche", price: 22.14,      change: -1.02, value: 1440,  alloc: 5.8,  icon: "◈", color: "#e84142" },
  { sym: "SUI", name: "Sui",       price: 3.84,       change: 18.2,  value: 960,   alloc: 3.9,  icon: "S", color: "#4da2ff" },
  { sym: "INJ", name: "Injective", price: 12.66,      change: 9.1,   value: 633,   alloc: 2.5,  icon: "◬", color: "#00c2f3" },
  { sym: "RNDR",name: "Render",    price: 4.22,       change: -8.4,  value: 367,   alloc: 1.5,  icon: "R", color: "#a855f7" },
];

const top100coins = [
  { r:1,  sym:"BTC",  name:"Bitcoin",       price:95240,     ch:3.21,   mcap:"$1.88T", vol:"$48.2B", icon:"₿", color:"#f7931a" },
  { r:2,  sym:"ETH",  name:"Ethereum",      price:1821,      ch:1.87,   mcap:"$219.4B",vol:"$22.1B", icon:"Ξ", color:"#627eea" },
  { r:3,  sym:"USDT", name:"Tether",        price:1.00,      ch:0.01,   mcap:"$144.2B",vol:"$61.8B", icon:"₮", color:"#26a17b" },
  { r:4,  sym:"BNB",  name:"BNB",           price:614,       ch:-0.44,  mcap:"$89.3B", vol:"$2.1B",  icon:"B", color:"#f0b90b" },
  { r:5,  sym:"SOL",  name:"Solana",        price:148.3,     ch:5.44,   mcap:"$70.2B", vol:"$5.8B",  icon:"◎", color:"#06b6d4" },
  { r:6,  sym:"USDC", name:"USD Coin",      price:1.00,      ch:0.00,   mcap:"$60.1B", vol:"$8.2B",  icon:"$", color:"#2775ca" },
  { r:7,  sym:"XRP",  name:"XRP",           price:2.18,      ch:-1.22,  mcap:"$50.8B", vol:"$3.4B",  icon:"✕", color:"#00aae4" },
  { r:8,  sym:"DOGE", name:"Dogecoin",      price:0.178,     ch:7.84,   mcap:"$26.2B", vol:"$2.9B",  icon:"Ð", color:"#c2a633" },
  { r:9,  sym:"ADA",  name:"Cardano",       price:0.712,     ch:2.11,   mcap:"$25.3B", vol:"$1.2B",  icon:"◭", color:"#0033ad" },
  { r:10, sym:"AVAX", name:"Avalanche",     price:22.14,     ch:-1.02,  mcap:"$9.2B",  vol:"$0.8B",  icon:"◈", color:"#e84142" },
  { r:11, sym:"SUI",  name:"Sui",           price:3.84,      ch:18.2,   mcap:"$12.1B", vol:"$3.2B",  icon:"S", color:"#4da2ff" },
  { r:12, sym:"LINK", name:"Chainlink",     price:14.82,     ch:3.44,   mcap:"$9.8B",  vol:"$0.9B",  icon:"⬡", color:"#375bd2" },
  { r:13, sym:"TRX",  name:"TRON",          price:0.254,     ch:1.18,   mcap:"$21.9B", vol:"$1.4B",  icon:"T", color:"#ff0013" },
  { r:14, sym:"TON",  name:"Toncoin",       price:3.44,      ch:-2.87,  mcap:"$8.7B",  vol:"$0.6B",  icon:"◆", color:"#0098ea" },
  { r:15, sym:"DOT",  name:"Polkadot",      price:4.18,      ch:0.92,   mcap:"$6.6B",  vol:"$0.4B",  icon:"●", color:"#e6007a" },
  { r:16, sym:"SHIB", name:"Shiba Inu",     price:0.0000138, ch:4.22,   mcap:"$8.1B",  vol:"$1.1B",  icon:"犬", color:"#ffa409" },
  { r:17, sym:"UNI",  name:"Uniswap",       price:7.24,      ch:-3.12,  mcap:"$5.4B",  vol:"$0.3B",  icon:"U", color:"#ff007a" },
  { r:18, sym:"INJ",  name:"Injective",     price:12.66,     ch:9.1,    mcap:"$5.2B",  vol:"$0.9B",  icon:"◬", color:"#00c2f3" },
  { r:19, sym:"RNDR", name:"Render",        price:4.22,      ch:-8.4,   mcap:"$4.8B",  vol:"$0.7B",  icon:"R", color:"#a855f7" },
  { r:20, sym:"NEAR", name:"NEAR Protocol", price:2.91,      ch:12.7,   mcap:"$4.6B",  vol:"$0.8B",  icon:"Ω", color:"#00c08b" },
];

type WhaleTx = {
  id: number;
  type: "BUY" | "SELL" | "MOVE";
  amount: string;
  asset: string;
  wallet: string;
  time: string;
  chain: string;
  fresh?: boolean;
};

const initialWhale: WhaleTx[] = [
  { id:1, type:"BUY",  amount:"$42.1M", asset:"BTC",  wallet:"0x7f3a...d91c",              time:"2 min ago",  chain:"ETH"   },
  { id:2, type:"SELL", amount:"$18.7M", asset:"ETH",  wallet:"0x4bc2...8a21",              time:"5 min ago",  chain:"ETH"   },
  { id:3, type:"MOVE", amount:"$95.0M", asset:"USDT", wallet:"Binance → Coinbase",         time:"8 min ago",  chain:"TRC20" },
  { id:4, type:"BUY",  amount:"$7.3M",  asset:"SOL",  wallet:"0x9d1f...cc44",              time:"12 min ago", chain:"SOL"   },
  { id:5, type:"SELL", amount:"$24.4M", asset:"BNB",  wallet:"0x2e88...f002",              time:"17 min ago", chain:"BSC"   },
  { id:6, type:"MOVE", amount:"$310.0M",asset:"BTC",  wallet:"Unknown → Kraken",           time:"24 min ago", chain:"BTC"   },
  { id:7, type:"BUY",  amount:"$11.9M", asset:"AVAX", wallet:"0x83ab...112f",              time:"31 min ago", chain:"AVAX"  },
  { id:8, type:"SELL", amount:"$5.2M",  asset:"LINK", wallet:"0x5c44...a7f1",              time:"45 min ago", chain:"ETH"   },
];

const freshTxns: Omit<WhaleTx, "id">[] = [
  { type:"BUY",  amount:"$8.8M",  asset:"SUI",  wallet:"0x11ee...b33f",         time:"just now", chain:"SUI", fresh:true },
  { type:"MOVE", amount:"$52.0M", asset:"ETH",  wallet:"FTX Recovery → Coinbase", time:"just now", chain:"ETH", fresh:true },
];

// ─── SUBCOMPONENTS ──────────────────────────────────────────────────────────

const MiniBar = ({ pct, color = "var(--accent)", delay = 0 }: { pct: number; color?: string; delay?: number }) => (
  <div
    style={{
      width: 3,
      height: `${pct}%`,
      borderRadius: 2,
      background: color,
      opacity: 0.7,
      alignSelf: "flex-end",
      animationDelay: `${delay}s`,
    }}
  />
);

function MiniChart({ bars }: { bars: { pct: number; color?: string }[] }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 28, marginTop: 10 }}>
      {bars.map((b, i) => <MiniBar key={i} pct={b.pct} color={b.color} delay={i * 0.05} />)}
    </div>
  );
}

function AllocBar({ pct, gradient = "linear-gradient(90deg,#7c3aed,#a855f7)" }: { pct: number; gradient?: string }) {
  return (
    <div style={{ height: 4, borderRadius: 2, background: "#334155", marginTop: 8, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", borderRadius: 2, background: gradient, boxShadow: "0 0 6px #7c3aed" }} />
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "'Orbitron', monospace",
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: 2,
      color: "#a855f7",
      marginBottom: 14,
      display: "flex",
      alignItems: "center",
      gap: 8,
    }}>
      <span style={{ width: 3, height: 14, background: "#7c3aed", borderRadius: 2, boxShadow: "0 0 8px #7c3aed", display: "inline-block", flexShrink: 0 }} />
      {children}
    </div>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "#0f1520",
      border: "1px solid #1a2535",
      borderRadius: 10,
      padding: 18,
      position: "relative",
      overflow: "hidden",
      ...style,
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,#7c3aed,transparent)", opacity: 0.4 }} />
      {children}
    </div>
  );
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 9, color: "#64748b", letterSpacing: 3, marginBottom: 10 }}>{children}</div>;
}

function CardValue({ children, color = "#e2e8f0" }: { children: React.ReactNode; color?: string }) {
  return <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 22, fontWeight: 700, color }}>{children}</div>;
}

function CoinIcon({ icon, color }: { icon: string; color: string }) {
  return (
    <div style={{
      width: 26, height: 26, borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 11, fontWeight: "bold", flexShrink: 0,
      background: `${color}22`, color,
    }}>
      {icon}
    </div>
  );
}

function PctBadge({ ch }: { ch: number }) {
  const up = ch >= 0;
  return (
    <span style={{
      fontSize: 10, padding: "2px 6px", borderRadius: 4, minWidth: 52, textAlign: "right",
      background: up ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
      color: up ? "#10b981" : "#ef4444",
    }}>
      {up ? "▲" : "▼"} {Math.abs(ch)}%
    </span>
  );
}

function TxTypeBadge({ type }: { type: "BUY" | "SELL" | "MOVE" }) {
  const styles: Record<string, React.CSSProperties> = {
    BUY:  { background: "rgba(16,185,129,0.15)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)" },
    SELL: { background: "rgba(239,68,68,0.15)",  color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" },
    MOVE: { background: "rgba(59,130,246,0.15)", color: "#3b82f6", border: "1px solid rgba(59,130,246,0.3)" },
  };
  return (
    <div style={{
      width: 48, height: 28, borderRadius: 5,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 9, fontWeight: "bold", letterSpacing: 1, flexShrink: 0,
      ...styles[type],
    }}>
      {type}
    </div>
  );
}

// ─── PAGES ──────────────────────────────────────────────────────────────────

function Dashboard() {
  return (
    <div>
      <SectionTitle>Alpha Signals</SectionTitle>
      <div style={{
        background: "#0f1520", border: "1px solid #1a2535", borderRadius: 10,
        padding: 20, marginBottom: 16, textAlign: "center",
        color: "#64748b", fontSize: 12, letterSpacing: 1, position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(124,58,237,0.03) 10px,rgba(124,58,237,0.03) 20px)" }} />
        <span style={{ position: "relative" }}>⬡ No active alpha signals at this time.</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 16 }}>
        <Card>
          <CardLabel>TOTAL MARKET CAP $</CardLabel>
          <CardValue>$2.71T</CardValue>
          <div style={{ fontSize: 11, color: "#10b981", marginTop: 4 }}>▲ +2.41%</div>
          <MiniChart bars={[{pct:40},{pct:55},{pct:45},{pct:70},{pct:60},{pct:85},{pct:75},{pct:100,color:"#10b981"}]} />
        </Card>
        <Card>
          <CardLabel>24H VOLUME ~</CardLabel>
          <CardValue>$148.3B</CardValue>
          <div style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>▼ -5.12%</div>
          <MiniChart bars={[{pct:80,color:"#3b82f6"},{pct:95,color:"#3b82f6"},{pct:70,color:"#3b82f6"},{pct:85,color:"#3b82f6"},{pct:60,color:"#3b82f6"},{pct:45,color:"#3b82f6"},{pct:55,color:"#ef4444"},{pct:40,color:"#ef4444"}]} />
        </Card>
        <Card>
          <CardLabel>BTC DOMINANCE</CardLabel>
          <CardValue>62.4%</CardValue>
          <div style={{ fontSize: 11, color: "#10b981", marginTop: 4 }}>▲ +0.8%</div>
          <div style={{ marginTop: 12, height: 4, background: "#334155", borderRadius: 2 }}>
            <div style={{ width: "62.4%", height: "100%", background: "linear-gradient(90deg,#f59e0b,#f97316)", borderRadius: 2, boxShadow: "0 0 6px #f59e0b" }} />
          </div>
        </Card>
        <Card>
          <CardLabel>ACTIVE CRYPTOS</CardLabel>
          <CardValue>9,842</CardValue>
          <div style={{ fontSize: 11, color: "#10b981", marginTop: 4 }}>▲ +124 new</div>
          <div style={{ marginTop: 10, fontSize: 9, color: "#64748b" }}>
            <span style={{ color: "#10b981" }}>● </span>7,211 gainers &nbsp;
            <span style={{ color: "#ef4444" }}>● </span>2,631 losers
          </div>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Trending */}
        <div style={{ background: "#0f1520", border: "1px solid #1a2535", borderRadius: 10, padding: 16 }}>
          <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 11, fontWeight: 700, color: "#a855f7", marginBottom: 4, letterSpacing: 1 }}>🔥 TRENDING</div>
          <div style={{ fontSize: 9, color: "#64748b", marginBottom: 12, letterSpacing: 1 }}>MOST SEARCHED · LAST 24H</div>
          {[
            { rank:1, icon:"₿", color:"#f7931a", name:"Bitcoin",   sym:"BTC",  price:"$95,240", ch:3.21  },
            { rank:2, icon:"Ξ", color:"#627eea", name:"Ethereum",  sym:"ETH",  price:"$1,821",  ch:1.87  },
            { rank:3, icon:"◎", color:"#06b6d4", name:"Solana",    sym:"SOL",  price:"$148.30", ch:5.44  },
            { rank:4, icon:"◈", color:"#e84142", name:"Avalanche", sym:"AVAX", price:"$22.14",  ch:-1.02 },
          ].map(c => (
            <div key={c.sym} style={{ display:"flex", alignItems:"center", padding:"8px 0", borderBottom:"1px solid rgba(26,37,53,0.5)", fontSize:11, gap:10 }}>
              <span style={{ color:"#64748b", width:20, fontSize:10 }}>{c.rank}</span>
              <CoinIcon icon={c.icon} color={c.color} />
              <div style={{ flex:1 }}>
                <div>{c.name}</div>
                <div style={{ fontSize:10, color:"#64748b" }}>{c.sym}</div>
              </div>
              <div style={{ fontFamily:"'Orbitron',monospace", fontSize:11 }}>{c.price}</div>
              <PctBadge ch={c.ch} />
            </div>
          ))}
        </div>

        {/* Top Movers */}
        <div style={{ background: "#0f1520", border: "1px solid #1a2535", borderRadius: 10, padding: 16 }}>
          <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 11, fontWeight: 700, color: "#a855f7", marginBottom: 4, letterSpacing: 1 }}>📊 TOP MOVERS</div>
          <div style={{ fontSize: 9, color: "#64748b", marginBottom: 12, letterSpacing: 1 }}>LARGEST MARKET CAP ASSETS</div>
          {[
            { rank:1, icon:"Ꞥ", color:"#10b981", name:"Sui",       sym:"SUI",  price:"$3.84",  ch:18.2  },
            { rank:2, icon:"Ω", color:"#ef4444", name:"NEAR",      sym:"NEAR", price:"$2.91",  ch:12.7  },
            { rank:3, icon:"◬", color:"#3b82f6", name:"Render",    sym:"RNDR", price:"$4.22",  ch:-8.4  },
            { rank:4, icon:"⬡", color:"#f59e0b", name:"Injective", sym:"INJ",  price:"$12.66", ch:9.1   },
          ].map(c => (
            <div key={c.sym} style={{ display:"flex", alignItems:"center", padding:"8px 0", borderBottom:"1px solid rgba(26,37,53,0.5)", fontSize:11, gap:10 }}>
              <span style={{ color:"#64748b", width:20, fontSize:10 }}>{c.rank}</span>
              <CoinIcon icon={c.icon} color={c.color} />
              <div style={{ flex:1 }}>
                <div>{c.name}</div>
                <div style={{ fontSize:10, color:"#64748b" }}>{c.sym}</div>
              </div>
              <div style={{ fontFamily:"'Orbitron',monospace", fontSize:11 }}>{c.price}</div>
              <PctBadge ch={c.ch} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Portfolio() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 20 }}>
        <Card>
          <CardLabel>TOTAL VALUE</CardLabel>
          <CardValue>$24,812</CardValue>
          <div style={{ fontSize: 11, color: "#10b981", marginTop: 4 }}>▲ +$1,204 today</div>
          <AllocBar pct={100} />
        </Card>
        <Card>
          <CardLabel>24H PROFIT / LOSS</CardLabel>
          <CardValue color="#10b981">+$1,204</CardValue>
          <div style={{ fontSize: 11, color: "#10b981", marginTop: 4 }}>▲ +5.1% from yesterday</div>
          <AllocBar pct={51} gradient="linear-gradient(90deg,#10b981,#34d399)" />
        </Card>
        <Card>
          <CardLabel>HOLDINGS</CardLabel>
          <CardValue>7</CardValue>
          <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>Assets tracked</div>
          <div style={{ marginTop: 8, fontSize: 9, color: "#64748b" }}>Connect wallet to sync ↑</div>
        </Card>
      </div>

      <SectionTitle>Your Holdings</SectionTitle>
      <div style={{ background: "#0f1520", border: "1px solid #1a2535", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1.2fr 1fr 1fr 0.8fr", padding:"10px 16px", fontSize:9, color:"#64748b", letterSpacing:2, borderBottom:"1px solid #1a2535", background:"#0d1117" }}>
          <span>ASSET</span><span>PRICE</span><span>24H</span><span>VALUE</span><span>ALLOC</span>
        </div>
        {holdings.map(c => (
          <div key={c.sym} style={{ display:"grid", gridTemplateColumns:"2fr 1.2fr 1fr 1fr 0.8fr", padding:"12px 16px", fontSize:11, borderBottom:"1px solid rgba(26,37,53,0.4)", alignItems:"center" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <CoinIcon icon={c.icon} color={c.color} />
              <div><div>{c.name}</div><div style={{ fontSize:10, color:"#64748b" }}>{c.sym}</div></div>
            </div>
            <div>${c.price.toLocaleString()}</div>
            <PctBadge ch={c.change} />
            <div>${c.value.toLocaleString()}</div>
            <div>
              <div style={{ fontSize:10, marginBottom:4 }}>{c.alloc}%</div>
              <AllocBar pct={c.alloc} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Top100() {
  return (
    <div>
      <SectionTitle>Top 100 Coins by Market Cap</SectionTitle>
      <div style={{ background: "#0f1520", border: "1px solid #1a2535", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ display:"grid", gridTemplateColumns:"40px 2fr 1.2fr 1fr 1fr 1.2fr", padding:"10px 16px", fontSize:9, color:"#64748b", letterSpacing:2, borderBottom:"1px solid #1a2535", background:"#0d1117" }}>
          <span>#</span><span>NAME</span><span>PRICE</span><span>24H %</span><span>MARKET CAP</span><span>VOLUME</span>
        </div>
        {top100coins.map(c => (
          <div key={c.sym} style={{ display:"grid", gridTemplateColumns:"40px 2fr 1.2fr 1fr 1fr 1.2fr", padding:"11px 16px", fontSize:11, borderBottom:"1px solid rgba(26,37,53,0.3)", alignItems:"center" }}>
            <span style={{ color:"#64748b", fontSize:11 }}>{c.r}</span>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:24, height:24, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:"bold", flexShrink:0, background:`${c.color}22`, color:c.color }}>{c.icon}</div>
              <div><div style={{ fontSize:11 }}>{c.name}</div><div style={{ fontSize:10, color:"#64748b" }}>{c.sym}</div></div>
            </div>
            <div style={{ fontFamily:"'Orbitron',monospace", fontSize:11 }}>${c.price.toLocaleString()}</div>
            <PctBadge ch={c.ch} />
            <div style={{ fontSize:10, color:"#64748b" }}>{c.mcap}</div>
            <div style={{ fontSize:10, color:"#64748b" }}>{c.vol}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhaleTracker() {
  const [txns, setTxns] = useState<WhaleTx[]>(initialWhale);
  let nextId = initialWhale.length + 1;

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      const raw = freshTxns[idx % freshTxns.length];
      const tx: WhaleTx = { ...raw, id: nextId++ };
      setTxns(prev => [tx, ...prev.slice(0, 19)]);
      setTimeout(() => {
        setTxns(prev => prev.map(t => t.id === tx.id ? { ...t, fresh: false } : t));
      }, 2000);
      idx++;
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:20 }}>
        <Card><CardLabel>TXNS TRACKED (24H)</CardLabel><CardValue>2,841</CardValue><div style={{fontSize:11,color:"#10b981",marginTop:4}}>▲ High activity</div></Card>
        <Card><CardLabel>TOTAL MOVED (24H)</CardLabel><CardValue>$4.2B</CardValue><div style={{fontSize:11,color:"#10b981",marginTop:4}}>▲ +38% vs yesterday</div></Card>
        <Card><CardLabel>LARGEST SINGLE TX</CardLabel><CardValue>$420M</CardValue><div style={{fontSize:11,color:"#64748b",marginTop:4}}>BTC — 2h ago</div></Card>
      </div>

      <div style={{ background:"#0f1520", border:"1px solid #1a2535", borderRadius:10, overflow:"hidden" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px", borderBottom:"1px solid #1a2535", background:"#0d1117" }}>
          <div style={{ fontFamily:"'Orbitron',monospace", fontSize:11, fontWeight:700, color:"#a855f7", letterSpacing:1 }}>🐋 LIVE WHALE ACTIVITY</div>
          <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:9, color:"#10b981", letterSpacing:2 }}>
            <div style={{ width:5, height:5, borderRadius:"50%", background:"#10b981", boxShadow:"0 0 6px #10b981", animation:"pulse 1.2s infinite" }} />
            LIVE FEED
          </div>
        </div>
        {txns.map(tx => (
          <div key={tx.id} style={{
            display:"flex", alignItems:"center", gap:14, padding:"14px 18px",
            borderBottom:"1px solid rgba(26,37,53,0.4)",
            background: tx.fresh ? "rgba(124,58,237,0.08)" : undefined,
            borderLeft: tx.fresh ? "2px solid #7c3aed" : undefined,
            transition:"background 0.5s",
          }}>
            <TxTypeBadge type={tx.type} />
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:"'Orbitron',monospace", fontSize:13, fontWeight:700, color:"#e2e8f0", marginBottom:3 }}>
                {tx.amount} <span style={{ fontSize:10, color:"#64748b" }}>{tx.asset}</span>
              </div>
              <div style={{ fontSize:9, color:"#64748b", letterSpacing:1 }}>{tx.wallet}</div>
            </div>
            <div style={{ fontSize:10, color:"#334155" }}>{tx.time}</div>
            <div style={{ fontSize:9, padding:"3px 7px", borderRadius:4, background:"rgba(124,58,237,0.1)", color:"#a855f7", border:"1px solid rgba(124,58,237,0.2)", letterSpacing:1 }}>{tx.chain}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SIDEBAR NAV ─────────────────────────────────────────────────────────────

type Page = "dashboard" | "portfolio" | "top100" | "whale";

const NAV_SECTIONS = [
  {
    label: "PLATFORM",
    items: [
      { id: "dashboard" as Page, icon: "⬡", label: "Dashboard" },
      { id: null, icon: "📈", label: "Market Prices", soon: true },
      { id: null, icon: "⚡", label: "Alpha Feed", soon: true },
      { id: "portfolio" as Page, icon: "◈", label: "Portfolio" },
      { id: null, icon: "📜", label: "Smart Contracts", soon: true },
      { id: null, icon: "◎", label: "Tokens", soon: true },
      { id: null, icon: "⛓", label: "DeFi", soon: true },
    ],
  },
  {
    label: "MARKETS",
    items: [
      { id: "top100" as Page, icon: "🏆", label: "Top 100 Coins" },
      { id: null, icon: "🖼", label: "NFT Channel", soon: true },
    ],
  },
  {
    label: "INTEL",
    items: [
      { id: "whale" as Page, icon: "🐋", label: "Whale Tracker" },
      { id: null, icon: "🚀", label: "Pump Detector", soon: true },
      { id: null, icon: "💬", label: "Social Feed", soon: true },
    ],
  },
];

const PAGE_TITLES: Record<Page, string> = {
  dashboard: "Dashboard",
  portfolio: "Portfolio",
  top100: "Top 100 Coins",
  whale: "Whale Tracker",
};

// ─── ROOT COMPONENT ──────────────────────────────────────────────────────────

export default function CryptoIntel() {
  const [page, setPage] = useState<Page>("dashboard");

  return (
    <div style={{
      fontFamily: "'Share Tech Mono', monospace",
      background: "#080b10",
      color: "#e2e8f0",
      display: "flex",
      height: "100%",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* scanline overlay */}
      <div style={{ position:"absolute", inset:0, background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)", pointerEvents:"none", zIndex:9999 }} />

      {/* ── SIDEBAR ── */}
      <aside style={{ width:220, minWidth:220, background:"#0a0d14", borderRight:"1px solid #1a2535", display:"flex", flexDirection:"column", overflowY:"auto" }}>
        {/* Logo */}
        <div style={{ padding:"18px 16px 14px", borderBottom:"1px solid #1a2535" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:32, height:32, background:"linear-gradient(135deg,#7c3aed,#a855f7)", borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Orbitron',monospace", fontSize:10, fontWeight:900, color:"white", boxShadow:"0 0 20px rgba(124,58,237,0.3)" }}>404</div>
            <div>
              <div style={{ fontFamily:"'Orbitron',monospace", fontSize:13, fontWeight:700, color:"#a855f7", letterSpacing:2, textShadow:"0 0 10px rgba(168,85,247,0.6)" }}>GLITCH</div>
              <div style={{ fontSize:9, color:"#64748b", letterSpacing:3 }}>CRYPTO INTEL</div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div style={{ padding:"8px 16px", display:"flex", alignItems:"center", gap:6, fontSize:9, color:"#10b981", borderBottom:"1px solid #1a2535", background:"rgba(16,185,129,0.05)" }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:"#10b981", boxShadow:"0 0 6px #10b981" }} />
          SYSTEM OPERATIONAL
        </div>

        {/* Nav */}
        {NAV_SECTIONS.map(section => (
          <div key={section.label} style={{ padding:"14px 10px 6px" }}>
            <div style={{ fontSize:9, color:"#64748b", letterSpacing:3, padding:"0 6px 6px" }}>{section.label}</div>
            {section.items.map((item, i) => {
              const active = item.id && item.id === page;
              const disabled = !item.id;
              return (
                <div
                  key={i}
                  onClick={() => item.id && setPage(item.id)}
                  style={{
                    display:"flex", alignItems:"center", gap:10,
                    padding:"9px 10px", borderRadius:6, cursor: disabled ? "default" : "pointer",
                    fontSize:12, transition:"all 0.2s", position:"relative",
                    opacity: disabled ? 0.4 : 1,
                    color: active ? "#a855f7" : "#64748b",
                    background: active ? "rgba(124,58,237,0.15)" : undefined,
                    border: active ? "1px solid rgba(124,58,237,0.25)" : "1px solid transparent",
                  }}
                >
                  {active && <span style={{ position:"absolute", left:0, top:"20%", bottom:"20%", width:2, background:"#a855f7", borderRadius:2, boxShadow:"0 0 8px #7c3aed" }} />}
                  <span style={{ fontSize:14, width:16, textAlign:"center" }}>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.soon && <span style={{ marginLeft:"auto", fontSize:7, padding:"2px 5px", borderRadius:3, background:"rgba(124,58,237,0.2)", color:"#a855f7", border:"1px solid rgba(124,58,237,0.3)", letterSpacing:1 }}>SOON</span>}
                </div>
              );
            })}
          </div>
        ))}

        {/* Network badge */}
        <div style={{ margin:"auto 10px 12px", padding:"10px 12px", background:"#0f1520", border:"1px solid #1a2535", borderRadius:8, fontSize:10 }}>
          <div style={{ color:"#64748b", fontSize:8, letterSpacing:2, marginBottom:6 }}>NETWORK</div>
          <div style={{ display:"flex", alignItems:"center", gap:6, color:"#10b981" }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"#10b981", boxShadow:"0 0 6px #10b981" }} />
            Ethereum Mainnet
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        {/* Top bar */}
        <div style={{ padding:"12px 24px", borderBottom:"1px solid #1a2535", display:"flex", alignItems:"center", justifyContent:"space-between", background:"#0d1117" }}>
          <div style={{ fontFamily:"'Orbitron',monospace", fontSize:18, fontWeight:700, color:"#e2e8f0", letterSpacing:1 }}>
            {PAGE_TITLES[page]}
          </div>
          <button style={{
            display:"flex", alignItems:"center", gap:8, padding:"8px 16px",
            background:"linear-gradient(135deg,#7c3aed,#a855f7)", border:"none", borderRadius:6,
            color:"white", fontFamily:"'Share Tech Mono',monospace", fontSize:11, cursor:"pointer",
            letterSpacing:1, boxShadow:"0 0 20px rgba(124,58,237,0.3)",
          }}>
            ⬡ CONNECT WALLET
          </button>
        </div>

        {/* Content */}
        <div style={{ flex:1, overflowY:"auto", padding:24, scrollbarWidth:"thin", scrollbarColor:"#334155 transparent" }}>
          {page === "dashboard"  && <Dashboard />}
          {page === "portfolio"  && <Portfolio />}
          {page === "top100"     && <Top100 />}
          {page === "whale"      && <WhaleTracker />}
        </div>
      </div>
    </div>
  );
}
