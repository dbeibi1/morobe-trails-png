# Morobe Trails PNG Code Walkthrough

Use this guide to prepare for the lecturer's demonstration. Open the local website beside the source files and try each exercise.

## 1. Explain the page structure

Open `index.html`. Find `header`, `nav`, `main`, `section`, and `footer`. Explain how these elements separate navigation, main information, related content, and the footer. Each page has one main heading. The skip link sends keyboard users to the main content. The current navigation link uses `aria-current="page"`.

**Exercise:** Change one paragraph on the About page, refresh the browser, and explain why the change appears without a build step.

## 2. Explain the responsive design

Open `assets/css/style.css`. The `:root` block defines reusable colours. The `.container` rule limits content width. Grid lays out cards, while Flexbox aligns navigation and buttons. The media queries at 1100, 900, and 600 pixels adapt the layout. At smaller sizes, columns become one column and the navigation uses the Menu button. The reduced-motion query removes smooth scrolling and transitions when requested by the visitor.

**Exercise:** Compare the same page on a wide and narrow screen. Locate the CSS rule that changes the tour grid columns. Explain why the browser applies it.

## 3. Explain shared tour data and filtering

Open `assets/js/tours.js`. Each of the six packages includes an identifier, name, category, duration, price, photograph, description, itinerary, and inclusions. `main.js` uses this same dataset for featured cards, all tour cards, and both tour selectors.

The filter combines the selected category with the search text. It keeps matching packages, renders their cards, updates the count, and shows a no-results message when none match. User-visible strings are escaped before insertion into generated card HTML.

**Exercise:** Select Nature, then search for a word that does not exist. Explain why the result count becomes zero. Change a sample tour price and show where the same price appears.

## 4. Explain the price calculator

Open `assets/js/core.js`. `validGroup` checks that the value is an integer between 1 and 20. `estimate` multiplies the price by the group size. `kina` formats the number for display. `main.js` updates the total and builds an enquiry link containing the selected tour and group size.

**Exercise:** Rainforest Discovery costs K350 per person. Enter four people and explain the K1,400 result. Try zero, 1.5, and 21. Explain why those values are rejected.

## 5. Explain enquiry validation and privacy

Open `contact.html`, then find the enquiry submit handler in `main.js`. It prevents the default form submission, reads the fields, and calls `validateEnquiry`. Invalid fields receive an error message and `aria-invalid`; focus goes to the first error. The local calendar date is used to reject past dates without an accidental UTC date shift.

Valid input produces a draft in a read-only textarea. The recipient-free `mailto:` link encodes the subject and message. It opens an email application and does not send anything. Draft text is assigned as a textarea value rather than inserted as executable HTML. No input is saved in local storage, a database, or a server.

**Exercise:** Submit the empty form. Correct its fields and prepare a draft. Edit one input and observe that the previous preview is hidden. Explain why a prepared enquiry is not a confirmed booking.

## 6. Explain copying and image credits

The copy action tries the Clipboard API. If the API is missing or rejects permission, the draft is selected and a manual-copy instruction appears. The gallery fetches a local JSON attribution file and displays the authors, historical dates, source links, licences, and image changes.

**Exercise:** Find the credit for one image. Explain why locally stored photographs still require licence attribution. Explain why historical photos are labelled as archival.

## 7. Explain publication and testing

Git records source versions. GitHub stores the repository. GitHub Pages serves the static site from the main branch root. Relative links allow the same files to work in local preview and in the repository subdirectory. The personal report is delivered separately from the public source.

Review the submission testing evidence. Distinguish an automated calculation test from a browser layout test and a screenshot. Explain what the evidence proves and why an email draft still depends on the visitor's email application.

## Learning review

After trying these exercises, describe in your own words what you understand about semantic HTML, media queries, shared data, calculation, validation, privacy, and publication. Review the report's learning paragraph and edit it if it does not match your understanding.
