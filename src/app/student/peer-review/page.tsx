import { getServerSession } from 'next-auth'

import { Header } from '@/src/components/header'
import PeerReviewSection from '@/src/components/student/peer-review/peer-review-section'
import { TypographyH2 } from '@/src/components/typography'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/src/components/ui/table'
import { authOptions } from '@/src/lib/auth'
import { prisma } from '@/src/lib/prisma'

const PeerReview = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return <TypographyH2>Please sign in</TypographyH2>
  }

  const studentId = session.user.studentId

  if (!studentId) {
    return <TypographyH2>No student ID found</TypographyH2>
  }
  const activeSemesterData = await prisma.semester.findFirst({
    where: {
      active: true
    },
    include: {
      timeline: {
        select: {
          studentPeerReviewStart: true,
          studentPeerReviewEnd: true
        }
      }
    }
  })

  if (!activeSemesterData) {
    return <TypographyH2>No active semester set</TypographyH2>
  }

  if (!activeSemesterData.timeline) {
    return <TypographyH2>No timeline set for the active semester</TypographyH2>
  }

  if (!activeSemesterData.timeline.studentPeerReviewStart || !activeSemesterData.timeline.studentPeerReviewEnd) {
    return <TypographyH2>No peer review timeline set for the active semester</TypographyH2>
  }

  const currentDate = new Date()
  const peerReviewStartDate = new Date(activeSemesterData.timeline.studentPeerReviewStart)
  const peerReviewEndDate = new Date(activeSemesterData.timeline.studentPeerReviewEnd)

  if (currentDate < peerReviewStartDate || currentDate > peerReviewEndDate) {
    return <TypographyH2>Not peer review period</TypographyH2>
  }

  const studentData = await prisma.student.findFirst({
    where: {
      id: studentId
    },
    select: {
      projectId: true
    }
  })

  if (!studentData?.projectId) {
    return <TypographyH2>No project found for this student</TypographyH2>
  }

  const projectStudents = await prisma.student.findMany({
    where: {
      projectId: studentData.projectId
    },
    select: {
      id: true,
      user: {
        select: {
          name: true
        }
      }
    }
  })

  const peers = projectStudents
    .filter((student) => student.id !== studentId)
    .map((student) => ({
      id: student.id,
      name: student.user.name
    }))

  const peerReviewData = await prisma.peerReview.findMany({
    where: {
      projectId: studentData.projectId,
      reviewerId: studentId
    },
    select: {
      id: true,
      rank: true,
      reviewee: {
        select: {
          user: {
            select: {
              name: true
            }
          }
        }
      }
    },
    orderBy: {
      rank: 'asc'
    }
  })

  return (
    <section className='space-y-6 pb-8 pt-6 md:pb-12 md:pt-10'>
      <Header title='Peer Review' description='Rank your peers here.' />
      <PeerReviewSection peers={peers} reviewerId={studentId} projectId={studentData.projectId} />
      {peerReviewData.length === 0 ? (
        <p className='text-md text-muted-foreground md:text-lg'>You have not registered any project</p>
      ) : (
        <Table className='border'>
          <TableCaption>Submitted peer review.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Rank</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {peerReviewData.map((review) => (
              <TableRow key={review.id}>
                <TableCell className='font-medium'>{review.reviewee.user.name}</TableCell>
                <TableCell>{review.rank}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  )
}

export default PeerReview
