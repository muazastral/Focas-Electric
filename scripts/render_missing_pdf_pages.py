from __future__ import annotations

import json
import re
from pathlib import Path

import pypdfium2 as pdfium

ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = ROOT / "[CP] FOCUS ELECTRICAL MALAYSIA (1).pdf"
MANIFEST_PATH = ROOT / "data" / "pdf_page_images.json"
PRODUCTS_PATH = ROOT / "data" / "pdf_page_products.json"
OUT_DIR = ROOT / "public" / "pdf-images"


def main() -> None:
    if not PDF_PATH.exists() or not PRODUCTS_PATH.exists():
        raise FileNotFoundError("Required PDF or products JSON is missing")

    manifest = {}
    if MANIFEST_PATH.exists():
        manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))

    products = json.loads(PRODUCTS_PATH.read_text(encoding="utf-8"))
    missing_pages: set[int] = set()

    for item in products:
        image = str(item.get("image", ""))
        if image.startswith("/pdf-images/"):
            continue
        name = str(item.get("name", ""))
        m = re.search(r"\(Page\s+(\d+)\)", name)
        if m:
            missing_pages.add(int(m.group(1)))

    if not missing_pages:
        print("No missing page images to render")
        return

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    pdf = pdfium.PdfDocument(str(PDF_PATH))

    rendered = 0
    for page_no in sorted(missing_pages):
        if str(page_no) in manifest and str(manifest[str(page_no)]).startswith("/pdf-images/"):
            continue

        page = pdf[page_no - 1]
        bitmap = page.render(scale=2.0)
        pil_img = bitmap.to_pil()

        rel = f"/pdf-images/page-{page_no:03d}-render.png"
        out_path = ROOT / "public" / rel.lstrip("/")
        out_path.parent.mkdir(parents=True, exist_ok=True)
        pil_img.save(out_path, format="PNG")

        manifest[str(page_no)] = rel
        rendered += 1

    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"Missing pages identified: {len(missing_pages)}")
    print(f"Rendered pages: {rendered}")
    print(f"Updated manifest: {MANIFEST_PATH}")


if __name__ == "__main__":
    main()
