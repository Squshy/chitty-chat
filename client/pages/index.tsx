import { Hero } from "../components/hero/Hero";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <Hero />
      <p>TO DO</p>
      <ul className="list-disc">
        <li className="font-bold">
          Sometimes some "not authenticated" error when logout??
        </li>
        <li className="">Confirm logout modal</li>
        <li className="">Add S3 image hosting</li>
        <li className="">
          On user search show current pending or added friends in search with
          special UI
        </li>
        <li className="">Add profile pictures</li>
        <li className="">Add Block list</li>
        <li className="">Add loading to fetches</li>
        <li className="">
          Maybe add new table for friend requests and separate it from the
          friends table
        </li>
      </ul>
    </div>
  );
}
