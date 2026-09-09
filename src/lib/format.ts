const FRACTIONS: Array<[number, string]> = [
  [1 / 8, "⅛"],
  [1 / 6, "⅙"],
  [1 / 4, "¼"],
  [1 / 3, "⅓"],
  [3 / 8, "⅜"],
  [1 / 2, "½"],
  [5 / 8, "⅝"],
  [2 / 3, "⅔"],
  [3 / 4, "¾"],
  [5 / 6, "⅚"],
  [7 / 8, "⅞"],
];

export function formatQty(n: number): string {
  if (!Number.isFinite(n)) return "";
  const sign = n < 0 ? "−" : "";
  const abs = Math.abs(n);
  if (abs < 0.02) return "0";
  const whole = Math.floor(abs + 1e-6);
  const frac = abs - whole;
  let glyph = "";
  let err = 0.045;
  for (const [value, g] of FRACTIONS) {
    const d = Math.abs(frac - value);
    if (d < err) {
      err = d;
      glyph = g;
    }
  }
  if (!glyph && frac > 0.04) {
    const dec = abs.toFixed(1).replace(/\.0$/, "");
    return sign + dec;
  }
  if (whole === 0) return sign + (glyph || "0");
  return sign + String(whole) + glyph;
}

export function formatIngredientLine(
  quantity: number,
  unit: string,
  label: string,
  scale: number,
): string {
  const q = quantity * scale;
  if (quantity === 0) return label;
  const qty = formatQty(q);
  if (!unit) return `${qty} ${label}`;
  const u = q > 1.05 ? pluralUnit(unit) : unit;
  return `${qty} ${u} ${label}`;
}

function pluralUnit(unit: string): string {
  if (unit === "clove") return "cloves";
  if (unit === "pinch") return "pinches";
  if (unit === "bunch") return "bunches";
  if (unit === "leaf") return "leaves";
  if (unit === "slice") return "slices";
  if (unit === "sprig") return "sprigs";
  if (unit === "stalk") return "stalks";
  if (unit === "cup") return "cups";
  return unit;
}

export function isoDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h && m) return `PT${h}H${m}M`;
  if (h) return `PT${h}H`;
  return `PT${m}M`;
}

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}
