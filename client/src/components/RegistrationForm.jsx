import { CreditCard, LoaderCircle, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { registerParticipant } from '../services/api'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  college: '',
  category: 'Faculty',
  paymentReference: '',
  paymentProof: null,
}

function RegistrationForm() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] ?? null
    setForm((current) => ({ ...current, paymentProof: file }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.paymentProof) {
      toast.error('Payment proof is mandatory for registration.')
      return
    }

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(form.paymentProof.type)) {
      toast.error('Upload payment proof as PDF, JPG, PNG, or WEBP.')
      return
    }

    const payload = new FormData()
    payload.append('name', form.name)
    payload.append('email', form.email)
    payload.append('phone', form.phone)
    payload.append('college', form.college)
    payload.append('category', form.category)
    payload.append('paymentReference', form.paymentReference)
    payload.append('paymentProof', form.paymentProof)

    setLoading(true)
    try {
      await registerParticipant(payload)
      toast.success('Registration submitted. Payment verification is now pending.')
      setForm(initialForm)
      event.target.reset()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to submit registration.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="surface-card space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 rounded-[28px] border border-teal-200/70 bg-teal-50/70 p-5 text-sm text-slate-600 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            <ShieldCheck size={16} />
            Payment Required
          </p>
          <p className="mt-3 leading-7">
            Registrations are only accepted with a valid transaction reference and proof upload. Admin will review and verify the payment before final confirmation.
          </p>
        </div>
        <div className="rounded-2xl bg-white px-4 py-3 text-sm font-medium text-navy-900 shadow-[0_16px_32px_rgba(15,23,42,0.08)]">
          Upload proof
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input className="field" name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
        <input className="field" type="email" name="email" placeholder="Email address" value={form.email} onChange={handleChange} required />
        <input className="field" name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} required />
        <input className="field" name="college" placeholder="College / organization" value={form.college} onChange={handleChange} required />
      </div>
      <div className="grid gap-4 md:grid-cols-[0.85fr_1.15fr]">
        <select className="field" name="category" value={form.category} onChange={handleChange}>
          <option>Faculty</option>
          <option>Students</option>
          <option>Attendee</option>
        </select>
        <label className="field flex items-center gap-3">
          <CreditCard size={16} className="text-teal-600" />
          <input
            className="w-full bg-transparent outline-none placeholder:text-slate-400"
            name="paymentReference"
            placeholder="Transaction ID / UTR / payment reference"
            value={form.paymentReference}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-600">
        <span>{form.paymentProof?.name || 'Upload payment proof (PDF, JPG, PNG, or WEBP)'}</span>
        <span className="button-ghost">Choose file</span>
        <input
          type="file"
          name="paymentProof"
          accept=".pdf,image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={handleFileChange}
          required
        />
      </label>
      <button type="submit" className="button-primary w-full" disabled={loading}>
        {loading ? <LoaderCircle className="animate-spin" size={18} /> : 'Register Now'}
      </button>
    </form>
  )
}

export default RegistrationForm
