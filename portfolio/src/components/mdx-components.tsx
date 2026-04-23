import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { slugify } from "@/lib/toc";
import Callout from "@/components/Callout";
import MemeImage from "@/components/MemeImage";
import ProConList from "@/components/ProConList";

function SmartLink({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) {
    return <a className="prose-a" {...props}>{children}</a>;
  }

  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a
        className="prose-a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link className="prose-a" href={href} {...props}>
      {children}
    </Link>
  );
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) {
    const el = node as React.ReactElement<{ children?: React.ReactNode }>;
    return extractText(el.props.children);
  }
  return "";
}

function HeadingWithId({
  level,
  children,
  ...props
}: { level: number } & React.HTMLAttributes<HTMLHeadingElement>) {
  const text = extractText(children);
  const id = slugify(text);

  if (level === 1) return <h1 id={id} className="prose-h1" {...props}>{children}</h1>;
  if (level === 2) return <h2 id={id} className="prose-h2" {...props}>{children}</h2>;
  if (level === 3) return <h3 id={id} className="prose-h3" {...props}>{children}</h3>;
  return <h4 id={id} className="prose-h4" {...props}>{children}</h4>;
}

const components: MDXComponents = {
  h1: (props) => <HeadingWithId level={1} {...props as React.HTMLAttributes<HTMLHeadingElement>} />,
  h2: (props) => <HeadingWithId level={2} {...props as React.HTMLAttributes<HTMLHeadingElement>} />,
  h3: (props) => <HeadingWithId level={3} {...props as React.HTMLAttributes<HTMLHeadingElement>} />,
  h4: (props) => <HeadingWithId level={4} {...props as React.HTMLAttributes<HTMLHeadingElement>} />,
  p: (props) => <p className="prose-p" {...props} />,
  a: SmartLink as MDXComponents["a"],
  ul: (props) => <ul className="prose-ul" {...props} />,
  ol: (props) => <ol className="prose-ol" {...props} />,
  li: (props) => <li className="prose-li" {...props} />,
  blockquote: (props) => <blockquote className="prose-blockquote" {...props} />,
  hr: (props) => <hr className="prose-hr" {...props} />,
  img: (props) => <img className="prose-img" alt="" {...props} />,
  pre: (props) => <pre className="prose-pre" {...props} />,
  code: (props) => <code className="prose-code" {...props} />,
  inlineCode: (props) => <code className="prose-inline-code" {...props} />,
  strong: (props) => <strong className="prose-strong" {...props} />,
  em: (props) => <em className="prose-em" {...props} />,
  table: (props) => <table className="prose-table" {...props} />,
  thead: (props) => <thead className="prose-thead" {...props} />,
  tbody: (props) => <tbody className="prose-tbody" {...props} />,
  tr: (props) => <tr className="prose-tr" {...props} />,
  th: (props) => <th className="prose-th" {...props} />,
  td: (props) => <td className="prose-td" {...props} />,
  Callout,
  MemeImage,
  ProConList,
};

export function getMDXComponents(): MDXComponents {
  return components;
}