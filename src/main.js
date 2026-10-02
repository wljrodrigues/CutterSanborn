import "./styles/main.css";
import { parseTable } from "./data";
import { initUI } from "./ui";
import { initLang, applyTranslations } from "./i18n";
import { initTableBrowser } from "./table-browser";
import rawTable from "../data/tablacutter.json";
import { inject } from "@vercel/analytics";
const table = parseTable(rawTable);
initLang();
applyTranslations();
initUI(table);
initTableBrowser(table, document.getElementById("table-view"));
// Initialize Vercel Web Analytics
inject();
