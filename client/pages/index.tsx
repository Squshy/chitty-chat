import { Hero } from "../components/hero/Hero";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <Hero />
      <p>TO DO</p>
      <ul className="list-disc">
        <li className="">Confirm logout modal</li>
        <li className="">Add S3 image hosting</li>
      </ul>
    </div>
  );
}
