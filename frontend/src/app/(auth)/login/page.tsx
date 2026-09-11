"use client";

import { loginAction } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { processErrorMessage } from "@/utils/error";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const router = useRouter();

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);
      router.push("/");
    } else {
      toast.error(
        processErrorMessage(state.errors ? state.errors : state.message),
      );
    }
  }, [state, router]);

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome Back
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Login to Messenger
        </p>
      </div>

      <form action={formAction} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Email
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            name="email"
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            name="password"
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold
          rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
