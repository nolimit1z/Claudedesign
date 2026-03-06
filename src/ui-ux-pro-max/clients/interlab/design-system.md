# Interlab — WordPress Product Page Design System
# Client context for UI/UX Pro Max skill

## Client

**Company:** Interlab Sp. z o.o.  
**Website:** https://interlab.computersoft.net.pl  
**Platform:** WordPress + WooCommerce + Elementor  
**Focus:** Scientific and medical research equipment (eye-tracking, biometrics, EEG, fNIR)

## Brand Colors

```
Interlab Black (primary):       #1A1A18
Interlab Yellow (primary CTA):  #FFCC00
Interlab White:                 #FFFFFF

Teal primary (UI accent):       #0891B2
Teal light (accent):            #22D3EE
Dark background main:           #050A0F
Dark background alt:            #0C1824
Card background:                #0F1E2D
Border (teal):                  rgba(8,145,178,0.18)
Text white:                     #FFFFFF
Text muted:                     #94A3B8
```

> **UWAGA:** Kolory marki firmy Interlab to: Czarny `#1A1A18`, Żółty `#FFCC00`, Biały `#FFFFFF`.
> CTA przyciski = żółte tło `#FFCC00` z czarnym tekstem `#1A1A18`.
> Teal `#0891B2` / `#22D3EE` to kolory UI/accent — nie są to kolory marki.

## Typography

- **Headings:** Rubik (Google Fonts) — weight 400/500/600/700/900
- **Body:** Nunito Sans (Google Fonts) — weight 300/400/500/600/700

```css
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700&family=Rubik:wght@400;500;600;700;900&display=swap');
```

## Established Design Pattern (v7 — Flexbox Containers)

> **CRITICAL RULE — ZERO `html` widgets (except 1 JS anchor, see below).**
> Elementor converts `text-editor` with `<style>`, `<div>`, `<table>` tags into `html` widgets.
> Use ONLY: `heading`, `text-editor` (plain text only), `image`, `video`, `button`,
> `icon`, `icon-list`, `divider`, `spacer`.
>
> **Karty (stat/app cards):** NIE używaj `icon-box`. Zamiast tego: `icon` + `heading` + `text-editor` osobno.
> **Checklisty:** NIE używaj `icon-list`. Zamiast tego: zagnieżdżony kontener row z `icon` + `text-editor`.
> **Tabele specyfikacji:** zagnieżdżone kontenery row zamiast HTML `<table>`.

### ⚠️ WAŻNE: Flexbox Containers zamiast Section+Column!

Od v7 używamy **Elementor Flexbox Containers** (`elType: "container"`) zamiast starej struktury `section` + `column`.
Szablon Single Product w Theme Builderze jest skonfigurowany na Flexbox.

**Stara struktura (NIE UŻYWAĆ):**
```python
# ❌ section + column — nie kompatybilne z nowym szablonem
{"id":eid(), "elType":"section", "elements":[{"elType":"column", ...}]}
```

**Nowa struktura (POPRAWNA):**
```python
# ✅ Flexbox container — zagnieżdżone kontenery
{"id":eid(), "elType":"container", "isInner":False,
 "settings":{"flex_direction":"row", "flex_gap":{"unit":"px","size":32},
             "flex_align_items":"stretch", "flex_justify_content":"flex-start"},
 "elements":[child_container_1, child_container_2]}
```

**Reference script (Flexbox):** `c:\Users\Użytkownik\Desktop\Antigravity\Skille\build_stitch_layout.py`
**Legacy script (section+column):** `c:\Users\Użytkownik\Desktop\Produkty stara strona\build_glasses_x_v6.py`

### Flexbox Container helpers (POPRAWNE klucze Elementora!)

> [!CAUTION]
> Elementor używa **`flex_gap`** (nie `gap`), **`flex_align_items`** (nie `align_items`),
> **`flex_justify_content`** (nie `justify_content`). Szerokość dziecka: **`_column_size`** + 
> `width.size = null` + `content_width = "full"`.

```python
def Box(elements, bg=WHITE, p=(0,0,0,0), radius=0, gap=20,
        d="column", align="stretch", justify="flex-start",
        col_size=None, isInner=False, border_c=""):
    s = {"flex_direction": d,
         "flex_align_items": align,          # ← NIE "align_items"!
         "flex_justify_content": justify,    # ← NIE "justify_content"!
         "flex_gap": {"unit":"px","size":gap},# ← NIE "gap"!
         "padding": pad(p[0],p[1],p[2],p[3]),
         "margin": pad(0,0,0,0),
         "background_background": "classic", "background_color": bg}
    if col_size is not None:
        s["_column_size"] = col_size         # ← szerokość: 50 = 50%
        s["width"] = {"size": None, "unit": "%"}  # ← size MUSI być None!
        s["content_width"] = "full"          # ← WYMAGANE dla child containers
    if radius: s["border_radius"] = rad(radius)
    if border_c: s.update({"border_border":"solid","border_width":pad(1,1,1,1),"border_color":border_c})
    return {"id":eid(),"elType":"container","isInner":isInner,"settings":s,"elements":elements}

def Row(elements, bg=WHITE, p=(0,0,0,0), gap=32, align="stretch"):
    return Box(elements, bg=bg, p=p, gap=gap, d="row", align=align)

def CBox(elements, cs=50, bg=WHITE, p=(0,0,0,0), radius=0, gap=16, ...):
    """Child container z _column_size (cs=50 → 50%)."""
    return Box(elements, bg=bg, p=p, radius=radius, gap=gap, col_size=cs, isInner=True, ...)
```

## Critical Implementation Rules

### 1. Prevent white bars between sections
Każdy kontener (`container`) musi mieć ustawiony `background_color`.
Nigdy nie zostawiaj `background_color` jako pustego — Elementor domyślnie dodaje białe tło.
Używaj naprzemiennie `BG = "#FFFFFF"` i `BG2 = "#F9F9F9"` dla jasnego tematu
lub `BG = "#050A0F"` i `BG2 = "#0C1824"` dla ciemnego tematu.

### 2. Buduj przez skrypt Python (NIE przez edytor Elementora ręcznie)
Struktura Elementora (JSON) jest budowana skryptem Python i wgrywana przez WP REST API.
Po każdej zmianie struktury uruchom skrypt, aby nie nadpisywać ręcznych zmian tekstów.

**Zasada:** Jeśli użytkownik robi zmiany ręcznie w Elementorze (tekst, zdjęcia) →
użyj `patch_*.py` (targetowany patch), NIE `build_*.py` (pełny build).

### 2b. OBOWIĄZKOWA synchronizacja WC description (CRITICAL!)
WooCommerce wyświetla treść produktu z pola `description`, a NIE bezpośrednio z `_elementor_data`.
Po pushu `_elementor_data` MUSISZ:
1. Odczytać wyrenderowany content: `GET /wp-json/wp/v2/product/{ID}?context=edit` → `content.rendered`
2. Wrzucić go do WC description: `PUT /wp-json/wc/v3/products/{ID}` → `{"description": rendered}`

```python
# ✅ OBOWIĄZKOWY krok po pushu _elementor_data:
rendered = requests.get(
    f"{WP_URL}/wp-json/wp/v2/product/{PRODUCT_ID}?context=edit",
    headers=WP_H, timeout=30
).json()["content"]["rendered"]
requests.put(
    f"{WP_URL}/wp-json/wc/v3/products/{PRODUCT_ID}",
    auth=WC_AUTH, json={"description": rendered}, timeout=30
)
```

> **BEZ TEGO KROKU** strona produktu będzie pusta (zakładka "Opis" nie wyświetli treści).
> To dotyczy WSZYSTKICH produktów WooCommerce.

### 3. Czcionka nagłówka H1 — weight 700, nie 900
Rubik 900 wygląda zbyt pogrubiony i komiksowy. Używaj `weight="700"` dla H1.
H2 i niższe także `"700"`. Badge (h6) — `"600"`.
```python
H("Nazwa produktu", "h1", TXT, 48, "700", lh=1.05)  # weight 700, nie 900
H("Podtytuł",       "h2", TEAL_L, 34, "700", lh=1.15)
H("EYE-TRACKING • TOBII", "h6", YLW, 11, "600", lh=1.4)
```

### 4. NIE używaj zdjęć generowanych przez AI
NIGDY nie używaj `generate_image` do tworzenia zdjęć produktów. Zawsze:
- Przeszukaj bibliotekę WordPress Media (`GET /wp-json/wp/v2/media?search={...}`)
- Użyj zdjęć z istniejących zasobów WP
- Jeśli brak dobrego zdjęcia — poproś użytkownika o jego dostarczenie

### 5. Specyfikacje — ZAWSZE ze strony producenta
Nigdy nie wpisuj speców z pamięci ani nie szacuj.
Przed budową strony:
1. Odwiedź oficjalną stronę producenta (np. tobii.com)
2. Odczytaj specs używając `read_url_content` lub `view_content_chunk`
3. Skopiuj dokładne wartości liczbowe

Przykład błędów których unikamy (Tobii Pro Glasses 3):
```
❌ Czas baterii: 3 godziny      →  ✔ 105 minut
❌ Kamera: 50 fps               →  ✔ 25 fps
❌ Waga: 73 g                   →  ✔ 76.5 g (z kablem)
❌ Próbkowanie: 100 Hz          →  ✔ 50 Hz lub 100 Hz
```

### 6. JS anchor musi szukać polskiego tekstu nagłówka
Gdy strona jest po polsku, JS anchor musi szukać polskiego tekstu "Specyfikacja techniczna" a NIE angielskiego.
Przykład:
```python
# ✅ PL — prawidłowo:
'if(hs[i].textContent.indexOf("Specyfikacja techniczna")>=0){'

# ❌ EN — błędnie (gdy strona jest po polsku):
'if(hs[i].textContent.indexOf("Technical specifications")>=0){'
```
Upewnij się, że szukany tekst JS odpowiada dokładnie tekstowi nagłówka sekcji specyfikacji.

### 7. Widget `video` NIE działa w opisie produktu WooCommerce
Elementor video widget nie renderuje się w kontekście opisu produktu WooCommerce (działa tylko na pełnych stronach Elementora).
Zamiast tego używaj zawsze widgetu `image`:
```python
# ❌ NIE działające w WC product description:
C([VID(url)], size=50, bg=BG)

# ✅ Prawidłowo — użyj image zamiast video:
C([IMG(url, "alt text")], size=50, bg=BG)
```
Najlepszym zamiennikiem jest atrakcyjne zdjęcie kadrowe lub screenshot z widocznym produktem w użyciu.

### 2. Image display rules

| Image type | object-fit | Container |
|---|---|---|
| Product on white bg (portrait-ish) | `contain` | padding: 32px, dark card bg |
| Use-case / people / environment | `cover` | height: 360–380px, no padding |
| App screenshot (landscape >1000px wide) | `cover` | height: 360px |
| App screenshot (portrait) | `contain` | padding: 24px, dark card bg |

> Always check image dimensions via WP Media API before choosing fit method.

### 3. WordPress API credentials

```python
WP_URL      = "https://interlab.computersoft.net.pl"
WP_USER     = "lukasz.dabrowski@interlab.pl"
WP_APP_PASS = "8fu6 m1lJ pY1L HF1l gnpw BtA0"
WC_KEY      = "ck_f199dd9bae2d3334a1f2e15c1af846a29ba230d1"
WC_SECRET   = "cs_008e95e94fec975e583535c13f12392039ca530c"
```

### 4. After every push — clear Elementor cache

```python
wc = requests.get(f"{WP_URL}/wp-json/wc/v3/products/{PRODUCT_ID}", auth=WC_AUTH).json()
el_meta = {m["key"]:m["id"] for m in wc.get("meta_data",[])
           if m["key"] in ("_elementor_element_cache","_elementor_css")}
if el_meta:
    requests.put(f"{WP_URL}/wp-json/wc/v3/products/{PRODUCT_ID}",
                 auth=WC_AUTH,
                 json={"meta_data":[{"id":v,"key":k,"value":""} for k,v in el_meta.items()]})
```

## Wzorzec natywnych widgetów (v6.1)

### Badge / etykieta sekcji
Użyj widgetu `heading` z tagiem `h6`, rozmiar 11px, weight 700, letter-spacing przez Custom CSS.
```python
H("PROSTOTA OBSŁUGI", "h6", YLW, 11, "700", lh=1.4)
```

### Karta statystyk / karta zastosowań (ICARD)
Zamiast `icon-box` — trzy osobne widgety:
```python
def ICARD(fa, title, desc, ic=TEAL_L, tc=TXT, dc=TXT_M, align="center", ts=15, icon_size=18):
    ico_w   = W("icon", {"icon":{"library":"fa-solid","value":fa}, "primary_color":ic, "size":{"unit":"px","size":icon_size}, "align":align})
    title_w = H(title, tag="h3", color=tc, size=ts, weight="700", align=align, lh=1.3)
    desc_w  = T(desc, color=dc, size=13, align=align, lh=1.55)
    return [ico_w, sp(10), title_w, sp(6), desc_w]
```

### Checklist (CHECKLIST) — zamiast icon-list
Każdy punkt to inner section z kolumnami `icon (8%) + text-editor (92%)`:
```python
def CHECKITEM(text, ic=TEAL_L, color=TXT_M):
    col_ico = {"id":eid(),"elType":"column","isInner":False,
               "settings":{"_column_size":8,"content_position":"top","padding":pad(3,6,0,0)},
               "elements":[W("icon",{"icon":{"library":"fa-solid","value":"fas fa-check"},
                              "primary_color":ic,"size":{"unit":"px","size":13},"align":"center"})]}
    col_txt = {"id":eid(),"elType":"column","isInner":False,
               "settings":{"_column_size":92,"content_position":"top","padding":pad(0,0,6,0)},
               "elements":[T(text, color=color, size=15, lh=1.5)]}
    return {"id":eid(),"elType":"section","isInner":True,
            "settings":{"padding":P0,"margin":P0,"gap":"custom","gap_columns_custom":{"unit":"px","size":0}},
            "elements":[col_ico, col_txt]}

def CHECKLIST(items, ic=TEAL_L, color=TXT_M):
    return [CHECKITEM(item, ic=ic, color=color) for item in items]
# Użycie: *CHECKLIST(["punkt 1", "punkt 2"])
```

### Tabela specyfikacji — inner sections z kolumnami
```python
def spec_row(label, value, alt=False):
    row_bg = "rgba(8,145,178,0.04)" if alt else "transparent"
    return isec([
        C([T(label, color=TXT_M, size=13, lh=1.3)], size=50, bg=row_bg, pt=11, pb=11, pl=16, pr=8),
        C([T(value, color=TXT,   size=13, lh=1.3)], size=50, bg=row_bg, pt=11, pb=11, pl=8,  pr=16),
    ], bg=row_bg, gap=0)
```

## Ograniczenia WooCommerce — ważna wiedza

### Problem: WooCommerce usuwa id= z opisu produktu
WordPress filtruje atrybuty `id=` z treści opisu produktu przez `wp_kses_post`.
Dlatego `css_id` ustawiony na sekcji Elementora **NIE pojawi się** w wyrenderowanym HTML.
Ankory (`#specyfikacja` itp.) nie działają natywnie.

### Rozwiązanie: 1 widget html z JS na końcu opisu
Dodaj JEDEN niewidoczny widget `html` na samym końcu opisu z JavaScript:
```javascript
(function(){
  function initAnchor(){
    var headers = document.querySelectorAll(".elementor-widget-heading .elementor-heading-title");
    var target = null;
    for(var i=0;i<headers.length;i++){
      if(headers[i].textContent.indexOf("Specyfikacja techniczna")>=0){
        var el=headers[i];
        while(el&&!el.classList.contains("elementor-section")&&el!==document.body){el=el.parentElement;}
        if(el&&el.classList.contains("elementor-section")){target=el;break;}
      }
    }
    if(target){
      target.id="specyfikacja";
      document.querySelectorAll('a[href="#specyfikacja"]').forEach(function(a){
        a.addEventListener("click",function(e){
          e.preventDefault();
          target.scrollIntoView({behavior:"smooth",block:"start"});
          history.replaceState(null,"",window.location.pathname); // bez zmiany URL
        });
      });
    }
  }
  if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",initAnchor);}else{initAnchor();}
  document.addEventListener("click",function(e){
    if(e.target&&e.target.closest(".woocommerce-tabs .tab")){setTimeout(initAnchor,300);}
  });
})();
```
**Patch script:** `patch_scroll_js.py` — NIE nadpisuje ręcznych zmian.

## Workflow dla nowego produktu

1. Znajdź ID produktu: `GET /wp-json/wp/v2/product?slug={slug}`
2. Znajdź media: `GET /wp-json/wp/v2/media?search={słowo_kluczowe}`
3. Sprawdź wymiary zdjęć w odpowiedzi API (`media_details.width/height`)
4. Skopiuj `build_stitch_layout.py` → zmień nazwę na `build_{nazwa_produktu}.py`
5. Zaktualizuj: `PRODUCT_ID`, URL-e zdjęć, teksty po polsku, dane specyfikacji
6. Uruchom skrypt → sprawdź `Status: 200` i `HTML widgets: 0`
7. **SYNC description** — skrypt automatycznie kopiuje rendered content do WC description
8. Cache czyści się automatycznie w skrypcie
9. Sprawdź wizualnie w przeglądarce (F5 na twardo)
10. Opcjonalnie: dodaj scroll JS przez `patch_scroll_js.py` (jeśli strona ma przyciski-ankory)

## Workflow Stitch → Elementor

1. Zaprojektuj UI w Stitch (MCP tool `generate_screen_from_text` / `edit_screens`)
2. Pobierz wygenerowany HTML ze Stitcha (download link z response)
3. Przeanalizuj HTML strukturę i mapuj na Flexbox kontenery
4. Napisz skrypt Python z `Box()` / `Row()` / `CBox()` helperami
5. Push + Sync description + Cache clear
6. Weryfikacja wizualna w przeglądarce

## Pliki referencyjne

| Plik | Produkt | Opis |
|---|---|---|
| `build_stitch_layout.py` | Tobii Pro Glasses 3 | **Wzorcowy build — Flexbox containers, v7** |
| `build_glasses_x_v6.py` | Tobii Glasses X | Legacy build — section+column, v6.1 |
| `build_glasses_3_v1.py` | Tobii Pro Glasses 3 | Legacy build — section+column |
| `patch_scroll_js.py` | — | Patch: JS scroll widget — zachowuje ręczne zmiany |
| `patch_glasses3_images.py` | Tobii Pro Glasses 3 | Patch: podmiana zdjęć per-sekcja |
| `check_html_anchor.py` | — | Debug: czy id= jest w wyrenderowanym HTML |
| `check_widgets.py` | — | Debug: wypisuje wszystkie typy widgetów z WP |
