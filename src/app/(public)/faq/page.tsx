import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

export default async function FaqPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600">Temukan jawaban untuk pertanyaan umum tentang showcase project mahasiswa.</p>
        </div>

        <Card className="shadow-lg rounded-2xl border border-gray-200">
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium">Apa itu showcase project mahasiswa?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Showcase project mahasiswa adalah platform untuk memamerkan karya, tugas akhir, dan inovasi mahasiswa dalam berbagai bidang.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium">Bagaimana cara mahasiswa menampilkan projectnya?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Mahasiswa dapat mendaftarkan diri dan mengunggah detail project melalui sistem yang sudah disediakan, termasuk deskripsi, gambar, dan link repositori.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium">Apakah pengunjung bisa memberikan feedback?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Ya, pengunjung dapat memberikan komentar, saran, atau apresiasi terhadap project yang ditampilkan.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-medium">Apakah platform ini gratis?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Platform ini sepenuhnya gratis untuk mahasiswa dan pengunjung, sebagai bagian dari dukungan untuk pengembangan karya akademik.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}