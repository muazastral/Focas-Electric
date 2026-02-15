from __future__ import annotations

import json
from pathlib import Path
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = ROOT / "[CP] FOCUS ELECTRICAL MALAYSIA (1).pdf"
TXT_OUT = ROOT / "pdf_extracted_python_full.txt"
JSON_OUT = ROOT / "pdf_extracted_python_pages.json"


def main() -> None:
    if not PDF_PATH.exists():
        raise FileNotFoundError(f"PDF not found: {PDF_PATH}")

    reader = PdfReader(str(PDF_PATH))
    pages = []
    lines = []

    total_pages = len(reader.pages)

    for index, page in enumerate(reader.pages, start=1):
        text = page.extract_text() or ""
        normalized = text.replace("\r\n", "\n").replace("\r", "\n").strip()

        pages.append(
            {
                "page": index,
                "total_pages": total_pages,
                "char_count": len(normalized),
                "text": normalized,
            }
        )

        lines.append(f"-- {index} of {total_pages} --")
        lines.append("")
        lines.append(normalized)
        lines.append("")

    TXT_OUT.write_text("\n".join(lines), encoding="utf-8")
    JSON_OUT.write_text(
        json.dumps(
            {
                "source_pdf": PDF_PATH.name,
                "total_pages": total_pages,
                "pages": pages,
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )

    print(f"Extracted {total_pages} pages")
    print(f"Text output : {TXT_OUT}")
    print(f"JSON output : {JSON_OUT}")


if __name__ == "__main__":
    main()
