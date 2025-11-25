export default function Home() {
  const services = [
    { id: 'birth', title: 'Birth Certificate', desc: 'Apply online for birth certificates' },
    { id: 'death', title: 'Death Certificate', desc: 'Register deaths digitally' },
    { id: 'ration', title: 'Ration Card', desc: 'Apply and track ration services' },
    { id: 'pension', title: 'Pension Scheme', desc: 'Old age pension services' }
  ]

  return (
    <div className="page space-y-10">

      <div className="text-white text-center">
        <h1 className="text-5xl font-extrabold mb-3">Digital E-Gram Panchayat</h1>
        <p className="text-xl opacity-90">Modern Government Services — Online & Transparent</p>

        <div className="mt-6 flex justify-center gap-4">
          <a href="/login" className="btn-primary">Login</a>
          <a href="/register" className="btn-outline">Register</a>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map(s => (
          <div key={s.id} className="glass p-6 text-white hover:scale-105 transition">
            <h2 className="text-2xl font-bold mb-2">{s.title}</h2>
            <p className="opacity-90 mb-4">{s.desc}</p>
            <a href="/services" className="btn-outline w-full block text-center">
              View Service
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
