import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <div className="border-t border-resolve-line pt-12 mb-12">
      {/* H2: Wide 40px - Medium 34px - Narrow 30px - Line-height 1.10-1.18 */}
      <h2 className="text-[clamp(30px,2.6vw,40px)] leading-[1.14] font-heading font-bold tracking-[-0.03em] mb-8 text-resolve-ink">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="max-w-3xl">
        {faqs.map((faq, idx) => (
          <AccordionItem key={idx} value={`faq-${idx}`} className="border-resolve-line">
            <AccordionTrigger className="text-left text-[clamp(17px,1.15vw,18px)] leading-[1.60] font-semibold text-resolve-ink hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-[16px] leading-[1.60] text-resolve-dim">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
