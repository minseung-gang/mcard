import Form from '@/components/signin/Form'
import { useAlertContext } from '@/hooks/useAlertContext'
import { FormValues } from '@/models/signin'
import { auth } from '@/remote/firebase'
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function SigninPage() {
  const { open } = useAlertContext()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const handleSubmit = useCallback(
    async (formValues: FormValues) => {
      const { email, password } = formValues

      try {
        await signInWithEmailAndPassword(auth, email, password)

        navigate(from, { replace: true })
      } catch (err) {
        // firebase의 에러
        if (err instanceof FirebaseError) {
          console.log(err.code)
          if (err.code === 'auth/invalid-credential') {
            return open({
              title: '계정의 정보를 다시 확인해주세요',
              onButtonClick: () => {},
            })
          }
        }

        // 일반적인 에러
        open({
          title: '잠시 후 다시 시도해 주세요',
          onButtonClick: () => {},
        })
      }
    },
    [navigate, from],
  )

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}
