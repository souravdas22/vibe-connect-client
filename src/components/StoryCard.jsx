import React from 'react'

export default function StoryCard() {
  return (
    <>
      <div className="flex flex-col justify-center gap-2 cursor-pointer">
        <div className="avatar ">
          <div className="w-16 h-16 rounded-full ring-teal-500 ring-offset-base-100  ring ring-offset-2">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="story"
            />
          </div>
        </div>
        <p className="text-xs text-center ">Sam </p>
      </div>
    </>
  );
}
