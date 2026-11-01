import { type ReactNode } from 'react';
import {
  Carousel as BaseCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

export interface CustomCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  orientation?: 'horizontal' | 'vertical';
  itemClassName?: string;
  className?: string;
  loop?: boolean;
  showArrows?: boolean;
  setApi?: (api: CarouselApi) => void;
}

export function Carousel<T>({
  items,
  renderItem,
  orientation = 'horizontal',
  itemClassName = 'basis-full',
  className,
  loop = false,
  showArrows = true,
  setApi,
}: CustomCarouselProps<T>) {
  return (
    <BaseCarousel
      orientation={orientation}
      opts={{ loop }}
      setApi={setApi}
      className={cn('w-full', className)}
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className={itemClassName}>
            {renderItem(item, index)}
          </CarouselItem>
        ))}
      </CarouselContent>

      {showArrows && (
        <>
          <CarouselPrevious className="rtl:rotate-180" />
          <CarouselNext className="rtl:rotate-180" />
        </>
      )}
    </BaseCarousel>
  );
}

Carousel.displayName = 'Carousel';
