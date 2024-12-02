import { Option } from '@/models/apply'
import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'
import React, { forwardRef, SelectHTMLAttributes } from 'react'
import Flex from './Flex'
import Text from './Text'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: Option[]
  placeholder?: string
}

export const BaseSelect = styled.select`
  height: 52px;
  background-color: ${colors.grey};
  border: none;
  border-radius: 16px;
  padding: 0 16px;
  cursor: pointer;
  outline: none;
`

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ label, options, placeholder, value, ...props }, ref) {
    return (
      <Flex direction="column">
        {label && (
          <Text
            typography="t7"
            color="black"
            display="inline-block"
            style={{ marginBottom: 0 }}
          >
            {label}
          </Text>
        )}

        <BaseSelect
          required
          ref={ref}
          value={value}
          {...props}
          style={{ color: '#c0c4c7' }}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>

          {options.map(({ label, value }) => (
            <option key={value} value={value} style={{ color: 'black' }}>
              {label}
            </option>
          ))}
        </BaseSelect>
      </Flex>
    )
  },
)
