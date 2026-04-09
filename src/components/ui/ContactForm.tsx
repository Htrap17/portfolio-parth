'use client'

import { useState } from 'react'

type FormState = 'idle' | 'submitting' | 'success'

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [form, setForm]   = useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('submitting')
    // Wire to Formspree / Resend / etc.
    await new Promise((r) => setTimeout(r, 800))
    setState('success')
  }

  if (state === 'success') {
    return (
      <div className="py-16">
        <p className="font-serif text-3xl text-text mb-3">Message received.</p>
        <p className="label text-muted">I'll be in touch shortly.</p>
      </div>
    )
  }

  const inputClass =
    'bg-transparent border-b border-border text-text text-base py-3 outline-none focus:border-accent transition-colors duration-300 placeholder:text-muted/40'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="label text-muted">Name</label>
        <input id="name" name="name" type="text" required value={form.name}
          onChange={handleChange} className={inputClass} placeholder="Your name" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="label text-muted">Email</label>
        <input id="email" name="email" type="email" required value={form.email}
          onChange={handleChange} className={inputClass} placeholder="your@email.com" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="label text-muted">Message</label>
        <textarea id="message" name="message" required rows={5} value={form.message}
          onChange={handleChange} className={`${inputClass} resize-none`}
          placeholder="Tell me about the project" />
      </div>

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="self-start label px-8 py-3 border border-border text-text hover:border-accent hover:text-accent transition-colors duration-300 disabled:opacity-40"
      >
        {state === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
