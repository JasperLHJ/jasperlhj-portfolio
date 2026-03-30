import { Resend } from 'resend'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  message: z.string().min(10).max(10000),
})

export default defineEventHandler(async (event) => {
  const parsed = bodySchema.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request',
      data: { error: parsed.error.flatten() },
    })
  }

  const config = useRuntimeConfig(event)
  const key = config.resendApiKey as string
  const to = config.contactToEmail as string

  if (!key) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Email is not configured',
    })
  }

  const { name, email, message } = parsed.data
  const resend = new Resend(key)

  const { error } = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: [to],
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  })

  if (error) {
    throw createError({
      statusCode: 502,
      statusMessage: error.message || 'Failed to send',
    })
  }

  return { success: true }
})
