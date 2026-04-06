import FAQ from "@/components/FAQ";

export default function FAQPage() {
  return (
    <div className="flex flex-col items-center py-8">
      <div className="max-w-6xl w-full px-4 mb-8">
        <h1 className="text-xl font-semibold">Frequently Asked Questions</h1>
      </div>
      <FAQ />
    </div>
  );
}
