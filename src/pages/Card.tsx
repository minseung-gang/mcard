import ListRow from '@/components/shared/ListRow'
import Top from '@/components/shared/Top'
import { useFetchCard } from '@/service/query/useCardService'
import { useParams } from 'react-router-dom'
import { HiOutlineCheck } from 'react-icons/hi'
import { colors } from '@/styles/colorPalette'
import Flex from '@/components/shared/Flex'
import FixedBottomButton from '@/components/shared/FixedBottomButton'
import Text from '@/components/shared/Text'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'

export default function CardPage() {
  const { id } = useParams()

  const { data } = useFetchCard(id ?? '')

  if (!data) return null
  const { name, corpName, promotion, tags, benefit } = data

  const subTitle = removeHtmlTages(promotion?.title ?? '') || tags.join(', ')

  return (
    <div>
      <Top title={`${corpName} ${name}`} subtitle={subTitle} />
      <ul>
        {benefit.map((text, index) => {
          return (
            <motion.li
              key={text}
              initial={{
                opacity: 0,
                translateX: -90,
              }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
                delay: index * 0.1,
              }}
              animate={{
                opacity: 1,
                translateX: 0,
              }}
            >
              <ListRow
                as="div"
                left={
                  <Flex
                    align="center"
                    justify="center"
                    css={iconsContainerStyles}
                  >
                    <HiOutlineCheck color={colors.white} size={16} />
                  </Flex>
                }
                contents={
                  <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
                }
              />
            </motion.li>
          )
        })}
      </ul>

      {promotion && (
        <Flex direction="column" css={termsContainerStyles}>
          <Text bold>유의사항</Text>
          <Text typography="t7">{removeHtmlTages(promotion?.terms)}</Text>
        </Flex>
      )}
      <FixedBottomButton label="신청하기" onClick={() => ''} />
    </div>
  )
}

function removeHtmlTages(text: string) {
  let output = ''
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === '<') {
      for (let j = i + 1; j < text.length; j += 1) {
        if (text[j] === '>') {
          i = j
          break
        }
      }
    } else {
      output += text[i]
    }
  }
  return output
}

const iconsContainerStyles = css`
  background-color: ${colors.blue};
  border-radius: 50%;
  border: 2px solid black;
  width: 18px;
  height: 18px;
`
const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px;
`
