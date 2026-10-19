# Four-week product design course

The user wants to learn how to discover and prioritize important needs, design interactions, evaluate a delivered feature, and judge the whole product. They explicitly rejected concurrency and multi-role workflow details as the curriculum's focus and authorized a four-week plan and website update.

## Structure

- Week 1: discover needs and compare opportunities using evidence.
- Week 2: turn one chosen need into alternative interaction designs.
- Week 3: evaluate usability and customer outcomes separately.
- Week 4: evaluate customer value and business sustainability, then write one decision memo.
- Recommend 2–3 hours per week; scoped reading, a practical output, discussion, and revision. Weeks can span longer than seven days.
- Use Product Talk's 2025 API discovery case as the common evidence source. A visual SaaS interface is explicitly a teaching extension, not a claim about the real product. No invented research or results. Personal business is optional.
- Use Product Talk for discovery, NN/g for interaction and usability, and SVPG for the product-level frame. Preserve publication vs review dates and scope longer articles. No paid tools are necessary.

## Website decision

Considered replacing the old lessons in place, appending more B2B material, and making the new course the homepage with the old course archived. Choose the third: it gives the requested curriculum a clear entry point and keeps the meaning of historical progress intact.

- Preserve the original homepage as `foundations.html`, with a banner linking to the current course. Preserve all original task order, fields, examples, scripts and storage keys.
- New `index.html`, `product-design.css`, and `product-design.js` provide four weekly sections, scoped readings, assignments, a rubric, saved drafts, copy-to-discussion and Markdown export.
- Distinct new localStorage keys `productDesignCourse202610V1-week1` through `week4`; use named reading, answer and check IDs, not indices. No migration and no auto-completion from reading or typing.
- Local records stay on the same origin. Explain device/browser limitations and provide exports. Storage errors must leave text available and report failure honestly; malformed records must not be overwritten automatically.
- Redirect known old homepage fragments to the archived page. New anchors use `pd-week1` etc.
- New content is static HTML, usable for reading without JavaScript. All interactive controls and inputs are labeled and keyboard accessible; support mobile and reduced motion.

## Verification and release

Check JavaScript syntax, HTML IDs/anchors, historical task/field preservation, storage separation, draft persistence, per-week isolation, copy/export, old-link forwarding, desktop/mobile overflow and keyboard interactions. Publish through the existing GitHub Pages main/root configuration, wait for the matching build, and compare deployed assets with the local files.
