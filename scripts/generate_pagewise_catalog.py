from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "pdf_extracted_python_pages.json"
IMAGES_SOURCE = ROOT / "data" / "pdf_page_images.json"
OUT_JSON = ROOT / "data" / "pdf_page_products.json"
OUT_TS = ROOT / "data" / "pdfPageProducts.ts"

MODEL_RE = re.compile(r"\b(?:AFG|PNE|VITALITE|KDK|PANASONIC|SELAMAT|MPCFC|PBA|GMF|SAC|ECO|NXR|TOYO|TS)[A-Z0-9\-\/\(\)\.]*\b", re.IGNORECASE)

SPELL_FIXES = {
    "RECCESSED": "RECESSED",
    "RECCESS": "RECESS",
    "INSTALATION": "INSTALLATION",
    "INCOSISTENT": "INCONSISTENT",
}

TITLE_KEYWORDS = [
    ("ledrecessedpanellight", "LED Recessed Panel Light"),
    ("ledsurfacepanellight", "LED Surface Panel Light"),
    ("ledfloodlight", "LED Flood Light"),
    ("ledt8tube", "LED T8 Tube"),
    ("ledstick", "LED Stick"),
    ("ledhighbay", "LED High Bay"),
    ("pvcconnector&fitting", "PVC Connector & Fitting"),
    ("pvcelectricaltape", "PVC Electrical Tape"),
    ("testpen", "Test Pen"),
    ("lvcables", "LV Cables"),
    ("flushswitches", "Flush Switches"),
    ("socketoutlets", "Socket Outlets"),
    ("telecommunicationoutlets", "Telecommunication Outlets"),
    ("metalcladseries", "Metal Clad Series"),
    ("elcb", "ELCB"),
    ("mcb", "MCB"),
    ("contactor", "Contactor"),
    ("mccb", "MCCB"),
    ("thermaloverloadrelay", "Thermal Overload Relay"),
    ("pvcaccessories", "PVC Accessories"),
    ("giflexibleconduit", "GI Flexible Conduit"),
    ("ventilation", "Ventilation"),
    ("regulatorfan", "Regulator Fan"),
    ("wallfan", "Wall Fan"),
    ("autofans", "Auto Fans"),
    ("exhaustfan", "Exhaust Fan"),
    ("industrial&turbofan", "Industrial & Turbo Fan"),
    ("emergencyluminaries", "Emergency Luminaries"),
    ("exit/keluarsigns", "Exit / Keluar Signs"),
    ("metaltrunking", "Metal Trunking"),
    ("trunkingaccessories", "Trunking Accessories"),
    ("cabletray", "Cable Tray"),
    ("topmirror", "Top Mirror"),
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
    normalized = re.sub(r"\b(?:[A-Za-z]\s+){3,}[A-Za-z]\b", lambda m: m.group(0).replace(" ", ""), normalized)
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


def build() -> list[dict]:
    data = json.loads(SOURCE.read_text(encoding="utf-8"))
    pages = data["pages"]
    page_images = json.loads(IMAGES_SOURCE.read_text(encoding="utf-8")) if IMAGES_SOURCE.exists() else {}

    entries: list[dict] = []
    idx = 1000

    for page in pages:
        page_no = int(page["page"])
        if page_no < 19 or page_no > 126:
            continue

        text = normalize_text(page.get("text", "") or "")
        models = sorted({m.upper() for m in MODEL_RE.findall(text) if len(m) > 3})
        if len(models) > 24:
            models = models[:24]

        title = title_from_page(page_no, text)
        category = infer_category(page_no, text)
        brand = infer_brand(text)

        image_path = page_images.get(str(page_no), f"/pdf-images/page-{page_no:03d}-1.png")

        entries.append(
            {
                "id": str(idx),
                "name": title,
                "category": category,
                "price": 0.0,
                "rating": 4,
                "image": image_path,
                "description": short_desc(text, page_no),
                "brand": brand,
                "availableAt": ["hq", "kuantan", "tas", "balok", "batu", "chukai"],
                "variants": [],
                "colors": [],
                "sizes": [],
                "lengths": [],
                "types": [f"Catalog Page {page_no}"],
                "choices": ["Reference", "Quotation On Request"],
                "modelCodes": models,
            }
        )
        idx += 1

    return entries


def main() -> None:
    entries = build()
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(entries, ensure_ascii=False, indent=2), encoding="utf-8")

    ts = (
        "import type { Product } from '../constants';\n\n"
        "export const PDF_PAGE_PRODUCTS: Product[] = "
        + json.dumps(entries, ensure_ascii=False, indent=2)
        + " as Product[];\n"
    )
    OUT_TS.write_text(ts, encoding="utf-8")

    print(f"Generated {len(entries)} page-wise products")
    print(f"JSON: {OUT_JSON}")
    print(f"TS  : {OUT_TS}")


if __name__ == "__main__":
    main()
