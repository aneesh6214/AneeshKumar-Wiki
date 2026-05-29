"use client";

import { useEffect } from "react";

const HIGHLIGHT_PARAM = "searchHighlight";
const HIGHLIGHT_SELECTOR = "mark[data-search-highlight]";
const SEARCH_CONTENT_SELECTOR = '[data-search-content="true"]';
const SEARCH_EXCLUDE_SELECTOR = '[data-search-exclude="true"]';
const BLOCKED_TAGS = new Set([
  "BUTTON",
  "INPUT",
  "SCRIPT",
  "SELECT",
  "STYLE",
  "TEXTAREA",
]);

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function removeHighlights() {
  const marks = Array.from(document.querySelectorAll(HIGHLIGHT_SELECTOR));
  marks.forEach((mark) => {
    const text = document.createTextNode(mark.textContent || "");
    mark.replaceWith(text);
  });
  getSearchRoots().forEach((root) => root.normalize());
}

function removeHighlightParam() {
  const url = new URL(window.location.href);
  if (!url.searchParams.has(HIGHLIGHT_PARAM)) return;

  url.searchParams.delete(HIGHLIGHT_PARAM);
  const nextPath = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState(null, "", nextPath);
}

function highlightTextNode(textNode: Text, regex: RegExp): HTMLElement[] {
  const source = textNode.nodeValue || "";
  const matches = Array.from(source.matchAll(regex));
  if (matches.length === 0) return [];

  const fragment = document.createDocumentFragment();
  const marks: HTMLElement[] = [];
  let cursor = 0;

  matches.forEach((match) => {
    const index = match.index ?? 0;
    const value = match[0];

    if (index > cursor) {
      fragment.append(document.createTextNode(source.slice(cursor, index)));
    }

    const mark = document.createElement("mark");
    mark.dataset.searchHighlight = "true";
    mark.textContent = value;
    fragment.append(mark);
    marks.push(mark);

    cursor = index + value.length;
  });

  if (cursor < source.length) {
    fragment.append(document.createTextNode(source.slice(cursor)));
  }

  textNode.replaceWith(fragment);
  return marks;
}

function collectTextNodes(root: HTMLElement): Text[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (
        !parent ||
        BLOCKED_TAGS.has(parent.tagName) ||
        parent.closest(SEARCH_EXCLUDE_SELECTOR)
      ) {
        return NodeFilter.FILTER_REJECT;
      }
      if (!node.nodeValue?.trim()) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    nodes.push(current as Text);
    current = walker.nextNode();
  }
  return nodes;
}

function getSearchRoots(): HTMLElement[] {
  const roots = Array.from(
    document.querySelectorAll<HTMLElement>(SEARCH_CONTENT_SELECTOR),
  );
  if (roots.length > 0) return roots;

  const main = document.querySelector<HTMLElement>("main");
  return main ? [main] : [];
}

function applyHighlights(query: string): HTMLElement[] {
  removeHighlights();

  const roots = getSearchRoots();
  const normalizedQuery = query.trim().replace(/\s+/g, " ");
  if (roots.length === 0 || normalizedQuery.length < 2) return [];

  const nodes = roots.flatMap(collectTextNodes);
  const phraseRegex = new RegExp(escapeRegExp(normalizedQuery), "gi");
  const phraseMarks = nodes.flatMap((node) =>
    highlightTextNode(node, phraseRegex),
  );

  if (phraseMarks.length > 0) return phraseMarks;

  const terms = normalizedQuery
    .split(/\s+/)
    .filter((term) => term.length > 1)
    .map(escapeRegExp);

  if (terms.length === 0) return [];

  const termRegex = new RegExp(`\\b(${terms.join("|")})\\b`, "gi");
  return roots
    .flatMap(collectTextNodes)
    .flatMap((node) => highlightTextNode(node, termRegex));
}

export default function SearchHighlight() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const query = url.searchParams.get(HIGHLIGHT_PARAM);
    if (!query) return;

    let removeListener = false;
    const frame = window.requestAnimationFrame(() => {
      const marks = applyHighlights(query);
      const firstMark = marks[0];
      if (!firstMark) {
        removeHighlightParam();
        window.removeEventListener("pointerdown", clearHighlight);
        return;
      }

      firstMark.scrollIntoView({ block: "center", inline: "nearest" });

      window.setTimeout(() => {
        removeListener = true;
      }, 0);
    });

    const clearHighlight = (event: PointerEvent) => {
      if (!removeListener) return;
      const target = event.target as Element | null;
      if (target?.closest(HIGHLIGHT_SELECTOR)) return;

      removeHighlights();
      removeHighlightParam();
      window.removeEventListener("pointerdown", clearHighlight);
    };

    window.addEventListener("pointerdown", clearHighlight);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointerdown", clearHighlight);
      removeHighlights();
    };
  }, []);

  return null;
}
