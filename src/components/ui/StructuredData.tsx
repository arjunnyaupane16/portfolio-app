import { portfolioData } from "@/constants/data";

export default function StructuredData() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": portfolioData.name,
        "jobTitle": portfolioData.title,
        "url": "https://chandraprakashnyaupane.com.np",
        "sameAs": [
            portfolioData.contact.linkedin,
            portfolioData.contact.github
        ],
        "description": portfolioData.bio.short,
        "knowsAbout": portfolioData.skills.flatMap(s => s.items.map(i => i.name)),
        "alumniOf": {
            "@type": "EducationalOrganization",
            "name": portfolioData.education[0].institution
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
    );
}
