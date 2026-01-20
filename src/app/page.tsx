import { Button } from "@/components/Button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans p-8 gap-16 sm:p-20">
      <header className="text-choco-500 flex">
        <div>
          <h1 className="font-times text-7xl">
            VOTRE NOUVEAU <br></br>
            <span className="crunch font-allura text-[164px] relative -top-8">
              Crunsh
            </span>
          </h1>
          <p>Artisanal ~ Ingrédients de qualité ~ Prêt à déguster</p>
          <Button>DÉGUSTER</Button>
        </div>

        <div>
          <Image
            src="/images/datte-1.png"
            alt="Bowl of dates"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
      </header>

      <main></main>
    </div>
  );
}
