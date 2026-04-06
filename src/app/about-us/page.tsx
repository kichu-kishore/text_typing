import SEOContent from "@/components/SEOContent";

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">About Typing Wand</h1>
        <p className="text-xl text-muted-foreground">
          Empowering users to master the art of typing through modern, interactive tools.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed">
          At Typing Wand, our mission is to provide the world's most accessible and effective typing training platform. 
          We believe that efficient typing is a fundamental skill in the digital age, essential for productivity, 
          communication, and professional success.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Why Typing Wand?</h2>
        <p className="text-muted-foreground leading-relaxed">
          Typing Wand was created to bridge the gap between simple speed tests and comprehensive training. 
          We offer specialized modes for data entry, programming, and numeric typing, alongside engaging games 
          that make practice feel like play. Our real-time analytics and detailed feedback help users identify 
          and overcome their specific typing challenges.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Built for Everyone</h2>
        <p className="text-muted-foreground leading-relaxed">
          Whether you're a student preparing for exams, a professional looking to boost productivity, 
          or someone who just wants to chat faster, Typing Wand is designed for you. Our platform is 
          free to use, requires no registration, and works on any device with a keyboard.
        </p>
      </section>
      
      <SEOContent />
    </div>
  );
}
