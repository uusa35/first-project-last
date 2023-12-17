import Favourite from "@/appIcons/landing/favourite.svg";
import NotFavourite from "@/appIcons/landing/not_favourite.svg";
import React, { useState } from "react";

type Props = {
  isFav: boolean;
  id?: number;
};

export default function ({ isFav, id }: Props) {
  const [isFavourite, setIsFavourite] = useState<boolean>(isFav);

  const handleFavourite = () => {
    setIsFavourite(!isFavourite);
    // req add to fav
  };

  return (
    <button key={id} onClick={handleFavourite} className='z-40'>
      {isFavourite ? (
        <Favourite className='h-7 w-7' />
      ) : (
        <NotFavourite className='h-7 w-7' />
      )}
    </button>
  );
}
