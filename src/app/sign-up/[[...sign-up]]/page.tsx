import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <div className="bg-gradient-to-r from-rose-50 to-teal-50 flex justify-center items-center">
      <SignUp />;
    </div>
  );
}
