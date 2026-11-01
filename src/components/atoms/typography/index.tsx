import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { type HTMLAttributes, type LabelHTMLAttributes } from 'react';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-[1rem] md:text-[1.25rem] font-medium leading-normal',
      h2: 'text-[0.875rem] md:text-[1.125rem] font-medium leading-normal',
      h3: 'text-[0.875rem] md:text-[1rem] font-medium leading-normal',
      h4: 'text-[0.75rem] md:text-[0.875rem] font-medium leading-normal',
      body: 'text-[0.875rem] font-normal leading-normal',
      label: 'text-[0.75rem] md:text-[0.875rem] font-medium leading-normal',
      button: 'text-[0.875rem] font-medium leading-normal',
      smallText: 'text-[0.75rem] font-medium leading-normal',
      xsText: 'text-[0.625rem] font-medium leading-normal',
      x2sText: 'text-[0.5rem] font-medium leading-normal',
    },
    weight: {
      300: 'font-light',
      400: 'font-normal',
      500: 'font-medium',
      600: 'font-semibold',
      700: 'font-bold',
      800: 'font-extrabold',
    },
  },
  defaultVariants: {
    variant: 'body',
    weight: 400,
  },
  // compoundVariants: [
  //   {
  //     variant: ['h1', 'h2', 'h3'],
  //     class: 'font-medium'
  //   },
  //   {
  //     variant: 'body',
  //     class: 'font-normal'
  //   },
  // ]
});

type TypographyElement = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'label';

type TypographyProps<T extends TypographyElement> = {
  as?: T;
  variant?: VariantProps<typeof typographyVariants>['variant'];
  weight?: VariantProps<typeof typographyVariants>['weight'];
  className?: string;
  children: React.ReactNode;
} & (T extends 'label'
  ? Omit<LabelHTMLAttributes<HTMLLabelElement>, keyof VariantProps<typeof typographyVariants>>
  : Omit<HTMLAttributes<HTMLElement>, keyof VariantProps<typeof typographyVariants>>);

export function Typography<T extends TypographyElement = 'p'>({
  variant,
  weight,
  as,
  className,
  children,
  ...props
}: TypographyProps<T>) {
  const Component = (as || 'p') as React.ElementType;

  return (
    <Component className={cn(typographyVariants({ variant, weight }), className)} {...props}>
      {children}
    </Component>
  );
}

export function H1({
  className,
  children,
  ...props
}: Omit<TypographyProps<'h1'>, 'variant' | 'as'>) {
  return (
    <Typography variant="h1" as="h1" className={className} {...props}>
      {children}
    </Typography>
  );
}

export function H2({
  className,
  children,
  ...props
}: Omit<TypographyProps<'h2'>, 'variant' | 'as'>) {
  return (
    <Typography variant="h2" as="h2" className={className} {...props}>
      {children}
    </Typography>
  );
}

export function H3({
  className,
  children,
  ...props
}: Omit<TypographyProps<'h3'>, 'variant' | 'as'>) {
  return (
    <Typography variant="h3" as="h3" className={className} {...props}>
      {children}
    </Typography>
  );
}

export function H4({
  className,
  children,
  ...props
}: Omit<TypographyProps<'h3'>, 'variant' | 'as'>) {
  return (
    <Typography variant="h4" as="h4" className={className} {...props}>
      {children}
    </Typography>
  );
}
export function Text({
  className,
  children,
  ...props
}: Omit<TypographyProps<'p'>, 'variant' | 'as'>) {
  return (
    <Typography variant="body" as="p" className={className} {...props}>
      {children}
    </Typography>
  );
}

export function Label({
  className,
  children,
  ...props
}: Omit<TypographyProps<'label'>, 'variant' | 'as'>) {
  return (
    <Typography variant="label" as="label" className={className} {...props}>
      {children}
    </Typography>
  );
}

export function SmallText({
  className,
  children,
  ...props
}: Omit<TypographyProps<'p'>, 'variant' | 'as'>) {
  return (
    <Typography variant="smallText" as="p" className={className} {...props}>
      {children}
    </Typography>
  );
}

export function XSText({
  className,
  children,
  ...props
}: Omit<TypographyProps<'p'>, 'variant' | 'as'>) {
  return (
    <Typography variant="xsText" as="p" className={className} {...props}>
      {children}
    </Typography>
  );
}

export function X2SText({
  className,
  children,
  ...props
}: Omit<TypographyProps<'p'>, 'variant' | 'as'>) {
  return (
    <Typography variant="x2sText" as="p" className={className} {...props}>
      {children}
    </Typography>
  );
}
export function ButtonText({
  className,
  children,
  ...props
}: Omit<TypographyProps<'span'>, 'variant' | 'as'>) {
  return (
    <Typography variant="button" as="span" className={className} {...props}>
      {children}
    </Typography>
  );
}
