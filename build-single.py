import re, os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()
with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Remove external resource links
html = re.sub(r'<link[^>]+phosphor-icons[^>]*>', '', html)
html = re.sub(r'<link[^>]+fonts\.googleapis[^>]*>', '', html)
html = re.sub(r'<link[^>]+preconnect[^>]*>', '', html)

# Replace script tag with inline JS
html = re.sub(r'<script src="app\.js"></script>', '<script>' + js + '</script>', html)

with open('pulse-app.html', 'w', encoding='utf-8') as f:
    f.write(html)

size = os.path.getsize('pulse-app.html')
print(f'Done! Single file: {size} bytes ({size//1024} KB)')
