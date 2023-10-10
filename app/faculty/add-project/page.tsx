import { CreateProposalForm } from '@/components/form/create-proposal-form'

const CreateProposal = () => {
	return (
		<div className='space-y-8'>
			<div className='flex w-full flex-col gap-1'>
				<h1 className='text-3xl font-semibold'>Create Proposal</h1>
				<h2 className='text-muted-foreground'>
					Start creating your proposal by filling form below
				</h2>
			</div>
			<div>
				<CreateProposalForm />
			</div>
		</div>
	)
}

export default CreateProposal