import React from 'react';
import { cn } from '@/shared/lib/utils';
import { CategoriesDTO } from '@/@types/categories';
import { Button, Skeleton } from '../ui';
import { Title } from './title';

interface Props {
  title: string;
  items: CategoriesDTO[];
  activeName: string;
  onChange: (name: string) => void;
  className?: string;
}

export const Categories: React.FC<Props> = ({ title, items, activeName, onChange, className }) => {
  if (!items) {
    return (
      <div className={cn('flex flex-col', className)}>
        <Skeleton className="h-[48px] w-[170px] rounded-lg" />
        <div className="flex items-center overflow-x-auto scrollbar gap-4 py-3">
          {...Array(10)
            .fill(0)
            .map((_, i) => <Skeleton key={i} className="h-[48px] w-[208px] rounded-xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <Title text={title} size="lg" className="w-fit" />
      <div className="flex items-center overflow-x-auto scrollbar gap-4 py-3">
        <Button
          onClick={() => onChange('')}
          className={cn(
            'flex items-center transition-all duration-300 ease-in-out bg-gray-800 p-6 rounded-xl',
            'hover:opacity-80 text-lg',
            !activeName && 'bg-[linear-gradient(90deg,#48078f,#004fd6)] opacity-100 transition-all',
          )}
          variant={'ghost'}>
          Все категории
        </Button>
        {items?.map((item, i) => (
          <Button
            key={i}
            variant={'ghost'}
            onClick={() => onChange(item.name)}
            className={cn(
              'flex items-center transition-all duration-300 ease-in-out bg-gray-800 p-6 rounded-xl',
              'hover:opacity-80 text-lg',
              activeName === item.name &&
                'bg-[linear-gradient(90deg,#48078f,#004fd6)] opacity-100 transition-all',
            )}>
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
