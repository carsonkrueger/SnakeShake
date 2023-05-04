type privateProps = {
  text?: string;
  children?: JSX.Element;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
};

export default function Button({
  text = "",
  children = <></>,
  className,
  onClick,
  href = "#",
  target,
}: privateProps) {
  return (
    <a className={className} onClick={onClick} href={href} target={target}>
      {text}
      {children}
    </a>
  );
}
