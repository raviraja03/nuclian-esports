import React from "react";

// --- Data for Blog Posts ---
const featuredPostsData = [
  {
    id: 1,
    tag: "NEW",
    image:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bdcd80c5-e61c-48f4-868b-380d3d8aaeb4.png",
    title: "PS6 Specs Leak: What We Know",
    description:
      "Breaking down the latest rumors about Sony's next-gen console and what it means for gaming.",
    date: "May 15, 2024",
  },
  {
    id: 2,
    image:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c21faffc-c2bd-48c0-866e-b4d38a5717a2.png",
    title: "Building the Ultimate 4K Gaming Rig",
    description:
      "Our step-by-step guide to assembling a beastly PC that crushes 4K gaming at max settings.",
    date: "May 12, 2024",
  },
  {
    id: 3,
    image:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/37835fa1-76f8-41bd-bf9e-44ea7e82c1b2.png",
    title: "VR Gaming: The Future Is Here",
    description:
      "Exploring how next-gen VR is revolutionizing immersive gaming experiences beyond our expectations.",
    date: "May 8, 2024",
  },
];

const latestPostsData = [
  {
    id: 4,
    image:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d7fe8d9e-3732-4cc4-9bdc-9d44d407489c.png",
    title: "Best Mechanical Keyboards for 2024",
    date: "May 5, 2024",
  },
  {
    id: 5,
    image:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/352ce840-ac8d-406f-a1c8-a7e29c56b177.png",
    title: "Esports Prize Pools Hit New Records",
    date: "May 3, 2024",
  },
  {
    id: 6,
    image:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d30c2fc7-6d96-4a0a-97d9-b885c10dabda.png",
    title: "How AI Is Changing Game Development",
    date: "April 30, 2024",
  },
  {
    id: 7,
    image:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/06f46f26-e54f-49f5-9705-32a072f8f3a5.png",
    title: "The 240Hz Advantage in Competitive Gaming",
    date: "April 28, 2024",
  },
  {
    id: 8,
    image:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/603d4e29-4331-4662-80b8-c67c3221aa68.png",
    title: "Retro Gaming Resurgence Continues",
    date: "April 25, 2024",
  },
  {
    id: 9,
    image:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/31c5805d-c923-4d57-bfd0-d6f7f8aa5cb2.png",
    title: "Mobile Gaming Graphics Reach New Heights",
    date: "April 22, 2024",
  },
  {
    id: 10,
    image:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/dac05ea3-906c-4c0a-a59a-795556fec0e1.png",
    title: "Starting a Gaming Channel in 2024",
    date: "April 19, 2024",
  },
  {
    id: 11,
    image:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d7bc75ae-661b-4e8c-96e9-69970f458b84.png",
    title: "Cloud Gaming: State of Play in 2024",
    date: "April 16, 2024",
  },
];

// --- Reusable Blog Card Component ---
const BlogCard = ({ post, isFeatured }) => (
  <article className="group relative rounded-lg border border-[#2a2a2a] bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(225,29,72,0.2)]">
    {post.tag && (
      <span className="absolute top-4 right-4 rounded bg-[#E11D48] px-2 py-1 text-xs font-bold">
        {post.tag}
      </span>
    )}

    <img
      src={post.image}
      alt={post.title}
      className={`mb-4 w-full rounded object-cover ${
        isFeatured ? "h-48" : "h-40"
      }`}
    />

    <h3
      className={`font-bold transition-colors group-hover:text-[#FC4E5B] ${
        isFeatured ? "text-xl mb-2" : "text-lg mb-2"
      }`}
    >
      {post.title}
    </h3>

    {isFeatured && <p className="mb-4 text-gray-400">{post.description}</p>}

    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500">{post.date}</span>
      <button className="text-sm font-bold text-[#FC4E5B] transition-colors hover:text-red-400 cursor-pointer">
        {isFeatured ? "Read More →" : "Read →"}
      </button>
    </div>
  </article>
);

// --- Main News Page Component ---
const Blog = () => {
  return (
    <section>
      <div className='max-w-full mx-auto px-15 py-10'>
        <div className="font-['Lexend',_sans-serif] bg-black text-white">
          {/* Hero Section */}
          <section className="border-b border-gray-800">
            <div className="container mx-auto px-4 py-16">
              <div className="flex flex-col items-center text-center">
                <h2 className="mb-6 text-5xl font-bold [text-shadow:0_0_10px_rgba(255,51,51,0.5)]">
                  GAMING & TECH NEWS
                </h2>
                <p className="max-w-2xl text-xl text-gray-400">
                  Your portal to the latest in gaming technology, hardware
                  reviews, and the most exciting developments in the digital
                  frontier.
                </p>
              </div>
            </div>
          </section>

          {/* Featured Posts */}
          <section className="border-b border-gray-800 py-12">
            <div className="container mx-auto px-4">
              <h2 className="mb-8 flex items-center text-3xl font-bold gap-2">
                <span className="mr-4 inline-block h-8 w-2 bg-[#E11D48]"></span>    
                FEATURED <span className="text-[#e11d48]">STORIES</span>
              </h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {featuredPostsData.map((post) => (
                  <BlogCard key={post.id} post={post} isFeatured={true} />
                ))}
              </div>
            </div>
          </section>

          {/* Latest Posts */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="mb-8 flex items-center text-3xl font-bold gap-2">
                <span className="mr-4 inline-block h-8 w-2 bg-[#E11D48]"></span>
                LATEST <span className="text-[#e11d48]">POSTS</span>
              </h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {latestPostsData.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Blog;
