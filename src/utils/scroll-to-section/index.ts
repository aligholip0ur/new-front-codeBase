export const onScrollToSection = (
  ref: React.RefObject<HTMLDivElement>,
  block?: ScrollLogicalPosition
) => {
  ref?.current?.scrollIntoView({
    behavior: 'smooth',
    block: block ?? 'end',
    inline: 'nearest',
  });
};
