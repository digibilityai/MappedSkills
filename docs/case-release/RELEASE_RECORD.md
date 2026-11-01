# Case-study release record (DEC-117): COMPLETE

**Status: RELEASED AND VERIFIED, 2026-11-01.** Code deployed first, then the Contentful content published.

## What was released
| Item | Result |
|---|---|
| Code | PR #70 (merge \`713021c\`: work R2 and case-study template, blog/press/research editorial redesign, case showcase on 7 pages, content-keyed final-copy gate, canonical-domain build check, two CI test fixes) and PR #71 (merge \`0551b89\`: two impact sub-headings as bold paragraphs to fit the Contentful schema). Release target: **main \`0551b896ee1b8b5dd642194ad40b0229ead05c3b\`** |
| Deployment | Workflow "Production release", dispatch run **41316916791** (deploy, confirm \`0551b89\`, \`production\` environment approved), 2026-11-01 about 14:38 UTC. Verify and release jobs succeeded, rollback job skipped. Live **BUILD_ID \`_pWpnXMkHfVZIUzx1uK7N\`**. Workflow smoke test passed (/, /services, /seo, /contact, /contact?intent=call, /thank-you, /robots.txt, /sitemap.xml 200; /schedule-call 308; unknown page 404; live site serves this build with the GTM container compiled in) |
| Post-deploy verification (read-only, before publishing) | 72 of 72 checks and the 27-check baseline: /work, /blog, /press, /research and the seven showcase pages 200 with one h1 and canonical on https://mappedskills.com; no console errors or horizontal overflow at 1440 and 390 px; five existing studies listed, 15 new routes 404, Home Decor unlisted; ClassPe, InsurYo and Ameba still on earlier copy with the gate closed |
| Contentful staging | Owner-run tool \`~/g7-release-contentful\`: 35 unpublished drafts created (7 industries, 13 clients, 15 case studies) and the 4 existing entries staged as drafts (ClassPe, InsurYo, Ameba, AnybodyCanBake Google Ads); pre-publish checks passed; published content unchanged until publication |
| Contentful publication | Owner-run \`publish\`, 2026-11-01 about 20:16 IST (run \`20261101-201646-publish\`): **39 entries published, 0 problems, all cleanly published**: 7 industries, 13 clients, the 4 updated studies, the 15 new studies. Sequential by design (Contentful publishes one entry at a time); the tool's order kept every intermediate state valid |
| Live verification after publication | Owner-run \`verify-live.mjs\`: **ALL 67 PASSED** (20 studies listed in order, each route 200 with its title, Ameba released figures, showcase pages, sitemap, canonicals) |
| Result | 20 listed case studies (15 new, 4 updated, Om Sai unchanged); Home Decor published and unlisted; ClassPe, InsurYo and Ameba on their final copy, artwork and (Ameba) figures through the content gate |

## Retained for rollback
- **Snapshot:** \`~/g7-release-contentful/runs/20261101-195715-snapshot/snapshot.json\`, sha256 \`503e5139637203b45a72ca21bc445b73d98d5984fd0644d0bd370dcd39c685c9\` (the four updated entries as they were live before). Run logs for check, create, stage and publish are in the same \`runs/\` folder.
- **Manifest:** \`docs/case-release/manifest/manifest.json\`, sha256 \`d062a9f0ee734cc9529ba3f0440c6623a890840e8de04355645bd441289f065a\`; tool, rehearsal and live verifier in \`~/g7-release-contentful/\` (reviewed copy in \`docs/case-release/tool/\`).
- **Content rollback:** \`RELEASE_MANIFEST_SHA256=d062a9f0… RELEASE_SNAPSHOT_SHA256=503e5139… bash run.sh rollback-publish runs/20261101-195715-snapshot/snapshot.json\` (type \`ROLLBACK owww06rzpjnj/master\`): the four entries return to the snapshot, the 15 new studies are unpublished, drafts kept, nothing deleted; resumable.
- **Code rollback:** workflow dispatch, action \`rollback\`, confirm \`ROLLBACK\` (the previous release is kept on the host). Either side can be rolled back alone.

## Not run
Real-device checks, Safari, Firefox and screen-reader checks were **not run**. Automated browser checks used Chrome only.

## Notes
- Timing: pages refresh by 60-second revalidation with stale-while-revalidate; no purge exists; the owner-run verification passed after publication.
- Follow-ups, not part of this release: retire the withheld-proof entry for Ameba and the unused local preview switch settings; the cookie-focus guard covers four pages only.
