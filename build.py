#!/usr/bin/env python

def indented(src, spaces=2):
    lines = src.split('\n')
    mapped = map(lambda x: (' ' * spaces) + x, lines)
    li = list(mapped)
    li[0] = li[0][spaces:]
    return '\n'.join(li)

def render(template, **kwargs):
    for k in kwargs.keys():
        rep = '<%= ' + k + ' %>'
        spaces = 2
        template = template.replace(rep, indented(kwargs[k], spaces))
    return template

## Include.
with open('src/header.html', 'r') as f:
    header_html = f.read()

with open('src/nav.html', 'r') as f:
    nav_html = f.read()

with open('src/footer.html', 'r') as f:
    footer_html = f.read()

with open('src/language.html', 'r') as f:
    language_html = f.read()

## Build home page.
# Read templates.
with open('src/index.html', 'r') as f:
    root_index_template = f.read()

# Write to html.
with open('index.html', 'w') as f:
    f.write(render(root_index_template,
        header=header_html,
        nav=nav_html,
        footer=footer_html,
        language=language_html))

## Build about page.
# Read templates.
with open('src/about/index.html', 'r') as f:
    about_index_template = f.read()

with open('src/about/resume/index.html', 'r') as f:
    about_resume_index_template = f.read()

# Write to html.
with open('about/index.html', 'w') as f:
    f.write(render(about_index_template,
        header=header_html,
        nav=nav_html,
        footer=footer_html,
        language=language_html))

with open('about/resume/index.html', 'w') as f:
    f.write(render(about_resume_index_template,
        header=header_html,
        nav=nav_html,
        footer=footer_html,
        language=language_html))

## Build projects page.
# Read templates.
with open('src/projects/index.html', 'r') as f:
    projects_index_template = f.read()

# Write to html.
with open('projects/index.html', 'w') as f:
    f.write(render(projects_index_template,
        header=header_html,
        nav=nav_html,
        footer=footer_html,
        language=language_html))
