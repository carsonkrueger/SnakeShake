type privateProps = {
  text: string;
  onClick?: () => void;
  href?: string;
  target?: string;
};

export default function Button({
  text,
  onClick,
  href = "#",
  target,
}: privateProps) {
  return (
    <a
      className="bg-blue-500 text-white rounded-lg px-3 py-1"
      onClick={onClick}
      href={href}
      target={target}
    >
      {text}
    </a>
  );
}
