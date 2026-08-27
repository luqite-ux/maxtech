from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter, ImageOps, ImageTransform


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/images/certificates/iso-9001.jpg"
OUTPUT = ROOT / "public/images/certificates/iso-9001-enhanced.jpg"


with Image.open(SOURCE) as source:
    image = ImageOps.exif_transpose(source).convert("RGB")

    # Map only the photographed paper area into a true rectangle.  The source
    # quadrilateral deliberately excludes the holder/tabletop on every edge.
    paper = image.transform(
        (1080, 1810),
        ImageTransform.QuadTransform(
            (
                5,
                92,     # top-left
                23,
                1855,   # bottom-left (inside the holder edge)
                1078,
                1871,   # bottom-right (inside the holder edge)
                1078,
                82,     # top-right
            )
        ),
        resample=Image.Resampling.BICUBIC,
    )

    # Conservative photographic cleanup. These operations retain the original
    # pixels and never synthesize certificate text, seals, signatures, or QR.
    paper = ImageOps.autocontrast(paper, cutoff=(0.15, 0.35), preserve_tone=True)
    paper = ImageEnhance.Color(paper).enhance(0.94)
    paper = ImageEnhance.Contrast(paper).enhance(1.035)
    paper = paper.filter(ImageFilter.UnsharpMask(radius=1.0, percent=70, threshold=4))

    paper.save(OUTPUT, format="JPEG", quality=94, subsampling=0, optimize=True)

print(OUTPUT)
