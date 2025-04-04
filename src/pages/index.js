import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [randomDogImage, setRandomDogImage] = useState(null);
  const [randomLoveImage, setRandomLoveImage] = useState(null);
  const [randomDoImage, setRandomDoImage] = useState(null);
  const [randomYouImage, setRandomYouImage] = useState(null);
  const [dogList, setDogList] = useState([]);
  const [mounted, setMounted] = useState(false);

  async function getRandomDog() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    setRandomDogImage(data.message);
  }

  async function getRandomLove() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    setRandomLoveImage(data.message);
  }

  async function getRandomDo() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    setRandomDoImage(data.message);
  }

  async function getRandomYou() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    setRandomYouImage(data.message);
  }

  async function getDogList() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    setDogList(Object.keys(data.message));
  }

  useEffect(() => {
    getRandomDo();
    getRandomYou();
    getRandomLove();
    getRandomDog();

    getDogList();
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-y-4">
      {dogList.length > 0 ? (
        <div>
          <ul className="w-full grid grid-cols-1 lg:grid-cols-2">
            {dogList.map((breed, index) => (
              <Link href={`dogPages/${breed}`} key={index}>
                <li
                  className={`text-4xl tracking-tight leading-tight cursor-pointer font-black text-center uppercase px-16 text-black ${
                    index % 2 === 0 ? "bg-white" : "bg-white"
                  }`}
                >
                  {breed}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading breed list...</p>
      )}
      <div className="bg-red-600 px-4 pt-4 pb-6 flex flex-col lg:flex-row items-start justify-center lg:justify-start lg:items-start lg:px-12 lg:flex-wrap w-full min-h-screen xl-type tracking-tight overflow-hidden">
        <span className="w-full lg:w-1/2 flex flex-row items-start justify-start gap-x-2 lg:justify-end lg:pr-16">
          <h1 className="mt-1 lg:mt-0.5">D</h1>
          {randomDoImage ? (
            <div>
              <img
                src={randomDoImage}
                alt="Random Love Dog"
                className="max-h-24 lg:max-h-40 cursor-pointer hover:shadow-xl rounded-full mt-14 lg:mt-24"
                onClick={getRandomDo}
                loading="lazy"
              />
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </span>
        <span className="w-full lg:w-1/2 flex flex-row items-start justify-start gap-x-2">
          <h1 className="mt-3 lg:mt-0">Y</h1>
          {randomYouImage ? (
            <div>
              <img
                src={randomYouImage}
                alt="Random Dog"
                className="max-h-24 lg:max-h-40 cursor-pointer hover:shadow-xl rounded-full mt-16 lg:mt-24 lg:-ml-2"
                onClick={getRandomYou}
                loading="lazy"
              />
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <h1 className=" mt-3 lg:mt-0 -ml-1">U</h1>
        </span>
        <span className="w-full lg:w-1/2 flex flex-row items-start justify-start gap-x-2">
          <h1 className="mt-3.5 lg:mt-1">L</h1>
          {randomLoveImage ? (
            <div>
              <img
                src={randomLoveImage}
                alt="Random Love Dog"
                className="max-h-24 lg:max-h-40 cursor-pointer hover:shadow-xl rounded-full mt-16 lg:mt-24"
                onClick={getRandomLove}
                loading="lazy"
              />
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <h1 className="-ml-1 mt-3.5 lg:mt-1">VE</h1>
        </span>
        <span className="w-full lg:w-1/2 flex flex-row items-start justify-start gap-x-2">
          <h1 className="mt-3 lg:mt-1">D</h1>
          {randomDogImage ? (
            <div>
              <img
                src={randomDogImage}
                alt="Random Dog"
                className="max-h-24 lg:max-h-40 min-w-44 cursor-pointer hover:shadow-xl rounded-full mt-16 lg:mt-24"
                onClick={getRandomDog}
                loading="lazy"
              />
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <h1 className="mt-3 lg:mt-1 -ml-1">GS</h1>
        </span>
      </div>
    </div>
  );
}
