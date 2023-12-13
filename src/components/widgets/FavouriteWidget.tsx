import Favourite from "@/appIcons/landing/favourite.svg";
import NotFavourite from "@/appIcons/landing/not_favourite.svg";
import React, { useState } from "react";

type Props = {
  isFav: boolean;
  id?: number;
};

export default function FavouriteWidget({ isFav, id }: Props) {
  const [isFavourite, setIsFavourite] = useState<boolean>(isFav);

  const handleFavourite = () => {
    setIsFavourite(!isFavourite);
    // req add to fav
  };
  
  return (
    <div key={id} onClick={handleFavourite}>
      {isFavourite ? (
        <Favourite className="h-7 w-7" />
      ) : (
        <NotFavourite className="h-7 w-7" />
      )}
    </div>
  );
}
