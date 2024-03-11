import { AddProjectForm } from '@/src/components/form/add-project-form'
import { Header } from '@/src/components/header'
import { prisma } from '@/src/lib/prisma'

const CreateProposal = async () => {
  const semester = await prisma.semester.findFirst({
    where: {
      active: true
    },
    select: {
      id: true,
      name: true,
      SemesterTimeline: {
        select: {
          facultyProposalSubmissionStart: true,
          facultyProposalSubmissionEnd: true
        }
      },
      venues: true
    }
  })

  if (!semester || !semester.SemesterTimeline)
    return (
      <Header
        title='Create a proposal'
        description={`Currently there is no active semester. Please contact the administrator.`}
      />
    )

  // check the date against the timeline
  const now = new Date()
  const start = semester.SemesterTimeline.facultyProposalSubmissionStart
    ? new Date(semester.SemesterTimeline.facultyProposalSubmissionStart)
    : null
  const end = semester.SemesterTimeline.facultyProposalSubmissionEnd
    ? new Date(semester.SemesterTimeline.facultyProposalSubmissionEnd)
    : null

  if (start && end && (now < start || now > end)) {
    return <Header title='Create a proposal' description={`Proposal submission is not open yet.`} />
  }

  // check available programme for the semester
  const programmeData = await prisma.programme.findMany({
    where: {
      semesterId: semester.id
    },
    select: {
      name: true
    }
  })

  const programmeOptions = programmeData.map((programme) => programme.name)

  // get lab venue data for the active semester
  const venueData = semester.venues

  return (
    <div className='space-y-8'>
      <div className='flex w-full flex-col gap-1'>
        <Header title='Create a proposal' description={`Proposal created will be for the semester: ${semester.name}`} />
      </div>

      <div>
        <AddProjectForm semesterId={semester.id} programmeOptions={programmeOptions} venueOptions={venueData} />
      </div>
    </div>
  )
}

export default CreateProposal
