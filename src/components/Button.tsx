type privateProps = {
  text: string;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
};

export default function Button({
  text,
  className,
  onClick,
  href = "#",
  target,
}: privateProps) {
  return (
    <a className={className} onClick={onClick} href={href} target={target}>
      {text}
    </a>
  );
}
