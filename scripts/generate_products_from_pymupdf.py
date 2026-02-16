"""
Scan the PyMuPDF-extracted per-page folders and regenerate product entries.

Reads:  data/pdf_extracted_pymupdf.json
Scans:  public/pdf-catalog/page-XXX/
Writes: data/pdf_page_products.json
        data/pdfPageProducts.ts

Also generates a mapping file for updating old image references.

Usage:
  python scripts/generate_products_from_pymupdf.py
"""

from __future__ import annotations

import json
import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE_JSON = ROOT / "data" / "pdf_extracted_pymupdf.json"
CATALOG_DIR = ROOT / "public" / "pdf-catalog"
OUT_JSON = ROOT / "data" / "pdf_page_products.json"
OUT_TS = ROOT / "data" / "pdfPageProducts.ts"
IMAGE_MAP_JSON = ROOT / "data" / "image_path_migration.json"

MODEL_RE = re.compile(
    r"\b(?:AFG|PNE|VITALITE|KDK|PANASONIC|SELAMAT|MPCFC|PBA|GMF|SAC|ECO|NXR|TOYO|TS|SJ|DNF)[A-Z0-9\-\/\(\)\.]*\b",
    re.IGNORECASE,
)

VARIANT_RE = re.compile(r"\b(?:round|square|surface|recessed|slim|mini|standard|premium|heavy\s*duty|outdoor|indoor)\b", re.IGNORECASE)
COLOR_RE = re.compile(r"\b(?:white|black|grey|gray|silver|gold|red|blue|green|yellow|daylight|warm\s*white|cool\s*white|neutral\s*white|\d{4}K)\b", re.IGNORECASE)
SIZE_RE = re.compile(r"\b(?:\d+(?:\.\d+)?(?:\s*(?:mm|cm|m|inch|ft|W|A|\"))\b)", re.IGNORECASE)

SPELL_FIXES = {
    "RECCESSED": "RECESSED",
    "RECCESS": "RECESS",
    "INSTALATION": "INSTALLATION",
}

TITLE_KEYWORDS = [
    ("ledrecessedpanellight", "LED Recessed Panel Light"),
    ("ledsurfacepanellight", "LED Surface Panel Light"),
    ("ledpanellight", "LED Panel Light"),
    ("ledfloodlight", "LED Flood Light"),
    ("ledt8tube", "LED T8 Tube"),
    ("ledt5tube", "LED T5 Tube"),
    ("ledstick", "LED Stick"),
    ("ledhighbay", "LED High Bay"),
    ("leddownlight", "LED Downlight"),
    ("ledstrip", "LED Strip"),
    ("ledbulb", "LED Bulb"),
    ("pvcconnector", "PVC Connector & Fitting"),
    ("pvcelectricaltape", "PVC Electrical Tape"),
    ("pvcconduit", "PVC Conduit"),
    ("pvcaccessories", "PVC Accessories"),
    ("testpen", "Test Pen"),
    ("lvcables", "LV Cables"),
    ("flushswitch", "Flush Switches"),
    ("socketoutlet", "Socket Outlets"),
    ("telecommunicationoutlet", "Telecommunication Outlets"),
    ("metalclad", "Metal Clad Series"),
    ("elcb", "ELCB"),
    ("rccb", "RCCB"),
    ("mcb", "MCB"),
    ("contactor", "Contactor"),
    ("mccb", "MCCB"),
    ("thermaloverload", "Thermal Overload Relay"),
    ("giflexibleconduit", "GI Flexible Conduit"),
    ("girigidconduit", "GI Rigid Conduit"),
    ("ventilation", "Ventilation Fan"),
    ("regulatorfan", "Regulator Fan"),
    ("wallfan", "Wall Fan"),
    ("autofan", "Auto Fan"),
    ("exhaustfan", "Exhaust Fan"),
    ("ceilingfan", "Ceiling Fan"),
    ("industrial", "Industrial Fan"),
    ("turbofan", "Turbo Fan"),
    ("emergencyluminari", "Emergency Luminaries"),
    ("exitkeluar", "Exit / Keluar Signs"),
    ("metaltrunking", "Metal Trunking"),
    ("trunkingaccessor", "Trunking Accessories"),
    ("cabletray", "Cable Tray"),
    ("topmirror", "Top Mirror"),
    ("wireconnector", "Wire Connector"),
    ("distributionboard", "Distribution Board"),
    ("switchboard", "Switch Board"),
]


def infer_category(page_no: int, text: str) -> str:
    t = text.lower()
    if 19 <= page_no <= 33:
        if "test pen" in t:
            return "Tools"
        if "conduit" in t or "tape" in t:
            return "Cables"
        return "Lighting"
    if 35 <= page_no <= 49:
        return "Cables"
    if 51 <= page_no <= 60:
        return "Switches"
    if 62 <= page_no <= 66:
        return "Distribution Boards"
    if 68 <= page_no <= 79:
        return "Cables"
    if 81 <= page_no <= 91:
        return "Fans"
    if 93 <= page_no <= 98:
        return "Cables"
    if 100 <= page_no <= 106:
        return "Lighting"
    if 108 <= page_no <= 117:
        return "Industrial"
    if 119 <= page_no <= 122:
        return "Industrial"
    if 124 <= page_no <= 126:
        return "Lighting"
    return "Industrial"


def infer_brand(text: str) -> str:
    u = text.upper()
    brand_map = {
        "HIKARI": "HIKARI",
        "PNE": "PNE",
        "VITALITE": "VITALITE",
        "KDK": "KDK",
        "PANASONIC": "Panasonic",
        "SCHNEIDER": "Schneider Electric",
        "ABB": "ABB",
        "MEGA KABEL": "Mega Kabel",
        "TONN": "Tonn Cable",
        "DNF": "DNF Cable",
        "PVC LINK": "PVC LINK",
        "FIGHTER": "Fighter",
        "KYODO": "Kyodo",
        "SMART": "Smart",
        "SJ LITE": "SJ Lite",
        "GOODLITE": "Goodlite",
        "VENVOLTA": "Venvolta",
    }
    for key, label in brand_map.items():
        if key in u:
            return label
    return "Focus Electrical"


def normalize_text(text: str) -> str:
    normalized = text.replace("\r\n", "\n").replace("\r", "\n")
    for wrong, right in SPELL_FIXES.items():
        normalized = re.sub(rf"\b{wrong}\b", right, normalized, flags=re.IGNORECASE)
    return normalized


def title_from_page(page_no: int, text: str) -> str:
    compact = re.sub(r"[^a-z0-9&/]", "", text.lower())
    for key, label in TITLE_KEYWORDS:
        if key in compact:
            return f"{label} (Page {page_no})"
    return f"Catalog Reference (Page {page_no})"


def short_desc(text: str, page_no: int) -> str:
    compact = " ".join(text.split())
    if len(compact) > 220:
        compact = compact[:217] + "..."
    return f"PDF catalog page {page_no}: {compact}" if compact else f"PDF catalog page {page_no} reference entry."


def extract_variants(text: str) -> list[str]:
    found = sorted(set(m.strip().title() for m in VARIANT_RE.findall(text)))
    return found[:8]


def extract_colors(text: str) -> list[str]:
    found = sorted(set(m.strip().title() for m in COLOR_RE.findall(text)))
    return found[:8]


def extract_sizes(text: str) -> list[str]:
    found = sorted(set(m.strip() for m in SIZE_RE.findall(text)))
    return found[:10]


def pick_best_image(page_data: dict) -> str:
    """Pick the best image for a product from the extracted folder."""
    folder = page_data["folder"]
    embedded = page_data.get("embedded_images", [])
    
    # Prefer embedded images (actual product photos) over rendered page
    for img in embedded:
        ext = img.rsplit(".", 1)[-1].lower()
        if ext in ("jpg", "jpeg", "png"):
            return f"/pdf-catalog/{folder}/{img}"
    
    # Fall back to rendered full page image
    return f"/pdf-catalog/{folder}/{page_data['rendered_image']}"


def build_image_migration_map(pages_data: list[dict]) -> dict[str, str]:
    """Build a mapping from old /pdf-images/page-XXX-N.ext to new paths."""
    migration = {}
    for page in pages_data:
        page_no = page["page"]
        folder = page["folder"]
        embedded = page.get("embedded_images", [])
        
        # Map old patterns to new ones
        # Old format: /pdf-images/page-XXX-1.jpg or .png
        for old_ext in ["jpg", "png", "jpeg"]:
            old_path = f"/pdf-images/page-{page_no:03d}-1.{old_ext}"
            if embedded:
                migration[old_path] = f"/pdf-catalog/{folder}/{embedded[0]}"
            else:
                migration[old_path] = f"/pdf-catalog/{folder}/{folder}.png"
        
        # Also map for any -N suffix (up to 10)
        for n in range(2, 11):
            for old_ext in ["jpg", "png"]:
                old_path = f"/pdf-images/page-{page_no:03d}-{n}.{old_ext}"
                img_idx = n - 1
                if img_idx < len(embedded):
                    migration[old_path] = f"/pdf-catalog/{folder}/{embedded[img_idx]}"
                else:
                    migration[old_path] = f"/pdf-catalog/{folder}/{folder}.png"
    
    return migration


def build() -> tuple[list[dict], dict[str, str]]:
    data = json.loads(SOURCE_JSON.read_text(encoding="utf-8"))

    entries: list[dict] = []
    idx = 1000

    for page in data:
        page_no = page["page"]
        if page_no < 19 or page_no > 126:
            continue

        text = normalize_text(page.get("text", "") or "")
        models = sorted({m.upper() for m in MODEL_RE.findall(text) if len(m) > 3})
        if len(models) > 24:
            models = models[:24]

        title = title_from_page(page_no, text)
        category = infer_category(page_no, text)
        brand = infer_brand(text)
        image = pick_best_image(page)

        # Auto-extract variant info from text
        variants = extract_variants(text)
        colors = extract_colors(text)
        sizes = extract_sizes(text)

        entries.append(
            {
                "id": str(idx),
                "name": title,
                "category": category,
                "price": 0.0,
                "rating": 4,
                "image": image,
                "description": short_desc(text, page_no),
                "brand": brand,
                "availableAt": ["hq", "kuantan", "tas", "balok", "batu", "chukai"],
                "variants": variants,
                "colors": colors,
                "sizes": sizes,
                "lengths": [],
                "types": [f"Catalog Page {page_no}"],
                "choices": ["Reference", "Quotation On Request"],
                "modelCodes": models,
            }
        )
        idx += 1

    migration = build_image_migration_map(data)
    return entries, migration


def main() -> None:
    entries, migration = build()
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(entries, ensure_ascii=False, indent=2), encoding="utf-8")

    ts_lines = (
        "import type { Product } from '../constants';\n\n"
        "export const PDF_PAGE_PRODUCTS: Product[] = "
        + json.dumps(entries, ensure_ascii=False, indent=2)
        + " as Product[];\n"
    )
    OUT_TS.write_text(ts_lines, encoding="utf-8")

    # Save migration map for updating old image references
    IMAGE_MAP_JSON.write_text(json.dumps(migration, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"Generated {len(entries)} page-wise products")
    print(f"JSON: {OUT_JSON}")
    print(f"TS  : {OUT_TS}")
    print(f"Image migration map: {IMAGE_MAP_JSON} ({len(migration)} entries)")

    # Show some stats
    with_variants = sum(1 for e in entries if e["variants"])
    with_colors = sum(1 for e in entries if e["colors"])
    with_sizes = sum(1 for e in entries if e["sizes"])
    with_models = sum(1 for e in entries if e["modelCodes"])
    print(f"\nAuto-extracted data:")
    print(f"  Products with variants: {with_variants}")
    print(f"  Products with colors:   {with_colors}")
    print(f"  Products with sizes:    {with_sizes}")
    print(f"  Products with models:   {with_models}")


if __name__ == "__main__":
    main()
