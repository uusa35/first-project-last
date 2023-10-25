"use client";
import { Spinner } from "flowbite-react";

export default function ({ isLoading }: { isLoading: boolean }) {
  return (
    <div
      className={`${
        !isLoading ? `hidden` : ``
      } w-full h-full flex justify-center items-center py-8`}>
      <Spinner aria-label='Default status example' />
    </div>
  );
}
