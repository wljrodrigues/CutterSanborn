const strings = {
    siteTitle: {
        es: "Número de Cutter-Sanborn",
        en: "Cutter-Sanborn Number",
        pt: "Tabela Cutter-Sanborn",
    },
    siteSubtitle: {
        es: "Swanson-Swift Revision, 1969",
        en: "Swanson-Swift Revision, 1969",
        pt: "Revisão Swanson-Swift, 1969",
    },
    heroSubtitle: {
        es: "Encuentre el código de clasificación bibliotecaria para cualquier autor de forma rápida y sencilla.",
        en: "Find the library classification code for any author quickly and easily.",
        pt: "Encontre o código de classificação bibliotecária para qualquer autor de forma rápida e fácil.",
    },
    navHome: {
        es: "Inicio",
        en: "Home",
        pt: "Início",
    },
    navTables: {
        es: "Tablas",
        en: "Tables",
        pt: "Tabelas",
    },
    inputLabel: {
        es: "Nombre del autor",
        en: "Author name",
        pt: "Nome do autor",
    },
    inputPlaceholder: {
        es: "Ej: García Márquez",
        en: "E.g.: García Márquez",
        pt: "Ex: Machado de Assis",
    },
    submitButton: {
        es: "Obtener número",
        en: "Get number",
        pt: "Gerar código",
    },
    resultLabel: {
        es: "Número de Cutter:",
        en: "Cutter number:",
        pt: "Código Cutter:",
    },
    errorEmpty: {
        es: "Por favor, ingrese un nombre.",
        en: "Please enter a name.",
        pt: "Por favor, digite um nome.",
    },
    errorNoMatch: {
        es: "No se encontró un número para esta entrada.",
        en: "No match found for this input.",
        pt: "Nenhum código encontrado.",
    },
    howItWorks: {
        es: "Cómo funciona",
        en: "How it works",
        pt: "Como funciona",
    },
    step1Title: {
        es: "Ingrese el autor",
        en: "Enter the author",
        pt: "Digite o autor",
    },
    step1Desc: {
        es: "Escriba el apellido y nombre del autor que desea clasificar.",
        en: "Type the surname and name of the author you want to classify.",
        pt: "Digite o sobrenome e nome do autor que deseja classificar.",
    },
    step2Title: {
        es: "Obtenga el código",
        en: "Get the code",
        pt: "Receba o código",
    },
    step2Desc: {
        es: "El sistema busca automáticamente el número de Cutter-Sanborn correspondiente.",
        en: "The system automatically looks up the corresponding Cutter-Sanborn number.",
        pt: "O sistema busca automaticamente o código Cutter-Sanborn correspondente.",
    },
    bannerText: {
        es: "Explore las tablas completas organizadas alfabéticamente",
        en: "Explore the complete tables organized alphabetically",
        pt: "Explore a tabela completa organizada alfabeticamente",
    },
    browseTables: {
        es: "Consultar las tablas",
        en: "Browse tables",
        pt: "Consultar tabelas",
    },
    tableTitle: {
        es: "Tablas de Cutter-Sanborn",
        en: "Cutter-Sanborn Tables",
        pt: "Tabela Cutter-Sanborn",
    },
    tableSubtitle: {
        es: "Explore las tablas completas organizadas alfabéticamente.",
        en: "Explore the complete tables organized alphabetically.",
        pt: "Explore a tabela completa organizada alfabeticamente.",
    },
    tableCode: {
        es: "Código",
        en: "Code",
        pt: "Código",
    },
    tableKey: {
        es: "Clave",
        en: "Key",
        pt: "Chave",
    },
    tableBack: {
        es: "Volver al buscador",
        en: "Back to search",
        pt: "Voltar à busca",
    },
    matchedEntry: {
        es: "Entrada coincidente:",
        en: "Matched entry:",
        pt: "Entrada correspondente:",
    },
    langSwitch: {
        es: "Español",
        en: "English",
        pt: "Português",
    },
};
let currentLang = "pt";
const STORAGE_KEY = "cutter-lang";
export function initLang() {
    // URL hash takes priority
    const hash = window.location.hash.replace("#", "").toLowerCase();
    if (hash === "en" || hash === "es" || hash === "pt") {
        currentLang = hash;
        localStorage.setItem(STORAGE_KEY, currentLang);
        return currentLang;
    }
    // Then localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "es" || stored === "pt") {
        currentLang = stored;
        return currentLang;
    }
    // Default to Portuguese
    currentLang = "pt";
    return currentLang;
}
export function getLang() {
    return currentLang;
}
export function setLang(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    window.location.hash = lang;
    applyTranslations();
}
export function toggleLang() {
    // Cycle: pt -> en -> es -> pt
    if (currentLang === "pt")
        setLang("en");
    else if (currentLang === "en")
        setLang("es");
    else
        setLang("pt");
}
export function t(key) {
    const entry = strings[key];
    if (!entry)
        return key;
    return entry[currentLang] ?? key;
}
export function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        const text = t(key);
        if (el instanceof HTMLInputElement) {
            if (el.type === "submit" || el.type === "button") {
                el.value = text;
            }
        }
        else {
            el.textContent = text;
        }
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (el instanceof HTMLInputElement) {
            el.placeholder = t(key);
        }
    });
    document.documentElement.lang = currentLang;
}
