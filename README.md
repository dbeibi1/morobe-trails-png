# Morobe Trails PNG

A responsive tourism website for an imaginary company based in Lae, Papua New Guinea. Created for **IS229 Web Design** by **Desmon Beibi**, Year 2, Bachelor of Business in Information Technology, Papua New Guinea University of Technology.

## Project purpose

Help PNG residents and international visitors explore six sample tours, compare nature, culture, and coastal experiences, estimate a group price in kina, and prepare an enquiry draft. The company, tour packages, itineraries, and prices are fictional academic examples. No real booking or payment service is provided.

## Website and repository

- Published website (verified 9 October 2026): https://dbeibi1.github.io/morobe-trails-png/
- Repository: https://github.com/dbeibi1/morobe-trails-png

## Pages

| Page | Purpose |
| --- | --- |
| Home | Introduces the company, experience categories, and featured tours |
| About | Explains the fictional company and respectful travel principles |
| Tours | Lists six packages with filtering, search, details, and group estimates |
| Gallery | Displays archival photographs with captions and licence credits |
| Contact | Validates visitor input and prepares a copyable enquiry draft |

## Features

- Responsive layouts for mobile, tablet, and desktop screens.
- Mobile navigation with an expanded state and Escape-key dismissal.
- Category filtering and text search, including a no-results message.
- One shared package dataset for cards, estimates, and enquiry selections.
- Per-person price multiplied by a whole-number group size from 1 to 20.
- Validated name, email, tour, date, and group size, with optional message.
- Field-specific errors, keyboard focus, labelled controls, and status messages.
- Read-only enquiry preview, copying with a manual fallback, and a recipient-free email draft.
- Locally stored, credited photographs and reduced-motion support.

## Technologies

HTML5 provides semantic page structure. CSS3 provides colours, typography, Grid and Flexbox layouts, and media queries. Plain JavaScript manages interaction, shared data, validation, and estimates. The website has no framework, backend, database, accounts, or payment processing. GitHub Pages hosts the static files.

## Run locally

Download or clone this repository. From its root, run:

```text
python -m http.server 8000
```

Then open http://localhost:8000/ in a browser. A local HTTP server is needed because the gallery loads its attribution file with `fetch`. Opening the HTML directly as a file may prevent the gallery from loading. Python is only a preview tool, not part of the website technology.

## Source structure

```text
index.html          about.html          tours.html
gallery.html        contact.html        .nojekyll
assets/css/style.css
assets/js/tours.js   assets/js/core.js   assets/js/main.js
assets/images/      ASSET_CREDITS.md     WALKTHROUGH.md
```

## Publish with GitHub Pages

Push these files to the `main` branch of `dbeibi1/morobe-trails-png`. In repository **Settings > Pages**, choose **Deploy from a branch**, select **main**, and select **/ (root)**. Save and wait for the Pages deployment. Relative asset paths support the repository subdirectory. The `.nojekyll` file keeps publication static.

## Testing

The separate submission package contains calculation and validation results, source/link and contrast checks, browser results, and screenshots. Local tests cover the five pages at 360, 768, and 1440 pixel viewport widths. The report containing the student ID is supplied separately and is not included in this public repository.

## Images and limitations

See [ASSET_CREDITS.md](ASSET_CREDITS.md) and the [gallery](gallery.html#credits) for authors, dates, source links, licences, and changes. Five photographs are historical Sherwin Carlquist images. The Lae city panorama is by Phenss, cropped by Dr. Blofeld. Image licences apply to the original images and their derivatives separately from the website code.

The website does not store or send personal information. The email action opens an installed email application with the recipient left blank. The visitor must add a recipient and send the message themselves. Clipboard access may be unavailable or delayed; the website then selects the draft for manual copying. Historical images provide context and do not show current conditions or actual tours.
