import { Box, Input, Text } from '@chakra-ui/react'
import React from 'react'

export const ModalInput = (props) => {
  return (
    <Box w="80%" display="flex" flexDirection="column" gap="1" mt="0">
      <Box display="flex">
        <Text color={props.error ? "#CF222E":" var(--neutral, #676D9A)"}
          font-family=" Inter"
          font-size=" 12px"
          font-style=" normal"
          font-weight=" 400"
          line-height=" 12px" /* 100% */
          letter-spacing=" -0.15px"  >
          {props.text}
        </Text>
      </Box>
    <Box
      width="100%"
      borderRadius="6px"
      display="flex"
      justifyContent="space-between"
      border={props.error ? "1px solid #CF222E":"1px solid #676D9A"}
      background=" var(--surface-of-10, rgba(103, 109, 154, 0.10))"
      color={props.error ? "#CF222E":" var(--neutral, #676D9A)"}
      fontFamily=" Inter"
      fontSize=" 14px"
      fontStyle=" normal"
      fontWeight=" 500"
      lineHeight=" 20px" /* 142.857% */
      letterSpacing=" -0.15px"
    >
      <Input
      type={props.type || 'text'}
        border="0px"
        value={props.value}
        onChange={props.onChange}
        placeholder="rioguLSDnvSL:?DgjbsBHNB.XBMD>XBM;DLFBJ"
        _placeholder={{
          color: "rgba(240, 240, 245, 0.50)",
          fontFamily: "Inter",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: "500",
          lineHeight: "20px",
          letterSpacing: "-0.15px"

        }}
      ></Input>
    </Box>
  </Box>
  )
}
