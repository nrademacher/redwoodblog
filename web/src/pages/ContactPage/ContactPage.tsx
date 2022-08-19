import {
   Form,
   Submit,
   SubmitHandler,
   TextField,
   TextAreaField,
   FieldError,
   Label,
   FormError,
   useForm,
} from '@redwoodjs/forms'
import { useMutation, MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import {
  CreateContactMutation,
  CreateContactMutationVariables,
} from 'types/graphql'

interface FormValues {
  name: string
  email: string
  message: string
}

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm({mode: 'onBlur'})

  const [create, {loading, error}] = useMutation<CreateContactMutation, CreateContactMutationVariables>(CREATE_CONTACT, {
  onCompleted: () => {
  toast.success('Thank you for your submission!')
  formMethods.reset()
  },})

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await create({variables: {input: data}})
  }

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Toaster />
      <Form onSubmit={onSubmit} error={error} formMethods={formMethods}>

        <Label name="name" errorClassName="error">
          Name
        </Label>
        <TextField
          name="name"
          className="rounded-sm"
          validation={{ required: true }}
        />
        <FieldError name="name" className="error mb-2" />

        <Label name="email" errorClassName="error">
          Email
        </Label>
        <TextField
          name="email"
          className="rounded-sm"
          validation={{
            required: true,
          }}
        />
        <FieldError name="email" className="error mb-2" />

        <Label name="message" errorClassName="error">
          Message
        </Label>
        <TextAreaField
          name="message"
          className="rounded-sm"
          validation={{ required: true }}
        />
        <FieldError name="message" className="error mb-4" />

        <Submit disabled={loading} className="rounded-sm bg-cyan-200 px-2 py-1">Save</Submit>
      </Form>
    </>
  )
}

export default ContactPage
