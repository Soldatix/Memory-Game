from pathlib import Path
import re

index_path = Path("index.html")
html = index_path.read_text(encoding="utf-8")

if 'rel="canonical" href="https://memory.appsandgames.org/"' not in html:
    html = re.sub(
        r'<title>.*?</title>',
        '<title>Memory Game — Free Matching Pairs Game | Apps & Games</title>',
        html,
        count=1,
        flags=re.S,
    )

    seo = '''\n  <meta name="description" content="Play Memory Game, a free multilingual matching-pairs browser game with six themes, four difficulty levels, saved progress, fullscreen and best scores." />\n  <meta name="keywords" content="memory game, matching pairs, matching game, brain game, memory puzzle, concentration game, kids memory game, free browser game, Apps & Games" />\n  <meta name="author" content="Soldatix" />\n  <meta name="robots" content="index, follow" />\n  <link rel="canonical" href="https://memory.appsandgames.org/" />\n\n  <meta property="og:type" content="website" />\n  <meta property="og:title" content="Memory Game — Free Matching Pairs Game | Apps & Games" />\n  <meta property="og:description" content="Train your memory with six themed card sets, four difficulty levels, saved progress and multilingual controls." />\n  <meta property="og:url" content="https://memory.appsandgames.org/" />\n  <meta property="og:site_name" content="Apps & Games" />\n  <meta property="og:image" content="https://appsandgames.org/assets/social/apps-and-games-social.jpg" />\n  <meta property="og:image:alt" content="Memory Game by Apps & Games" />\n\n  <meta name="twitter:card" content="summary_large_image" />\n  <meta name="twitter:title" content="Memory Game — Free Matching Pairs Game | Apps & Games" />\n  <meta name="twitter:description" content="A free multilingual memory game with six themes, four difficulty levels and saved progress." />\n  <meta name="twitter:image" content="https://appsandgames.org/assets/social/apps-and-games-social.jpg" />\n\n  <script type="application/ld+json">\n  {\n    "@context": "https://schema.org",\n    "@type": "VideoGame",\n    "name": "Memory Game",\n    "url": "https://memory.appsandgames.org/",\n    "description": "A free multilingual browser memory game with themed matching pairs, four difficulty levels, saved progress and best scores.",\n    "gamePlatform": "Web browser",\n    "operatingSystem": "Any",\n    "isAccessibleForFree": true,\n    "inLanguage": ["en", "hr", "de", "it", "es"],\n    "publisher": {\n      "@type": "Organization",\n      "name": "Apps & Games",\n      "url": "https://appsandgames.org/"\n    },\n    "offers": {\n      "@type": "Offer",\n      "price": "0",\n      "priceCurrency": "USD"\n    }\n  }\n  </script>\n\n  <!-- Google Analytics 4 -->\n  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8QJLPBJPJ8"></script>\n  <script>\n    window.dataLayer = window.dataLayer || [];\n    function gtag() { dataLayer.push(arguments); }\n    gtag("js", new Date());\n    gtag("config", "G-8QJLPBJPJ8");\n  </script>\n\n  <!-- Google AdSense -->\n  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6296601518048221" crossorigin="anonymous"></script>\n'''

    anchor = '  <link rel="icon" href="icon.svg" type="image/svg+xml" />'
    if anchor not in html:
        raise SystemExit("Could not find favicon anchor")
    html = html.replace(anchor, anchor + seo, 1)

index_path.write_text(html, encoding="utf-8")

readme_path = Path("README.md")
readme = readme_path.read_text(encoding="utf-8")
if "https://memory.appsandgames.org/" not in readme:
    first_break = readme.find("\n")
    if first_break == -1:
        readme += "\n"
        first_break = len(readme) - 1
    insertion = "\n\n**Live:** https://memory.appsandgames.org/"
    readme = readme[:first_break] + insertion + readme[first_break:]
    readme_path.write_text(readme, encoding="utf-8")

assert 'https://memory.appsandgames.org/' in html
assert 'application/ld+json' in html
assert 'G-8QJLPBJPJ8' in html
