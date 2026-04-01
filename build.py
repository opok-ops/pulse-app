import re, os, sys

base = r'C:\Users\SMDS\.qclaw\workspace\pulse-app'
html_path = os.path.join(base, 'index.html')
js_path = os.path.join(base, 'app.js')
out_path = os.path.join(base, 'pulse-app.html')

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()
with open(js_path, 'r', encoding='utf-8') as f:
    js = f.read()

html = re.sub(r'<link[^>]+phosphor-icons[^>]*>', '', html)
html = re.sub(r'<link[^>]+fonts\.googleapis[^>]*>', '', html)
html = re.sub(r'<link[^>]+preconnect[^>]*>', '', html)
html = re.sub(r'<script src="app\.js"></script>', '<script>' + js + '</script>', html)

with open(out_path, 'w', encoding='utf-8') as f:
    f.write(html)

size = os.path.getsize(out_path)
print(f'Done! Single file: {size} bytes ({size//1024} KB)')
