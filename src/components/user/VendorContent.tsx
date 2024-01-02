"use client";
import { Fragment } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Tab } from "@headlessui/react";

const product = {
  name: "Application UI Icon Pack",
  version: { name: "1.0", date: "June 5, 2021", datetime: "2021-06-05" },
  price: "$220",
  description:
    "The Application UI Icon Pack comes with over 200 icons in 3 styles: outline, filled, and branded. This playful icon pack is tailored for complex application user interfaces with a friendly and legible look.",
  highlights: [
    "200+ SVG icons in 3 unique styles",
    "Compatible with Figma, Sketch, and Adobe XD",
    "Drawn on 24 x 24 pixel grid",
  ],
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/product-page-05-product-01.jpg",
  imageAlt:
    "Sample of 30 icons with friendly and fun details in outline, filled, and brand color styles.",
};
const reviews = {
  average: 4,
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!</p>
      `,
      date: "July 16, 2021",
      datetime: "2021-07-16",
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 2,
      rating: 5,
      content: `
        <p>Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.</p>
      `,
      date: "July 12, 2021",
      datetime: "2021-07-12",
      author: "Hector Gibbons",
      avatarSrc:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};
const faqs = [
  {
    question: "What format are these icons?",
    answer:
      "The icons are in SVG (Scalable Vector Graphic) format. They can be imported into your design tool of choice and used directly in code.",
  },
  {
    question: "Can I use the icons at different sizes?",
    answer:
      "Yes. The icons are drawn on a 24 x 24 pixel grid, but the icons can be scaled to different sizes as needed. We don't recommend going smaller than 20 x 20 or larger than 64 x 64 to retain legibility and visual balance.",
  },
  // More FAQs...
];
const license = {
  href: "#",
  summary:
    "For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.",
  content: `
    <h4>Overview</h4>
    
    <p>For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.</p>
    
    <ul role="list">
    <li>You\'re allowed to use the icons in unlimited projects.</li>
    <li>Attribution is not required to use the icons.</li>
    </ul>
    
    <h4>What you can do with it</h4>
    
    <ul role="list">
    <li>Use them freely in your personal and professional work.</li>
    <li>Make them your own. Change the colors to suit your project or brand.</li>
    </ul>
    
    <h4>What you can\'t do with it</h4>
    
    <ul role="list">
    <li>Don\'t be greedy. Selling or distributing these icons in their original or modified state is prohibited.</li>
    <li>Don\'t be evil. These icons cannot be used on websites or applications that promote illegal or immoral beliefs or activities.</li>
    </ul>
  `,
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function () {
  return (
    <div className='mx-auto sm:px-6 lg:px-8 '>
      {/* Product */}
      <div className='lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16'>
        <div className='mx-auto  w-full  col-span-full lg:mt-0 lg:max-w-none'>
          <Tab.Group as='div'>
            <div className='border-b border-gray-200'>
              <Tab.List className='-mb-px flex gap-x-8'>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      selected
                        ? "border-picks-dark text-picks-dark"
                        : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
                      "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                    )
                  }>
                  Customer Reviews
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      selected
                        ? "border-picks-dark text-picks-dark"
                        : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
                      "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                    )
                  }>
                  FAQ
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      selected
                        ? "border-picks-dark text-picks-dark"
                        : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
                      "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                    )
                  }>
                  License
                </Tab>
              </Tab.List>
            </div>
            <Tab.Panels as={Fragment}>
              <Tab.Panel className='-mb-10'>
                <h3 className='sr-only'>Customer Reviews</h3>
                {reviews.featured.map((review, reviewIdx) => (
                  <div
                    key={review.id}
                    className='flex space-x-4 text-sm text-gray-500'>
                    <div className='flex-none py-10'>
                      <img
                        src={review.avatarSrc}
                        alt=''
                        className='h-10 w-10 rounded-full bg-gray-100'
                      />
                    </div>
                    <div
                      className={classNames(
                        reviewIdx === 0 ? "" : "border-t border-gray-200",
                        "py-10"
                      )}>
                      <h3 className='font-medium text-gray-900'>
                        {review.author}
                      </h3>
                      <p>
                        <time dateTime={review.datetime}>{review.date}</time>
                      </p>

                      <div className='mt-4 flex items-center'>
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              review.rating > rating
                                ? "text-yellow-400"
                                : "text-gray-300",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden='true'
                          />
                        ))}
                      </div>
                      <p className='sr-only'>{review.rating} out of 5 stars</p>

                      <div
                        className='prose prose-sm mt-4 max-w-none text-gray-500'
                        dangerouslySetInnerHTML={{ __html: review.content }}
                      />
                    </div>
                  </div>
                ))}
              </Tab.Panel>

              <Tab.Panel className='text-sm text-gray-500'>
                <h3 className='sr-only'>Frequently Asked Questions</h3>

                <dl>
                  {faqs.map((faq) => (
                    <Fragment key={faq.question}>
                      <dt className='mt-10 font-medium text-gray-900'>
                        {faq.question}
                      </dt>
                      <dd className='prose prose-sm mt-2 max-w-none text-gray-500'>
                        <p>{faq.answer}</p>
                      </dd>
                    </Fragment>
                  ))}
                </dl>
              </Tab.Panel>

              <Tab.Panel className='pt-10'>
                <h3 className='sr-only'>License</h3>

                <div
                  className='prose prose-sm max-w-none text-gray-500'
                  dangerouslySetInnerHTML={{ __html: license.content }}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}
