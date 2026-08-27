from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageChops, ImageEnhance, ImageFilter


def _remove_uniform_background(image: Image.Image) -> Image.Image:
    rgb = image.convert("RGB")
    corners = (
        rgb.getpixel((0, 0)),
        rgb.getpixel((rgb.width - 1, 0)),
        rgb.getpixel((0, rgb.height - 1)),
        rgb.getpixel((rgb.width - 1, rgb.height - 1)),
    )
    background = tuple(sorted(pixel[channel] for pixel in corners)[len(corners) // 2] for channel in range(3))
    reference = Image.new("RGB", rgb.size, background)
    difference = ImageChops.difference(rgb, reference)
    red, green, blue = difference.split()
    distance = ImageChops.lighter(ImageChops.lighter(red, green), blue)
    alpha = distance.point(lambda value: 0 if value <= 8 else 255 if value >= 28 else round((value - 8) * 12.75))
    alpha = alpha.filter(ImageFilter.GaussianBlur(0.55))
    rgba = rgb.convert("RGBA")
    rgba.putalpha(alpha)
    return rgba


def _ensure_foreground(image: Image.Image, session=None) -> Image.Image:
    rgba = image.convert("RGBA")
    alpha = rgba.getchannel("A")
    if alpha.getextrema()[0] < 255:
        return rgba

    return _remove_uniform_background(image)


def _enhance_product(image: Image.Image) -> Image.Image:
    alpha = image.getchannel("A")
    rgb = image.convert("RGB")
    rgb = ImageEnhance.Contrast(rgb).enhance(1.04)
    rgb = ImageEnhance.Color(rgb).enhance(0.98)
    rgb = ImageEnhance.Sharpness(rgb).enhance(1.08)
    rgb.putalpha(alpha)
    return rgb


def process_image(
    source: Path,
    output: Path,
    *,
    canvas_size: tuple[int, int] = (1600, 1200),
    session=None,
) -> None:
    with Image.open(source) as opened:
        product = _ensure_foreground(opened, session=session)

    bbox = product.getchannel("A").getbbox()
    if not bbox:
        raise ValueError(f"No foreground detected in {source}")

    product = _enhance_product(product.crop(bbox))
    canvas_w, canvas_h = canvas_size
    safe_x = round(canvas_w * 0.08)
    safe_y = round(canvas_h * 0.08)
    shadow_room = round(canvas_h * 0.035)
    available_w = canvas_w - (2 * safe_x)
    available_h = canvas_h - (2 * safe_y) - shadow_room
    scale = min(available_w / product.width, available_h / product.height)
    resized = product.resize(
        (max(1, round(product.width * scale)), max(1, round(product.height * scale))),
        Image.Resampling.LANCZOS,
    )

    x = (canvas_w - resized.width) // 2
    y = (canvas_h - resized.height - shadow_room) // 2
    canvas = Image.new("RGBA", canvas_size, (0, 0, 0, 0))

    shadow_alpha = resized.getchannel("A").filter(ImageFilter.GaussianBlur(max(5, canvas_w // 130)))
    shadow_alpha = shadow_alpha.point(lambda value: round(value * 0.16))
    shadow = Image.new("RGBA", resized.size, (20, 24, 28, 0))
    shadow.putalpha(shadow_alpha)
    canvas.alpha_composite(shadow, (x, y + shadow_room))
    canvas.alpha_composite(resized, (x, y))

    output.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(output, "PNG", optimize=True)


def process_directory(source_root: Path, output_root: Path) -> None:
    sources = sorted(
        path for path in source_root.rglob("*") if path.suffix.lower() in {".jpg", ".jpeg", ".png"}
    )
    for index, source in enumerate(sources, start=1):
        relative = source.relative_to(source_root).with_suffix(".png")
        output = output_root / relative
        process_image(source, output)
        print(f"[{index:02d}/{len(sources):02d}] {relative.as_posix()}", flush=True)


def main() -> None:
    parser = argparse.ArgumentParser(description="Create transparent, normalized product catalogue images.")
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    process_directory(args.source, args.output)


if __name__ == "__main__":
    main()
