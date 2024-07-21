import React from 'react';
import { Button } from '../../components/button';

export const GuestPlaceholder = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <h2 className="font-semibold text-xl bg-zinc-200 h-6 w-2/4 rounded"></h2>

      {[...Array(5)].map((_, index) => (
        <React.Fragment key={index}>
          <Button variant="secondary" size="full">
            <div className="w-5 h-5 bg-zinc-200 rounded-full"></div>
            <span className="bg-zinc-200 h-4 w-1/2 inline-block rounded"></span>
          </Button>
        </React.Fragment>
      ))}
    </div>
  );
};
