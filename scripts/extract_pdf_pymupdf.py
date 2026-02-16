"""
Extract PDF pages into per-page folders using PyMuPDF (fitz).

Structure:
  public/pdf-catalog/
    page-001/
      page-001.png        (rendered page image)
      page-001-text.txt   (extracted text)
      img-001.png         (embedded image 1)
      img-002.png         (embedded image 2)
      ...
    page-002/
      ...

Usage:
  pip install PyMuPDF
  python scripts/extract_pdf_pymupdf.py
"""

import os
import sys
import json
import shutil
import fitz  # PyMuPDF

# ── Config ──────────────────────────────────────────────
PDF_PATH = os.path.join(os.path.dirname(__file__), "..", "[CP] FOCUS ELECTRICAL MALAYSIA (1).pdf")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "pdf-catalog")
OLD_IMAGES_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "pdf-images")
PAGES_JSON = os.path.join(os.path.dirname(__file__), "..", "data", "pdf_extracted_pymupdf.json")
DPI = 200  # render resolution

# ── Step 1: Clean old extractions ───────────────────────
def clean_old():
    """Remove old pdf-images folder and old output folder."""
    if os.path.exists(OLD_IMAGES_DIR):
        print(f"  Deleting old extraction: {OLD_IMAGES_DIR}")
        shutil.rmtree(OLD_IMAGES_DIR)
    if os.path.exists(OUTPUT_DIR):
        print(f"  Deleting previous pdf-catalog: {OUTPUT_DIR}")
        shutil.rmtree(OUTPUT_DIR)
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(os.path.dirname(PAGES_JSON), exist_ok=True)

# ── Step 2: Extract each page ───────────────────────────
def extract(pdf_path: str):
    doc = fitz.open(pdf_path)
    total = len(doc)
    print(f"  PDF has {total} pages")

    all_pages = []

    for page_num in range(total):
        page = doc[page_num]
        page_label = f"page-{page_num + 1:03d}"
        page_dir = os.path.join(OUTPUT_DIR, page_label)
        os.makedirs(page_dir, exist_ok=True)

        # ── 2a: Render page as PNG ──
        pix = page.get_pixmap(dpi=DPI)
        rendered_path = os.path.join(page_dir, f"{page_label}.png")
        pix.save(rendered_path)

        # ── 2b: Extract text ──
        text = page.get_text("text")
        text_path = os.path.join(page_dir, f"{page_label}-text.txt")
        with open(text_path, "w", encoding="utf-8") as f:
            f.write(text)

        # ── 2c: Extract embedded images ──
        img_list = page.get_images(full=True)
        image_files = []
        for img_idx, img_info in enumerate(img_list, 1):
            xref = img_info[0]
            try:
                base_image = doc.extract_image(xref)
                if base_image:
                    ext = base_image.get("ext", "png")
                    img_filename = f"img-{img_idx:03d}.{ext}"
                    img_path = os.path.join(page_dir, img_filename)
                    with open(img_path, "wb") as f:
                        f.write(base_image["image"])
                    image_files.append(img_filename)
            except Exception as e:
                print(f"    [WARN] Page {page_num + 1}, image {img_idx}: {e}")

        page_data = {
            "page": page_num + 1,
            "folder": page_label,
            "rendered_image": f"{page_label}.png",
            "text": text.strip(),
            "embedded_images": image_files,
        }
        all_pages.append(page_data)

        status = f"  [{page_num + 1}/{total}] {page_label}: {len(text.strip())} chars, {len(image_files)} images"
        print(status)

    doc.close()
    return all_pages


# ── Main ────────────────────────────────────────────────
if __name__ == "__main__":
    pdf = os.path.abspath(PDF_PATH)
    if not os.path.isfile(pdf):
        print(f"ERROR: PDF not found at {pdf}")
        sys.exit(1)

    print("=== PyMuPDF PDF Extraction ===")
    print(f"  Source: {pdf}")
    print()

    print("[1/3] Cleaning old extractions...")
    clean_old()

    print("[2/3] Extracting pages...")
    pages = extract(pdf)

    print("[3/3] Saving metadata JSON...")
    with open(PAGES_JSON, "w", encoding="utf-8") as f:
        json.dump(pages, f, indent=2, ensure_ascii=False)
    print(f"  Saved to {PAGES_JSON}")

    print()
    print(f"Done! {len(pages)} pages extracted to {OUTPUT_DIR}")
