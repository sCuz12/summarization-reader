import { LoadingOverlay, Modal } from '@mantine/core'
import React from 'react'
import rocketGif from '../../public/rocket_loading.gif'
import Image from 'next/image'

type Props = {
  visible: boolean
}



const CustomLoadingOverlay = ({ visible }: Props) => {
  
  return visible ? <LoadingOverlay loader={ <Image src={rocketGif} alt="asd" />} visible /> : null;
}

export default CustomLoadingOverlay