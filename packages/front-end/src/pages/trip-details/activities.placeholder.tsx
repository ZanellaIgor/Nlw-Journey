import React from 'react';

export const ActivitiesPlaceholder = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {[...Array(2)].map((_, categoryIndex) => (
        <React.Fragment key={categoryIndex}>
          <div className="font-semibold text-xl bg-zinc-200 h-6 w-2/4 rounded"></div>

          {[...Array(3)].map((_, activityIndex) => (
            <div key={activityIndex} className="space-y-2.5">
              <div className="px-4 py-2.5 bg-zinc-900 rounded-lg shadow-shape flex items-center gap-3 animate-pulse">
                <span className="text-zinc-100 bg-zinc-200 h-4 w-48 rounded"></span>{' '}
                <span className="text-zinc-400 text-sm ml-auto bg-zinc-200 h-4 w-12 rounded"></span>{' '}
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};
