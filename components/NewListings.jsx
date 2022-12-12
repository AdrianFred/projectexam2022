export default function NewListings() {
  return (
    <>
      <div className="debug-screens flex justify-center items-center">
        <div className="">
          <div className="bg-white h-[500px] w-[350px] rounded-xl shadow-xl p-6">
            <div className="text-green text-3xl">Make New Listing</div>
            <div className="flex justify-center items-center h-[450px]">
              <form>
                <div className="flex flex-col mt-4 min-w-[250px]">
                  <label className="text-sm font-bold">Name</label>
                  <input
                    // onChange={changeInput}
                    placeholder="Peter Griffin"
                    name="name"
                    type="text"
                    className="border-b border-gray-300 focus:outline-none focus:border-green"
                    required
                    minLength={3}
                    maxLength={20}
                  />
                </div>
                <div className="flex flex-col mt-4 min-w-[250px]">
                  <label className="text-sm font-bold">Email</label>
                  <input
                    // onChange={changeInput}
                    placeholder="example.noroff.no"
                    name="email"
                    type="email"
                    className="border-b border-gray-300 focus:outline-none focus:border-green"
                    required
                    pattern="^[\w\-.]+@stud.?noroff.no$|^[\w\-.]+@?noroff.no$"
                    title="Only users with a Noroff email account may sign up. Email must end in (stud.)noroff.no"
                  />
                </div>
                <div className="flex flex-col mt-4 min-w-[250px]">
                  <label className="text-sm font-bold">Password</label>
                  <input
                    // onChange={changeInput}
                    name="password"
                    type="password"
                    className="border-b border-gray-300 focus:outline-none focus:border-green"
                    required
                    minLength={8}
                  />
                </div>
                <div className="flex flex-col mt-4 min-w-[250px]">
                  <label className="text-sm font-bold">Confirm Password</label>
                  <input
                    // onChange={changeInput}
                    name="passwordConfirmation"
                    type="password"
                    className="border-b border-gray-300 focus:outline-none focus:border-green"
                    required
                    minLength={8}
                  />
                </div>
                <div className="pt-24 text-center">
                  <button className="bg-green h-12 w-24 rounded-lg text-white">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
