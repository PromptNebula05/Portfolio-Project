---

## Create an Images Subdirectory for Blog Assets

```
images/
  blog/       <-- create this folder
```

Store blog post images here. Use descriptive, kebab-case filenames (e.g., `homelab-setup-part1.jpg`).

---

## Process for Adding a New Blog Post

Follow these steps each time you publish a new post:

### Step 1 — Write the Post Content

- Draft your post in a new HTML file under `blog/` (e.g., `blog/homelab-part1.html`).
- Use the individual post template from Section 1.2.
- Add any images to `images/blog/`.

### Step 2 — Add a Card to `blog.html`

Insert a new `<article class="blog-card">` block at the **top** of the `.blog-grid` container so the newest post appears first:

```html
<article class="blog-card">
    <div class="blog-card-image">
        <img src="images/blog/homelab-part1.jpg" alt="Home Lab Setup" loading="lazy">
    </div>
    <div class="blog-card-content">
        <span class="blog-date">March 17, 2026</span>
        <h3><a href="blog/homelab-part1.html">Building My Home Lab — Part 1</a></h3>
        <p>Setting up a virtual security testing environment with VirtualBox and Docker…</p>
        <div class="project-tags">
            <span class="tag">Home Lab</span>
            <span class="tag">Security</span>
        </div>
    </div>
</article>
```

### Step 3 — Test Locally

- Open `blog.html` in a browser and verify the card appears correctly.
- Click through to the full post and confirm images load, navigation works, and the "Back to Blog" link returns correctly.
- Test on mobile viewport sizes to confirm the responsive grid collapses to a single column.

### Step 4 — Commit and Deploy

```bash
git add blog.html blog/homelab-part1.html images/blog/homelab-part1.jpg
git commit -m "Add blog post: Building My Home Lab — Part 1"
git push
```

---

## Maintenance Checklist

| Task | Frequency | Details |
|------|-----------|---------|
| Add new post | As needed | Follow the 4-step process above |
| Update footer year | Annually | Change `&copy; 2025` to current year across all pages |
| Review older posts | Quarterly | Check for broken links, outdated info, or missing images |
| Keep nav consistent | Every new page | Ensure every HTML file has the same nav menu links |
| Optimize images | Per post | Compress blog images before adding (aim for < 200 KB each) |

---

## Future Enhancements (Optional)

These are **not required** for the initial blog page but can be added later:

- **Tags/category filtering** — Add JS filtering (similar to the gallery/portfolio pattern) to let visitors filter posts by category.
- **Pagination** — Once you have more than ~10 posts, split the listing into pages or add a "Load More" button.
- **RSS feed** — Provide an `rss.xml` for subscribers.
- **Search** — Add a simple client-side search using the existing JS patterns in `script.js`.
- **Reading time estimate** — Calculate and display estimated reading time on each card.

---