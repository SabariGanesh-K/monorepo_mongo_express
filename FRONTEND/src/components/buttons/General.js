import { Button } from '@chakra-ui/react'
import React from 'react'

export const GeneralButton = (props) => {
  return (
    
    <Button ml={props.ml} _hover={props._hover} mr={props.mr} onClick={props.fn} > {props.name}</Button>
  )
}
