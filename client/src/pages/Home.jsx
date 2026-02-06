import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const url = import.meta.env.VITE_URL;

  const handleSendTips = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(`${url}/private/cron`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (res.data.isActive) {
        localStorage.setItem("isActive", "true");
      }
      setMessage(res.data.msg);
      navigate("/active");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-teal-600">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur">
            <CardHeader className="space-y-2 pb-2">
              <div className="text-5xl">💰</div>
              <CardTitle className="text-3xl">Salary Saver Pro</CardTitle>
              <CardDescription className="text-base">
                Turn your monthly salary into smart savings. Get daily expert
                tips delivered to your inbox for 30 days.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                size="lg"
                onClick={handleSendTips}
                disabled={loading}
                className="w-full text-base"
              >
                {loading ? "Sending..." : "Start Sending Tips"}
              </Button>
              {message && (
                <p className="text-sm text-amber-600 font-medium">{message}</p>
              )}
              <Button variant="outline" onClick={logout} className="w-full">
                Logout
              </Button>
            </CardContent>
          </Card>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <Card className="bg-white/90 border-0">
              <CardHeader>
                <div className="text-3xl mb-2">📝</div>
                <CardTitle className="text-lg">Register</CardTitle>
                <CardDescription>
                  Enter your email and monthly salary to sign up.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/90 border-0">
              <CardHeader>
                <div className="text-3xl mb-2">📧</div>
                <CardTitle className="text-lg">Daily Tips</CardTitle>
                <CardDescription>
                  Receive personalized saving tips for 30 days.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/90 border-0">
              <CardHeader>
                <div className="text-3xl mb-2">📈</div>
                <CardTitle className="text-lg">Grow</CardTitle>
                <CardDescription>
                  Learn to budget, save and invest smartly.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <p className="mt-12 text-sm text-white/80">
            Built to help you manage your salary smarter
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
