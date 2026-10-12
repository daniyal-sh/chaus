"""Build curated, link-safe copy from the reviewed original site's text blocks."""
import json
from pathlib import Path
from urllib.parse import urljoin
from bs4 import BeautifulSoup, NavigableString

root = Path(__file__).resolve().parent.parent
source = json.loads((root / 'references/original-site-copy.json').read_text(encoding='utf-8'))
pages = source['pages']
output = {}

def block(page, index):
    raw = pages[page][index]
    soup = BeautifulSoup(raw['html'], 'html.parser')
    segments = []
    for child in soup.descendants:
        if not isinstance(child, NavigableString):
            continue
        text = str(child)
        if not text:
            continue
        anchor = child.find_parent('a')
        href = urljoin(f'https://coffeehouse.rice.edu/{page}/', anchor.get('href', '')) if anchor else None
        if anchor and not anchor.get('href'):
            href = '/managers' if page == 'about' and index == 1 else None
        if href and not href.startswith(('https://', 'http://', 'mailto:', 'tel:', '/')):
            href = None
        segments.append({'text': text, **({'href': href} if href else {})})
    return {'text': raw['text'], 'segments': segments}

def add(route, title, page, indices, note=None):
    output.setdefault(route, []).append({
        'title': title, 'source': f'https://coffeehouse.rice.edu/{page}/',
        'blocks': [block(page, i) for i in indices], **({'note': note} if note else {}),
    })

def join_fragments(route, count=None):
    """Reconnect paragraphs split by the original site's fixed-position layout."""
    section = output[route][-1]
    parts = section['blocks'][:count]
    segments = []
    for index, part in enumerate(parts):
        if index:
            segments.append({'text': ' '})
        segments.extend(part['segments'])
    section['blocks'] = [{'text': ' '.join(p['text'] for p in parts), 'segments': segments}] + section['blocks'][len(parts):]

add('/about', 'Who works here?', 'about', [1], 'The manager link refers to the archived 2024–2025 team.')
add('/about', "What's Coffeehouse?", 'about', [2])
add('/about', 'What are our values?', 'about', [3])
add('/about', 'Chaus After Dark', 'about', [4])
add('/about', "What's Espresso Yourself?", 'about', [5], 'This description includes earlier programming; check Instagram for current events.')
for title, indices in [('Katz Coffee', [8, 9]), ('Chic Sweets Fine Desserts', [10, 11, 12]), ('Kraftsmen Baking', [16, 17]), ('Sinfull Bakery', [18, 19])]:
    add('/about', title, 'about', indices)
    join_fragments('/about')

add('/community', 'Chaus After Dark', 'about', [4])
add('/community', 'Espresso Yourself', 'about', [5], 'Earlier programming from the original site; follow Espresso Yourself for current updates.')
add('/community', 'Join the family — Spring 2026 notice', 'apply', [9, 10], 'Archived Spring 2026 hiring notice. Applications are currently closed; check the social hub for the next round.')

add('/sustainability', 'Our sustainability commitment', 'sustainability', [15, 16, 17])
join_fragments('/sustainability', 2)
for title, indices in [('Own-Mug Discount + 95-cent Drip', [2]), ('Coffeehouse Sustainability Week', [4]), ('Fair Trade/Direct Trade Coffee from Katz', [6]), ('In-House Mugs', [8, 9]), ('Recycling', [11]), ('Linen Service', [13])]:
    add('/sustainability', title, 'sustainability', indices, 'The suspension below is an older COVID-era notice, not current guidance. Ask a KOC about for-here service.' if title == 'In-House Mugs' else None)
add('/sustainability', 'The Bean Fund — June 7th, 2020', 'sustainability', [24, 25, 26, 27, 28, 29, 31, 32], 'Original announcement by Brendan Wong, General Manager 2019–2020. References to closure and initial donations describe June 2020.')

add('/catering', 'Ordering & payment', 'catering', [54, 55, 56, 58, 60])
add('/catering', 'Dietary information', 'catering', [82, 83, 84], 'Published information; confirm current ingredients and milk options with the catering team.')
add('/catering', 'Containers', 'catering', [86, 94, 87, 92, 85, 93], 'Original approximate servings: carafe 10, baby cambro 25, cambro 50. Confirm the container and serving size with the team.')
add('/catering', 'From the Coffeehouse archives', 'catering', [63, 95])
drink_pairs = [('Hot Water', 3, 5), ('Iced Chai', 6, 8), ('Iced Toddy Latte', 9, 11), ('Hot Coffee', 12, 14), ('Iced Tea', 15, 17), ('Nutty Bee', 18, 20), ('Hot Tea', 21, 23), ('Cold Brew', 24, 26), ('Milky Way', 27, 29), ('Lemonade', 30, 32), ('Mocha', 33, 35), ('Specialty Tea', 36, 38), ('Hot Chocolate', 40, 42)]
for title, desc, price in drink_pairs:
    add('/catering', title, 'catering', [desc, price])
add('/catering', 'Flavor Syrups', 'catering', [39])
for title, indices in [('European Breakfast Box', [43, 45, 46]), ('Chocolate Chip Cookie Box', [47]), ('Savory Danish Box', [48, 50, 51]), ('Bagel Box', [52, 53])]:
    add('/catering', title, 'catering', indices)

add('/visit', 'Contact & vouchers', 'contact', [2, 6, 8, 4, 5], 'The original voucher notice is retained below. The linked voucher form is currently closed; email the team to inquire.')
add('/visit', 'Original website hours', 'contact', [12, 16, 13, 17, 14, 18, 15, 19], 'Archived hours. Use the Fall 2026 schedule above; Sunday now closes at 10 pm.')
add('/', 'Original website hours', '1', [7, 8, 9, 10, 11], 'Archived hours. Use the Fall 2026 schedule above; Sunday now closes at 10 pm.')
add('/policies', 'Original COVID policies', 'covid', [1, 4, 5, 6, 2, 3], 'Undated legacy page. These are the original policies, not a current health notice; ask the team for current guidance.')
add('/managers', '2024–2025 management team', 'managers', list(range(1, 32)), 'Archived academic-year roster, not the current management team.')

for title, indices in [('Espresso Basics', list(range(3, 15))), ('Regulars', list(range(15, 25)) + list(range(26, 42))), ('Specialty', list(range(42, 50)) + list(range(54, 87))), ('Drink Extras', list(range(87, 94))), ('Food', list(range(94, 127)))]:
    add('/menu', title, 'menu', indices, 'Original published wording and prices. Confirm availability and prices at the counter.')
    section = output['/menu'][-1]
    layout_labels = {'*', 'SINGLE', 'DOUBLE', 'SMALL', 'MEDIUM', 'LARGE', title.upper()}
    section['blocks'] = [b for b in section['blocks'] if b['text'] not in layout_labels]
    columns = {'Espresso Basics': 'SINGLE / DOUBLE', 'Regulars': 'SMALL / MEDIUM / LARGE', 'Specialty': 'MEDIUM / LARGE'}
    if title in columns:
        section['columns'] = columns[title]

# Keep historical notices out of current visitor flows, while preserving their wording.
output['/policies'].extend(output.pop('/'))
output['/policies'].extend(output.pop('/visit'))
output['/policies'].append(output['/community'].pop())
output.pop('/managers')  # The complete dated roster is already rendered on this page.
for sections in output.values():
    for section in sections:
        section.pop('note', None)
        if section['title'] == 'Who works here?':
            section['note'] = 'The team linked below is from 2024–2025.'
        elif section['title'] == 'In-House Mugs':
            section['note'] = 'COVID-era notice. Ask a KOC about for-here service today.'
        elif 'Bean Fund' in section['title']:
            section['note'] = 'Announcement from June 2020.'
        elif section['title'] == 'Original COVID policies':
            section['title'] = 'COVID-era policies'
            section['note'] = 'Past update. Contact the team for current guidance.'
        elif section['title'] == 'Original website hours':
            section['title'] = 'Past opening hours'
            section['note'] = 'Past schedule. See Visit & Contact for current hours.'
        elif section['title'] == 'Contact & vouchers':
            section['title'] = 'Voucher program notice'
            section['note'] = 'Past notice. The voucher form is closed; email us to inquire.'
        elif section['title'] == 'Join the family — Spring 2026 notice':
            section['note'] = 'Spring 2026 notice. Applications are closed; follow our socials for the next round.'
    # Equivalent older schedules only need one disclosure entry.
    seen = set()
    sections[:] = [s for s in sections if not (s['title'] in seen or seen.add(s['title']))]

(root / 'src/originalCopy.json').write_text(json.dumps(output, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Built {sum(map(len, output.values()))} original-copy sections across {len(output)} pages.')
