import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [randomDogImage, setRandomDogImage] = useState(null);
  const [dogList, setDogList] = useState([]);
  const [mounted, setMounted] = useState(false);

  async function getRandomDog() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    setRandomDogImage(data.message);
  }

  async function getDogList() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    setDogList(Object.keys(data.message));
  }

  useEffect(() => {
    getRandomDog();
    getDogList();
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-screen h-screen">
      <div className="fixed top-0 left-0 z-20 text-pink-400 mix-blend-difference px-4 pt-4 lg:pt-8 lg:px-8 w-full">
        <div className="flex flex-row justify-between">
          <h2 className="font-thin text-xl lg:text-4xl w-1/2">
            This is a website devoted to{" "}
            <strong className="font-black tracking-tight">dog lovers</strong>,
            please leave if you are a{" "}
            <strong className="font-black tracking-tight">cat person...</strong>
          </h2>
          <Link href="/">
            <h2 className="font-thin text-xl text-left lg:text-4xl lg:text-right">
              DOG<strong className="font-black tracking-tight">INDEX</strong>
            </h2>
          </Link>
        </div>
      </div>
      <section className="w-full flex flex-col items-center justify-center  bg-pink-400">
        {dogList.length > 0 ? (
          <div>
            <ul className="pt-28 lg:pt-36 px-8 pb-8 h-fit w-full">
              {dogList.map((breed, index) => (
                <Link href={`dogPages/${breed}`} key={index}>
                  <li className="text-5xl lg:text-9xl leading-tighter font-black text-center hover:mix-blend-difference cursor-pointer">
                    {breed}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading breed list...</p>
        )}
        <span className="flex flex-row items-center justify-center bg-green-500 px-8 gap-2 lg:h-96 w-full">
          <h1 className="m-0 xl-type font-black tracking-tight">D</h1>
          {randomDogImage ? (
            <div>
              <img
                src={randomDogImage}
                alt="Random Dog"
                className="m-0 h-32 lg:h-96  cursor-pointer hover:shadow-xl"
                onClick={getRandomDog}
                loading="lazy"
              />
            </div>
          ) : (
            <p>Loading...</p>
          )}{" "}
          <h1 className="xl-type font-black tracking-tight -ml-1">GS</h1>
        </span>
      </section>
      {/* <footer className="w-full px-8 pt-6 pb-6 bg-orange-800">
        <h3 className="text-2xl font-black">2025</h3>
      </footer> */}
    </div>
  );
}
