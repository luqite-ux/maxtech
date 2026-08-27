import tempfile
import unittest
from pathlib import Path

from PIL import Image, ImageDraw

from scripts.process_product_images import process_image


class ProcessProductImageTests(unittest.TestCase):
    def test_rgb_white_background_becomes_transparent_without_erasing_metal(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            source = root / "source.jpg"
            output = root / "output.png"

            image = Image.new("RGB", (240, 180), (250, 250, 248))
            draw = ImageDraw.Draw(image)
            draw.rectangle((45, 35, 195, 145), fill=(205, 208, 212))
            draw.ellipse((85, 65, 155, 135), fill=(250, 250, 248))
            image.save(source, quality=100)

            process_image(source, output, canvas_size=(400, 300))

            result = Image.open(output)
            self.assertEqual(result.getpixel((0, 0))[3], 0)
            self.assertGreater(result.getchannel("A").getbbox()[2], 250)

    def test_output_is_transparent_and_keeps_subject_inside_safe_margin(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            source = root / "source.png"
            output = root / "output.png"

            image = Image.new("RGBA", (240, 180), (0, 0, 0, 0))
            draw = ImageDraw.Draw(image)
            draw.rectangle((40, 35, 200, 150), fill=(48, 52, 58, 255))
            image.save(source)

            process_image(source, output, canvas_size=(400, 300))

            self.assertTrue(source.exists(), "source image must not be overwritten")
            result = Image.open(output)
            self.assertEqual(result.mode, "RGBA")
            self.assertEqual(result.size, (400, 300))
            self.assertEqual(result.getpixel((0, 0))[3], 0)
            bbox = result.getchannel("A").getbbox()
            self.assertIsNotNone(bbox)
            self.assertGreaterEqual(bbox[0], 24)
            self.assertGreaterEqual(bbox[1], 18)
            self.assertLessEqual(bbox[2], 376)
            self.assertLessEqual(bbox[3], 282)


if __name__ == "__main__":
    unittest.main()
