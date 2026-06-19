import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#0a0a0a" }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124,58,237,0.08), transparent)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-[#a78bfa] text-2xl font-mono">⬡</span>
            <span className="text-white text-lg font-medium">
              Portfolio CMS
            </span>
          </div>
          <p className="text-gray-500 text-sm">Admin access only</p>
        </div>

        {/* Clerk SignIn component */}
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-[#111111] border border-[rgba(255,255,255,0.06)] shadow-2xl rounded-2xl",
              headerTitle: "text-white",
              headerSubtitle: "text-gray-400",
              socialButtonsBlockButton:
                "bg-[#1a1a1a] border-[rgba(255,255,255,0.08)] text-white hover:bg-[#222222]",
              dividerLine: "bg-[rgba(255,255,255,0.06)]",
              dividerText: "text-gray-600",
              formFieldLabel: "text-gray-400",
              formFieldInput:
                "bg-[#1a1a1a] border-[rgba(255,255,255,0.08)] text-white placeholder-gray-600 focus:border-[#a78bfa]",
              formButtonPrimary:
                "bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium",
              footerActionLink: "text-[#a78bfa] hover:text-[#c4b5fd]",
              identityPreviewText: "text-gray-300",
              identityPreviewEditButton: "text-[#a78bfa]",
            },
          }}
        />
      </div>
    </div>
  );
}
