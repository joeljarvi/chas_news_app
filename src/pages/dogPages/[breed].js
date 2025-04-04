import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function BreedPage() {
  const router = useRouter();
  const { breed } = router.query;

  const [breedImage, setBreedImage] = useState(null);
  const [watermarks, setWatermarks] = useState(null);
  const [loading, setLoading] = useState(true);

  // Refs for the image dimensions
  const imageRef = useRef(null);

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

    const generatedWatermarks = generateWatermarks(breed);
    setWatermarks(generatedWatermarks);

    setLoading(false);
  }

  function generateWatermarks(breed) {
    const watermarkText = (
      <div className="flex flex-row items-start justify-start gap-x-12 lg:gap-x-2">
        <h2 className="font-thin text-xs lg:text-md">
          DOG<strong className="font-black tracking-tight">INDEX</strong>
        </h2>

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

    return Array.from({ length: 240 }).map((_, index) => (
      <div
        key={index}
        className="flex flex-row flex-wrap justify-start items-start"
      >
        {watermarkText}
      </div>
    ));
  }

  function handleImageLoad() {}

  return (
    <div className="relative">
      <div className="fixed bottom-0 left-0 z-20 text-pink-400 mix-blend-difference w-full pb-1 pl-2">
        <div className="flex flex-row justify-between lg:text-4xl">
          <Link href="/">
            <h2 className="font-thin">
              DOG
              <strong className="font-black tracking-tight">INDEX</strong>
            </h2>
          </Link>
        </div>
      </div>
      <div className="relative flex flex-col items-start justify-start">
        {breedImage && !loading && (
          <>
            <div className="relative">
              <img
                ref={imageRef}
                src={breedImage}
                alt={`Image of ${breed}`}
                className=" lg:max-w-[960px] lg:min-h-[550px] z-0"
                onLoad={handleImageLoad}
              />
              <div
                id="watermarks"
                className="overflow-hidden absolute top-0 left-0 w-full h-full flex flex-row flex-wrap gap-24 lg:gap-24 items-center justify-center animate-marquee rotate-12  z-20 -ml-14 -mt-8"
                style={{
                  width: imageRef.current ? imageRef.current.width : "100%",
                  height: imageRef.current ? imageRef.current.height : "100%",
                }}
              >
                {watermarks}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
