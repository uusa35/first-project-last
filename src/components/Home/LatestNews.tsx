import { Locale } from "@/types/index";
import { AppQueryResult, Post } from "@/types/queries";
import * as React from "react";
import PostCard from "../post/PostCard";

type Props = {
  trans: { [key: string]: string };
  posts: AppQueryResult<Post[]>;
  lang: Locale["lang"];
};

export function LatestNews({ trans, posts, lang }: Props) {
  return (
    <div className="bg-white py-14 capitalize">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {trans.latest_news}
          </h2>
          <p className="mt-2 text-lg break-all leading-8 text-gray-600">
            {trans.through_this_section_get_latest_news_related}
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.data.map((p: Post, i: number) => (
            <PostCard element={p} lang={lang} key={p.name} />
          ))}
        </div>
      </div>
    </div>
  );
}
