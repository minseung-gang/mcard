import { FormValues } from '@/models/signin'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'
import TextField from '../shared/TextField'

export default function Form({
  onSubmit,
}: {
  onSubmit: (formValues: FormValues) => void
}) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })
  const [dirty, setDirty] = useState<Partial<FormValues>>({})

  const handleFormValues = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }))
    },
    [],
  )
  const handleBlur = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setDirty((prev) => ({
      ...prev,
      [event.target.name]: true,
    }))
  }, [])
  const errors = useMemo(() => validate(formValues), [formValues])

  const 제출가능한가 = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        placeholder="asdf1@gmail.com"
        onChange={handleFormValues}
        value={formValues.email}
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        onBlur={handleBlur}
        helpMessage={Boolean(dirty.email) ? errors.email : ''}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        type="password"
        name="password"
        onChange={handleFormValues}
        value={formValues.password}
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        onBlur={handleBlur}
        helpMessage={Boolean(dirty.password) ? errors.password : ''}
      />
      <Spacing size={32} />
      <Button
        size="medium"
        disabled={제출가능한가 === false}
        onClick={() => onSubmit(formValues)}
      >
        로그인
      </Button>
      <Spacing size={12} />
      <Link to="/signup" css={linkStyles}>
        <Text typography="t7">아직도 계정이 없으신가요?</Text>
      </Link>
    </Flex>
  )
}

function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요'
  }
  if (formValues.password.length < 8) {
    errors.password = '비밀번호를 8글자 이상 입력해주세요'
  }

  return errors
}

const formContainerStyles = css`
  padding: 24px;
`
const linkStyles = css`
  text-align: center;

  & > span:hover {
    color: ${colors.blue};
  }
`
