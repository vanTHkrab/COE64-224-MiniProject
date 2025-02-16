import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto p-10 mt-20 shadow rounded-xl bg-white">
      <h1>Mini Smart Webfarm</h1>
      <p>Webfarm is a smart farm that uses IoT technology to monitor and control the farm.</p>
      <Image src="/webfarm.jpg" alt="Webfarm" width="500" height="300" />
    </div>
  );
}
