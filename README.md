# Ashwath Sridhar — Engineering Portfolio

A responsive, publishable, **no-build, no-framework** portfolio website created for Georgia Tech ECE 1100 and designed to keep growing during college. Built with plain HTML, CSS, JavaScript, and original SVG diagrams, actual project screenshots, and a cohesive purple color palette. **Your resume PDF is included.**

## What's included

- `index.html` — page layout and semantic sections
- `styles.css` — visual design, dark/light mode, responsive styles
- `content.js` — **edit your personal details, project case studies, tags, filters, and Discovery Project here**
- `script.js` — project filters, detail pop-up, waveform, mobile navigation, theme switch, accessibility helpers
- `*.svg` — original *conceptual* engineering illustrations (plus favicon)
- `*.webp` — **13 source-derived images**: five of your Altium keychain screenshots and eight VCO presentation slides
- `Ring_Oscillator_Final.pdf` — your original SiliconJackets design-review deck, linked from the VCO case study
- `Ashwath_Sridhar_Resume.pdf` — copy of your uploaded resume, available for viewing and download
- `tools/create_art.py` — optional script that generates the original SVG illustrations
- `.nojekyll` — helps GitHub Pages serve your static files without additional processing

**No npm, build step, API key, account, or hosting subscription is required.**

## Preview locally

The fastest preview is to double-click `index.html` and open it in a browser. For a more production-like preview (some browsers restrict local PDF embeds), open a terminal in this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser. Click through the project filters/cards and try the signal-frequency slider and color theme toggle.

## Publish FREE on GitHub Pages

1. Make or sign in to a GitHub account.
2. Create a **public** repository, e.g. `engineering-portfolio`. If you want your site at `https://YOURUSERNAME.github.io/` instead of a project subpath, name the repository `YOURUSERNAME.github.io`.
3. Upload **the contents of this folder** into the root of the repository, keeping `index.html`, `content.js`, `script.js`, `styles.css`, `.nojekyll`, and the entire `` folder together. Use the GitHub web uploader or Git.
4. Open the repository's **Settings → Pages**. Under **Build and deployment**, set Source to **Deploy from a branch**, select `main` and `/(root)`, then **Save**.
5. When publishing finishes, open the Pages URL shown in Settings → Pages. If you chose a project repo, it normally has the form `https://YOURUSERNAME.github.io/engineering-portfolio/`.
6. Open the URL in a **private/incognito window** to make sure it works for an unauthenticated visitor. Send that live URL, **not the ZIP file or localhost link**, for your ECE 1100 assignment.

GitHub docs: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

Important: **I created the website files, but I did not publish the site to your GitHub account.** You must complete the steps above and submit the resulting public URL.

## Edit or add a technical project (the easy part)

Open `content.js` in VS Code, TextEdit, or another text editor. Find the `projects: [` array. Each object represents one project. To add one:

1. **Copy an existing complete object** (from its opening `{` to its closing `},`). Paste it at the end of the project array, before `]`.
2. Change `id` to a new unique string such as `'opamp'`; set a unique `number`, a `title`, `eyebrow`, `period`, and a suitable `category` (`'ic'`, `'embedded'`, `'testing'`, or `'robotics'`).
3. Fill in `teaser`, `challenge`, `approach`, `outcome`, `takeaway`, `tags`, and (if useful) the `metric` and `metricLabel` fields.
4. Place a real project image under ``, such as `opamp-layout.png`; set `image: 'opamp-layout.png'` and supply a descriptive `imageAlt`.
5. Save, refresh your site, and commit/upload your changes. **No HTML or CSS edits are needed** for the card or its expanded case study.

If you want a new project category, add a category object under `filters`, e.g. `{ id: 'research', label: 'Research' }`, then give relevant projects `category: 'research'`.

The total project count updates **automatically** in the hero, filter toolbar, and project cards when you add another project. Set the new project's unique `number` as you like.

## Discovery Project Feature — now complete

Your HyTech Racing **USB-C Flashing Keychain PCB** is now the ECE 1100 Discovery Project Feature. It contains **675+ words** of source-grounded narrative organized as "The problem," "Research and circuit design," "CAD libraries and PCB layout," "Validation and results," and "Reflection and next steps." The pop-up includes five original Altium screenshots supplied by you:

- 3D board rendering
- LM555 timing schematic
- USB-C power and LED schematic
- Top PCB copper layout
- Bottom PCB copper layout

Open the **Discovery** navigation item and select **Read complete feature**. Every gallery image is clickable for full-size viewing. The separate project gallery also has a HyTech keychain project card. Update either the `projects` array or the `discovery` object inside `content.js` to refine the text or change images in future.

**Engineering accuracy note:** the approximate **3.1 Hz** frequency and **53% positive duty cycle** are ideal **calculated** values based on the schematic's 13 kΩ, 100 kΩ, and 2.2 µF timer network, not a lab frequency measurement. The training-module design envelope was 2–5 Hz. DRC-clean and hardware-verified are recorded in your supplied resume. Your images are CAD screenshots/renders, not photos of an assembled physical PCB. Because the assignment asks for a student-created photo/video, your own CAD screenshots may qualify as student-created visuals, but adding an actual photo of the built keychain or a short test video would make the evidence stronger.

## VCO design review and actual simulation results

The SiliconJackets VCO card now uses **your own Cadence layout slide** as its cover and includes a six-image evidence gallery: full layout, schematic, frequency/temperature graph, transient plots, Pegasus DRC, and LVS. A **View original VCO design-review slides** link opens the full PDF.

The simulated values are described accurately: **451.2–549.6 MHz over 0–70 °C at the tt corner**. The deck also reports 314.9 MHz at ss and 704.8 MHz at ff for the 27 °C checks; it does **not** claim those corners remained in the tt temperature specification. The full layout has **zero DRC violations** and a **clean LVS match**.

## Changing colors

The design now uses a dark violet foundation with lavender and pink highlights (including waveforms, buttons, navigation accents, gallery borders, and re-colored conceptual SVGs). Light mode uses violet on an off-white lilac background. In `styles.css`, the top two lines define the primary palette; edit `--mint` to change the accent purple globally (the legacy variable name is retained to avoid breaking code).

## Things to verify before your Nov 10 submission

- [ ] Name, school, project claims, numbers, and future goals are accurately represented.
- [ ] Phone/email on the **resume PDF** are details you're comfortable sharing publicly. The site itself uses only email and LinkedIn in the contact section.
- [ ] The PDF opens and downloads on a phone and desktop.
- [ ] LinkedIn and email links work.
- [ ] You have reviewed and corrected any wording that doesn't sound like you.
- [ ] All sections are visible on desktop and mobile, all seven project cards open, and the Discovery feature and galleries work.
- [ ] The website still satisfies the 1,000-word minimum; the Discovery Project case study alone is 675+ words.
- [ ] There are at least five high-quality visuals; the site now includes your own Altium screenshots and VCO simulation/layout presentation slides as direct engineering evidence.
- [ ] The public GitHub Pages URL works without logging in. Ask another person to check it.
- [ ] Submit that **live URL** in Canvas by **Nov 10, 11:59 pm** (per the assignment text).

## Notes about fidelity

The engineering performance figures and responsibilities were adapted from your uploaded resume. Some secondary-project thumbnails are stylized original illustrations, but the keychain and VCO case studies now include your **actual uploaded screenshots, simulations, and layout images**. The signal explorer is a decorative interactive **concept**, not a physics-accurate model of your VCO. Replace it with a real measurement if you ever want the dashboard to represent lab data.

This site has no analytics, tracking scripts, external data collection, or contact-form backend. The optional Google Fonts stylesheet loads over the web; safe font fallbacks are provided.
