import { Hero } from "../components/hero/Hero";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <Hero />
      <p>TO DO</p>
      <ul className="list-disc">
        <li className="">Confirm logout modal</li>
        <li className="">Add S3 image hosting</li>
        <li className="">
          On user search show current pending or added friends in search with
          special UI
        </li>
        <li className="">Add profile pictures</li>
        <li className="">Add Block list</li>
      </ul>
    </div>
  );
}
