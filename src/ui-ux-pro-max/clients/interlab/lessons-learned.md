# Lekcje i rozwiązania problemów — Interlab Elementor

## 1. Flexbox Containers vs Section+Column (2026-03-06)

### Problem
Elementor ma dwa tryby struktury:
- **Stary:** `section` + `column` (domyślny w starszych instalacjach)
- **Nowy:** Flexbox Containers (`container` element)

Kiedy skrypt pushował JSON z `elType: "container"`, ale szablon Single Product Template
w Theme Builderze był ustawiony na starą strukturę `section`+`column`, layout się "rozsypywał" —
elementy nie ustawiały się obok siebie, a pod sobą.

### Rozwiązanie
Zmienić w Elementor → Theme Builder → Single Product Template strukturę z "Section"
na "Container" (Flexbox). Po tej zmianie wygenerowane kontenery renderują się poprawnie.

### Skrypt
Skrypt `build_stitch_layout.py` generuje JSON z `elType: "container"` — działa TYLKO
gdy szablon jest skonfigurowany na Flexbox.

---

## 2. Poprawne klucze settings w Elementor Flexbox (2026-03-06)

### Problem
Nazwy kluczy CSS Flexbox w Elementorze **NIE** są standardowymi nazwami CSS!

### Mapowanie kluczy

| CSS / intuicja | Elementor klucz | Opis |
|---|---|---|
| `gap` | **`flex_gap`** | Odstęp między elementami |
| `align-items` | **`flex_align_items`** | Wyrównanie w osi krzyżowej |
| `justify-content` | **`flex_justify_content`** | Wyrównanie w osi głównej |
| `width: 50%` | **`_column_size: 50`** + `width.size: null` | Szerokość dziecka |
| — | **`content_width: "full"`** | Wymagane dla inner containers |
| — | **`margin: pad(0,0,0,0)`** | Zerowy margin wymagany |

### Przykład poprawnego parent containera
```json
{
  "elType": "container",
  "isInner": false,
  "settings": {
    "flex_direction": "row",
    "flex_align_items": "stretch",
    "flex_gap": {"unit":"px","size":32},
    "padding": {"unit":"px","top":"60","right":"60","bottom":"60","left":"60","isLinked":false},
    "margin": {"unit":"px","top":"0","right":"0","bottom":"0","left":"0","isLinked":false},
    "background_background": "classic",
    "background_color": "#FFFFFF"
  }
}
```

### Przykład poprawnego child containera
```json
{
  "elType": "container",
  "isInner": true,
  "settings": {
    "_column_size": 50,
    "width": {"size": null, "unit": "%"},
    "content_width": "full",
    "flex_justify_content": "flex-start",
    "background_background": "classic",
    "background_color": "#FFFFFF",
    "padding": {"unit":"px","top":"0","right":"0","bottom":"0","left":"0","isLinked":false}
  }
}
```

---

## 3. WooCommerce Description Sync (2026-03-06)

### Problem
Po pushu `_elementor_data` do meta produktu, strona wyświetlała pustą zakładkę "Opis".
Elementor zapisuje dane w `_elementor_data`, ale WooCommerce **nie renderuje** tego pola.
WooCommerce wyświetla treść z pola `description`.

### Rozwiązanie
Po każdym pushu `_elementor_data` MUSISZ:
1. Odczytać wyrenderowany content: `GET /wp-json/wp/v2/product/{ID}?context=edit` → `content.rendered`
2. Wrzucić go do WC description: `PUT /wp-json/wc/v3/products/{ID}` → `{"description": rendered}`

```python
# OBOWIĄZKOWY krok po pushu _elementor_data:
rendered = requests.get(
    f"{WP_URL}/wp-json/wp/v2/product/{PRODUCT_ID}?context=edit",
    headers=WP_H, timeout=30
).json()["content"]["rendered"]
requests.put(
    f"{WP_URL}/wp-json/wc/v3/products/{PRODUCT_ID}",
    auth=WC_AUTH, json={"description": rendered}, timeout=30
)
```

**BEZ TEGO KROKU** strona produktu będzie pusta!

---

## 4. Workflow push layout do produktu WooCommerce

1. Zdefiniuj kontenery w Pythonie: `Box()`, `Row()`, `CBox()`
2. Zdefiniuj widgety: `H()`, `T()`, `IMG()`, `BTN()`, `ICO()`
3. Zbuduj `template = [S_HERO, S_SPECS, ...]`
4. Waliduj: `assert count_html(template) == 0` (ZERO HTML widgets!)
5. Push `_elementor_data` → `POST /wp-json/wp/v2/product/{ID}`
6. **Sync description** → `GET content.rendered` → `PUT /wp-json/wc/v3/products/{ID}`
7. Cache clear → `PUT meta_data` z pustymi wartościami `_elementor_element_cache`, `_elementor_css`
8. Weryfikacja wizualna w przeglądarce (Ctrl+Shift+R)
