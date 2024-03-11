import { z } from 'zod'

export const EditSemesterDataFormSchema = z.object({
  semesterId: z.string(),
  minimumGroupSize: z.coerce.number().min(1),
  maximumGroupSize: z.coerce.number().min(1),
  projectApplicationsLimit: z.coerce.number().min(1),
  facultyProposalSubmission: z.object({
    from: z.date(),
    to: z.date()
  }),
  facultyProposalReview: z.object({
    from: z.date(),
    to: z.date()
  }),
  studentRegistration: z.object({
    from: z.date(),
    to: z.date()
  }),
  markEntry: z.object({
    from: z.date(),
    to: z.date()
  }),
  peerReview: z.object({
    from: z.date(),
    to: z.date()
  })
})
const semesterNameRegex = /^[0-9]{2}[S][0-9]{1}$/

export const AddSemesterDataFormSchema = z.object({
  semesterName: z
    .string()
    .refine((value) => semesterNameRegex.test(value), 'Semester name must be in the format {YY}{S}{#}'),
  minimumGroupSize: z.coerce.number().min(1),
  maximumGroupSize: z.coerce.number().min(1),
  projectApplicationsLimit: z.coerce.number().min(1),
  facultyProposalSubmission: z.object({
    from: z.date(),
    to: z.date()
  }),
  facultyProposalReview: z.object({
    from: z.date(),
    to: z.date()
  }),
  studentRegistration: z.object({
    from: z.date(),
    to: z.date()
  }),
  markEntry: z.object({
    from: z.date(),
    to: z.date()
  }),
  peerReview: z.object({
    from: z.date(),
    to: z.date()
  }),
  programmeDetails: z.array(
    z.object({
      programmeName: z.string().min(1, { message: 'Programme name is required' }),
      faculty: z.string().min(1, { message: 'Faculty name is required' }),
      programCode: z.string().min(1)
    })
  )
})

export const AddProjectFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Title must be at least 2 characters.'
    })
    .max(50, {
      message: 'Title must not be longer than 50 characters.'
    }),
  programme: z.string().min(1, {
    message: 'Please select a programme'
  }),
  description: z.string().max(1000).min(1),
  venueId: z.string().nullable(),
  semesterId: z.string()
})

export const EditProjectFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  semesterId: z.string(),
  programme: z.string(),
  projectId: z.string(),
  venueId: z.string().nullable()
})

export const AddStudentFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required.'
  }),
  email: z.string().min(1, {
    message: 'User email is required.'
  }),
  password: z.string().min(1, {
    message: 'User password is required.'
  }),
  matriculationNumber: z.string().min(1, {
    message: 'Matriculation number is required.'
  })
})

export const AddFacultyFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required.'
  }),
  email: z.string().min(1, {
    message: 'User email is required.'
  }),
  password: z.string().min(1, {
    message: 'User password is required.'
  })
})
