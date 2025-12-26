export function removeLovableBranding() {
  if (typeof window === "undefined") return;

  const selectors = [
    'a[href*="lovable.dev"]',
    'iframe[src*="lovable.dev"]',
    '.lovable-badge',
    'div[style*="Edit with Lovable"]'
  ];

  const remove = () => {
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => el.remove());
    });
  };

  remove();

  const observer = new MutationObserver(remove);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
