# ============================================================================
# Gera os icones da marca Oren.AI a partir do PNG oficial do emblema.
#
# POR QUE ISTO E UM SCRIPT, E NAO UM "SALVAR COMO" NA MAO:
#   1. o arquivo original tem muito preto em volta (o circulo ocupa ~58% do quadro);
#   2. o fundo e PRETO e a capa e azul-marinho — recorte quadrado deixaria um quadrado
#      preto visivel em cima do marinho;
#   3. o original traz uma MARCA D'AGUA de geracao no canto inferior direito, que nao e marca.
#
# O script MEDE o circulo (nao adivinha), recorta justo, aplica mascara circular com borda
# suavizada (canal alfa) e reduz para os tamanhos usados.
#
# Uso:
#   python ferramentas/gerar-icones-oren.py CAMINHO_DO_EMBLEMA.png
#
# Requer Pillow (`pip install Pillow`).
# ============================================================================
import os
import sys

from PIL import Image, ImageDraw

if len(sys.argv) < 2:
    print(__doc__)
    sys.exit(2)

ORIGEM = sys.argv[1]
DESTINO = sys.argv[2] if len(sys.argv) > 2 else os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public"
)

# Tamanhos e para que serve cada um.
SAIDAS = {
    "oren-ai-512.png": 512,   # usos grandes e imagem de compartilhamento
    "oren-ai-192.png": 192,   # cabecalho e heroi da capa (aguenta tela 2x)
    "oren-ai-180.png": 180,   # apple-touch-icon
    "oren-ai-64.png": 64,     # usos pequenos
    "oren-ai-32.png": 32,     # favicon
}

img = Image.open(ORIGEM).convert("RGBA")
W, H = img.size
px = img.load()
print(f"origem: {W}x{H}")


def eh_conteudo(p):
    """Distingue conteudo de fundo preto quase puro (o disco e azul-marinho, bem mais claro)."""
    r, g, b, _ = p
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) > 14


# --- 1. caixa do circulo, ignorando o canto inferior direito (marca d'agua) ---
x0 = y0 = 10 ** 9
x1 = y1 = -1
for y in range(H):
    for x in range(W):
        if not eh_conteudo(px[x, y]):
            continue
        # O canto inferior direito e onde vive a marca d'agua de geracao: fora da medida.
        if x > 0.80 * W and y > 0.80 * H:
            continue
        x0 = min(x0, x); y0 = min(y0, y)
        x1 = max(x1, x); y1 = max(y1, y)

if x1 < 0:
    print("nao encontrei conteudo na imagem — o fundo nao e preto?")
    sys.exit(1)

lado = max(x1 - x0 + 1, y1 - y0 + 1)
cx = (x0 + x1 + 1) / 2
cy = (y0 + y1 + 1) / 2
R = lado / 2
print(f"disco: centro ({cx:.1f}, {cy:.1f})  raio {R:.1f}  lado {lado}")

# --- 2. cor da marca (a menta do anel), medida e nao escolhida no olho ---------
soma = [0, 0, 0]
n = 0
for y in range(0, H, 3):
    for x in range(0, W, 3):
        r, g, b, _ = px[x, y]
        if g > r + 20 and g > 120:
            soma[0] += r; soma[1] += g; soma[2] += b; n += 1
if n:
    menta = tuple(round(c / n) for c in soma)
    print(f"cor da marca (media de {n} amostras): #{menta[0]:02x}{menta[1]:02x}{menta[2]:02x} rgb{menta}")

# --- 3. recorte quadrado com pequena folga ------------------------------------
folga = R * 0.012
meio = R + folga
recorte = img.crop((round(cx - meio), round(cy - meio), round(cx + meio), round(cy + meio)))
lado_rec = recorte.size[0]
print(f"recorte: {recorte.size}")

# --- 4. mascara circular com borda suavizada (desenha 4x e reduz) -------------
SUPER = 4
grande = lado_rec * SUPER
mascara = Image.new("L", (grande, grande), 0)
ImageDraw.Draw(mascara).ellipse(
    (grande / 2 - (R + folga) * SUPER, grande / 2 - (R + folga) * SUPER,
     grande / 2 + (R + folga) * SUPER, grande / 2 + (R + folga) * SUPER),
    fill=255,
)
recorte.putalpha(mascara.resize((lado_rec, lado_rec), Image.LANCZOS))

# --- 5. saidas ----------------------------------------------------------------
os.makedirs(DESTINO, exist_ok=True)
for nome, tam in SAIDAS.items():
    caminho = os.path.join(DESTINO, nome)
    recorte.resize((tam, tam), Image.LANCZOS).save(caminho, "PNG", optimize=True)
    print(f"  {nome}: {tam}x{tam}  {os.path.getsize(caminho)} bytes")
