import { getAddress } from '@ethersproject/address'
import { Handler } from "@netlify/functions"
import { createSuccessResponse, createServerErrorResponse } from './utils/response'
import { getTopPairs } from './_shared'

interface ReturnShape {

    id: string
    type: string
    base_id: string
    base_name: string
    base: string
    quote_id: string
    quote_name: string
    quote: string
    last_price: string
    base_volume: string
    quote_volume: string
  }


export const handler: Handler = async () => {
  try {
    const pairs = await getTopPairs()
    return createSuccessResponse(
      pairs.reduce<ReturnShape>((accumulator, pair): ReturnShape => {
        const id0 = getAddress(pair.token0.id)
        const id1 = getAddress(pair.token1.id)
        const type = `spot`

        accumulator = {
          id: `${id0}_${id1}`,
          type: `${type}`,
          base_id: id0,
          base_name: pair.token0.name,
          base: pair.token0.symbol,
          quote_id: id1,
          quote_name: pair.token1.name,
          quote: pair.token1.symbol,
          last_price: pair.price ?? '0',
          base_volume: pair.previous24hVolumeToken0.toString(),
          quote_volume: pair.previous24hVolumeToken1.toString()
        }

        return accumulator
      },
  
  } catch (error) {
    return createServerErrorResponse(error)
  }
}
