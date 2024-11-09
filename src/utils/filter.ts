import { timeOptions, flagOptions } from '@/services/constants'

export const getIllnessTimeText = (time: number): string | undefined => {
  console.log('问诊时间', time)
  const result = timeOptions.find((item) => item.value === time)
  console.log(result, 'result time')

  return result ? result.label : undefined
}

export const getConsultFlagText = (flag: number): string | undefined => {
  console.log('是否就诊过', flag)
  const result = flagOptions.find((item) => item.value === flag)
  console.log(result, 'result flag')

  return result ? result.label : undefined
}
