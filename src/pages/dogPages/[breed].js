import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function BreedPage() {
  const router = useRouter();
  const { breed } = router.query;

  const [breedImage, setBreedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [watermarksVisible, setWatermarksVisible] = useState(false);
  useEffect(() => {
    if (breed) {
      fetchBreedImage(breed);
    }
  }, [breed]);

  async function fetchBreedImage(breed) {
    setLoading(true);
    const response = await fetch(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );
    const data = await response.json();
    setBreedImage(data.message);
    setLoading(false);
  }

  function handleImageLoad() {
    setWatermarksVisible(true);
  }

  function generateWatermarks() {
    const watermarkText = (
      <div className="flex flex-row items-start justify-start gap-x-12 lg:gap-x-2">
        <Link href="/">
          <h2 className="font-thin text-xs lg:text-md">
            DOG<strong className="font-black tracking-tight">INDEX</strong>
          </h2>
        </Link>
        <h2 className="font-thin text-xs lg:text-md">
          <strong className="font-black tracking-tight uppercase">©</strong>
          2025
        </h2>

        <h2 className="font-thin text-xs lg:text-md">
          BREED
          <strong className="font-black tracking-tight uppercase">
            {breed}
          </strong>
        </h2>
      </div>
    );

    return Array.from({ length: 40 }).map((_, index) => (
      <div
        key={index}
        className="flex flex-row flex-wrap justify-start items-start"
      >
        {watermarkText}
      </div>
    ));
  }

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="absolute top-0 -left-0 lg:left-0  z-10 text-pink-400 mix-blend-difference w-full h-screen overflow-hidden">
        <div
          id="watermarks"
          className={`flex flex-row flex-wrap h-screen w-fit gap-32 lg:gap-32 items-center justify-center animate-marquee rotate-12 scale-150 lg:scale-125`}
        >
          {generateWatermarks()}
        </div>
      </div>
      {loading ? (
        <p className="text-2xl lg:text-4xl font-thin">Loading breed image...</p>
      ) : (
        <div className="w-screen h-screen flex flex-col items-center justify start lg:justify-center">
          <img
            src={breedImage}
            alt={`Image of ${breed}`}
            className="px-4 py-4 min-w-full lg:min-w-max"
            onLoad={handleImageLoad}
          />

          <div className="fixed z-10 bottom-0 left-0 w-full ">
            <div className="flex items-center justify-between pb-3 px-4 lg:pt-8">
              <Link
                href="/"
                className="text-xl lg:text-4xl font-black text-pink-400 m-0"
              >
                BACK
              </Link>
              <button
                onClick={() => fetchBreedImage(breed)}
                className="text-xl text-right lg:text-4xl font-black text-pink-400 lg:mr-1"
              >
                REFRESH
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
