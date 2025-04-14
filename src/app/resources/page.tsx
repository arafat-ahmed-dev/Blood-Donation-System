export default function EducationalResources() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-4xl font-extrabold mb-4">Educational Resources</h2>
                    <p className="text-lg text-muted-foreground">
                        Learn more about the importance of blood donation and how you can help save lives.
                    </p>
                </div>

                <div className="space-y-8">
                    <article className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h3 className="text-2xl font-bold mb-2 text-primary">Why Donate Blood?</h3>
                        <p className="text-sm text-muted-foreground">
                            Blood donation is a vital process that helps save millions of lives every year. It is a simple act of kindness that can make a huge difference.
                        </p>
                    </article>

                    <article className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h3 className="text-2xl font-bold mb-2 text-primary">Who Can Donate?</h3>
                        <p className="text-sm text-muted-foreground">
                            Most healthy individuals aged 18-65 can donate blood. Make sure to check with your local blood bank for specific eligibility criteria.
                        </p>
                    </article>

                    <article className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h3 className="text-2xl font-bold mb-2 text-primary">How to Prepare for Donation?</h3>
                        <p className="text-sm text-muted-foreground">
                            Stay hydrated, eat a healthy meal, and get a good night's sleep before donating blood. Avoid alcohol and caffeine on the day of donation.
                        </p>
                    </article>
                </div>
            </div>
        </section>
    );
}