import propsImg from "../public/assets/man.jpg";

export default function Profile() {
  return (
    <div className="debug-screens">
      <div className="flex justify-center">
        <div>
          <div className="text-2xl text-green">Profile</div>
          <div className="pt-6">
            <img src="/assets/man.jpg" className="w-[300px] rounded-2xl"></img>
            <div className="flex justify-center pt-6">
              <button className="bg-green p-3 rounded-3xl text-white ">Change profile picture?</button>
            </div>
          </div>
          <div className="text-xl pt-14">
            <div>
              <p className="text-green">Name</p>
              <p className="ml-4">Username</p>
            </div>
            <div>
              <p className="text-green">Email</p>
              <p className="ml-4">email.noroff@test.no</p>
            </div>
            <div>
              <p className="text-green">Credits</p>
              <p className="ml-4">
                <span className="font-bold">1000</span> Credits available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
