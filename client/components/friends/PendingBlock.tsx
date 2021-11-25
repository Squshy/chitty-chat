import React from "react";

type PendingBlockProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  type: "pending" | "incoming";
};

export const PendingBlock: React.FC<PendingBlockProps> = ({
  title,
  type,
  children,
  ...props
}) => {
  return (
    <div className='flex flex-col h-full w-full flex-grow space-y-4'>
      <h3 className="text-2xl font-semibold text-gray-300">{title}</h3>
      <div className="divide-y divide-[#383838] border-t border-b border-[#383838]">
        {children ? (
          children
        ) : (
          <div className="p-4">
            <p className="italic text-[#666666] text-center">
              You have no {type} friend requests
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
