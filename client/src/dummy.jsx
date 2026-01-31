{/* FEATURES */}
      <div className="bg-white text-gray-800 rounded-t-[40px] px-6 py-16">

        <h2 className="text-3xl font-bold text-center mb-10">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

          <div className="p-6 rounded-2xl bg-green-50 text-center shadow">
            <div className="text-4xl mb-3">📝</div>
            <h3 className="font-semibold mb-2">Register</h3>
            <p className="text-sm">
              Enter your email and monthly salary while signing up.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-green-50 text-center shadow">
            <div className="text-4xl mb-3">📧</div>
            <h3 className="font-semibold mb-2">Daily Tips</h3>
            <p className="text-sm">
              Receive personalized saving and investment tips for 30 days.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-green-50 text-center shadow">
            <div className="text-4xl mb-3">📈</div>
            <h3 className="font-semibold mb-2">Grow Money</h3>
            <p className="text-sm">
              Learn how to budget, save and invest smartly.
            </p>
          </div>

        </div>

        {/* BOTTOM CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/register")}
            className="bg-green-600 text-white px-8 py-4 cursor-pointer rounded-2xl font-bold hover:bg-green-700 transition"
          >
            Start My 30-Day Plan
          </button>         
        </div>

      </div>

      {/* FOOTER */}
      <div className="text-center py-6 text-sm text-white/80">
        Built to help you manage your salary smarter 💡
      </div>