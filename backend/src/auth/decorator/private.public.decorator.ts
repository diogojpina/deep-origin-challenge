import { SetMetadata } from '@nestjs/common'

export const IS_PRIVATE_PUBLIC_KEY = 'isPrivatePublic'
export const PrivatePublic = () => SetMetadata(IS_PRIVATE_PUBLIC_KEY, true)
