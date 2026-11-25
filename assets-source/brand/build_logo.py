"""Build the Outnext logo files.

Usage: python build_logo.py <project_root>
Writes public/brand/*.svg and src/app/icon.svg. Wordmark is Geist SemiBold, converted to outlines.
"""
import math, sys, pathlib
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen

root = pathlib.Path(sys.argv[1])
brand = root / "public" / "brand"
brand.mkdir(parents=True, exist_ok=True)

CYAN, AZURE, INK, BASE = "#36d1ff", "#4f7bff", "#e8edf5", "#070a10"


def pt(cx, cy, r, deg):
    a = math.radians(deg)
    return cx + r * math.cos(a), cy + r * math.sin(a)


def arc(cx, cy, r, start, end):
    x1, y1 = pt(cx, cy, r, start)
    x2, y2 = pt(cx, cy, r, end)
    large = 1 if (end - start) % 360 > 180 else 0
    return f"M{x1:.2f} {y1:.2f}A{r} {r} 0 {large} 1 {x2:.2f} {y2:.2f}"


# Mark geometry (64-unit design grid): an "O" that opens forward into a chevron.
RING = arc(25, 32, 17, 48, 312)
CHEVRON = "M41 21L52 32L41 43"
MARK_BOX = (4, 11, 52, 42)  # x, y, w, h: tight bounds incl. stroke


def grad(gid):
    return (f'<linearGradient id="{gid}" x1="8" y1="14" x2="50" y2="50" gradientUnits="userSpaceOnUse">'
            f'<stop offset="0" stop-color="{CYAN}"/><stop offset="1" stop-color="{AZURE}"/></linearGradient>')


def mark_paths(gid):
    return (f'<path d="{RING}" fill="none" stroke="url(#{gid})" stroke-width="7" stroke-linecap="round"/>'
            f'<path d="{CHEVRON}" fill="none" stroke="url(#{gid})" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>')


# Wordmark outlines
font = TTFont(root / "node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.ttf")
gs, cmap, hmtx = font.getGlyphSet(), font.getBestCmap(), font["hmtx"]
upm = font["head"].unitsPerEm
cap = font["OS/2"].sCapHeight

FONT_SIZE = 40
scale = FONT_SIZE / upm
TRACK = -0.035 * upm
pen_x, paths = 0.0, []
for ch in "Outnext":
    g = cmap[ord(ch)]
    p = SVGPathPen(gs)
    gs[g].draw(p)
    paths.append(f'<path transform="translate({pen_x:.1f} 0)" d="{p.getCommands()}"/>')
    pen_x += hmtx[g][0] + TRACK
word_w = (pen_x - TRACK) * scale

mx, my, mw, mh = MARK_BOX
GAP = 11
text_x = mx + mw + GAP
baseline = 32 + cap * scale / 2  # optically centre caps on the mark
total_w = text_x + word_w - mx + 2
total_h = mh


def lockup(word_fill, gid):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{mx} {my} {total_w:.1f} {total_h}" '
            f'width="{total_w * 4:.0f}" height="{total_h * 4:.0f}" role="img" aria-label="Outnext">'
            f'<defs>{grad(gid)}</defs>{mark_paths(gid)}'
            f'<g fill="{word_fill}" transform="translate({text_x:.2f} {baseline:.2f}) scale({scale:.5f} {-scale:.5f})">{"".join(paths)}</g></svg>')


mark_svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{mx} {my} {mw} {mh}" width="{mw * 8}" height="{mh * 8}" '
            f'role="img" aria-label="Outnext"><defs>{grad("om")}</defs>{mark_paths("om")}</svg>')

icon_svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="{BASE}"/>'
            f'<defs>{grad("oi")}</defs><g transform="translate(32 32) scale(0.95) translate(-30 -32)">{mark_paths("oi")}</g></svg>')

(brand / "outnext-logo.svg").write_text(lockup(INK, "ol"), encoding="utf-8")
(brand / "outnext-logo-dark.svg").write_text(lockup(BASE, "od"), encoding="utf-8")
(brand / "outnext-mark.svg").write_text(mark_svg, encoding="utf-8")
(root / "src/app/icon.svg").write_text(icon_svg, encoding="utf-8")
print(f"lockup viewBox {total_w:.1f} x {total_h}  ratio {total_w / total_h:.3f}")
