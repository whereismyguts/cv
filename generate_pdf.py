#!/usr/bin/env python3
"""
Resume Generator Script
Usage: python generate_resume.py [lang]
  lang: 'en', 'ru', or 'both' (default: 'both')
"""

import json
import sys
from weasyprint import HTML
from pathlib import Path

def generate_html(data):
    """Generate HTML content from resume data"""
    html = f'''<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
@page {{
    size: A4;
    margin: 2cm 2cm 2cm 2cm;
}}

* {{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}}

body {{
    font-family: 'DejaVu Sans', 'Liberation Sans', Arial, sans-serif;
    font-size: 10pt;
    line-height: 1.4;
    color: #000;
}}

h1 {{
    font-size: 24pt;
    font-weight: bold;
    margin-bottom: 8pt;
    letter-spacing: -0.5pt;
}}

.subtitle {{
    font-size: 10pt;
    margin-bottom: 8pt;
    line-height: 1.5;
}}

.contact {{
    font-size: 9pt;
    margin-bottom: 16pt;
}}

hr {{
    border: none;
    border-top: 1px solid #000;
    margin: 12pt 0;
}}

h2 {{
    font-size: 14pt;
    font-weight: bold;
    margin-top: 12pt;
    margin-bottom: 8pt;
}}

h3 {{
    font-size: 11pt;
    font-weight: bold;
    margin-top: 10pt;
    margin-bottom: 4pt;
}}

.job-header {{
    margin-bottom: 6pt;
}}

.company {{
    font-weight: bold;
}}

.period {{
    font-style: italic;
}}

ul {{
    margin-left: 18pt;
    margin-bottom: 8pt;
}}

li {{
    margin-bottom: 3pt;
}}

.stack {{
    margin-top: 6pt;
    margin-bottom: 10pt;
}}

.tech-stack {{
    margin-bottom: 12pt;
    font-family: monospace;
    font-size: 9pt;
}}
</style>
</head>
<body>

<h1>{data['name']}</h1>

<div class="subtitle">
{data['title']}
</div>

<div class="contact">
<strong>Email:</strong> {data['contact']['email']}<br>
<strong>GitHub:</strong> {data['contact']['github']}<br>
<strong>Telegram:</strong> {data['contact']['telegram']}
</div>

<hr>

<h2>{data['sections']['stack_title']}</h2>

<div class="tech-stack">
{data['sections']['stack']}
</div>

<hr>

<h2>{data['sections']['experience_title']}</h2>

'''
    
    # Add experience
    for exp in data['experience']:
        html += f'''<h3>{exp['position']}</h3>
<div class="job-header">
<span class="company">{exp['company']}</span> | <span class="period">{exp['period']}</span>
</div>

'''
        if exp['description']:
            html += f'<p style="margin-bottom: 4pt;">{exp["description"]}</p>\n\n'
        
        html += '<ul>\n'
        for bullet in exp['bullets']:
            html += f'<li>{bullet}</li>\n'
        html += '</ul>\n\n'
        
        html += f'<div class="stack">\n<strong>Stack:</strong> {exp["stack"]}\n</div>\n\n'
    
    html += '<hr>\n\n'
    html += f'<h2>{data["sections"]["education_title"]}</h2>\n\n'
    
    # Add education
    for edu in data['education']:
        html += f'<p style="margin-bottom: 8pt;">\n<strong>{edu["period"]}</strong> {edu["institution"]} | {edu["degree"]}\n</p>\n\n'
    
    html += '<hr>\n\n'
    html += f'<h2>{data["sections"]["languages_title"]}</h2>\n\n<p>\n'
    
    # Add languages
    for i, lang in enumerate(data['languages']):
        html += f'<strong>{lang["language"]}:</strong> {lang["level"]}'
        if i < len(data['languages']) - 1:
            html += '<br>\n'
    
    html += '\n</p>\n\n</body>\n</html>'
    
    return html

def generate_pdf(lang, data, output_dir):
    """Generate PDF for specified language"""
    html_content = generate_html(data)
    output_file = output_dir / f'Karmanov_Anton_Resume_{lang.upper()}.pdf'
    HTML(string=html_content).write_pdf(output_file)
    print(f'Generated: {output_file}')
    return output_file

def main():
    # Parse arguments
    lang = sys.argv[1] if len(sys.argv) > 1 else 'both'
    
    # Load data
    data_file = Path(__file__).parent / 'resume_data.json'
    with open(data_file, 'r', encoding='utf-8') as f:
        resume_data = json.load(f)
    
    # Output directory
    output_dir = Path('/mnt/user-data/outputs')
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Generate PDFs
    if lang == 'both':
        generate_pdf('en', resume_data['en'], output_dir)
        generate_pdf('ru', resume_data['ru'], output_dir)
    elif lang in ['en', 'ru']:
        generate_pdf(lang, resume_data[lang], output_dir)
    else:
        print(f'Error: Invalid language "{lang}". Use "en", "ru", or "both"')
        sys.exit(1)
    
    print('Done!')

if __name__ == '__main__':
    main()