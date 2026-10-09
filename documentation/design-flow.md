# Page and Layout Design Flow

This site uses Jekyll layouts to wrap page and post content. A source file's `layout` front matter selects a specialized layout, and that layout declares `layout: default` to place its output inside the shared site shell.

## Rendering flow

```text
index.markdown (layout: home)
  -> _layouts/home.html (layout: default)
    -> _layouts/default.html
      -> _includes/head.html
      -> shared header and main content wrapper
      -> assets/css/custom.css and assets/js/custom.js

about.markdown (layout: page)
  -> _layouts/page.html (layout: default)
    -> _layouts/default.html
      -> shared site shell

_posts/<category>/<date>-<name>.md (layout: post)
  -> _layouts/post.html (layout: default)
    -> _layouts/default.html
      -> shared site shell
```

The arrows show wrapping: the selected layout provides the page-specific markup, while `default.html` supplies the outer HTML document and shared elements.

## What each layer does

- **Content files**: `index.markdown`, `about.markdown`, and files under `_posts/` provide page or post content plus YAML front matter. The `layout` value determines which specialized layout is used.
- **`_layouts/home.html`**: Builds the home page's post listing from `site.posts`. It orders pinned posts before unpinned posts and renders each post as a card linking to the post URL.
- **`_layouts/page.html`**: Renders a regular page title and its content inside `.page-content`.
- **`_layouts/post.html`**: Renders a post title, date, and body inside `.post-content`.
- **`_layouts/default.html`**: Provides the document structure shared by all three layouts: the head include, background, site header, and `<main class="site-main">` content area.
- **`_includes/head.html`**: Sets document metadata and loads the generated `assets/main.css` stylesheet and feed metadata.
- **`assets/css/custom.css`**: Defines the custom site-wide appearance, including the header, content areas, post cards, and responsive behavior.
- **`assets/js/custom.js`**: Adds interactive behavior, including card date labels and fade-in effects.

## Adding or changing content

1. Add or edit a content file and set its `layout` in the front matter (`home`, `page`, or `post`).
2. Jekyll renders that content through the selected layout.
3. The selected layout wraps its output with `default`.
4. The generated page receives the shared shell and assets from the default layout and head include.

For example, a post begins with front matter such as:

```yaml
---
layout: post
title: "A Post Title"
categories: finance
---
```

The home page is the index source: `index.markdown` selects `home`, and the home layout obtains its cards from Jekyll's `site.posts` collection.
