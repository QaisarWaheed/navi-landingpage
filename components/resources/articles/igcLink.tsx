/** External link as used in blog Word docs (IGC Group → igcollaborative.com). */
export function IgcGroupLink({ children = "IGC Group" }: { children?: string }) {
  return (
    <a
      href="https://igcollaborative.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-accent underline-offset-2 hover:underline"
    >
      {children}
    </a>
  );
}
