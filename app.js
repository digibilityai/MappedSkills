/**
 * cPanel often defaults Application startup file to "app.js".
 * This file must start the Next.js server — do not use the old Vite SPA server.
 */
require("./server.cjs");
