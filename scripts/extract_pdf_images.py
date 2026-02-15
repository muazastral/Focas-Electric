from __future__ import annotations

import json
from pathlib import Path
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = ROOT / "[CP] FOCUS ELECTRICAL MALAYSIA (1).pdf"
OUT_DIR = ROOT / "public" / "pdf-images"
MANIFEST = ROOT / "data" / "pdf_page_images.json"


def main() -> None:
    if not PDF_PATH.exists():
        raise FileNotFoundError(f"PDF not found: {PDF_PATH}")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)

    reader = PdfReader(str(PDF_PATH))
    page_to_image: dict[str, str] = {}

    for page_idx, page in enumerate(reader.pages, start=1):
        images = list(getattr(page, "images", []))
        if not images:
            continue

        first = images[0]
        ext = "png"
        if getattr(first, "name", None) and "." in first.name:
            ext = first.name.rsplit(".", 1)[-1].lower()
        ext = "jpg" if ext == "jpeg" else ext
        rel_path = f"/pdf-images/page-{page_idx:03d}-1.{ext}"
        abs_path = ROOT / "public" / rel_path.lstrip("/")

        abs_path.parent.mkdir(parents=True, exist_ok=True)
        abs_path.write_bytes(first.data)
        page_to_image[str(page_idx)] = rel_path

    MANIFEST.write_text(json.dumps(page_to_image, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"Pages with images: {len(page_to_image)}")
    print(f"Manifest: {MANIFEST}")
    print(f"Images dir: {OUT_DIR}")


if __name__ == "__main__":
    main()
