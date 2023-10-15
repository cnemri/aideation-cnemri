import { SignIn } from "@clerk/nextjs";

export default function SigninPage() {
  return (
    <div className="bg-gradient-to-r from-rose-50 to-teal-50 flex justify-center items-center min-h-screen">
      <SignIn />;
    </div>
  );
}
