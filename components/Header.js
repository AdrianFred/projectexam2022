import Link from "next/link";

export default function Header() {
  return (
    <div className="debug-screens ">
      <div className="bg-black min-h-[250px] min-w-full flex justify-center items-center">
        <div className="">
          <h2 className="text-white text-base font-bold rounded-lg outline outline-red text-center">Welcome to the Auction House</h2>
          <h2 className="text-white font-bold text-2xl text-center pt-3">Buy and sell your goods</h2>
          <p className="text-white text-sm max-w-[200px] text-center mx-auto pt-3">
            Auction House is expanding to the web to supply both online and locally
          </p>
          <div className="flex justify-center pt-6">
            <Link href="/auction">
              <button className="bg-red px-6 py-2 rounded-lg text-white hover:scale-125 ease-in duration-100">Start Browsing</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
