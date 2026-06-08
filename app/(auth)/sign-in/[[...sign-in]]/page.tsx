import { SignIn } from "@clerk/nextjs";
// import Link from "next/link";

export default function SignInPage() {
  return (
  <div className="mt-3 flex justify-center">
    <SignIn/>
  </div>
)
}

/*

<main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm border border-slate-200 md:p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Pro-Track
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to your trainer dashboard
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="trainer@example.com"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-slate-900 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>

*/